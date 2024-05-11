/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ConfigService } from 'src/app/services/config/config.service';
import { AlertService } from 'src/app/services/message/alert.service';
import { SettingEnum } from 'src/enums/setting.enum';

@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.scss'],
})
export class CropImageComponent implements OnInit {
  @Output() imageUrl = new EventEmitter<string>();
  @Input() aspectRatio: number = 4 / 4;
  @Input() visible = false;
  @Input() maintainAspectRatio? = true;

  imageChangedEvent: unknown = '';
  croppedImage: unknown = '';
  base64String?: string;

  allowedExtension = '';
  allowedFileSize = 0;

  constructor(
    private sanitizer: DomSanitizer,
    private alertService: AlertService,
    private configService: ConfigService,
  ) {}

  ngOnInit(): void {
    this.getAllowedExtension();
  }

  getAllowedExtension() {
    this.configService.getSettingById(SettingEnum.FILE_EXTENSION).subscribe((response) => {
      this.allowedExtension = response.data;
    });
    this.configService.getSettingById(SettingEnum.FILE_SIZE).subscribe((response) => {
      this.allowedFileSize = Number(response.data) || 0;
    });
  }

  fileChangeEvent(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const fileExtension = file.name.split('.').pop();
      if (!this.allowedExtension.includes(fileExtension)) {
        this.alertService.showErrorMessage({
          title: 'Error',
          message: `La extensión del archivo no está permitida. Actualmente solo se permiten archivos con las siguientes extensiones: ${this.allowedExtension}`,
        });
      } else {
        const fileSize = file.size;
        const maxSize = this.allowedFileSize * 1024 * 1024;
        if (fileSize > maxSize) {
          this.alertService.showErrorMessage({
            title: `Archivo supera el limite de ${this.allowedFileSize}MB`,
            message: 'Inténtalo nuevamente',
          });
          event.target.value = '';
        } else {
          this.imageChangedEvent = event;
        }
      }
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl ?? '');
    this.convertBlobToBase64(event.objectUrl ?? '');
  }

  loadImageFailed() {
    this.alertService.showErrorMessage({
      title: 'Error',
      message: 'Fallo la carga de la imagen, Inténtalo nuevamente',
    });
  }

  cropImage() {
    this.imageUrl.emit(this.base64String);
    this.imageChangedEvent = '';
    this.croppedImage = '';
    this.visible = false;
  }

  convertBlobToBase64(blobUrl: string) {
    fetch(blobUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.base64String = reader.result as string;
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.error('Error al convertir el blob a Base64: ', error);
      });
  }

  cancel() {
    this.imageUrl.emit('');
  }
}

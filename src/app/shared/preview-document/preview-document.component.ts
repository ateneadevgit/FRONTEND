/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { PreviewDocument } from 'src/models/preview-document.interface';

@Component({
  selector: 'app-preview-document',
  templateUrl: './preview-document.component.html',
  styleUrls: ['./preview-document.component.scss'],
})
export class PreviewDocumentComponent implements OnInit {
  @Input() visible = false;
  @Input() previewDocument?: PreviewDocument;
  @Output() closeModal = new EventEmitter<boolean>();
  documentUrl?: string = '';
  safePdfUrl?: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    const sanitizerUrl: any = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${this.previewDocument?.url}`,
    );
    this.documentUrl = sanitizerUrl.changingThisBreaksApplicationSecurity;
    this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.previewDocument?.url || '',
    );
  }

  close() {
    this.closeModal.emit(false);
    this.safePdfUrl = undefined;
  }
}

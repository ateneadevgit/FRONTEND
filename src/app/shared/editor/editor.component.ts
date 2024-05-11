/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, OnDestroy {
  @Input() htmlText?: string;
  @Output() createHtml = new EventEmitter<string>();
  @Output() createHtmlElement = new EventEmitter<any>();
  @Input() element?: any;
  @Input() maxlength = 5000;
  editor?: Editor;
  html = '';

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Ingresar texto aquí...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [{ class: 'arial', name: 'Arial' }],
    customClasses: [
      /* {
        name: 'quote',
        class: 'quote',
      }, */
    ],
    uploadUrl: 'v1/image',
    /*  upload: (file: File) => {  }
    uploadWithCredentials: false, */
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        //'undo',
        //'redo',
        //'bold',
        //'italic',
        //'underline',
        //'strikeThrough',
        'subscript',
        'superscript',
        //'justifyLeft',
        //'justifyCenter',
        //'justifyRight',
        //'justifyFull',
        //'indent',
        //'outdent',
        //'insertUnorderedList',
        //'insertOrderedList',
        //'heading',
        'fontName',
      ],
      [
        //'fontSize',
        //'textColor',
        //'backgroundColor',
        'customClasses',
        //'link',
        //'unlink',
        'insertImage',
        'insertVideo',
        //'insertHorizontalRule',
        //'removeFormat',
        //'toggleEditorMode'
      ],
    ],
  };

  ngOnInit(): void {
    this.editor = new Editor();
    this.editor.valueChanges.subscribe(() => {
      this.createHtml.emit(this.html);
      this.createHtmlElement.emit({ html: this.html, element: this.element });
    });
    setTimeout(() => {
      this.html = this.htmlText ? this.htmlText : this.html;
    }, 1000);
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  viewHtml() {
    this.createHtml.emit(this.html);
    this.createHtmlElement?.emit({ html: this.html, element: this.element });
  }
}

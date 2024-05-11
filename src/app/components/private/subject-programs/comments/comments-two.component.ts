/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { CommentsWorkflow } from 'src/models/comments.interface';

@Component({
  selector: 'app-comments-two',
  templateUrl: './comments-two.component.html',
  styleUrls: ['./comments-two.component.scss'],
})
export class CommentsTwoComponent implements OnInit {
  @Output() getCommentsEvent = new EventEmitter();
  @Output() saveCommentsEvent = new EventEmitter<any>();
  @Input() events?: CommentsWorkflow[];
  visibleReply = false;
  html = '';
  htmlToReply = '';
  replyComment?: CommentsWorkflow;
  disabledEditor = false;

  constructor(
    private workflowService: WorkflowService,
    private programsService: ProgramsService,
  ) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.getCommentsEvent.emit();
  }

  replyData(comment: CommentsWorkflow) {
    this.replyComment = comment;
  }

  sendToReply(type: number) {
    if (type === 1) {
      if (!this.htmlToReply || this.htmlToReply?.length <= 0) {
        return;
      }
    }

    if (type === 2) {
      if (!this.html || this.html?.length <= 0) {
        return;
      }
    }

    const pyload = {
      replyTo: this.replyComment?.reviewId ?? 0,
      review: this.replyComment ? this.htmlToReply : this.html,
      successSenTo: this.successSenTo,
    };
    this.saveCommentsEvent.emit(pyload);
  }

  successSenTo = () => {
    this.disabledEditor = true;
    this.replyComment = undefined;
    this.htmlToReply = '';
    this.html = '';
    this.getCommentsEvent.emit();
    setTimeout(() => {
      this.disabledEditor = false;
    }, 100);
  };

  createHtml($event: string) {
    this.html = $event;
  }

  createHtmlToReplay($event: string) {
    this.htmlToReply = $event;
  }
}

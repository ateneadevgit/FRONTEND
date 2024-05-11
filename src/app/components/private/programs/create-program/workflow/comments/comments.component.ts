/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { CommentsWorkflow, ReplyEditModule, ReplyWorkflow } from 'src/models/comments.interface';
import { StepsWorkflow } from 'src/models/workflow.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() currentStep?: StepsWorkflow;
  @Input() workFlowId?: any;
  @Input() programId?: any;
  @Input() type?: any;
  @Input() flow = 0; // 0 normal - 2 edit module
  visibleReply = false;
  events?: CommentsWorkflow[];
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
    if (this.flow === 0) {
      this.workflowService
        .getComments(this.workFlowId, this.currentStep?.stepId ?? 0)
        .subscribe((response) => {
          const { data } = response;
          this.events = data;
        });
    } else {
      this.programsService.getReviewEdit(this.programId, this.type).subscribe((response) => {
        const { data } = response;
        this.events = data;
      });
    }
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

    if (this.flow === 0) {
      const payload: ReplyWorkflow = {
        createdBy: null,
        replyTo: this.replyComment?.reviewId ?? 0,
        review: this.replyComment ? this.htmlToReply : this.html,
        roleId: null,
        stepId: this.currentStep?.stepId ?? 0,
        workflowId: this.workFlowId,
      };
      this.workflowService.reply(payload).subscribe(() => {
        this.disabledEditor = true;
        this.replyComment = undefined;
        this.htmlToReply = '';
        this.html = '';
        this.getComments();
        setTimeout(() => {
          this.disabledEditor = false;
        }, 100);
      });
    } else {
      const payload: ReplyEditModule = {
        createdBy: null,
        replyTo: this.replyComment?.reviewId ?? 0,
        review: this.replyComment ? this.htmlToReply : this.html,
        roleId: null,
        objectId: this.programId,
        objectType: this.type,
      };
      this.programsService.sendReviewEdit(payload).subscribe(() => {
        this.disabledEditor = true;
        this.replyComment = undefined;
        this.htmlToReply = '';
        this.html = '';
        this.getComments();
        setTimeout(() => {
          this.disabledEditor = false;
        }, 100);
      });
    }
  }

  createHtml($event: string) {
    this.html = $event;
  }

  createHtmlToReplay($event: string) {
    this.htmlToReply = $event;
  }
}

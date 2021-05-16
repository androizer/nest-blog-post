import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { BehaviorSubject } from 'rxjs';

import { CommentCreatedEvent } from '../../comment/models';
import { BaseEvent } from '../models';

@Injectable()
export class EventService {
  public readonly serverSentEvent = new BehaviorSubject<BaseEvent>(null);

  @OnEvent('comment.created')
  handleCommentCreatedEvent(data: CommentCreatedEvent) {
    this.serverSentEvent.next(data);
  }
}

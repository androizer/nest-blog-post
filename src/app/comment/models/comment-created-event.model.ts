import { BaseEvent } from '../../shared/models';
import { uuid } from '../../shared/types';

interface ICommentCreated {
  id: uuid;
  postId: uuid;
}

export class CommentCreatedEvent extends BaseEvent<ICommentCreated> {
  type = 'CommentCreated';
  constructor(data: ICommentCreated) {
    super(data);
  }
}

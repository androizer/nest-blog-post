import { BaseEvent } from '../../shared/models';

interface ICommentCreated {
  id: string;
}

export class CommentCreatedEvent extends BaseEvent<ICommentCreated> {
  type = 'CommentCreated';
  constructor(data: ICommentCreated) {
    super(data);
  }
}

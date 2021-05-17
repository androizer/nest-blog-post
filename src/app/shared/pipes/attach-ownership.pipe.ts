import { ArgumentMetadata, Injectable, Optional, PipeTransform } from '@nestjs/common';
import { User } from '../../user/models';

@Injectable()
export class AttachOwnershipPipe implements PipeTransform {
  constructor(@Optional() private readonly user?: User) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const { user } = this;
    if (metadata.type === 'body') {
      if (user) {
        value.ownership = {
          createdBy: value.createdBy ?? this.user.id,
          modifiedBy: this.user.id,
        };
      }
    }
    return value;
  }
}

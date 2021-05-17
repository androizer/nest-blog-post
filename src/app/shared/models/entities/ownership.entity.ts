import { Column } from 'typeorm';

import { IOwnership, uuid } from '../../types';

// eslint-disable-next-line @typescript-eslint/ban-types
type Constructor = new (...args: any[]) => {};

export function Ownership<IBase extends Constructor>(Base: IBase) {
  class OwnershipEntity extends Base implements IOwnership {
    @Column({
      type: 'uuid',
      nullable: true,
    })
    createdBy: uuid;

    @Column({
      type: 'uuid',
      nullable: true,
    })
    modifiedBy: uuid;
  }
  return OwnershipEntity;
}

export class OwnershipEntity implements IOwnership {
  @Column({
    type: 'uuid',
    nullable: true,
  })
  createdBy: uuid;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  modifiedBy: uuid;
}

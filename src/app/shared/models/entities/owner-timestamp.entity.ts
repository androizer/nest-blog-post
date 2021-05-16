import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

import { IOwnerTimestamp } from '../../types';

// eslint-disable-next-line @typescript-eslint/ban-types
type Constructor = new (...args: any[]) => {};

export function OwnerTimestamp<TBase extends Constructor>(Base: TBase) {
  class OwnerTimestampEntity extends Base implements IOwnerTimestamp {
    @CreateDateColumn({
      name: 'created_on',
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    createdOn: Date;

    @UpdateDateColumn({
      name: 'modified_on',
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    modifiedOn: Date;

    @DeleteDateColumn()
    deletedOn?: Date;
  }
  return OwnerTimestampEntity;
}

export class OwnerTimestampEntity implements IOwnerTimestamp {
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdOn: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  modifiedOn: Date;

  @DeleteDateColumn()
  deletedOn?: Date;
}

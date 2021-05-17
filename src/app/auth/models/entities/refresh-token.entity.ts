import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { OwnerTimestampEntity } from '../../../shared/models';
import { uuid } from '../../../shared/types';
import { User, UserEntity } from '../../../user/models';

@Entity('refresh_tokens')
export class RefreshTokenEntity extends OwnerTimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: uuid;

  @OneToOne(() => UserEntity, { nullable: false })
  @JoinColumn()
  user: User;

  @Column({ type: 'boolean', default: false })
  isRevoked: boolean;
}

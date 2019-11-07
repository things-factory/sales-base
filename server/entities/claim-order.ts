import {
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Index,
  Column,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from 'typeorm'
import { Domain } from '@things-factory/shell'
import { User } from '@things-factory/auth-base'

import { Claim } from '.'
import { CollectionOrder } from '.'
import { DeliveryOrder } from '.'

@Entity()
@Index('ix_claim-order_0', (claimOrder: ClaimOrder) => [claimOrder.domain, claimOrder.id], { unique: true })
export class ClaimOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column()
  name: string

  @Column({
    nullable: true
  })
  description: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(type => Claim)
  claim: Claim

  @ManyToOne(type => CollectionOrder, { nullable: true })
  @JoinColumn()
  collectionOrder: CollectionOrder

  @ManyToOne(type => DeliveryOrder, { nullable: true })
  @JoinColumn()
  deliveryOrder: DeliveryOrder

  @ManyToOne(type => User, {
    nullable: true
  })
  creator: User

  @ManyToOne(type => User, {
    nullable: true
  })
  updater: User
}

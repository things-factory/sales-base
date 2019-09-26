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

import { CollectionOrder } from '.'
import { DeliveryOrder } from '.'
import { ClaimDetail } from '.'

@Entity()
@Index('ix_claim_0', (claim: Claim) => [claim.domain, claim.name], { unique: true })
export class Claim {
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

  @OneToMany(type => ClaimDetail, claimDetail => claimDetail.claim)
  claimDetails: ClaimDetail[]

  @ManyToOne(type => User, {
    nullable: true
  })
  creator: User

  @ManyToOne(type => User, {
    nullable: true
  })
  updater: User

  @OneToOne(type => CollectionOrder, { nullable: true })
  @JoinColumn()
  collectionOrder: CollectionOrder

  @OneToOne(type => DeliveryOrder, { nullable: true })
  @JoinColumn()
  deliveryOrder: DeliveryOrder
}

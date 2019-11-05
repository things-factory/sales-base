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

import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'
import { Bizplace } from '@things-factory/biz-base'
import { ClaimDetail } from '.'

@Entity()
@Index('ix_claim_0', (claim: Claim) => [claim.domain, claim.id], { unique: true })
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

  @Column({
    nullable: true
  })
  billingMode: string

  @Column({
    nullable: true
  })
  from: string

  @Column({
    nullable: true
  })
  to: string

  @Column({
    nullable: true
  })
  remark: string

  @Column({
    nullable: true
  })
  charges: number

  @Column({
    nullable: true
  })
  drum: number

  @Column({
    nullable: true
  })
  pallet: number

  @Column({
    nullable: true
  })
  carton: number

  @Column({
    nullable: true
  })
  bag: number

  @Column({
    nullable: true
  })
  other: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(type => ClaimDetail, claimDetail => claimDetail.claim)
  claimDetails: ClaimDetail[]

  @ManyToOne(type => TransportDriver)
  @JoinColumn()
  transportDriver: TransportDriver

  @ManyToOne(type => TransportVehicle)
  @JoinColumn()
  transportVehicle: TransportVehicle

  @ManyToOne(type => Bizplace, { nullable: true })
  @JoinColumn()
  bizplace: Bizplace

  @ManyToOne(type => User, {
    nullable: true
  })
  creator: User

  @ManyToOne(type => User, {
    nullable: true
  })
  updater: User
}

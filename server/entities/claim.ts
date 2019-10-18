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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(type => ClaimDetail, claimDetail => claimDetail.claim)
  claimDetails: ClaimDetail[]

  @OneToOne(type => TransportDriver, { nullable: true })
  @JoinColumn()
  transportDriver: TransportDriver

  @OneToOne(type => TransportVehicle, { nullable: true })
  @JoinColumn()
  transportVehicle: TransportVehicle

  @ManyToOne(type => User, {
    nullable: true
  })
  creator: User

  @ManyToOne(type => User, {
    nullable: true
  })
  updater: User
}

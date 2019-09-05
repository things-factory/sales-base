import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { ArrivalNotice } from './arrival-notice'
import { Vas } from './vas'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('arrival_notice_vass')
@Index(
  'ix_arrival-notice-vas_0',
  (arrivalNoticeVas: ArrivalNoticeVas) => [arrivalNoticeVas.domain, arrivalNoticeVas.name],
  { unique: true }
)
@Index(
  'ix_arrival-notice-vas_1',
  (arrivalNoticeVas: ArrivalNoticeVas) => [arrivalNoticeVas.vas, arrivalNoticeVas.batchId],
  { unique: true }
)
export class ArrivalNoticeVas {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain, {
    nullable: false
  })
  domain: Domain

  @Column()
  name: string

  @Column()
  batchId: string

  @ManyToOne(type => ArrivalNotice, {
    nullable: false
  })
  arrivalNotice: ArrivalNotice

  @ManyToOne(type => Vas, {
    nullable: false
  })
  vas: Vas

  @Column()
  remark: string

  @Column({
    nullable: true
  })
  description: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(type => User, {
    nullable: true
  })
  creator: User

  @ManyToOne(type => User, {
    nullable: true
  })
  updater: User
}

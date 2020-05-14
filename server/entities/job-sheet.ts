import {
  Entity,
  Index,
  Column,
  CreateDateColumn,
  JoinColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Domain, DomainBaseEntity } from '@things-factory/shell'
import { User } from '@things-factory/auth-base'
import { ArrivalNotice } from '../entities'
import { Bizplace } from '@things-factory/biz-base'

@Entity('job-sheets')
@Index('ix_job-sheet_0', (jobSheet: JobSheet) => [jobSheet.domain, jobSheet.name], { unique: true })
export class JobSheet extends DomainBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => Bizplace)
  bizplace: Bizplace

  @Column('text')
  name: string

  @Column('text', {
    nullable: true
  })
  description: string

  @Column()
  containerMtDate: String

  @Column()
  adviseMtDate: String

  @Column()
  containerSize: String

  @OneToOne(type => ArrivalNotice)
  @JoinColumn()
  arrivalNotice: ArrivalNotice

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

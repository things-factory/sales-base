import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
@Index('ix_job-sheet_0', (jobSheet: JobSheet) => [jobSheet.domain, jobSheet.name], { unique: true })
export class JobSheet {
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

  @Column({
    nullable: true
  })
  containerMtDate: String

  @Column({
    nullable: true
  })
  adviseMtDate: String

  @Column({
    nullable: true
  })
  containerSize: String

  @Column({
    nullable: true
  })
  sumPackQty: number

  @Column({
    nullable: true
  })
  sumPalletQty: number

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

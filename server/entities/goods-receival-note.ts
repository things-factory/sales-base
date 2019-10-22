import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn
} from 'typeorm'
import { ArrivalNotice } from './arrival-notice'

@Entity()
@Index(
  'ix_goods-receival-note_0',
  (goodsReceivalNote: GoodsReceivalNote) => [goodsReceivalNote.domain, goodsReceivalNote.name],
  { unique: true }
)
export class GoodsReceivalNote {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => Bizplace)
  bizplace: Bizplace

  @Column()
  name: string

  @Column()
  refNo: string

  @OneToOne(type => ArrivalNotice)
  @JoinColumn()
  arrivalNotice: ArrivalNotice

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

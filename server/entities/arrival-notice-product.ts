import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Product } from '.'
import { ArrivalNotice } from './arrival-notice'

@Entity()
@Index(
  'ix_arrival-notice-product_0',
  (arrivalNoticeProduct: ArrivalNoticeProduct) => [arrivalNoticeProduct.domain, arrivalNoticeProduct.name],
  { unique: true }
)
@Index(
  'ix_arrival-notice-product_1',
  (arrivalNoticeProduct: ArrivalNoticeProduct) => [arrivalNoticeProduct.arrivalNotice, arrivalNoticeProduct.batchId],
  { unique: true }
)
@Index(
  'ix_arrival-notice-product_2',
  (arrivalNoticeProduct: ArrivalNoticeProduct) => [arrivalNoticeProduct.arrivalNotice, arrivalNoticeProduct.seq],
  { unique: true }
)
export class ArrivalNoticeProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain, {
    nullable: false
  })
  domain: Domain

  @Column()
  name: string

  @Column({
    nullable: true
  })
  description: string

  @ManyToOne(type => ArrivalNotice, {
    nullable: false
  })
  arrivalNotice: ArrivalNotice

  @ManyToOne(type => Product, {
    nullable: false
  })
  product: Product

  @Column()
  seq: number

  @Column()
  batchId: string

  @Column()
  packingType: string

  @Column()
  unit: string

  @Column('float')
  weight: number

  @Column('float')
  packQty: number

  @Column({
    nullable: true
  })
  palletQty: number

  @Column('float')
  totalWeight: number

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

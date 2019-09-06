import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { ArrivalNoticeVas } from '.'
import { ArrivalNoticeProduct } from './arrival-notice-product'
import { CollectionOrder } from './collection-order'
import { DeliveryOrder } from './delivery-order'

@Entity()
@Index('ix_arrival-notice_0', (arrivalNotice: ArrivalNotice) => [arrivalNotice.domain, arrivalNotice.name], {
  unique: true
})
export class ArrivalNotice {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain, {
    nullable: false
  })
  domain: Domain

  @ManyToOne(type => Bizplace, {
    nullable: false
  })
  bizplace: Bizplace

  @Column()
  name: string

  @Column({
    nullable: true
  })
  containerNo: string

  @Column()
  ownTransport: boolean

  @OneToMany(type => ArrivalNoticeProduct, arrivalNoticeProduct => arrivalNoticeProduct.arrivalNotice)
  arrivalNoticeProducts: ArrivalNoticeProduct[]

  @OneToMany(type => ArrivalNoticeVas, arrivalNoticeVas => arrivalNoticeVas.arrivalNotice)
  arrivalNoticeVass: ArrivalNoticeVas[]

  @Column({
    nullable: true
  })
  eta: Date

  @Column({
    nullable: true
  })
  pickingDateTime: Date

  @Column({
    nullable: true
  })
  from: string

  @Column({
    nullable: true
  })
  truckNo: string

  @Column({
    nullable: true
  })
  loadType: string

  @Column()
  status: string

  @OneToOne(type => CollectionOrder)
  @JoinColumn()
  collectionOrder: CollectionOrder

  @Column()
  deliveryOrderNo: string

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

import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn
} from 'typeorm'
import { CollectionOrder } from './collection-order'
import { DeliveryOrder } from './delivery-order'
import { Bizplace } from '@things-factory/biz-base'
import { ArrivalNoticeProduct } from './arrival-notice-product'
import { ArrivalNoticeVas } from '.'

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
  truckNo: string

  @Column()
  status: string

  @OneToOne(type => CollectionOrder)
  @JoinColumn()
  collectionOrder: CollectionOrder

  @OneToOne(type => DeliveryOrder)
  @JoinColumn()
  deliveryOrder: DeliveryOrder

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

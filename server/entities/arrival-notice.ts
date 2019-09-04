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
  JoinColumn
} from 'typeorm'
import { CollectionOrder } from './collection-order'
import { DeliveryOrder } from './delivery-order'
import { Bizplace } from '@things-factory/biz-base'

@Entity()
@Index('ix_arrival-notice_0', (arrivalNotice: ArrivalNotice) => [arrivalNotice.domain, arrivalNotice.name], {
  unique: true
})
export class ArrivalNotice {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => Bizplace)
  bizplace: Bizplace

  @Column()
  name: string

  @Column({
    nullable: true
  })
  containerNo: string

  @Column()
  transportFlag: boolean

  @Column({
    nullable: true
  })
  eta: Date

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

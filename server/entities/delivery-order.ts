import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { OrderProduct } from './order-product'
import { OrderVas } from './order-vas'
import { TransportVehicle, TransportDriver } from '@things-factory/transport-base'

@Entity()
@Index('ix_delivery-order_0', (deliveryOrder: DeliveryOrder) => [deliveryOrder.domain, deliveryOrder.name], {
  unique: true
})
export class DeliveryOrder {
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
  from: string

  @Column({
    nullable: true
  })
  to: string

  @Column({
    nullable: true
  })
  truckNo: string

  @ManyToOne(type => TransportVehicle)
  transportVehicle: TransportVehicle

  @ManyToOne(type => TransportDriver)
  transportDriver: TransportDriver

  @Column({
    nullable: true
  })
  deliveryDate: string

  @Column({
    nullable: true
  })
  deliveryDateTime: Date

  @Column('float', {
    nullable: true
  })
  loadWeight: Number

  @Column({
    nullable: true
  })
  cargoType: string

  @Column({
    nullable: true
  })
  otherCargo: string

  @Column({
    nullable: true
  })
  urgency: Boolean

  @Column({
    nullable: true
  })
  telNo: string

  @Column({
    nullable: true
  })
  refNo: string

  @Column({
    nullable: true
  })
  remark: string

  @Column()
  status: string

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

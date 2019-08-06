import { User } from '@things-factory/auth-base'
import { Customer } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import { TransportOrder } from '@things-factory/transport-base'
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

@Entity()
@Index('ix_delivery-order_0', (deliveryOrder: DeliveryOrder) => [deliveryOrder.domain, deliveryOrder.name], {
  unique: true
})
export class DeliveryOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column()
  name: string

  @Column()
  type: string

  @Column('date')
  issuedOn: Date

  @OneToOne(type => TransportOrder)
  @JoinColumn()
  transportOrder: TransportOrder

  @ManyToOne(type => Customer)
  customer: Customer

  @Column()
  state: string

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

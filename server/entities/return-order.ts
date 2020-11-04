import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import {
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Entity,
  Index,
  Column,
  OneToMany,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { OrderInventory, OrderVas, JobSheet } from '../entities'

@Entity()
@Index('ix_return-order_0', (returnOrder: ReturnOrder) => [returnOrder.domain, returnOrder.name], { unique: true })
export class ReturnOrder {
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
  description: string

  @Column()
  ownTransport: boolean

  @OneToMany(type => OrderInventory, orderInventory => orderInventory.returnOrder)
  orderInventories: OrderInventory[]

  @OneToMany(type => OrderVas, orderVas => orderVas.returnOrder)
  orderVass: OrderVas[]

  @Column({
    nullable: true
  })
  eta: Date

  @Column({
    nullable: true
  })
  refNo: string

  @Column({
    nullable: true
  })
  etaDate: string

  @Column({
    nullable: true
  })
  truckNo: string

  @Column({
    nullable: true
  })
  deliveryOrderNo: string

  @OneToOne(type => JobSheet)
  @JoinColumn()
  jobSheet: JobSheet

  @Column()
  status: string

  @Column({
    nullable: true
  })
  remark: string

  @ManyToOne(type => User, {
    nullable: true
  })
  acceptedBy: User

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

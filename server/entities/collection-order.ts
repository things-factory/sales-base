import { User } from '@things-factory/auth-base'
import { Customer } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable
} from 'typeorm'
import { Product } from './product'

@Entity('collection-orders')
@Index('ix_collection-order_0', (collectionOrder: CollectionOrder) => [collectionOrder.domain, collectionOrder.name], {
  unique: true
})
export class CollectionOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column()
  name: string

  @Column()
  from: string

  @Column({
    comment: 'collection time'
  })
  time: string

  @Column({
    comment: 'FCL or LCL'
  })
  loadType: string

  @ManyToMany(type => Product, product => product.collectionOrders)
  products: Product[]

  @Column({
    comment: 'collection date'
  })
  date: string

  @Column()
  status: string

  @Column('date')
  issuedOn: Date

  @ManyToOne(type => Customer)
  customer: Customer

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

import { User } from '@things-factory/auth-base'
import { Customer } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import { Product } from './product'
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

  @OneToMany(type => Product, product => product.collection)
  productList: Product[]

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

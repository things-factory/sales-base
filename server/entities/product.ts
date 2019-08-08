import {
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Index,
  Column,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Domain } from '@things-factory/shell'
import { User } from '@things-factory/auth-base'
import { ProductOption } from './product-option'
import { Bizplace } from '@things-factory/biz-base'
import { ProductBatch } from './product-batch'
import { CollectionOrder } from './collection-order'

@Entity('products')
@Index('ix_product_0', (product: Product) => [product.domain, product.name], { unique: true })
export class Product {
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
  yourName: string

  @ManyToOne(type => Product, product => product.aliases)
  refTo: Product

  @ManyToOne(type => CollectionOrder, collectionOrder => collectionOrder.productList)
  collection: CollectionOrder

  @Column()
  collectionId: string

  @OneToMany(type => Product, product => product.refTo)
  aliases: Product[]

  @OneToMany(type => ProductOption, productOption => productOption.product)
  options: ProductOption[]

  @OneToMany(type => ProductBatch, productBatch => productBatch.product)
  batches: ProductBatch

  @Column()
  type: string

  @Column('float', {
    nullable: true
  })
  weight: string

  @Column({
    nullable: true
  })
  unit: string

  @Column({
    nullable: true
  })
  description: string

  @ManyToOne(type => User, {
    nullable: true
  })
  creator: User

  @ManyToOne(type => User, {
    nullable: true
  })
  updater: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

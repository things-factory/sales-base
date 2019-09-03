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
import { ProductBatch } from './product-batch'
import { ProductOption } from './product-option'

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

  @OneToMany(type => ProductOption, productOption => productOption.product)
  options: ProductOption[]

  @OneToMany(type => ProductBatch, productBatch => productBatch.product)
  batches: ProductBatch[]

  @Column()
  type: string

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

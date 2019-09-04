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
@Index('ix_product_0', (product: Product) => [product.domain, product.bizplace, product.name], { unique: true })
export class Product {
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
  description: string

  @OneToMany(type => ProductOption, productOption => productOption.product)
  productOptions: ProductOption[]

  @OneToMany(type => ProductBatch, productBatch => productBatch.product)
  productBatches: ProductBatch[]

  @Column()
  type: string

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

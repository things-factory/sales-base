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
import { Product } from './product'
import { ProductOptionDetail } from './product-option-detail'

@Entity('product-options')
@Index('ix_product-option_0', (productOption: ProductOption) => [productOption.domain, productOption.name], {
  unique: true
})
export class ProductOption {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column()
  name: string

  @Column({
    nullable: true
  })
  description: string

  @ManyToOne(type => Product)
  product: Product

  @OneToMany(type => ProductOptionDetail, productOptionDetail => productOptionDetail.productOption)
  details: ProductOptionDetail[]

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

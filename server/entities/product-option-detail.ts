import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ProductOption } from './product-option'

@Entity()
@Index(
  'ix_product-option-detail_0',
  (productOptionDetail: ProductOptionDetail) => [
    productOptionDetail.domain,
    productOptionDetail.productOption,
    productOptionDetail.name
  ],
  { unique: true }
)
export class ProductOptionDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain, {
    nullable: false
  })
  domain: Domain

  @ManyToOne(type => ProductOption, productOption => productOption.productOptionDetails, {
    nullable: false
  })
  productOption: ProductOption

  @Column()
  name: string

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

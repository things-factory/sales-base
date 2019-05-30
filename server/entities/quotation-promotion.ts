import { Domain, DomainBaseEntity } from '@things-factory/shell'
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('quotation-promotions')
@Index(
  'ix_quotation-promotion_0',
  (quotationPromotion: QuotationPromotion) => [quotationPromotion.domain, quotationPromotion.name],
  { unique: true }
)
export class QuotationPromotion extends DomainBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column('text')
  name: string

  @Column('datetime')
  startAt: Date

  @Column('datetime')
  endAt: Date

  @Column('text', {
    nullable: true
  })
  description: string
}

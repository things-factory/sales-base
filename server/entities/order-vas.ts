import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ArrivalNotice } from './arrival-notice'
import { CollectionOrder } from './collection-order'
import { Vas } from './vas'

@Entity('arrival_notice_vass')
@Index('ix_order-vas_0', (orderVas: OrderVas) => [orderVas.domain, orderVas.name], {
  unique: true
})
@Index('ix_order-vas_1', (orderVas: OrderVas) => [orderVas.vas, orderVas.batchId], {
  unique: true
})
export class OrderVas {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain, {
    nullable: false
  })
  domain: Domain

  @Column()
  name: string

  @Column()
  batchId: string

  @ManyToOne(type => ArrivalNotice)
  arrivalNotice: ArrivalNotice

  @ManyToOne(type => CollectionOrder)
  collectionOrder: CollectionOrder

  @ManyToOne(type => Vas, {
    nullable: false
  })
  vas: Vas

  @Column()
  remark: string

  @Column({
    nullable: true
  })
  description: string

  @Column()
  status: string

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

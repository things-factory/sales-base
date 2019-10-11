import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('vass')
@Index('ix_vas_0', (vas: Vas) => [vas.domain, vas.name], { unique: true })
export class Vas {
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

  @Column()
  currency: string

  @Column('float')
  defaultPrice: number

  @Column({
    nullable: true
  })
  operationGuideType: string

  @Column({
    nullable: true
  })
  operationGuide: string

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

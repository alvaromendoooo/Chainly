import { Connector } from "src/connectors/connectors.entity";
import { Workflow } from "src/workflows/workflows.entity";
import { JoinColumn } from "typeorm";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToOne  } from "typeorm";

@Entity()
export class Node {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamptz' })
    createdAt: Date;

    @Column({ type: 'timestamptz' })
    updatedAt: Date;

    @Column("simple-json")
    settings: { config: Array; provider_name: string }

    @ManyToMany(() => Workflow)
    workflows: Workflow[];

    @OneToOne(() => Connector)
    @JoinColumn()
    connector: Connector;

}
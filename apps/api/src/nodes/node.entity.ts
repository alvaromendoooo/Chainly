import { NodeExecution } from "src/executions/executions.entity";
import { Provider } from "src/providers/providers.entity";
import { Workflow } from "src/workflows/workflows.entity";
import { JoinColumn } from "typeorm";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany  } from "typeorm";

@Entity('node')
export class Node {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamptz' })
    createdAt: Date;

    @Column({ type: 'timestamptz' })
    updatedAt: Date;

    @Column()
    type: string;

    @Column({ type: "simple-json" })
    settings: Record<string, unknown>;

    @ManyToOne(() => Workflow, (workflow) => workflow.nodes)
    workflow: Workflow;

    @OneToOne(() => Provider)
    @JoinColumn()
    provider: Provider;

    @OneToMany(() => NodeExecution, (nodeExecution) => nodeExecution.nodeId)
    nodeExecutions: NodeExecution[];

}
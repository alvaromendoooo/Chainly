import { Node } from "src/nodes/node.entity";
import { Workflow } from "src/workflows/workflows.entity";
import { OneToMany } from "typeorm";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne  } from "typeorm";

export enum ExecutionStatus {
    PENDING = "pending",
    RUNNING = "running",
    SUCCESS = "success",
    FAILED = "failed",
    RETRYING = "retrying",
    CANCELLED = "cancelled"
}

@Entity('execution')
export class Execution {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "enum", enum: ExecutionStatus, default: ExecutionStatus.PENDING })
    state: ExecutionStatus;

    @Column({ type: 'timestamptz' })
    startedAt: Date;

    @Column({ type: 'timestamptz', nullable: true })
    finishedAt: Date | null;

    @ManyToOne(() => Workflow, (Workflow) => Workflow.executions)
    workflow: Workflow;

    @OneToMany(() => NodeExecution, (nodeExecution) => nodeExecution.executionId)
    nodeExecutions: NodeExecution[];
}

@Entity('node_execution')
export class NodeExecution {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Execution, (execution) => execution.nodeExecutions)
    executionId: Execution;

    @ManyToOne(() => Node, (node) => node.nodeExecutions)
    nodeId: Node;

    @Column({ type: "enum", enum: ExecutionStatus })
    status: ExecutionStatus;

    @Column({ type: 'timestamptz' })
    startedAt: Date;

    @Column({ type: 'timestamptz', nullable: true })
    finishedAt: Date;

    @Column({ type: "simple-json" })
    input: Record<string, unknown>;

    @Column({ type: "simple-json" })
    output: Record<string, unknown>;

    @Column({ type: "simple-json" })
    error: Record<string, unknown>;
}
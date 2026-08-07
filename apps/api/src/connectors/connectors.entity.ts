import { Node } from "src/nodes/node.entity";
import { OneToMany } from "typeorm";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany  } from "typeorm";

export enum ConnectionState {
    CONNECTED = "connected",
    EXPIRED = "expired",
    ERROR = "error",
    REVOKED = "revoked"
} 

@Entity()
export class Connector {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "enum", enum: ConnectionState, default: ConnectionState.CONNECTED })
    state: ConnectionState;

    @Column()
    totalUse: number;

    @Column()
    currentUse: number;

    @OneToMany(() => Node, (node) => node.connector)
    nodes: Node[];
}
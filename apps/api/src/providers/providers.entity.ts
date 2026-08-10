import { Node } from "src/nodes/node.entity";
import { User, UserConnection } from "src/users/users.entity";
import { Generated } from "typeorm";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany  } from "typeorm";

export enum ProviderConnectionState {
    CONNECTED = "connected",
    EXPIRED = "expired",
    ERROR = "error",
    REVOKED = "revoked"
} 

@Entity()
export class Provider {
    @PrimaryGeneratedColumn()
    id: number;

    @Generated("uuid")
    @Column()
    publicId: string;

    @Column({ type: "enum", enum: ProviderConnectionState, default: ProviderConnectionState.CONNECTED })
    state: ProviderConnectionState;

    @Column()
    totalUse: number;

    @Column()
    currentUse: number;

    @OneToMany(() => Node, (node) => node.provider)
    nodes: Node[];

    @OneToMany(() => UserConnection, (connection) => connection.providerId)
    userConnections: UserConnection[];
}
import { Provider } from "src/providers/providers.entity";
import { EncryptionTransformerConfig } from "src/utils/encryption.config";
import { Workflow } from "src/workflows/workflows.entity";
import { Entity, Column, PrimaryGeneratedColumn, Generated, OneToMany, ManyToOne  } from "typeorm";
import { EncryptionTransformer } from "typeorm-encrypted";

export enum UserConnectionState {
    ACTIVE = 'active',
    EXPIRED = 'expried',
    REVOKED = 'revoked',
    ERROR = 'error'
}

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    publicId: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string;

    @OneToMany(() => Workflow, (workflow) => workflow.user)
    workflows: Workflow[];

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamptz'})
    lastLoginAt: Date;

    @OneToMany(() => UserConnection, (connection) => connection.userId)
    userConnections: UserConnection[];
}

@Entity('user_connection')
export class UserConnection {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.userConnections)
    userId: User;

    @ManyToOne(() => Provider, (provider) => provider.userConnections)
    providerId: Provider;

    @Column()
    name: string

    @Column("simple-json", { transformer: new EncryptionTransformer(EncryptionTransformerConfig)} )
    credentials: Record<string, unknown>;

    @Column({ type: "enum", enum: UserConnectionState })
    state: UserConnectionState;

    @Column({ type: 'timestamptz' })
    createdAt: Date;

    @Column({ type: 'timestamptz' })
    updatedAt: Date;
}
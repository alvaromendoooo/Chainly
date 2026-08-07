import { EncryptionTransformerConfig } from "src/utils/encryption.config";
import { Workflow } from "src/workflows/workflows.entity";
import { Entity, Column, PrimaryGeneratedColumn, Generated, OneToMany  } from "typeorm";
import { EncryptionTransformer } from "typeorm-encrypted";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    publicId: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column({ nullable: false, transformer: new EncryptionTransformer(EncryptionTransformerConfig)})
    password: string;

    @Column({ transformer: new EncryptionTransformer(EncryptionTransformerConfig)})
    accessToken: string;

    @OneToMany(() => Workflow, (workflow) => workflow.user)
    workflows: Workflow[];

    @Column({ type: 'timestamptz'})
    signedUp: Date;

    @Column({ type: 'timestamptz'})
    signedIn: Date;
}
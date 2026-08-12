import { Execution } from "src/executions/executions.entity";
import { Node } from "src/nodes/node.entity";
import { UserEntity } from "src/users/infrastructure/users.entity";
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    Generated, 
    ManyToOne, 
    JoinTable,
    OneToMany  
} from "typeorm";

@Entity('workflow')
export class Workflow {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    publicId: string;


    @Column({ type: 'timestamptz' })
    createdAt: Date;

    @Column({ type: 'timestamptz' })
    updatedAt: Date;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(()=> UserEntity, (user) => user.workflows)
    user: UserEntity; 

    @OneToMany(() => Node, (node) => node.workflow)
    @JoinTable()
    nodes: Node[];

    @OneToMany(() => Execution, (execution) => execution.workflow)
    executions: Execution[];
    
}
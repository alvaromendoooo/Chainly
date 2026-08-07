import { Node } from "src/nodes/node.entity";
import { User } from "src/users/users.entity";
import { Entity, Column, PrimaryGeneratedColumn, Generated, ManyToOne, ManyToMany, JoinTable  } from "typeorm";

@Entity()
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

    @ManyToOne(()=> User, (user) => user.workflows)
    user: User; 

    @ManyToMany(() => Node)
    @JoinTable()
    nodes: Node[];
    
}
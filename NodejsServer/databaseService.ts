// source
// http://typeorm.io/#/
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';


@Entity()
export class Article extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    abstract: string;

    @Column()
    text: string;

    @Column()
    vote: number;

}




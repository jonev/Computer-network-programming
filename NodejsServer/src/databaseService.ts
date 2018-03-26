// source
// http://typeorm.io/#/
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';


@Entity()
export class Article extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    made: Date;

    @Column()
    title: string;

    @Column()
    abstract: string;

    @Column()
    text: string;

    @Column()
    vote: number;

    @OneToMany(type => ArticleComment, comment => comment.article)
    comments: ArticleComment[];

    @ManyToMany(type => Category, category => category.articles)
    @JoinTable()
    categories: Category[];
}

@Entity()
export class ArticleComment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    made: Date;

    @Column()
    text: string;

    @ManyToOne(type => Article, article => article.comments)
    article: Article;
}

@Entity()
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToMany(type => Article, article => article.categories)
    articles: Article[];
}



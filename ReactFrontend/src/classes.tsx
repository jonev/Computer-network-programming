export class Article {
    id: number;
    made: Date;
    title: string;
    abstract: string;
    text: string;
    vote: number;
    comments: ArticleComment[];
    categories: Category[];
}

export class ArticleComment{
    id: number;
    made: Date;
    text: string;
    article: Article;
}

export class Category {
    id: number;
    text: string;
    articles: Article[];
}
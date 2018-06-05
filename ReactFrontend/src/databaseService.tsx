import { Article, ArticleComment, Category } from './classes';

export class DatabaseService {
    getArticle(id: number): Promise<Article> {
        return fetch("/articles/" + id).then(r => r.json());
    };

    getArticles(): Promise<Article[]> {
        return fetch("/articles").then(r => r.json());
    };

    getPopularArticles(): Promise<Article[]> {
        return fetch("/articles/popularity").then(r => r.json());
    }

    getPopularArticlesCategory(category: Category): Promise<Article[]> {
        return fetch("/articles/popularity/" + category.id).then(r => r.json());
    }

    addArticle(article: Article): void{
        fetch("/articles", {
            method: 'POST',
            body: JSON.stringify(article),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
    };

    updateArticle(article: Article): void {
        fetch("/articles/"+article.id, {
            method: 'POST',
            body: JSON.stringify(article),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
    };

    vote(id: number, votechange: number): void {
        fetch("/articles/" + id + "/" + votechange, {
            method: 'PUT'
        });
    }

    getComments(id: number): Promise<ArticleComment> {
        return fetch("/comment/" + id).then(r => r.json());
    };

    addComment(comment: ArticleComment): void {
        fetch("/comment/" + comment.article.id, {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
    };

    getCategories(): Promise<Category[]> {
        return fetch("/categories").then(r => r.json());
    };

    addCategory(category: Category): void {
        fetch("/categories",{
            method: 'POST',
            body: JSON.stringify(category),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
    }
}
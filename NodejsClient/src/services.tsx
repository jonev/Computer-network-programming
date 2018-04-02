// @flow

export class Article {
  id: number;
  title: string;
  abstract: string;
  text: string;
}

class ArticleService {
  getArticles(): Promise<Article[]> {
    return fetch('/articles').then(response => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    });
  }

  getArticle(id: number): Promise<Article> {
    return fetch('/articles/' + id).then(response => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    });
  }

  addArticle(title: string, abstract: string, text: string): Promise<number> {
    let body = JSON.stringify({title: title, abstract: abstract, text: text});
    return fetch('/articles', {method: 'POST', headers: new Headers({'Content-Type': 'application/json'}), body: body}).then(response => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    });
  }
}
export let articleService = new ArticleService();

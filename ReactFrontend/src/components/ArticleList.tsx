import * as React from "react";
import { Article, ArticleComment, Category } from '../classes';
import { DatabaseService } from "../databaseService";
import { ArticlePost } from "./ArticlePost";



export class ArticleList extends React.Component<{ articles: Article[] }, { articles: Article[] }> {
    constructor(props: any) {
        super(props);
        this.state = {
            articles: this.props.articles
        };
    }
    
    render() {
        if (!this.state.articles) return null;
        this.state = {
            articles: this.props.articles
        }
        return (
            <div className="articleList">
                {this.state.articles.map((object, i) => <ArticlePost id={object.id} inputArticle={object} key={i} />)}
            </ div>
        );
    }
    
}

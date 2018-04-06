import * as React from "react";
import { Article, ArticleComment, Category } from '../classes';
import { ArticlePost } from "./ArticlePost";
import { DatabaseService } from "../databaseService";
import { ArticleList } from "./ArticleList";


export class ArticleForm extends React.Component<{}, { title: string, abstract: string, text: string, categories: Category[], newCategory: string}> {
    constructor(props: any) {
        super(props);
        this.state = {
            title: 'Title',
            abstract: 'Summary',
            text: 'Write your article here',
            categories: [],
            newCategory: ""
        };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeAbstract = this.handleChangeAbstract.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleSubmitCategory = this.handleSubmitCategory.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeTitle(event: any): void {
        this.setState({ title: event.target.value });
    }

    handleChangeAbstract(event: any): void {
        this.setState({ abstract: event.target.value });
    }

    handleChangeText(event: any): void {
        this.setState({ text: event.target.value });
    }

    handleChangeCategory(event: any): void {
        this.setState({ newCategory: event.target.value });
    }

    handleSubmitCategory(event: any): void {
        let c = new Category;
        c.text = this.state.newCategory;
        this.setState({
            categories: this.state.categories.concat([c])
        })
        this.setState({ newCategory: "" })
        event.preventDefault();
    }

    handleSubmit(event: any): void {
        let article = new Article();
        article.title = this.state.title;
        article.abstract = this.state.abstract;
        article.text = this.state.text;
        article.categories = this.state.categories.filter(a => a.text==="Category");
        new DatabaseService().addArticle(article)
        event.preventDefault();
    }

    render() {
        return (
            <div className="articleForm">
                <form onSubmit={this.handleSubmit}>
                    <div className="articleFormPart">
                        <label>
                            Title:
                            <input type="text" value={this.state.title} onChange={this.handleChangeTitle} />
                        </label>
                    </div>
                    <div className="articleFormPart">
                        <label>
                            Abstract:
                            <input type="text" value={this.state.abstract} onChange={this.handleChangeAbstract} />
                        </label>
                    </div>
                    <div className="articleFormPart">
                        <label>
                            Text:
                            <textarea value={this.state.text} onChange={this.handleChangeText} />
                        </label>
                    </div>
                    {this.state.categories.map((category, i) => (
                        <div className="articleFormPart" key={i}>
                            <label>
                                Category #{i+1}:{category.text}
                            </label>
                        </div>
                    ))}
                    <div className="articleFormPart">
                        <label>
                            New Category:
                            <input type="text" value={this.state.newCategory} onChange={this.handleChangeCategory} />
                            <button onClick={this.handleSubmitCategory} >+</button>
                        </label>
                    </div>
                    <div className="articleFormPart">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        );
    }

}

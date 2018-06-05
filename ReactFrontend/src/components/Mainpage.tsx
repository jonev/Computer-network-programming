import * as React from "react";
import { Article, ArticleComment, Category } from '../classes';
import { ArticlePost } from "./ArticlePost";
import { DatabaseService } from "../databaseService";
import { ArticleList } from "./ArticleList";
import { ArticleForm } from "./ArticleForm";


export class Mainpage extends React.Component<{}, { articles: Article[] , category: Category, availableCategories: Category[]}> {
    constructor(props: any) {
        super(props);
        let cat = new Category();
        cat.id = 0;
        this.state = {
            articles: [],
            category: cat,
            availableCategories: []
        }
        this.postArticle = this.postArticle.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.db = new DatabaseService();
    }
    db: DatabaseService;
    render() {
        return(
            <div className="mainBody">
                <h1 className="title">Newspage</h1>
                <select onChange={this.handleChangeCategory}>
                    {this.state.availableCategories.map((object, i) => < option value={object.text} id={"" + object.id} >{object.text}</option>)}
                </select>
                <ArticleList articles={this.state.articles}/>
                <ArticleForm postArticle={this.postArticle} />
            </div>
        );
    }

    handleChangeCategory(event: any): void {
        let cat: Category = new Category();
        cat.text = event.target.value;
        cat.id = parseInt(event.target.options[event.target.options.selectedIndex].id);
        this.setState({ category: cat })
        setTimeout(() => {
            this.update();
        }, 0);
    }

    postArticle(article: Article): void {
        this.setState(prevstate => ({
            articles: [...prevstate.articles, article]
        }))
        this.update();
    }

    update() {
        let cat: Category = new Category();
        cat.id = 0;
        cat.text = "All";
        this.db.getCategories().then(r => this.setState({ availableCategories: [cat, ...r] }))
        console.log(this.state.category.id);
        if (this.state.category.id === 0) {
            this.db.getPopularArticles().then(r => this.setState({ articles: r }));
        } else {
            this.db.getPopularArticlesCategory(this.state.category).then(r => this.setState({ articles: r }))
        }
    }
    componentDidMount() {
        this.update();
    }

    componentWillReceiveProps() {
        setTimeout(() => {
            this.update();
        }, 0);
    }
}

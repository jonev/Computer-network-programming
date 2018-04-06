import * as React from "react";
import { Article, ArticleComment, Category } from '../classes';
import { ArticlePost } from "./ArticlePost";
import { DatabaseService } from "../databaseService";
import { ArticleList } from "./ArticleList";


export class ArticleForm extends React.Component<{
    postArticle: (article: Article) => void
}, {
    title: string,
    abstract: string,
    text: string,
    categories: Category[],
    availableCategories: Category[]
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            title: 'Title',
            abstract: 'Summary',
            text: 'Write your article here',
            categories: [],
            availableCategories: []
        };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeAbstract = this.handleChangeAbstract.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
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
        let category = new Category();
        category.id = event.target.id;
        category.text = event.target.value;
        if (event.target.checked) {
            this.setState({ categories: [...this.state.categories, category] })
        } else {
            this.setState({ categories: this.state.categories.filter(a => a.text !== category.text) })
        }
    }

    handleSubmit(event: any): void {
        let article = new Article();
        article.title = this.state.title;
        article.abstract = this.state.abstract;
        article.text = this.state.text;
        article.categories = this.state.categories.filter(a => a.text !== "Category");
        new DatabaseService().addArticle(article)
        this.setState({
            title: "",
            abstract: "",
            text: "",
            categories: []
        })
        this.props.postArticle(article);
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
                    <div className="articleFormPart">
                        {this.state.availableCategories.map((object, i) =>
                            <div key={i}>
                                {object.text} < input type="checkbox" value={object.text} id={""+object.id} onChange={this.handleChangeCategory} />
                            </div>
                        )}
                    </div>
                    <div className="articleFormPart">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        );
    }

    update() {
        new DatabaseService().getCategories().then(r => this.setState({ availableCategories: r }));

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

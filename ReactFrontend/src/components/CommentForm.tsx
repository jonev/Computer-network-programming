import * as React from "react";
import { Article, ArticleComment, Category } from '../classes';
import { ArticlePost } from "./ArticlePost";
import { DatabaseService } from "../databaseService";
import { ArticleList } from "./ArticleList";


export class CommentForm extends React.Component<{ article: Article, postComment: (comment:ArticleComment) => void }, { text: string }> {
    constructor(props: any) {
        super(props);
        this.state = {
            text: 'Write your comment here'
        };
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeText(event: any): void {
        this.setState({ text: event.target.value });
    }

    handleSubmit(event: any): void {
        let comment: ArticleComment = new ArticleComment();
        comment.article = this.props.article;
        comment.text = this.state.text;
        new DatabaseService().addComment(comment)
        this.props.postComment(comment);
        this.setState({ text: "" });
        event.preventDefault();
    }

    render() {
        return (
            <div className="commentForm">
                <form onSubmit={this.handleSubmit}>
                    <div className="commentFormPart">
                        <label>
                            Text:
                            <textarea value={this.state.text} onChange={this.handleChangeText} />
                        </label>
                    </div>
                    <div className="commentFormPart">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        );
    }
}

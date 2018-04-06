import * as React from "react";
import { Article, ArticleComment, Category } from '../classes';
import { DatabaseService } from "../databaseService";
import { prependListener } from "cluster";
import { CommentForm } from "./CommentForm";


export class ArticlePost extends React.Component<{ id: number , inputArticle?: Article}, { article: Article, showingBody: boolean, showingComments: boolean, vote: number}> {
    constructor(props: { id: number }) {
        super(props);
        if (this.props.inputArticle) {
            this.state = { article: this.props.inputArticle, showingBody: false, showingComments: false, vote: 0};
        } else {
            this.state = { article: new Article(), showingBody: false, showingComments: false, vote: 0};
        }
        this.expand = this.expand.bind(this);
        this.showComments = this.showComments.bind(this);
        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
        this.postComment = this.postComment.bind(this);
        this.db = new DatabaseService();
    }
    db: DatabaseService;
    
    render() {
        if (!this.state.article) return null
        return (
            <div className="article" id="article{this.state.article.id}">
                <div className="votation">
                    <i className={((this.state.vote > 0) ? "arrow up upvote" : "arrow up")} onClick={this.upvote}></i>
                    <div className="articleVoteNumber">{this.state.article.vote}</div>
                    <i className={((this.state.vote < 0) ? "arrow down downvote" : "arrow down")} onClick={this.downvote}></i>
                </div>
                <img className="articleTextPostImage" src="src/textPost.PNG"></img>
                <div className="articleMain">
                    <h2 className="articleTitle">{this.state.article.title}</h2>
                    <h5 className="articleAbstract">{this.state.article.abstract}</h5>
                </div>
                <button onClick={this.expand} className="expandButton">{((this.state.showingBody) ? "Une" : "E") + "xpand"}</button>
                <button onClick={this.showComments} className="commentsButton">{((this.state.showingComments) ? "Hide" : "Show") + " comments"}</button>
                {(this.state.showingBody) ? (
                    <div className="articleBody">
                        {this.state.article.text}
                    </div>
                ) : ""}
                {(this.state.showingComments && this.state.article.comments) ? (
                    <div className="articleComments">
                        {this.state.article.comments.map((comment, i) => <div className="comment" key={i}>{comment.text}</div>)}
                        <CommentForm article={this.state.article} postComment={this.postComment}/>
                    </div>
                ) : ""}
                <div className="articleTags">
                    {(this.state.article.categories) ? this.state.article.categories.map((category, i) => <span key={i}> #{category.text+"\t"} </span>):""}
                </div>
            </ div>
        );
    }

    expand(): void {
        this.setState(prevState => ({
            showingBody: !prevState.showingBody
        }));
    }

    showComments(): void {
        this.setState(prevState => ({
            showingComments: !prevState.showingComments
        }))
    }

    upvote() {
        this.vote(true);
    }

    downvote() {
        this.vote(false);
    }

    vote(up: boolean): void {
        let voteChange = this.state.vote;
        if (up) {
            if (voteChange > 0) {
                voteChange = -1;
            } else {
                voteChange = 1 - voteChange;
            }
        } else {
            if (voteChange < 0) {
                voteChange = 1;
            } else {
                voteChange = -1 - voteChange;
            }
        }
        this.setState(prevstate => ({
            vote: prevstate.vote + voteChange
        }));
        let art = this.state.article;
        art.vote += voteChange;
        this.setState({ article: art })
        this.db.vote(this.state.article.id, voteChange);
    }

    postComment(comment: ArticleComment): void {
        let art = this.state.article;
        art.comments.push(comment);
        this.setState({ article: art })
    }

    update() {
        new DatabaseService().getArticle(this.props.id).then(r => this.setState({ article: r }));

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

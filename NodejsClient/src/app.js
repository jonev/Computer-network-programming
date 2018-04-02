"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// @flow
var React = require("react");
var react_dom_1 = require("react-dom");
var react_router_dom_1 = require("react-router-dom");
var createHashHistory_1 = require("history/createHashHistory");
var history = createHashHistory_1.default();
var services_1 = require("./services");
var widgets_1 = require("./widgets");
var signals_1 = require("signals");
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Home.prototype.render = function () {
        return React.createElement(widgets_1.Card, { title: "Example App" }, "Demonstration of React with Flow and server communication");
    };
    return Home;
}(React.Component));
var ArticleDetails = /** @class */ (function (_super) {
    __extends(ArticleDetails, _super);
    function ArticleDetails() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { article: null };
        return _this;
    }
    ArticleDetails.prototype.render = function () {
        if (!this.state.article)
            return null;
        return (React.createElement(widgets_1.Card, { title: 'Article: ' + this.state.article.title },
            React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement("strong", null, this.state.article.abstract)),
                React.createElement("div", null, this.state.article.text))));
    };
    // Helper function to update component
    ArticleDetails.prototype.update = function () {
        var _this = this;
        services_1.articleService
            .getArticle(this.props.match.params.id)
            .then(function (article) {
            _this.setState({ article: article });
        })
            .catch(function (error) {
            widgets_1.Alert.danger('Error getting article ' + _this.props.match.params.id + ': ' + error.message);
        });
    };
    ArticleDetails.prototype.componentDidMount = function () {
        this.update();
    };
    // Called when the this.props-object change while the component is mounted
    // For instance, when navigating from path /articles/1 to /articles/2
    ArticleDetails.prototype.componentWillReceiveProps = function () {
        var _this = this;
        setTimeout(function () {
            _this.update();
        }, 0); // Enqueue this.update() after props has changed
    };
    return ArticleDetails;
}(React.Component));
var NewArticle = /** @class */ (function (_super) {
    __extends(NewArticle, _super);
    function NewArticle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onAdd = new signals_1.default();
        return _this;
    }
    NewArticle.prototype.render = function () {
        var _this = this;
        return (React.createElement(widgets_1.Card, { title: "New Article" },
            React.createElement(widgets_1.Form, { ref: function (e) { return (_this.form = e); }, submitLabel: "Add Article", groups: [
                    { label: 'Title', input: React.createElement("input", { ref: function (e) { return (_this.title = e); }, type: "text", required: true }) },
                    { label: 'Abstract', input: React.createElement("textarea", { ref: function (e) { return (_this.abstract = e); }, rows: "2", required: true }) },
                    { label: 'Text', input: React.createElement("textarea", { ref: function (e) { return (_this.text = e); }, rows: "3", required: true }) },
                    { checkInputs: [{ label: 'I have read, understand and accept the terms and ...', input: React.createElement("input", { type: "checkbox", required: true }) }] }
                ] })));
    };
    NewArticle.prototype.componentDidMount = function () {
        var _this = this;
        if (this.form) {
            this.form.onSubmit.add(function () {
                if (!_this.title || !_this.abstract || !_this.text)
                    return;
                services_1.articleService
                    .addArticle(_this.title.value, _this.abstract.value, _this.text.value)
                    .then(function (id) {
                    if (_this.form)
                        _this.form.reset();
                    _this.onAdd.dispatch();
                    history.push('/articles/' + id);
                })
                    .catch(function (error) {
                    widgets_1.Alert.danger('Error adding article: ' + error.message);
                });
            });
        }
    };
    return NewArticle;
}(React.Component));
var Articles = /** @class */ (function (_super) {
    __extends(Articles, _super);
    function Articles() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Articles.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(widgets_1.Card, { title: "Articles" },
                React.createElement(widgets_1.Table, { ref: function (e) { return (_this.table = e); }, header: ['Title', 'Abstract'] })),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/articles/:id", component: ArticleDetails }),
            React.createElement(NewArticle, { ref: function (e) { return (_this.newArticle = e); } })));
    };
    // Helper function to update component
    Articles.prototype.update = function () {
        var _this = this;
        services_1.articleService
            .getArticles()
            .then(function (articles) {
            if (_this.table)
                _this.table.setRows(articles.map(function (article) { return ({ id: article.id, cells: [article.title, article.abstract] }); }));
        })
            .catch(function (error) {
            widgets_1.Alert.danger('Error getting articles: ' + error.message);
        });
    };
    Articles.prototype.componentDidMount = function () {
        var _this = this;
        if (this.table) {
            this.table.onRowClick.add(function (rowId) {
                history.push('/articles/' + rowId);
            });
        }
        if (this.newArticle) {
            this.newArticle.onAdd.add(function () {
                _this.update();
            });
        }
        this.update();
    };
    return Articles;
}(React.Component));
var root = document.getElementById('root');
if (root) {
    react_dom_1.default.render(React.createElement(react_router_dom_1.HashRouter, null,
        React.createElement("div", null,
            React.createElement(widgets_1.Alert, null),
            React.createElement(widgets_1.NavigationBar, { brand: "React Example", links: [{ to: '/articles', text: 'Articles' }] }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: Home }),
            React.createElement(react_router_dom_1.Route, { path: "/articles", component: Articles }))), root);
}
//# sourceMappingURL=app.js.map
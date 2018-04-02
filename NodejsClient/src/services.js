"use strict";
// @flow
Object.defineProperty(exports, "__esModule", { value: true });
var Article = /** @class */ (function () {
    function Article() {
    }
    return Article;
}());
exports.Article = Article;
var ArticleService = /** @class */ (function () {
    function ArticleService() {
    }
    ArticleService.prototype.getArticles = function () {
        return fetch('/articles').then(function (response) {
            if (!response.ok)
                throw new Error(response.statusText);
            return response.json();
        });
    };
    ArticleService.prototype.getArticle = function (id) {
        return fetch('/articles/' + id).then(function (response) {
            if (!response.ok)
                throw new Error(response.statusText);
            return response.json();
        });
    };
    ArticleService.prototype.addArticle = function (title, abstract, text) {
        var body = JSON.stringify({ title: title, abstract: abstract, text: text });
        return fetch('/articles', { method: 'POST', headers: new Headers({ 'Content-Type': 'application/json' }), body: body }).then(function (response) {
            if (!response.ok)
                throw new Error(response.statusText);
            return response.json();
        });
    };
    return ArticleService;
}());
exports.articleService = new ArticleService();
//# sourceMappingURL=services.js.map
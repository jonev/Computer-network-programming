"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
console.log('Hello world');
var server = express();
// Serve the React client
server.use(express.static(__dirname + '/../../client'));
// Automatically parse json content
server.use(bodyParser.json());
var Article = /** @class */ (function () {
    function Article(title, abstract, text) {
        this.id = Article.nextId++;
        this.title = title;
        this.abstract = abstract;
        this.text = text;
    }
    Article.nextId = 1;
    return Article;
}());
// The data is currently stored in memory
var articles = [new Article('title1', 'abstract1', 'text1'), new Article('title2', 'abstract2', 'text2'), new Article('title3', 'abstract3', 'text3')];
// Get all articles
server.get('/articles', function (request, response) {
    response.send(articles);
});
// Get an article given its id
server.get('/articles/:id', function (request, response) {
    for (var _i = 0, articles_1 = articles; _i < articles_1.length; _i++) {
        var article = articles_1[_i];
        if (article.id == Number(request.params.id)) {
            response.send(article);
            return;
        }
    }
    // Respond with not found status code
    response.sendStatus(404);
});
// Add new article
server.post('/articles', function (request, response) {
    if (request.body && typeof request.body.title == 'string' && typeof request.body.abstract == 'string' && typeof request.body.text == 'string') {
        articles.push(new Article(request.body.title, request.body.abstract, request.body.text));
        response.send(articles[articles.length - 1].id.toString());
        return;
    }
    // Respond with bad request status code
    response.sendStatus(400);
});
// Start the web server at port 3000
server.listen(3000);
//# sourceMappingURL=app.js.map
import express = require('express');
import bodyParser = require('body-parser');

console.log('Hello world');
let server = express();

// Serve the React client
server.use(express.static(__dirname + '/../../client'));

// Automatically parse json content
server.use(bodyParser.json());

class Article {
    static nextId = 1;
    id: number;
    title: string;
    abstract: string;
    text: string;

    constructor(title: string, abstract: string, text: string) {
        this.id = Article.nextId++;
        this.title = title;
        this.abstract = abstract;
        this.text = text;
    }
}

// The data is currently stored in memory
let articles = [new Article('title1', 'abstract1', 'text1'), new Article('title2', 'abstract2', 'text2'), new Article('title3', 'abstract3', 'text3')];

// Get all articles
server.get('/articles', (request: express.Request, response: express.Response) => {
    response.send(articles);
});

// Get an article given its id
server.get('/articles/:id', (request: express.Request, response: express.Response) => {
    for (let article of articles) {
        if (article.id == Number(request.params.id)) {
            response.send(article);
            return;
        }
    }
    // Respond with not found status code
    response.sendStatus(404);
});

// Add new article
server.post('/articles', (request: express.Request, response: express.Response) => {
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
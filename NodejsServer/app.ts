import express = require('express');
import bodyParser = require('body-parser');
import "reflect-metadata";
import { Article } from './databaseService';
import { createConnection, getConnection } from "typeorm";
import { arch } from 'os';


//import { dbService } from './databaseService';

console.log('Server starting');
let server = express();

// Serve the React client
server.use(express.static(__dirname + '/../../client'));

// Automatically parse json content
server.use(bodyParser.json());

console.log("Creating connection");
createConnection({
    type: "mysql",
    host: "mysql.stud.iie.ntnu.no",
    port: 3306,
    username: "jonev",
    password: "MSLSFNi7",
    database: "jonev",
    entities: [
        Article
    ],
    synchronize: true,
    logging: false
}).then(async connection => {
    console.log("Connection established");
    // here you can start to work with your entities
    //console.log("Trying to make article");
    //const article = new Article();
    //article.title = "Artivle title";
    //article.abstract = "Article abstract";
    //article.text = "Article text";
    //article.vote = 0;
    //await article.save();
    //
    //const articles = await Article.find();
    //console.log(articles);
    //response.send(articles);

}).catch(error => console.log(error));



// The data is currently stored in memory
//let articles = [new Article('title1', 'abstract1', 'text1'), new Article('title2', 'abstract2', 'text2'), new Article('title3', 'abstract3', 'text3')];

// Get all articles
server.get('/articles', async (request: express.Request, response: express.Response) => {
    response.send(await getConnection().getRepository(Article).find());
});

/*
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

console.log("Creating connection");
createConnection({
    type: "mysql",
    host: "mysql.stud.iie.ntnu.no",
    port: 3306,
    username: "jonev",
    password: "MSLSFNi7",
    database: "jonev",
    entities: [
        Article
    ],
    synchronize: true,
    logging: false
}).then(async connection => {
    // here you can start to work with your entities
    console.log("Trying to make article");
    const article = new Article();
    article.title = "Artivle title";
    article.abstract = "Article abstract";
    article.text = "Article text";
    article.vote = 0;
    await article.save();

    const allUsers = await Article.find();
    console.log(allUsers);

}).catch(error => console.log(error));
*/

// Start the web server at port 3000
server.listen(3000);
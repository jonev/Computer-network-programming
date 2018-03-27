// source
// https://github.com/ntnu-tdat2004/react-example
import express = require('express');
import bodyParser = require('body-parser');
import "reflect-metadata";
import { Article, ArticleComment, Category } from './databaseService';
import { createConnection, getConnection } from "typeorm";
import { arch } from 'os';
import { request } from 'https';


console.log('Server starting');
let server = express();

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
        Article,
        ArticleComment,
        Category
    ],
    synchronize: true,
    logging: false
}).then(async connection => {
    console.log("Connection established");
}).catch(error => console.log(error));

server.get('/', async (request: express.Request, response: express.Response) => {
    response.sendFile(__dirname + "/index.html");
    
});

server.get('/index.js', async (request: express.Request, response: express.Response) => {
    response.sendFile(__dirname + "/index.js");
});



// Get all articles - without comments
server.get('/articles', async (request: express.Request, response: express.Response) => {
    response.send(await getConnection().getRepository(Article).find({ relations: ["categories"] }));
});

// Get an article given its id - with comments and categories
server.get('/articles/:id', async (request: express.Request, response: express.Response) => {
    response.send(await getConnection().getRepository(Article).findOneById(request.params.id, { relations: ["comments", "categories"] }));
});

// Add new article
server.post('/articles', async (request: express.Request, response: express.Response) => {
    if (request.body && typeof request.body.title == 'string' && typeof request.body.abstract == 'string' && typeof request.body.text == 'string') {
        let newarticle = new Article();
        newarticle.made = new Date();
        newarticle.title = request.body.title;
        newarticle.abstract = request.body.abstract;
        newarticle.text = request.body.text;
        newarticle.vote = 0;
        newarticle.categories = request.body.categories;
        return response.send(await getConnection().getRepository(Article).save(newarticle));
    }
    // Respond with bad request status code
    response.sendStatus(400);
});

// update article - mostly for categories
server.put('/articles/:id', async (request: express.Request, response: express.Response) => {
    if (request.body && typeof request.body.title == 'string' && typeof request.body.abstract == 'string' && typeof request.body.text == 'string') {
        let updatedarticle = await getConnection().getRepository(Article).findOneById(request.params.id, { relations: ["comments", "categories"] });
        updatedarticle.title = request.body.title;
        updatedarticle.abstract = request.body.abstract;
        updatedarticle.text = request.body.text;
        updatedarticle.categories = request.body.categories;
        return response.send(await getConnection().getRepository(Article).save(updatedarticle));
    }
    // Respond with bad request status code
    response.sendStatus(400);
});

// get all comments for one article
server.get('comment/:id', async (request: express.Request, response: express.Response) => {
    response.send(await getConnection().getRepository(ArticleComment).find({ article: request.params.id }));
});

// post comment on one article
server.post('/comment/:id', async (request: express.Request, response: express.Response) => {
    let newcomment = new ArticleComment();
    newcomment.text = request.body.text;
    newcomment.made = new Date();
    newcomment.article = await getConnection().getRepository(Article).findOneById(request.params.id);
    response.send(await getConnection().getRepository(ArticleComment).save(newcomment));
});

// get all categories
server.get('/categories', async (request: express.Request, response: express.Response) => {
    response.send(await getConnection().getRepository(Category).find());
});

// post category
server.post('/categories', async (request: express.Request, response: express.Response) => {
    let newcategory = new Category();
    newcategory.text = request.body.text;
    response.send(await getConnection().getRepository(Category).save(newcategory));
});

// Start the web server at port 3000
server.listen(3000);
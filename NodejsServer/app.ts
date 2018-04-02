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
    console.log("Connection es  tablished");
}).catch(error => console.log(error));



/*yo, frontenden begynner å ta form nå, men mangler noe greier backend, hadde en av dere giddet å sett på det? Jeg trenger:
PUT: stem på artikkel(opp, ned, tilbake til nøytral)
GET: Mest populære / nye artikler(en kombinasjon av de to, på en eller annen måte)
GET: samme som over, men bare artikler innenfor en gitt kategori*/


// Get all articles - without comments
server.get('/articles', async (request: express.Request, response: express.Response) => {
    response.send(await getConnection().getRepository(Article).find({ relations: ["categories"] }));
});

// Get all articles on popularity - without comments
server.get('/articles/popularity', async (request: express.Request, response: express.Response) => {
    let unsortedArray = await getConnection().getRepository(Article).find({ relations: ["categories", "vote","dato"] });
    var sortedArray: Article[] = unsortedArray.sort((obj1, obj2) => {
        var time1 = Date.now() - +(new Date(obj1.made));
        var time2 = Date.now() - +(new Date(obj1.made));
        if (obj1.vote - time1 * 240 / (1000 * 60 * 60) > obj2.vote - time2 * 240 / (1000 * 60 * 60)) {
            return 1;
        }
        if (obj1.vote - time1 * 240 / (1000 * 60 * 60) < obj2.vote - time2 * 240 / (1000 * 60 * 60)) {
            return -1;
        }
        return 0;
    });
    response.send(sortedArray);
});

// Get all articles on popularity given category - without comments
server.get('/articles/popularity/:id', async (request: express.Request, response: express.Response) => {
    let unsortedArray = await getConnection().getRepository(Category).find({
        relations: ["articles"], where: { id: request.params.id }
    });
    var sortedArray: Article[] = unsortedArray[0].articles.sort((obj1, obj2) => {
        var time1 = Date.now() - +(new Date(obj1.made));
        var time2 = Date.now() - +(new Date(obj1.made));
        if (obj1.vote - time1 * 240 / (1000 * 60 * 60) > obj2.vote - time2 * 240 / (1000 * 60 * 60)) {
            return 1;
        }
        if (obj1.vote - time1 * 240 / (1000 * 60 * 60) < obj2.vote - time2 * 240 / (1000 * 60 * 60)) {
            return -1;
        }
        return 0;
    });
    response.send(sortedArray);
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
// update votes on article
server.put('/articles/:id/:vote', async (request: express.Request, response: express.Response) => {
    if (request.body && typeof request.body.title == 'string' && typeof request.body.abstract == 'string' && typeof request.body.text == 'string') {
        let updatedarticle = await getConnection().getRepository(Article).findOneById(request.params.id, { relations: ["vote"] });
        updatedarticle.vote += request.params.vote;
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
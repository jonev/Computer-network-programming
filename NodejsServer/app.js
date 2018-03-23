"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
require("reflect-metadata");
var databaseService_1 = require("./databaseService");
var typeorm_1 = require("typeorm");
//import { dbService } from './databaseService';
console.log('Server starting');
var server = express();
// Serve the React client
server.use(express.static(__dirname + '/../../client'));
// Automatically parse json content
server.use(bodyParser.json());
console.log("Creating connection");
typeorm_1.createConnection({
    type: "mysql",
    host: "mysql.stud.iie.ntnu.no",
    port: 3306,
    username: "jonev",
    password: "MSLSFNi7",
    database: "jonev",
    entities: [
        databaseService_1.Article
    ],
    synchronize: true,
    logging: false
}).then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("Connection established");
        return [2 /*return*/];
    });
}); }).catch(function (error) { return console.log(error); });
// The data is currently stored in memory
//let articles = [new Article('title1', 'abstract1', 'text1'), new Article('title2', 'abstract2', 'text2'), new Article('title3', 'abstract3', 'text3')];
// Get all articles
server.get('/articles', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = response).send;
                return [4 /*yield*/, typeorm_1.getConnection().getRepository(databaseService_1.Article).find()];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
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
//# sourceMappingURL=app.js.map
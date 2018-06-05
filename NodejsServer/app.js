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
// source
// https://github.com/ntnu-tdat2004/react-example
var express = require("express");
var bodyParser = require("body-parser");
require("reflect-metadata");
var databaseService_1 = require("./databaseService");
var typeorm_1 = require("typeorm");
console.log('Server starting');
var server = express();
server.use(express.static(__dirname + '/../ReactFrontend'));
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
        databaseService_1.Article,
        databaseService_1.ArticleComment,
        databaseService_1.Category
    ],
    synchronize: true,
    logging: false
}).then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("Connection established");
        return [2 /*return*/];
    });
}); }).catch(function (error) { return console.log(error); });
var popularsort = function (obj1, obj2) {
    var time1 = Date.now() - +(new Date(obj1.made));
    var time2 = Date.now() - +(new Date(obj2.made));
    var score1 = obj1.vote - time1 * 1 / (1000 * 60 * 60);
    var score2 = obj2.vote - time2 * 1 / (1000 * 60 * 60);
    return score2 - score1;
};
// Get all articles - without comments
server.get('/articles', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = response).send;
                return [4 /*yield*/, typeorm_1.getConnection().getRepository(databaseService_1.Article).find({ relations: ["categories"] })];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
// Get all articles on popularity - without comments
server.get('/articles/popularity', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var unsortedArray, sortedArray;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getConnection().getRepository(databaseService_1.Article).find({ relations: ["categories"] })];
            case 1:
                unsortedArray = _a.sent();
                sortedArray = unsortedArray.sort(popularsort);
                response.send(sortedArray);
                return [2 /*return*/];
        }
    });
}); });
// Get all articles on popularity given category - without comments
server.get('/articles/popularity/:id', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var unsortedArray, sortedArray;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getConnection().getRepository(databaseService_1.Category).find({
                    relations: ["articles"], where: { id: request.params.id }
                })];
            case 1:
                unsortedArray = _a.sent();
                sortedArray = unsortedArray[0].articles.sort(popularsort);
                response.send(sortedArray);
                return [2 /*return*/];
        }
    });
}); });
// Get an article given its id - with comments and categories
server.get('/articles/:id', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = response).send;
                return [4 /*yield*/, typeorm_1.getConnection().getRepository(databaseService_1.Article).findOneById(request.params.id, { relations: ["comments", "categories"] })];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
// Add new article
server.post('/articles', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var newarticle, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!(request.body && typeof request.body.title == 'string' && typeof request.body.abstract == 'string' && typeof request.body.text == 'string')) return [3 /*break*/, 2];
                newarticle = new databaseService_1.Article();
                newarticle.made = new Date();
                newarticle.title = request.body.title;
                newarticle.abstract = request.body.abstract;
                newarticle.text = request.body.text;
                newarticle.vote = 0;
                newarticle.categories = request.body.categories;
                _b = (_a = response).send;
                return [4 /*yield*/, typeorm_1.getConnection().getRepository(databaseService_1.Article).save(newarticle)];
            case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            case 2:
                // Respond with bad request status code
                response.sendStatus(400);
                return [2 /*return*/];
        }
    });
}); });
// update article - mostly for categories
server.put('/articles/:id', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var updatedarticle, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!(request.body && typeof request.body.title == 'string' && typeof request.body.abstract == 'string' && typeof request.body.text == 'string')) return [3 /*break*/, 3];
                return [4 /*yield*/, typeorm_1.getConnection().getRepository(databaseService_1.Article).findOneById(request.params.id, { relations: ["comments", "categories"] })];
            case 1:
                updatedarticle = _c.sent();
                updatedarticle.title = request.body.title;
                updatedarticle.abstract = request.body.abstract;
                updatedarticle.text = request.body.text;
                updatedarticle.categories = request.body.categories;
                _b = (_a = response).send;
                return [4 /*yield*/, typeorm_1.getConnection().getRepository(databaseService_1.Article).save(updatedarticle)];
            case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            case 3:
                // Respond with bad request status code
                response.sendStatus(400);
                return [2 /*return*/];
        }
    });
}); });
// update votes on article
server.put('/articles/:id/:vote', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var updatedarticle, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, typeorm_1.getConnection().getRepository(databaseService_1.Article).findOneById(request.params.id)];
            case 1:
                updatedarticle = _c.sent();
                updatedarticle.vote += parseInt(request.params.vote);
                _b = (_a = response).send;
                return [4 /*yield*/, typeorm_1.getConnection().getRepository(databaseService_1.Article).save(updatedarticle)];
            case 2:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
// get all comments for one article
server.get('comment/:id', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = response).send;
                return [4 /*yield*/, typeorm_1.getConnection().getRepository(databaseService_1.ArticleComment).find({ article: request.params.id })];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
// post comment on one article
server.post('/comment/:id', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var newcomment, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                newcomment = new databaseService_1.ArticleComment();
                newcomment.text = request.body.text;
                newcomment.made = new Date();
                _a = newcomment;
                return [4 /*yield*/, typeorm_1.getConnection().getRepository(databaseService_1.Article).findOneById(request.params.id)];
            case 1:
                _a.article = _d.sent();
                _c = (_b = response).send;
                return [4 /*yield*/, typeorm_1.getConnection().getRepository(databaseService_1.ArticleComment).save(newcomment)];
            case 2:
                _c.apply(_b, [_d.sent()]);
                return [2 /*return*/];
        }
    });
}); });
// get all categories
server.get('/categories', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = response).send;
                return [4 /*yield*/, typeorm_1.getConnection().getRepository(databaseService_1.Category).find()];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
// post category
server.post('/categories', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var newcategory, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                newcategory = new databaseService_1.Category();
                newcategory.text = request.body.text;
                _b = (_a = response).send;
                return [4 /*yield*/, typeorm_1.getConnection().getRepository(databaseService_1.Category).save(newcategory)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
// Start the web server at port 3000
server.listen(3000);
//# sourceMappingURL=app.js.map
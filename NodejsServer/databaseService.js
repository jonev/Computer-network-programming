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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// source
// http://typeorm.io/#/
var typeorm_1 = require("typeorm");
var Article = /** @class */ (function (_super) {
    __extends(Article, _super);
    function Article() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Article.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Article.prototype, "made", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Article.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Article.prototype, "abstract", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Article.prototype, "text", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Article.prototype, "vote", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return ArticleComment; }, function (comment) { return comment.article; }),
        __metadata("design:type", Array)
    ], Article.prototype, "comments", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return Category; }, function (category) { return category.articles; }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Article.prototype, "categories", void 0);
    Article = __decorate([
        typeorm_1.Entity()
    ], Article);
    return Article;
}(typeorm_1.BaseEntity));
exports.Article = Article;
var ArticleComment = /** @class */ (function (_super) {
    __extends(ArticleComment, _super);
    function ArticleComment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], ArticleComment.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], ArticleComment.prototype, "made", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], ArticleComment.prototype, "text", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Article; }, function (article) { return article.comments; }),
        __metadata("design:type", Article)
    ], ArticleComment.prototype, "article", void 0);
    ArticleComment = __decorate([
        typeorm_1.Entity()
    ], ArticleComment);
    return ArticleComment;
}(typeorm_1.BaseEntity));
exports.ArticleComment = ArticleComment;
var Category = /** @class */ (function (_super) {
    __extends(Category, _super);
    function Category() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Category.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Category.prototype, "text", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return Article; }, function (article) { return article.categories; }),
        __metadata("design:type", Array)
    ], Category.prototype, "articles", void 0);
    Category = __decorate([
        typeorm_1.Entity()
    ], Category);
    return Category;
}(typeorm_1.BaseEntity));
exports.Category = Category;
//# sourceMappingURL=databaseService.js.map
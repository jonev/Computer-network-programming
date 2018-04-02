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
var react_router_dom_1 = require("react-router-dom");
var signals_1 = require("signals");
/**
 * Renders alert messages using Bootstrap classes. Only one instance of this component is supported.
 */
var Alert = /** @class */ (function (_super) {
    __extends(Alert, _super);
    function Alert() {
        var _this = _super.call(this) || this;
        _this.state = { alerts: [] };
        Alert._instance = _this;
        return _this;
    }
    Alert.prototype.render = function () {
        var _this = this;
        return this.state.alerts.map(function (alert, i) { return (React.createElement("div", { key: i, className: 'alert alert-' + alert.type, role: "alert" },
            alert.text,
            React.createElement("button", { className: "close", onClick: function () {
                    _this.state.alerts.splice(i, 1);
                    _this.setState({ alerts: _this.state.alerts });
                } }, "\u00D7"))); });
    };
    Alert.prototype.componentWillUnmount = function () {
        Alert._instance = null;
    };
    Alert.success = function (text) {
        var instance = Alert._instance;
        if (instance) {
            instance.state.alerts.push({ text: text, type: 'success' });
            instance.setState({ alerts: instance.state.alerts });
        }
    };
    Alert.info = function (text) {
        var instance = Alert._instance;
        if (instance) {
            instance.state.alerts.push({ text: text, type: 'info' });
            instance.setState({ alerts: instance.state.alerts });
        }
    };
    Alert.warning = function (text) {
        var instance = Alert._instance;
        if (instance) {
            instance.state.alerts.push({ text: text, type: 'warning' });
            instance.setState({ alerts: instance.state.alerts });
        }
    };
    Alert.danger = function (text) {
        var instance = Alert._instance;
        if (instance) {
            instance.state.alerts.push({ text: text, type: 'danger' });
            instance.setState({ alerts: instance.state.alerts });
        }
    };
    return Alert;
}(React.Component));
exports.Alert = Alert;
/**
 * Renders a navigation bar using Bootstrap classes
 */
var NavigationBar = /** @class */ (function (_super) {
    __extends(NavigationBar, _super);
    function NavigationBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavigationBar.prototype.render = function () {
        return (React.createElement("nav", { className: "navbar navbar-expand-sm bg-light navbar-light" },
            this.props.brand ? (React.createElement(react_router_dom_1.NavLink, { className: "navbar-brand", activeClassName: "active", to: "/" }, this.props.brand)) : null,
            React.createElement("ul", { className: "navbar-nav" }, this.props.links.map(function (link, i) { return (React.createElement("li", { key: i },
                React.createElement(react_router_dom_1.NavLink, { className: "nav-link", activeClassName: "active", exact: link.exact, to: link.to }, link.text))); }))));
    };
    return NavigationBar;
}(React.Component));
exports.NavigationBar = NavigationBar;
/**
 * Renders an information card using Bootstrap classes
 */
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Card.prototype.render = function () {
        return (React.createElement("div", { className: "card" },
            React.createElement("div", { className: "card-body" },
                React.createElement("h5", { className: "card-title" }, this.props.title),
                React.createElement("div", { className: "card-text" }, this.props.children))));
    };
    return Card;
}(React.Component));
exports.Card = Card;
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { rows: [] };
        _this.onRowClick = new signals_1.default();
        return _this;
    }
    Table.prototype.setRows = function (rows) {
        this.setState({ rows: rows });
    };
    Table.prototype.render = function () {
        var _this = this;
        return (React.createElement("table", { className: "table table-hover" },
            this.props.header ? (React.createElement("thead", null,
                React.createElement("tr", null, this.props.header.map(function (title, i) { return React.createElement("th", { key: i }, title); })))) : null,
            React.createElement("tbody", null, this.state.rows.map(function (row) { return (React.createElement("tr", { key: row.id, onClick: function () {
                    if (_this.onRowClick)
                        _this.onRowClick.dispatch(row.id);
                } }, row.cells.map(function (cell, i) { return React.createElement("td", { key: i }, cell); }))); }))));
    };
    return Table;
}(React.Component));
exports.Table = Table;
/**
 * Renders a form using Bootstrap classes.
 */
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { form_key: 0 };
        _this.onSubmit = new signals_1.default();
        _this.onCancel = new signals_1.default();
        _this.updateSubmitButton = function () {
            if (_this.submitButton)
                _this.submitButton.disabled = _this._form && _this._form.checkValidity() ? false : true;
        };
        return _this;
    }
    Form.prototype.render = function () {
        var _this = this;
        return (React.createElement("form", { key: this.state.form_key, ref: function (e) { return (_this._form = e); } },
            this.props.groups.map(function (group, i) {
                var checkInputElements;
                if (group.checkInputs) {
                    checkInputElements = group.checkInputs.map(function (checkInput, i) { return (React.createElement("div", { key: i, className: "form-check col-sm-10" },
                        React.cloneElement(checkInput.input, {
                            className: 'form-check-input',
                            onChange: _this.updateSubmitButton
                        }),
                        React.createElement("label", { className: "form-check-label" }, checkInput.label))); });
                }
                return (React.createElement("div", { key: i, className: "form-group row" },
                    group.label ? React.createElement("label", { className: "col-form-label col-sm-2" }, group.label) : null,
                    group.input ? (React.createElement("div", { className: "col-sm-10" },
                        React.cloneElement(group.input, {
                            className: 'form-control',
                            onChange: _this.updateSubmitButton
                        }),
                        checkInputElements)) : (checkInputElements)));
            }),
            React.createElement("button", { type: "submit", ref: function (e) { return (_this.submitButton = e); }, className: "btn btn-primary", onClick: function (e) {
                    e.preventDefault();
                    _this.onSubmit.dispatch();
                } }, this.props.submitLabel),
            this.props.cancelLabel ? (React.createElement("button", { className: "btn btn-secondary", onClick: function (e) {
                    e.preventDefault();
                    _this.onCancel.dispatch();
                } }, this.props.cancelLabel)) : null));
    };
    Form.prototype.componentDidMount = function () {
        this.updateSubmitButton();
    };
    Form.prototype.reset = function () {
        this.setState({ form_key: ++this.state.form_key }); // Reset this._form
        this.componentDidMount();
    };
    return Form;
}(React.Component));
exports.Form = Form;
//# sourceMappingURL=widgets.js.map
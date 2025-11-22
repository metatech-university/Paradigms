"use strict";
var Serializable = /** @class */ (function () {
    function Serializable() {
    }
    Serializable.prototype.toJson = function () {
        return JSON.stringify(this);
    };
    return Serializable;
}());
var User = /** @class */ (function () {
    function User(id, name) {
        this.id = id;
        this.name = name;
        this.toJson = new Serializable().toJson.bind(this);
    }
    return User;
}());
var user = new User(15, "Marcus");
console.log(user.toString());
console.log(user.toJson());

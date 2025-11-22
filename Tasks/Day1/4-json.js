'use strict';
class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    toJson() {
        return JSON.stringify(this);
    }
}
const user = new User(15, 'Marcus');
console.log(user.toString());
console.log(user.toJson());

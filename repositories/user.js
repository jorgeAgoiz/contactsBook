const users = [];

module.exports = class User {
    constructor(name, password){
        this.name;
        this.password;
    }

    save() {
        users.push(this);
    }

    fetchAllUsers() {
        console.log(users);
    }
}

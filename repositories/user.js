const users = [];

const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');
// GLOBAL METHODS TO REUSE

const p = path.join(
        path.dirname(process.mainModule.filename),
        'data', 
        'users.json'
    );

module.exports = class User {
    constructor(name, password){
        this.name = name;
        this.password = password;
    }

    save() {
        const probando = this;
        console.log(probando);
        fs.writeFileSync(p, JSON.stringify(probando));

    }

    fetchAllUsers() {
        fs.readFileSync(p);
    }
};

/* Construyendo nuestro modelo usuario, he conseguido que se guarde en modelo JSON en el archivo deseado */
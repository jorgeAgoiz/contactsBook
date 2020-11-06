//Packages
const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
//To convert this callback function in a promise function with util.promisify
const scrypt = util.promisify(crypto.scrypt);


class UsersRepository {//Users repository structure
    constructor(filename) {
        if (!filename) {//If filename doesnt exists throw an error.
            throw new Error('Create a repository requires a filename.');
        }
        this.filename = filename;//Set the filename in the constructor
        try{//Try to access into the filename
            fs.accessSync(this.filename);
        } catch (err) {//If the file with this name doesnt exists create a new file with ->
            fs.writeFileSync(this.filename, '[]');// -> this.filename name
        } 
    }

    async getAll() {//To get all registers
        //Open the file called this.filename, read file, parse file and return
        return JSON.parse(await fs.promises.readFile(this.filename, {
            encoding: 'utf8'
        }));   
    }

    async getOne( userInput ){//To comprobe if an user exists in our JSON file
        const allUsers = await this.getAll();
        return allUsers.find( user => user.inputUser === userInput );//This method read all file searching the value that we pass it.
    }

    async create(inputUser, password1) { //To create a new register
        let allUsers = await this.getAll();//First call to all data inside the JSON file
        const id = this.randomId();//Generate a random Id to each user
        //To encrypt the password
        const salt = await crypto.randomBytes(8).toString('hex');
        const buf = await scrypt(password1, salt, 64);
        //Construct the objetc that will be store
        const userReg = { 
            id,
            inputUser, 
            password1: `${buf.toString('hex')}.${salt}`
        };

        allUsers.push(userReg);//Later push the new register with all data
        await this.writeAll(allUsers);//Call the writeAll method to rewrite from beginning all data.
        return userReg;//Return the new user
    }

    async writeAll(repoUser) {//To rewrite all JSON file, the argument is the new data.
        return await fs.promises.writeFile(
            this.filename, 
            JSON.stringify(repoUser, null, 2)//This is to structure the data inside the JSON file
            );
    }

    randomId() {//Generate a random ID with crypto.randomBytes method of node.
        const id = crypto.randomBytes(4).toString('hex');
        return id;
    }


};

// Create an instance of usersRepository
const repo = new UsersRepository('./data/repoUsers.json');
//Exports the instance
module.exports = repo;


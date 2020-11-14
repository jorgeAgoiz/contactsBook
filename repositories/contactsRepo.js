//Packages
const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
//To convert this callback function in a promise function with util.promisify
const scrypt = util.promisify(crypto.scrypt);

class contactsRepository {
    constructor(filename) {
        if (!filename) { //If filename doesnt exists throw an error.
            throw new Error('Create a repository requires a filename.');
        }
        this.filename = filename; //Set the filename in the constructor
        try { //Try to access into the filename
            fs.accessSync(this.filename);
        } catch (err) { //If the file with this name doesnt exists create a new file with ->
            fs.writeFileSync(this.filename, '[]'); // -> this.filename name
        }
    };

    async getAll() { //To get all registers WORK PERFECT
        //Open the file called this.filename, read file, parse file and return
        return JSON.parse(await fs.promises.readFile(this.filename, {
            encoding: 'utf8'
        }));
    };

    async getOneBy() {
        const records = await this.getAll();

        for (let record of records) {// Iterate in users
            let found = true;

            for (let key in filters) {//Iterate in keys of user
                if(record[key] !== filters[key]){
                    found = false;
                }
            }

            if(found){
                return record;
            }
        }
    }

    async save(userFrom, name, lastName, birthday, phoneNumber, email) {//Work perfect
        let allContacts = await this.getAll();
        let id = this.randomId();

        const contactReg = {
            userFrom,
            id,
            name,
            lastName,
            birthday,
            phoneNumber,
            email 
        };

        allContacts.push(contactReg);
        await this.writeAll(allContacts);
        return contactReg;
    }

    async deleteOne(id) {
        let records = await this.getAll();

        const recordDel = records.find( record => record.id === id );

        let indexContact = records.indexOf(recordDel);
        console.log(indexContact);
        //records.splice(indexContact, 1);

    }

    editOne() {

    }

    async writeAll(repoContact) { //To rewrite all JSON file, the argument is the new data.
        return await fs.promises.writeFile(
            this.filename,
            JSON.stringify(repoContact, null, 2) //This is to structure the data inside the JSON file
        );
    }

    randomId() {//Generate a random ID with crypto.randomBytes method of node.
        const id = crypto.randomBytes(6).toString('hex');
        return id;
    }
};


const contactRepo = new contactsRepository('./data/repoContacts.json');
module.exports = contactRepo;

// Repositorio sin terminar probar varios metodos y finiquitar el repo, una vez terminado tocara introducir mongoose 
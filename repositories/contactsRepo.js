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

    async getContactsFrom(usersFrom) {// WORK PERFECT */
        const records = await this.getAll();
        const contactsFrom = [];

        for (let record of records) {// Iterate in contacts
            if ( record.userFrom === usersFrom) {
                contactsFrom.push(record);//If this contact is from our specify user
            };
        }
        return contactsFrom;//Return the new array with the specify contacts from each user
    }

    async save(userFrom, name, lastName, birthday, phoneNumber, email) {//WORK PERFECT
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


    async modify(id, userFrom, name, lastName, birthday, phoneNumber, email){
        let allContacts = await this.getAll();
        const existingContact = allContacts.findIndex( contact => contact.id === id);
        const editedContact = { 
            userFrom, 
            id, 
            name, 
            lastName, 
            birthday, 
            phoneNumber, 
            email 
        };

        allContacts[existingContact] = editedContact;
        await this.writeAll(allContacts);
        return editedContact;
    };


    async deleteOne(id) {//****************** WORK PERFECT */
        let records = await this.getAll();

        const recordDelIndex = records.findIndex( record => record.id === id );
        console.log(recordDelIndex);
        const contactDeleted = records.splice(recordDelIndex, 1);
        console.log(contactDeleted);

        await this.writeAll(records);
        return contactDeleted;

    }

    async findOne(id) {
        let records = await this.getAll();
        const contactResult = records.find( cont => cont.id === id );

        return contactResult;
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
// Solo falta ajustar el editContact y lo tendriamos listo a falta de adecentarlo visualmente

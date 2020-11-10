//Packages
const fs = require('fs');

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

    async getAll() { //To get all registers
        //Open the file called this.filename, read file, parse file and return
        return JSON.parse(await fs.promises.readFile(this.filename, {
            encoding: 'utf8'
        }));
    };

    getOneBy() {

    }

    save(name, lastName, birthday, phoneNumber, email) {

    }

    deleteOne() {

    }

    editOne() {

    }

    async writeAll(repoContact) { //To rewrite all JSON file, the argument is the new data.
        return await fs.promises.writeFile(
            this.filename,
            JSON.stringify(repoContact, null, 2) //This is to structure the data inside the JSON file
        );
    }
};


const contactRepo = new contactsRepository('./data/contacts.json');
module.exports = contactRepo;
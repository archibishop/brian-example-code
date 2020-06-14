const fs = require('fs');
const { Details, createDatabase } = require('./sequelize');
const { readFolder  } = require('./readDir');
const { readFile } = require('./readFile');

async function saveBookDetailsData() {
    try {
        let myArgs = process.argv.slice(2);
        let folderPath = myArgs[0];
        let items = await readFolder(fs, folderPath);
        for (var i=0; i<items.length; i++) {
            let path = folderPath + '/' + items[i] + "/";
            let fileName = "pg" + items[i] + ".rdf";
            try{
                let result = await readFile(fs, path, fileName);
                Details.create(result).then(data => console.log("Data saved.", data));
            } catch (err) {
                return err;
            }
        }
    } catch(err) {
        console.log("Please provide valid path");
        return err;
    }
}

function runApp() {
    if (process.argv.length < 3) {
        console.log("Please Provide Path To Folder");
        return;
    }
    createDatabase(saveBookDetailsData);
}

runApp();



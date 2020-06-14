const cluster = require('cluster');
const os = require('os');
const fs = require('fs');
const { Details, createDatabase } = require('./sequelize');
const { readFolder  } = require('./readDir');
const { readFile } = require('./readFile');
const { splitWork } = require('./splitWork');

async function runApp() {
    if (process.argv.length < 3) {
        console.log("Please Provide Path To Folder");
        return;
    }

    let myArgs = process.argv.slice(2);
    let folderPath = myArgs[0];

    if (cluster.isMaster) {
        console.log(`Master ${process.pid} is running`);
        createDatabase();

        // Fork workers.
        for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
        if (code != 0 && !worker.exitedAfterDisconnect) {
            console.log(`Worker ${worker.id} crashed. Starting new worker .......`);
            cluster.fork();
        }
        });
        cluster.on('online', (worker) => {
        console.log(`worker ${worker.process.pid} is online`);
        });

        try {
            let items = await readFolder(fs, folderPath);
            splitWork(items);
        } catch(err) {
            console.log("Please provide valid path");
            return err;
        }
    } else {
        process.on('message', async function(msg) {
            const items = msg['work'];
            for (var i=0; i<items.length; i++) {
                let path = folderPath + '/' + items[i] + "/";
                let fileName = "pg" + items[i] + ".rdf";
                try{
                    let result = await readFile(fs, path, fileName);
                    Details.create(result).then(data => console.log("Data saved."));
                } catch (err) {
                    return err;
                }
            }
        });
    }
}

runApp();

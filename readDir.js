
function readFolder(fs, path){
    return new Promise((resolve, reject) => {
        fs.readdir(path, function(err, items) {
            if (err) {
                reject("no such file or directory");
            }
            resolve(items)
        }); 
    });
}

module.exports = {
    readFolder
}
const os = require('os');
const cluster = require('cluster');


function splitData(arr, n){
    const rest = arr.length % n;
    let restUsed = rest;
    const partLength = Math.floor(arr.length / n);
    const result = [];

    for (let i = 0; i < arr.length; i += partLength) {
        let end = partLength + i,
            add = false;

        if (rest !== 0 && restUsed) {
            end++;
            restUsed--;
            add = true;
        }
        result.push(arr.slice(i, end));

        if (add) {
            i++;
        }
    }

    return result;
};

function splitWork(data) {
    if (data.length > 0) {
        const arr = splitData(data, os.cpus().length);
        for (const id in cluster.workers) {
            arr[id - 1] && arr[id - 1].length > 0 && cluster.workers[id].send({ work: arr[id - 1]});
        }
    } else {
        console.log('not checks to process at the moment');
    }
}


module.exports = {
    splitWork
}

const { parseFile } = require('./parseFile');

function readFile(fs, folderPath, fileName){
    return new Promise((resolve, reject) => {
        fs.readFile(folderPath + fileName , async function(err, data) {
            if (err) {
                reject("no such file or directory");
            }
            try {
                let result = await parseFile(data);
                let { 'rdf:RDF': { 'pgterms:ebook': [ { 
                                    'dcterms:title': title, 
                                    '$': id, 
                                    'dcterms:rights': license_rights, 
                                    'dcterms:publisher': publisher, 
                                    'dcterms:issued': publication_date, 
                                    'dcterms:language': language, 
                                    'dcterms:creator': authors, 
                                    'dcterms:subject': description 
                                } ]} } = result;
                let res = {
                    id: id ? id['rdf:about'] : '',
                    title: title ? title[0]: '',
                    authors: authors ? authors[0]['pgterms:agent'][0]['pgterms:name'][0] : '',
                    publisher: publisher ? publisher[0]: '',
                    publication_date: publication_date ? publication_date[0]['_']: '',
                    language: language ? language[0]['rdf:Description'][0]['rdf:value'][0]['_']: '',
                    subjects: description ? description.map(ele => ele['rdf:Description'][0]['rdf:value'][0]) : [],
                    license_rights: license_rights ? license_rights[0]: '',
                };
                resolve(res);
            } catch {
                reject(err);
            }
            });
        });
}

module.exports = {
    readFile
}
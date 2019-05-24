const http = require('http');
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid');

const downloadPage = (url='http://nodeprogram.com') => {
    console.log('Downloading:', url);

    const fetchPage = (url, callback) => {      
        //store the HTML
        http.get(url, (response) => {
            let buff = '';
            response.on('data', (chunk) => {
                buff += chunk;
            });
            response.on('end', () => {
                callback(null, buff);
            });
        }).on('error', (error) => {
            console.error('Got error: ', error.message)
            callback(error);
        });
    };

    fetchPage(url, (error, data) => {
        if (error) return console.log(error);

        if (data)
        {
            const folderName = uuidv1();
            const urlFilePath = path.join(__dirname, folderName, 'url.txt');
            const dataFilePath = path.join(__dirname, folderName, 'file.html');
            fs.mkdirSync(folderName);
            fs.writeFileSync(urlFilePath, url);
            fs.writeFileSync(urlFilePath, url);
            fs.writeFileSync(dataFilePath, url);
            return console.log('Downloaded to:', folderName);
        }
    });
}

downloadPage(process.argv[2]);
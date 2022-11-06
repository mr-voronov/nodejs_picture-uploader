const path = require('path');
const fs = require('fs');

// database config and models
const db = require('../db');
const Images = db.images;


const sendResources = (url, contentType, res) => {
    const file = path.join(__dirname, '..', 'static', url);
    console.log(`file: ${file}`);

    fs.readFile(file, (err, data) => {
        if (err) {
            res.writeHead('404');
            res.write('File is not found');
            res.end();

            console.log(`Error 404; File "${file}" is not found`)
        } else {
            res.writeHead('200', {'Content-Type': contentType});
            res.write(data);
            res.end();

            console.log(`Response: 200; File "${file}"`);
        }
    });
}

const getContentType = (url) => {
    switch ( path.extname(url) ) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.json':
            return 'application/json';
        default:
            return 'application/octate-stream';
    }
}

const saveUploadedFile = (req, res) => {
    const filename = path.basename(req.url);
    const file = path.join(__dirname, '..', 'uploads', filename);
    const imagesFolder = path.join(__dirname, '..', 'static', 'images', filename);

    console.log(`file: ${file}`);
    console.log(`imagesFolder: ${imagesFolder}`);

    req.pipe( fs.createWriteStream(file) );
    req.on('end', () => {
        fs.copyFile(file, imagesFolder, err => {
            if (err) console.error(err);

            fs.unlink(file, err => {
                console.error(err);
            });
        });

        res.writeHead(200, {'Content-Type': 'text'});
        res.write(filename);
        res.end();
    });
}

const writeToDB = (data, res) => {
    data = JSON.parse(data, true);
    console.log(data);

    Images.create({
        image_name: data['imagename'],
        file_name: data['filename'],
        user_name: data['username']
    })
        .then(result => {
            console.log(result);
            res.end('DB has been updated');
        })
        .catch(error => {
            console.error(error);
            res.end('Error during DB update');
        });
}

module.exports = {sendResources, getContentType, saveUploadedFile, writeToDB};
// default imports
const http = require('http');
const path = require('path');

// custom imports
const { sendResources, getContentType, saveUploadedFile, writeToDB } = require('./routes');


// setting server
http.createServer( (req, res) => {
    console.log(`req.url: ${req.url}`);

    if (req.url === '/') {
        sendResources('index.html', 'text/html', res);
    } else if (/\/uploads\/[^\/]+$/.test(req.url) && req.method === 'POST') {
        saveUploadedFile(req, res);
    } else if (req.url === '/save-form') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log(body);
            writeToDB(body, res);
        });
    } else {
        sendResources(req.url, getContentType(req.url), res);
    }
    
}).listen(3000, () => {
    console.log('Server started at port: 3000');
});
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const readable = fs.createReadStream(filePath, { encoding: 'utf-8' });

readable.on('error', (err) => {
    console.error(`Error reading file: ${err.message}`);
});

readable.pipe(process.stdout);
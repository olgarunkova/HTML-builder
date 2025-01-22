const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const writable = fs.createWriteStream(filePath, { flags: 'a' });

console.log('Please type some text or type "exit" to quit:');

process.stdin.on('data', (data) => {
    const input = data.toString().trim();
    if (input.toLowerCase() === 'exit') {
        console.log('Goodbye!');
        process.exit();
    }

    writable.write(`${input}\n`, (err) => {
        if (err) {
            console.error('Error writing to file:', err.message);
        } else {
            console.log('Text written to file! You can enter more text or type "exit" to quit.');
        }
    });
});

process.on('SIGINT', () => {
    console.log('\nGoodbye!');
    process.exit();
});

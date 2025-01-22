const fs = require('fs');
const path = require('path');

function copyDir() {
    const srcDir = path.join(__dirname, 'files');
    const destDir = path.join(__dirname, 'files-copy');

    fs.rm(destDir, { recursive: true, force: true }, (err) => {
        if (err) {
            return console.error('Error removing files-copy folder:', err.message);
        }

        fs.mkdir(destDir, { recursive: true }, (err) => {
            if (err) {
                return console.error('Error creating files-copy folder:', err.message);
            }

            fs.readdir(srcDir, { withFileTypes: true }, (err, items) => {
                if (err) {
                    return console.error('Error reading files folder:', err.message);
                }

                items.forEach((item) => {
                    const srcPath = path.join(srcDir, item.name);
                    const destPath = path.join(destDir, item.name);

                    if (item.isFile()) {
                        // Copy files
                        fs.copyFile(srcPath, destPath, (err) => {
                            if (err) {
                                console.error(`Error copying file ${item.name}:`, err.message);
                            }
                        });
                    } else if (item.isDirectory()) {
                        // Recursively copy directories
                        copyDirRecursive(srcPath, destPath);
                    }
                });
            });
        });
    });
}

function copyDirRecursive(srcDir, destDir) {
    fs.mkdir(destDir, { recursive: true }, (err) => {
        if (err) {
            return console.error(`Error creating directory ${destDir}:`, err.message);
        }

        fs.readdir(srcDir, { withFileTypes: true }, (err, items) => {
            if (err) {
                return console.error(`Error reading directory ${srcDir}:`, err.message);
            }

            items.forEach((item) => {
                const srcPath = path.join(srcDir, item.name);
                const destPath = path.join(destDir, item.name);

                if (item.isFile()) {
                    fs.copyFile(srcPath, destPath, (err) => {
                        if (err) {
                            console.error(`Error copying file ${item.name}:`, err.message);
                        }
                    });
                } else if (item.isDirectory()) {
                    copyDirRecursive(srcPath, destPath);
                }
            });
        });
    });
}

copyDir();

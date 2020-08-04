const fs = require('fs');
const path = require('path');

class Cash extends Map {
    addFile(filePath: string): void {
        const ext: string = path.extname(filePath).substring(1);
        const callback = (err: Error, fileContent: string): void => {
            if (err) throw err;

            super.set(filePath, fileContent);
        }
    
        switch(ext) {
            case 'png':
            case 'jpg':
                fs.readFile(filePath, callback);
                break;
    
            default:
                fs.readFile(filePath, 'utf8', callback); 
        }
    }

    addDirectory(directoryPath: string): void {
        fs.readdir(directoryPath,
        {encoding: null, withFileTypes: true}, 
        (err: Error, files: any) => {
            if (err) throw err;

            for (let file of files) {
                const filePath: string = path.join(directoryPath, file.name);

                if (file.isDirectory()) this.addDirectory(filePath);
                else this.addFile(filePath);
            }
        });
    }
}

const CASH = new Cash();

export {CASH};

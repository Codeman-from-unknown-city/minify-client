const fs = require('fs');
const path = require('path');

class Cash extends Map {
    addFile(filePath: string): string {
        const ext: string = path.extname(filePath).substring(1);
        let fileContent: string = '\0';
        const callback = (err: Error, result: string): void => {
            if (err) throw err;

            fileContent = result;
        }
    
        switch(ext) {
            case 'png':
            case 'jpg':
                fs.readFile(filePath, callback);
                break;
    
            default:
                fs.readFile(filePath, 'utf8', callback); 
        }
    
        return fileContent;
    }

    addDirectory(directoryPath: string, name: string, isNested: boolean = false): void {
        fs.readdir(directoryPath,
        {encoding: null, withFileTypes: true}, 
        (err: Error, files: any) => {
            if (err) throw err;
            
            if (!isNested) super.set(name, {});

            for (let file of files) {
                const filePath: string = path.join(directoryPath, file.name);

                if (file.isDirectory()) this.addDirectory(filePath, name, true);

                const fileContent = this.addFile(filePath);
                super.get(name)[file.name] = fileContent;
            }
        });
    }
}

const CASH = new Cash();

export {CASH};

const fs = require('fs');
const path = require('path');

class Cash extends Map {
    addFile(filePath: string, fileName: string, dirName: string): void {
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
    
        super.get(dirName)[fileName] = fileContent;
    }

    addDirectory(directoryPath: string, isNested: boolean = false): void {
        fs.readdir(directoryPath,
        {encoding: null, withFileTypes: true}, 
        (err: Error, files: any) => {
            if (err) throw err;
            
            const propName = directoryPath.split('/')[directoryPath.length - 1];
            if (!isNested) super.set(propName, {});

            for (let file of files) {
                const fileName = file.name;
                const filePath: string = path.join(directoryPath, fileName);

                if (file.isDirectory()) this.addDirectory(filePath, true);
                else this.addFile(filePath, fileName, propName);
            }
        });
    }
}

const CASH = new Cash();

export {CASH};

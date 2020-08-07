import { readdir, readFile, Dirent } from "fs";
import { join, extname } from "path";

class Cash extends Map {
    addFile(filePath: string): void {
        const ext: string = extname(filePath).substring(1);
        const callback = (err: NodeJS.ErrnoException | null, fileContent: string | Buffer): void => {
            if (err) throw err;

            super.set(filePath, fileContent);
        }
    
        switch(ext) {
            case 'html':
            case 'css':
            case 'js':
                readFile(filePath, 'utf8', callback); 
                break;
    
            default:
                readFile(filePath, callback);
        }
    }

    addDirectory(directoryPath: string): void {
        readdir(directoryPath,
        {encoding: null, withFileTypes: true}, 
        (err: NodeJS.ErrnoException | null, files: Dirent[]) => {
            if (err) throw err;

            for (let file of files) {
                const filePath: string = join(directoryPath, file.name);

                if (file.isDirectory()) this.addDirectory(filePath);
                else this.addFile(filePath);
            }
        });
    }
}

export const cash: Cash = new Cash();

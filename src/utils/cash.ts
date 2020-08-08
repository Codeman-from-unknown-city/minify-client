import { promises, Dirent } from "fs";
import { join, extname } from "path";
import minify from "./minifyCode";

class Cash extends Map {
    async addFile(filePath: string): Promise<void> {
        let fileContent;
        const ext: string = extname(filePath).substring(1);
    
        switch(ext) {
            case 'html':
            case 'css':
            case 'js':
                fileContent  = minify( {code: await promises.readFile(filePath, 'utf8'), ext} ); 
                break;
    
            default:
                fileContent = await promises.readFile(filePath);
        }

        super.set(filePath, fileContent);
    }

    async addDirectory(directoryPath: string): Promise<void> {
        const files: Dirent[] = await promises.readdir(directoryPath, {encoding: null, withFileTypes: true});
        
        for (let file of files) {
            const filePath: string = join(directoryPath, file.name);

            if (file.isDirectory()) this.addDirectory(filePath);
            else this.addFile(filePath);
        }
    }
}

export const cash: Cash = new Cash();

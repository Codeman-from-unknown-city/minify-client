import { promises as fsPromises, Dirent } from "fs";
import { join, extname } from "path";
import minify from "./minifyCode";

class Cash extends Map<string, string | Buffer> {
    async addFile(filePath: string): Promise<void> {
        let fileContent;
        const ext: string = extname(filePath).substring(1);
    
        switch(ext) {
            case 'html':
            case 'css':
            case 'js':
                fileContent  = minify(await fsPromises.readFile(filePath, 'utf8'), ext); 
                break;
    
            default:
                fileContent = await fsPromises.readFile(filePath);
        }

        super.set(filePath, fileContent);
    }

    async addDirectory(directoryPath: string): Promise<void> {
        const files: Dirent[] = await fsPromises.readdir(directoryPath, {encoding: null, withFileTypes: true});
        
        for (let file of files) {
            const filePath: string = join(directoryPath, file.name);

            if (file.isDirectory()) this.addDirectory(filePath);
            else this.addFile(filePath);
        }
    }
}

export default new Cash();

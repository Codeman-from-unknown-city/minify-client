import { promises as fsPromises } from "fs";
import minify from "../minifyCode";
import { join } from "path";

const saveFile = async (userId: string, file: I.Data): Promise<void> => {
    const pathToUserDir = join(process.cwd(), 'users_files', userId);
    const filePath = join(pathToUserDir, file.name);

    try {
        await fsPromises.mkdir(pathToUserDir);
    } catch(e) {} 
    finally {
        await fsPromises.writeFile(filePath, minify(file));
    }
}

const deleteUserDir = async (userId: string): Promise<void> => 
    await fsPromises.rmdir(join(process.cwd(), 'users_files', userId), {recursive: true});

export { saveFile, deleteUserDir };

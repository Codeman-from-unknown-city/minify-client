import { promises as fsPromises } from "fs";
import minify from "../minifyCode";
import { join } from "path";

const getPathToUserDir = (userId: string): string => join(process.cwd(), 'users_files', userId);

const saveFile = async (userId: string, file: I.Data): Promise<void> => {
    const { name, ext, code} = file;
    if (!name) return;

    const pathToUserDir = getPathToUserDir(userId);

    const filePath = join(pathToUserDir, name);

    try {
        await fsPromises.mkdir(pathToUserDir);
    } catch(e) {} 
    finally {
        await fsPromises.writeFile(filePath, minify(code, ext));
    }
}

const deleteUserDir = async (userId: string): Promise<void> => 
    await fsPromises.rmdir(getPathToUserDir(userId), {recursive: true});

export { saveFile, deleteUserDir };

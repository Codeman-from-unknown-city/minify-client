import { promises as fsPromises } from "fs";
import minify from "../minifyCode";
import { join } from "path";

const getPathToUserDir = (userId: string): string => join(process.cwd(), 'users_files', userId);

const saveFile = async (userId: string, file: I.Data): Promise<void> => {
    const pathToUserDir = getPathToUserDir(userId);
    const filePath = join(pathToUserDir, file.name);

    try {
        await fsPromises.mkdir(pathToUserDir);
    } catch(e) {} 
    finally {
        await fsPromises.writeFile(filePath, minify(file));
    }
}

const deleteUserDir = async (userId: string): Promise<void> => 
    await fsPromises.rmdir(getPathToUserDir(userId), {recursive: true});

export { saveFile, deleteUserDir };

import fs from 'fs';
import rimraf from 'rimraf';

export const cleanDirectory = (name: string) => {
    rimraf.sync(name);
    if (!fs.existsSync(name)){
        fs.mkdirSync(name);
    }
}
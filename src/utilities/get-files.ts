import fs from 'fs';
import { FileInfo } from '../models/fileInfo';

export const getFiles = (directory: string): FileInfo[] =>
    fs.readdirSync(directory)
        .map(path => ({ name: path, contents: fs.readFileSync(directory + '/' + path, { encoding: 'utf-8' }) }));

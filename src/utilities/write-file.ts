import fs from 'fs';

export const writeFile = (file: string, data: any) =>
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
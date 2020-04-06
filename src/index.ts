import fs from 'fs';

import { parseProvinces } from './parsers/province-parser';
import { getFiles } from './utilities/get-files';
import { cleanDirectory } from './utilities/clean-directory';
import { writeFile } from './utilities/write-file';
import { parseCharacters, parseCharacter } from './parsers/character-parser';

const provincesOutput = './out/history/provinces/';
const provincesInput = './samples/history/provinces/';

const charactersOutput = './out/history/characters/';
const charactersInput = './samples/history/characters/';

console.log('Cleaning Provinces Directory')
cleanDirectory(provincesOutput);

console.log('Cleaning Characters Directory')
cleanDirectory(charactersOutput);

console.log('Loading Provinces')
parseProvinces(getFiles(provincesInput))
    .forEach(province => writeFile(`./out/history/provinces/${province.id} - ${province.name}.json`, province));

console.log('Loading Characters');
// const characters = parseCharacters(getFiles(charactersInput))

const character = parseCharacter(fs.readFileSync(charactersInput + '/' + 'afghan.txt', { encoding: 'utf-8' }), 'afghan.txt');
console.log(character)
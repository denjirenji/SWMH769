import { Province, createProvince } from "../models/province";
import { KeyValue } from "../models/key-value";
import { Settlement, createSettlement } from "../models/settlement";
import { assignString, assignNumber, createPropertyAssignmentReducer, createCollectionReducer } from "../utilities/assignment";
import { IndexableObject } from "../models/indexable-object";
import { properCase, cleanString, getFirstMatch, getAllMatches } from "../utilities/string-utils";
import { parseKeyValue } from "./key-value-parser";
import { parseDate } from "../utilities/date-utils";
import { createProvinceHistoricalEvent } from "../models/province-historical-event";
import { FileInfo } from "../models/fileInfo";
import { Character, createCharacter } from "../models/character";

/********** PROPERTIES **********/
/********** PROPERTIES **********/

/********** CLEAN STRINGS **********/
/********** CLEAN STRINGS **********/

/********** PATTERNS **********/
const characterPattern: RegExp = /\d(?:[^\}]+\}[^\S])+}/gm;
/********** PATTERNS **********/

/********** PARSERS **********/
const parseCharacter = (str: string, fileName: string): Character => {
    const characters = str.match(characterPattern);
    console.log(characters)
    return createCharacter(1, '');
}
/********** PARSERS **********/

/********** PARSE FUNCTION **********/
const parseCharacters = (files: FileInfo[]): Character[] =>
    files.filter(file => file.name.indexOf('CK2Plus') === -1)
        .map(file => parseCharacter(file.contents, file.name))
/********** PARSE FUNCTION **********/

/********** EXPORTS **********/
export {
    parseCharacter,
    parseCharacters
};
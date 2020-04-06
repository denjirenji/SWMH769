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

/********** PROPERTIES **********/
const propertyMap: IndexableObject = {
    title: (province: Province, keyValue: KeyValue) =>
        assignString(province, 'title', keyValue.value),

    max_settlements: (province: Province, keyValue: KeyValue) =>
        assignNumber(province, 'maxSettlements', keyValue.value),

    religion: (province: Province, keyValue: KeyValue): Province =>
        assignString<Province>(province, 'religion', keyValue.value),

    terrain: (province: Province, keyValue: KeyValue) =>
        assignString(province, 'terrain', keyValue.value),

    culture: (province: Province, keyValue: KeyValue) =>
        assignString(province, 'culture', keyValue.value),
}
/********** PROPERTIES **********/

/********** CLEAN STRINGS **********/
const charsToRemoveFromSettlements = ['b_', '_'];
const charsToRemoveFromProperties = ['c_'];
/********** CLEAN STRINGS **********/

/********** PATTERNS **********/
const namePattern: RegExp = /^#\s+\d+\s+\-\s+\w+/gm;
const propertyPattern: RegExp = /^[^(\s*b_)]\w+\s*\=\s*\w+/gm;
const settlementPattern: RegExp = /^b_\w+\s*\=\s*\w+/gm;
const historyAssignmentPattern: RegExp = /\d+\.\d+\.\d+\s+\=\s+\{/gm;
const historyBodyPattern: RegExp = /[^{\}]+(?=})/gm;
const historyDatePattern: RegExp = /\d+\.\d+\.\d+/gm;
/********** PATTERNS **********/

/********** PARSERS **********/
const parseName = (str: string, fileName: string): string => {
    const match = getFirstMatch(str, namePattern);
    return match === ''
        ? fileName
            .replace("#", '')
            .replace(".txt", '')
            .split('-')[1]
            .trim()
        : match
            .replace("#", '')
            .split('-')[1]
            .trim()
}

const parseId = (str: string, fileName: string): number => {
    const match = getFirstMatch(str, namePattern);
    return match === ''
        ? Number.parseInt(fileName
            .replace("#", '')
            .replace(".txt", '')
            .split('-')[0]
            .trim())
        : Number.parseInt(match
            .replace("#", '')
            .split('-')[0]
            .trim())
}


const parseProperties = (str: string, applyProperCase: boolean): KeyValue[] =>
    getAllMatches(str, propertyPattern)
        .map(match => parseKeyValue(
            match,
            (val: string) => properCase(cleanString(val, charsToRemoveFromProperties).replace('_', ' '))
        ));

const parseSettlements = (str: string, applyProperCase: boolean): KeyValue[] =>
    getAllMatches(str, settlementPattern)
        .map(match => parseKeyValue(
            match,
            (val: string) => applyProperCase ? properCase(val) : val,
            (val: string) => properCase(cleanString(val, charsToRemoveFromSettlements))
        ));

const parseHistoryBody = (str: string) => {
    const history = getFirstMatch(str, historyBodyPattern)
        .replace(/\t/g, '');
    const settlements = parseSettlements(history, false);
    const properties = parseProperties(history, true);
    return { settlements, properties };
}

const parseHistory = (str: string, id: number, name: string) => {
    const historicalEvents = getAllMatches(str, historyAssignmentPattern)
        .map(match => {
            const startIndex = str.indexOf(match);
            const endIndex = str.indexOf('}', startIndex);
            const date = parseDate(getFirstMatch(match, historyDatePattern));
            const { settlements, properties } = parseHistoryBody(str.slice(startIndex, endIndex + 1));

            const event = properties.reduce(
                createPropertyAssignmentReducer(propertyMap),
                createProvinceHistoricalEvent(id, name, date)
            );

            event.settlements = settlements.reduce(
                createCollectionReducer(createSettlement),
                []
            );

            return event
        });
    return historicalEvents;
}

const parseProvince = (str: string, fileName: string): Province => {
    const name = parseName(str, fileName);
    const id = parseId(str, fileName);

    const properties = parseProperties(str, true);
    const settlements = parseSettlements(str, true);
    const historicalEvents = parseHistory(str, id, name);

    const province = properties.reduce(
        createPropertyAssignmentReducer(propertyMap),
        createProvince(id, name)
    );

    province.settlements = settlements.reduce(
        createCollectionReducer(createSettlement),
        []
    );

    province.historicalEvents = historicalEvents;

    return province;
}
/********** PARSERS **********/

/********** PARSE FUNCTION **********/
const parseProvinces = (files: FileInfo[]): Province[] =>
    files.map(file => parseProvince(file.contents, file.name))
/********** PARSE FUNCTION **********/

/********** EXPORTS **********/
export {
    parseProvince,
    parseProvinces
};
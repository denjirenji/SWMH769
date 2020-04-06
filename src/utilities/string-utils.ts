import { KeyValue } from "../models/key-value";

export const properCase = (str: string): string =>
    str.split(' ').map(s => s[0].toUpperCase() + s.slice(1)).join(' ');

export const cleanString = (str: string, chars: string[]) =>
    chars.reduce((s, c) => { return s.replace(c, ''); }, str);

export const getFirstMatch = (str: string, pattern: RegExp): string => {
    const matches = str.match(pattern);
    return matches && matches.length > 0
        ? matches[0]
        : '';
}

export const getAllMatches = (str: string, pattern: RegExp): string[] => {
    const matches = str.match(pattern);
    return matches && matches.length > 0
        ? matches
        : [];
}
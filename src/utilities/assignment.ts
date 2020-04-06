import { KeyValue } from "../models/key-value";
import { IndexableObject } from "../models/indexable-object";

export const assignString = <T>(obj: T, propertyName: string, value: string): T => {
    (obj as any)[propertyName] = value;
    return obj;
}

export const assignNumber = <T>(obj: T, propertyName: string, value: string): T => {
    (obj as any)[propertyName] = Number.parseInt(value);
    return obj;
}

export const createPropertyAssignmentReducer = (propertyMap: IndexableObject) =>
    <T>(obj: T, keyValue: KeyValue): T =>
        propertyMap[keyValue.key] !== undefined
            ? propertyMap[keyValue.key](obj, keyValue)
            : obj;

export const createCollectionReducer = <T>(transform: (key: string, value: string) => T) =>
    (collection: T[], keyValue: KeyValue): T[] =>
        [
            ...collection,
            transform(keyValue.key, keyValue.value)
        ]



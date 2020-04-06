import { KeyValue } from "../models/key-value";

export const parseKeyValue = (keyValueString: string, onParseValue: (value: string) => string, onParseKey?: (value: string) => string): KeyValue => {
    const keyValueParts = keyValueString.split('=');
    return {
        key: !!onParseKey ? onParseKey(keyValueParts[0].trim()) : keyValueParts[0].trim(),
        value: onParseValue(keyValueParts[1].trim())
    }
}
import { Province } from "./province";
import { Settlement } from "./settlement";
import { SimpleDate } from "./simple-date";

export interface ProvinceHistoricalEvent {
    id: number;
    year: number;
    month: number;
    day: number;
    name: string;
    religion?: string,
    terrain?: string,
    culture?: string,
    title?: string,
    maxSettlements?: number,
    settlements?: Settlement[],
}

export const createProvinceHistoricalEvent = (id: number, name: string, date: SimpleDate): ProvinceHistoricalEvent => {
    return {
        id,
        name,
        year: date.year,
        month: date.month,
        day: date.day,
    }
}
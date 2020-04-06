import { Settlement } from "./settlement"
import { ProvinceHistoricalEvent } from "./province-historical-event"

export interface Province {
    id: number;
    religion?: string;
    terrain?: string;
    culture?: string;
    name: string;
    title?: string;
    maxSettlements?: number;
    settlements?: Settlement[];
    historicalEvents?: ProvinceHistoricalEvent[];
}

export const createProvince = (id: number, name: string): Province => {
    return {
        id,
        name,
        religion: '',
        terrain: '',
        culture: '',
        title: '',
        maxSettlements: 0,
        settlements: [],
        historicalEvents: []
    }
}
import { Trait } from "./trait";

export interface Character {
    id: number,
    name: string;
    dynasty: string;
    religion: string;
    culture: string;
    traits: Trait[];
    father: string;
    mother: string;
    female: boolean;
    events: Event[];
}

export const createCharacter = (id: number, name: string): Character => {
    return {
        id,
        name,
        dynasty: '',
        religion: '',
        culture: '',
        traits: [],
        father: '',
        mother: '',
        female: false,
        events: [],
    }
}
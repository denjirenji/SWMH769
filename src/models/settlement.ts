export interface Settlement {
    name: string;
    type: string;
}

export const createSettlement = (name: string, type: string) => {
    return {
        name,
        type
    }
}
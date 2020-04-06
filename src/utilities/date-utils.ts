import { truncateSync } from "fs"

export const parseDate = (str: string): { year: number, month: number, day: number } => {
    const dateParts = str.split('.');
    if (dateParts.length < 3) {
        return {
            year: 0,
            month: 0,
            day: 0
        }
    }
    else {
        return {
            year: Number.parseInt(dateParts[0]),
            month: Number.parseInt(dateParts[1]),
            day: Number.parseInt(dateParts[2])
        }
    }
}
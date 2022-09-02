export class SearchInVedasInput {
    vedaCodes: {
        rigVeda: boolean,
        yajurVeda: boolean,
        athurvaVeda: boolean,
        samaVeda: boolean
    };
    locale: string;
    keyword: string;
    filters: {
        devatha: boolean,
        rishi: boolean,
        chandas: boolean,
        swara: boolean,
        mantra: boolean,
        artha: boolean
    };
    page: number;
    perPage: number;
}
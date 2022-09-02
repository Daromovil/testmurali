import { Audit } from "./shared.models";

export class Veda {

    version: string;
    vedaName: string;
    code: string;
    displayOrder: number;
    title?: string;
    header?: string;
    summary?: string;
    shortDesc?: string;
    desc?: string;
    audit?: Audit;

    //rig-veda
    mandalCount?: number;
    suktaCount?: number;
    mandals?: Mandal[];

    //yajur-veda
    adhyayaCount?: number;
    adhyayas?: Adhyaya[];

    //sama-veda
    archikaCount?: number;
    prapatakaCount?: number;
    purvaArchika?: PurvaArchika[];
    uttaraArchika?: UttaraArchika[];

    //athurva-veda
    kandaCount?: number;
    kandas: Kanda[];

    //all
    mantraCount?: number;
}

export class Mandal {
    mandal: number;
    anuvakaCount?: number;
    suktaCount: number;
    mantraCount: number;
    rishis?: string;
}

export class Adhyaya {
    adhyaya: number;
    mantraCount: number;
    rishis?: string;
}

export class PurvaArchika {
    prapataka: number;
    dasathaCount: number;
    mantraCount: number;
    rishis?: string;
}

export class UttaraArchika {
    prapataka: number;
    suktaCount: number;
    mantraCount: number;
    rishis?: string;
}

export class Kanda {
    kanda: number;
    suktaCount: number;
    mantraCount: number;
    rishis?: string;
}

export class VedaSearchInput {
    constructor() {
        this.query = new VedaSearchInputQuery();
        this.fields = new Array<string>();
        this.orderBy = new Array<string>();
    }
    query: VedaSearchInputQuery;
    page: number;
    perPage: number;
    fields: string[];
    orderBy: string[]
}

export class VedaSearchInputQuery {
    vedaCode: string;
    locale: string;
    metadata__mandal: Number;
    metadata__sukta: Number;
}

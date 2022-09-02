export interface veda_mantras_translation {
    labels: veda_vedas_translation_labels;
    get: (key: string) => string;
}

export interface veda_vedas_translation_labels {
    mandal: string;
    sukta: string;

    get: (key: string) => string;
}
export interface KlientConfig {
    apiUrl: string;
    appUrl: string;
    loginUrl: string;
    endreKontonummerUrl?: string;
}

let current: KlientConfig | null = null;

export const setKlientConfig = (config: KlientConfig | null) => {
    current = config ? { ...current, ...config } : null;
};

export const getKlientConfig = () => {
    if (!current) {
        throw new Error("Klientkonfigurasjonen er ikke satt");
    }
    return current;
};

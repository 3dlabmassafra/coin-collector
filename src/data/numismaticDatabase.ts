export interface DatabaseItem {
    id: string;
    type: 'coin' | 'banknote';
    country: string;
    countryCode: string;
    year: number;
    denomination: string;
    variant?: string;
    mintage?: number;
    rarity: 'common' | 'uncommon' | 'rare' | 'very-rare' | 'extremely-rare';
    valuations: {
        FDC: number;
        SPL: number;
        BB: number;
        MB: number;
        B: number;
        D: number;
    };
    description: string;
    identificationTips: string;
    material?: string;
    diameter?: number;
    weight?: number;
}

export const COUNTRIES = [
    { code: 'IT', name: 'Italia', flag: '🇮🇹' },
    { code: 'EU', name: 'Euro (Generico)', flag: '🇪🇺' },
    { code: 'US', name: 'Stati Uniti', flag: '🇺🇸' },
    { code: 'GB', name: 'Regno Unito', flag: '🇬🇧' },
    { code: 'FR', name: 'Francia', flag: '🇫🇷' },
    { code: 'DE', name: 'Germania', flag: '🇩🇪' },
    { code: 'ES', name: 'Spagna', flag: '🇪🇸' },
    { code: 'CH', name: 'Svizzera', flag: '🇨🇭' },
];

export const RARITY_LABELS = {
    'common': 'Comune',
    'uncommon': 'Non Comune',
    'rare': 'Rara',
    'very-rare': 'Molto Rara',
    'extremely-rare': 'Estremamente Rara'
};

export const RARITY_COLORS = {
    'common': '#87CEEB',
    'uncommon': '#90EE90',
    'rare': '#FFD700',
    'very-rare': '#FF8C00',
    'extremely-rare': '#FF4500'
};

// Comprehensive numismatic database
export const NUMISMATIC_DATABASE: DatabaseItem[] = [
    // EURO COINS - ITALY
    {
        id: 'eur-ita-2002-2e',
        type: 'coin',
        country: 'Italia',
        countryCode: 'IT',
        year: 2002,
        denomination: '2 Euro',
        mintage: 450000000,
        rarity: 'common',
        material: 'Bimetallica (Nichel-Ottone/Cupronichel)',
        diameter: 25.75,
        weight: 8.5,
        valuations: { FDC: 3.50, SPL: 2.50, BB: 2.20, MB: 2.10, B: 2.00, D: 2.00 },
        description: '2 Euro Italia - Dante Alighieri',
        identificationTips: 'Ritratto di Dante Alighieri sul lato nazionale'
    },
    {
        id: 'eur-ita-2002-1e',
        type: 'coin',
        country: 'Italia',
        countryCode: 'IT',
        year: 2002,
        denomination: '1 Euro',
        mintage: 800000000,
        rarity: 'common',
        material: 'Bimetallica (Cupronichel/Nichel-Ottone)',
        diameter: 23.25,
        weight: 7.5,
        valuations: { FDC: 2.50, SPL: 1.50, BB: 1.20, MB: 1.10, B: 1.00, D: 1.00 },
        description: '1 Euro Italia - Uomo Vitruviano',
        identificationTips: 'Uomo Vitruviano di Leonardo da Vinci'
    },
    {
        id: 'eur-ita-2004-2e-pam',
        type: 'coin',
        country: 'Italia',
        countryCode: 'IT',
        year: 2004,
        denomination: '2 Euro',
        variant: 'Commemorativa - Programma Alimentare Mondiale',
        mintage: 16000000,
        rarity: 'uncommon',
        material: 'Bimetallica',
        diameter: 25.75,
        weight: 8.5,
        valuations: { FDC: 8.00, SPL: 5.00, BB: 3.50, MB: 3.00, B: 2.50, D: 2.00 },
        description: 'Commemorativa 50° anniversario Programma Alimentare Mondiale',
        identificationTips: 'Globo terrestre con spiga di grano, croce e mais'
    },
    {
        id: 'eur-ita-2005-2e-costituzione',
        type: 'coin',
        country: 'Italia',
        countryCode: 'IT',
        year: 2005,
        denomination: '2 Euro',
        variant: 'Commemorativa - Costituzione Europea',
        mintage: 18000000,
        rarity: 'uncommon',
        material: 'Bimetallica',
        diameter: 25.75,
        weight: 8.5,
        valuations: { FDC: 6.00, SPL: 4.00, BB: 3.00, MB: 2.50, B: 2.20, D: 2.00 },
        description: 'Commemorativa firma Costituzione Europea',
        identificationTips: 'Europa e toro con penna stilografica'
    },
    {
        id: 'eur-ita-2006-2e-torino',
        type: 'coin',
        country: 'Italia',
        countryCode: 'IT',
        year: 2006,
        denomination: '2 Euro',
        variant: 'Commemorativa - Olimpiadi Torino',
        mintage: 40000000,
        rarity: 'common',
        material: 'Bimetallica',
        diameter: 25.75,
        weight: 8.5,
        valuations: { FDC: 4.50, SPL: 3.00, BB: 2.50, MB: 2.20, B: 2.00, D: 2.00 },
        description: 'XX Giochi Olimpici Invernali - Torino 2006',
        identificationTips: 'Sciatore stilizzato con scritta TORINO'
    },

    // ITALIAN LIRE
    {
        id: 'lira-ita-1955-100l',
        type: 'coin',
        country: 'Italia',
        countryCode: 'IT',
        year: 1955,
        denomination: '100 Lire',
        variant: 'Minerva I tipo',
        mintage: 8600000,
        rarity: 'uncommon',
        material: 'Acmonital',
        diameter: 27.8,
        weight: 8,
        valuations: { FDC: 25.00, SPL: 15.00, BB: 8.00, MB: 5.00, B: 3.00, D: 2.00 },
        description: '100 Lire Minerva - Prima serie',
        identificationTips: 'Testa di Minerva con elmo, scritta REPVBBLICA ITALIANA'
    },
    {
        id: 'lira-ita-1958-500l',
        type: 'coin',
        country: 'Italia',
        countryCode: 'IT',
        year: 1958,
        denomination: '500 Lire',
        variant: 'Caravelle',
        mintage: 810000,
        rarity: 'rare',
        material: 'Argento 835/1000',
        diameter: 29,
        weight: 11,
        valuations: { FDC: 120.00, SPL: 80.00, BB: 50.00, MB: 35.00, B: 25.00, D: 15.00 },
        description: '500 Lire Caravelle - Argento',
        identificationTips: 'Tre caravelle sul rovescio, testa di donna sul dritto'
    },
    {
        id: 'lira-ita-1982-500l-bim',
        type: 'coin',
        country: 'Italia',
        countryCode: 'IT',
        year: 1982,
        denomination: '500 Lire',
        variant: 'Bimetallica',
        mintage: 47000000,
        rarity: 'common',
        material: 'Bimetallica (Bronzital/Acmonital)',
        diameter: 25.8,
        weight: 6.8,
        valuations: { FDC: 5.00, SPL: 3.00, BB: 2.00, MB: 1.50, B: 1.00, D: 0.50 },
        description: '500 Lire Bimetallica - Prima bimetallica italiana',
        identificationTips: 'Centro bronzo, corona esterna acciaio'
    },
    {
        id: 'lira-ita-1997-1000l',
        type: 'coin',
        country: 'Italia',
        countryCode: 'IT',
        year: 1997,
        denomination: '1000 Lire',
        variant: 'Confini geografici',
        mintage: 101400000,
        rarity: 'common',
        material: 'Bimetallica',
        diameter: 27,
        weight: 8.8,
        valuations: { FDC: 4.00, SPL: 2.50, BB: 2.00, MB: 1.50, B: 1.00, D: 0.80 },
        description: '1000 Lire - Confini geografici d\'Europa',
        identificationTips: 'Mappa dell\'Europa con confini'
    },

    // US COINS
    {
        id: 'usd-usa-1964-quarter',
        type: 'coin',
        country: 'Stati Uniti',
        countryCode: 'US',
        year: 1964,
        denomination: 'Quarter Dollar',
        variant: 'Washington - Argento',
        mintage: 560000000,
        rarity: 'common',
        material: 'Argento 900/1000',
        diameter: 24.3,
        weight: 6.25,
        valuations: { FDC: 8.00, SPL: 6.00, BB: 5.00, MB: 4.50, B: 4.00, D: 3.50 },
        description: 'Quarter Washington in argento - ultima annata',
        identificationTips: 'Profilo di George Washington, aquila sul rovescio'
    },
    {
        id: 'usd-usa-2009-penny-log',
        type: 'coin',
        country: 'Stati Uniti',
        countryCode: 'US',
        year: 2009,
        denomination: '1 Cent',
        variant: 'Lincoln Bicentennial - Log Cabin',
        mintage: 284400000,
        rarity: 'common',
        material: 'Zinco ramato',
        diameter: 19.05,
        weight: 2.5,
        valuations: { FDC: 1.50, SPL: 0.50, BB: 0.20, MB: 0.10, B: 0.05, D: 0.01 },
        description: 'Penny commemorativo nascita Lincoln - Capanna di tronchi',
        identificationTips: 'Capanna di tronchi sul rovescio'
    },

    // EURO BANKNOTES
    {
        id: 'eur-bn-2002-5e',
        type: 'banknote',
        country: 'Euro',
        countryCode: 'EU',
        year: 2002,
        denomination: '5 Euro',
        variant: 'Prima serie',
        rarity: 'common',
        valuations: { FDC: 8.00, SPL: 6.00, BB: 5.50, MB: 5.20, B: 5.00, D: 5.00 },
        description: 'Banconota 5 Euro - Architettura classica',
        identificationTips: 'Colore grigio, finestre e portali in stile classico'
    },
    {
        id: 'eur-bn-2002-10e',
        type: 'banknote',
        country: 'Euro',
        countryCode: 'EU',
        year: 2002,
        denomination: '10 Euro',
        variant: 'Prima serie',
        rarity: 'common',
        valuations: { FDC: 15.00, SPL: 12.00, BB: 11.00, MB: 10.50, B: 10.00, D: 10.00 },
        description: 'Banconota 10 Euro - Architettura romanica',
        identificationTips: 'Colore rosso, archi romanici'
    },
    {
        id: 'eur-bn-2002-50e',
        type: 'banknote',
        country: 'Euro',
        countryCode: 'EU',
        year: 2002,
        denomination: '50 Euro',
        variant: 'Prima serie',
        rarity: 'common',
        valuations: { FDC: 65.00, SPL: 55.00, BB: 52.00, MB: 51.00, B: 50.00, D: 50.00 },
        description: 'Banconota 50 Euro - Architettura rinascimentale',
        identificationTips: 'Colore arancione, finestre rinascimentali'
    },
    {
        id: 'eur-bn-2013-5e-europa',
        type: 'banknote',
        country: 'Euro',
        countryCode: 'EU',
        year: 2013,
        denomination: '5 Euro',
        variant: 'Serie Europa',
        rarity: 'common',
        valuations: { FDC: 7.00, SPL: 6.00, BB: 5.50, MB: 5.20, B: 5.00, D: 5.00 },
        description: 'Banconota 5 Euro - Serie Europa con ritratto di Europa',
        identificationTips: 'Ritratto di Europa nella filigrana, ologramma migliorato'
    },

    // ITALIAN LIRE BANKNOTES
    {
        id: 'lira-bn-1990-1000l',
        type: 'banknote',
        country: 'Italia',
        countryCode: 'IT',
        year: 1990,
        denomination: '1000 Lire',
        variant: 'Montessori',
        rarity: 'common',
        valuations: { FDC: 5.00, SPL: 3.00, BB: 2.00, MB: 1.50, B: 1.00, D: 0.80 },
        description: 'Banconota 1000 Lire - Maria Montessori',
        identificationTips: 'Ritratto di Maria Montessori, bambini che studiano sul retro'
    },
    {
        id: 'lira-bn-1984-50000l',
        type: 'banknote',
        country: 'Italia',
        countryCode: 'IT',
        year: 1984,
        denomination: '50000 Lire',
        variant: 'Bernini',
        rarity: 'uncommon',
        valuations: { FDC: 80.00, SPL: 60.00, BB: 55.00, MB: 52.00, B: 50.00, D: 50.00 },
        description: 'Banconota 50000 Lire - Gian Lorenzo Bernini',
        identificationTips: 'Ritratto di Bernini, statua equestre sul retro'
    },
    {
        id: 'lira-bn-1997-500000l',
        type: 'banknote',
        country: 'Italia',
        countryCode: 'IT',
        year: 1997,
        denomination: '500000 Lire',
        variant: 'Raffaello',
        rarity: 'rare',
        valuations: { FDC: 600.00, SPL: 550.00, BB: 520.00, MB: 510.00, B: 500.00, D: 500.00 },
        description: 'Banconota 500000 Lire - Raffaello Sanzio',
        identificationTips: 'Autoritratto di Raffaello, Scuola di Atene sul retro'
    },

    // More Euro commemoratives
    {
        id: 'eur-ger-2006-2e-holstein',
        type: 'coin',
        country: 'Germania',
        countryCode: 'DE',
        year: 2006,
        denomination: '2 Euro',
        variant: 'Commemorativa - Schleswig-Holstein',
        mintage: 30000000,
        rarity: 'common',
        material: 'Bimetallica',
        diameter: 25.75,
        weight: 8.5,
        valuations: { FDC: 4.00, SPL: 3.00, BB: 2.50, MB: 2.20, B: 2.00, D: 2.00 },
        description: 'Chiesa di Holstentor a Lubecca',
        identificationTips: 'Porta della città di Lubecca'
    },
    {
        id: 'eur-fra-2007-2e-rome',
        type: 'coin',
        country: 'Francia',
        countryCode: 'FR',
        year: 2007,
        denomination: '2 Euro',
        variant: 'Commemorativa - Trattato di Roma',
        mintage: 10000000,
        rarity: 'uncommon',
        material: 'Bimetallica',
        diameter: 25.75,
        weight: 8.5,
        valuations: { FDC: 6.00, SPL: 4.00, BB: 3.00, MB: 2.50, B: 2.20, D: 2.00 },
        description: '50° anniversario Trattato di Roma',
        identificationTips: 'Trattato con firme, pavimento a mosaico'
    },
    {
        id: 'eur-esp-2005-2e-quijote',
        type: 'coin',
        country: 'Spagna',
        countryCode: 'ES',
        year: 2005,
        denomination: '2 Euro',
        variant: 'Commemorativa - Don Chisciotte',
        mintage: 8000000,
        rarity: 'uncommon',
        material: 'Bimetallica',
        diameter: 25.75,
        weight: 8.5,
        valuations: { FDC: 7.00, SPL: 5.00, BB: 3.50, MB: 3.00, B: 2.50, D: 2.00 },
        description: '400° anniversario Don Chisciotte',
        identificationTips: 'Don Chisciotte con lancia e mulini a vento'
    },
];

// Helper functions
export const searchDatabase = (filters: {
    type?: 'coin' | 'banknote';
    country?: string;
    yearFrom?: number;
    yearTo?: number;
    denomination?: string;
    rarity?: string;
}): DatabaseItem[] => {
    return NUMISMATIC_DATABASE.filter(item => {
        if (filters.type && item.type !== filters.type) return false;
        if (filters.country && item.country !== filters.country) return false;
        if (filters.yearFrom && item.year < filters.yearFrom) return false;
        if (filters.yearTo && item.year > filters.yearTo) return false;
        if (filters.denomination && item.denomination !== filters.denomination) return false;
        if (filters.rarity && item.rarity !== filters.rarity) return false;
        return true;
    });
};

export const getCountries = (type?: 'coin' | 'banknote'): string[] => {
    const items = type ? NUMISMATIC_DATABASE.filter(i => i.type === type) : NUMISMATIC_DATABASE;
    return [...new Set(items.map(i => i.country))].sort();
};

export const getYears = (country?: string, type?: 'coin' | 'banknote'): number[] => {
    let items = NUMISMATIC_DATABASE;
    if (type) items = items.filter(i => i.type === type);
    if (country) items = items.filter(i => i.country === country);
    return [...new Set(items.map(i => i.year))].sort((a, b) => b - a);
};

export const getDenominations = (country?: string, year?: number, type?: 'coin' | 'banknote'): string[] => {
    let items = NUMISMATIC_DATABASE;
    if (type) items = items.filter(i => i.type === type);
    if (country) items = items.filter(i => i.country === country);
    if (year) items = items.filter(i => i.year === year);
    return [...new Set(items.map(i => i.denomination))].sort();
};

export const getItemById = (id: string): DatabaseItem | undefined => {
    return NUMISMATIC_DATABASE.find(item => item.id === id);
};

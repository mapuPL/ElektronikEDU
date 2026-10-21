export interface FormulaItem {
  id: string;
  name: string;
  category: 'Prąd stały (DC)' | 'Prąd zmienny (AC)' | 'Półprzewodniki' | 'Układy cyfrowe' | 'Technika w.cz. i opto';
  formula: string;
  description: string;
  variables: { symbol: string; desc: string; unit: string }[];
  example: string;
}

export interface MetricPrefix {
  prefix: string;
  symbol: string;
  factor: string;
  power: number;
}

export interface ElectronicSymbolItem {
  id: string;
  name: string;
  standard: 'IEC (Europejski)' | 'ANSI (Amerykański)';
  category: 'Bierne' | 'Półprzewodniki' | 'Cyfrowe' | 'Zabezpieczenia / Zasilanie';
  description: string;
  svgCode: string;
}

export const METRIC_PREFIXES: MetricPrefix[] = [
  { prefix: 'tera', symbol: 'T', factor: '1 000 000 000 000', power: 12 },
  { prefix: 'giga', symbol: 'G', factor: '1 000 000 000', power: 9 },
  { prefix: 'mega', symbol: 'M', factor: '1 000 000', power: 6 },
  { prefix: 'kilo', symbol: 'k', factor: '1 000', power: 3 },
  { prefix: 'mili', symbol: 'm', factor: '0,001', power: -3 },
  { prefix: 'mikro', symbol: 'µ', factor: '0,000 001', power: -6 },
  { prefix: 'nano', symbol: 'n', factor: '0,000 000 001', power: -9 },
  { prefix: 'piko', symbol: 'p', factor: '0,000 000 000 001', power: -12 }
];

export const FORMULAS_DATA: FormulaItem[] = [
  {
    id: 'f-ohm',
    name: 'Prawo Ohma dla odcinka obwodu',
    category: 'Prąd stały (DC)',
    formula: 'I = \\frac{U}{R} \\iff U = I \\cdot R \\iff R = \\frac{U}{I}',
    description: 'Określa liniową zależność między prądem, napięciem i rezystancją dla przewodników metalicznych.',
    variables: [
      { symbol: 'I', desc: 'Natężenie prądu', unit: 'A (Amper)' },
      { symbol: 'U', desc: 'Napięcie elektryczne', unit: 'V (Wolt)' },
      { symbol: 'R', desc: 'Rezystancja (opór)', unit: 'Ω (Om)' }
    ],
    example: 'Dla U = 12 V i R = 24 Ω: I = 12 / 24 = 0,5 A.'
  },
  {
    id: 'f-power',
    name: 'Moc prądu stałego (Prawo Joule’a-Lenza)',
    category: 'Prąd stały (DC)',
    formula: 'P = U \\cdot I = I^2 \\cdot R = \\frac{U^2}{R}',
    description: 'Moc cieplna i elektryczna wydzielana w obwodzie rezystancyjnym.',
    variables: [
      { symbol: 'P', desc: 'Moc czynna', unit: 'W (Wat)' },
      { symbol: 'U', desc: 'Napięcie', unit: 'V' },
      { symbol: 'I', desc: 'Prąd', unit: 'A' },
      { symbol: 'R', desc: 'Rezystancja', unit: 'Ω' }
    ],
    example: 'Dla U = 5 V i I = 2 A: P = 5 · 2 = 10 W.'
  },
  {
    id: 'f-divider',
    name: 'Dzielnik napięcia (nieobciążony)',
    category: 'Prąd stały (DC)',
    formula: 'U_{wy} = U_{we} \\cdot \\frac{R_2}{R_1 + R_2}',
    description: 'Napięcie wyjściowe odłożone na dolnym rezystorze R2 w gałęzi szeregowej.',
    variables: [
      { symbol: 'U_we', desc: 'Napięcie wejściowe zasilania', unit: 'V' },
      { symbol: 'U_wy', desc: 'Napięcie wyjściowe z dzielnika', unit: 'V' },
      { symbol: 'R1, R2', desc: 'Rezystory dzielnika', unit: 'Ω' }
    ],
    example: 'Dla Uwe = 12 V, R1 = 1 kΩ, R2 = 3 kΩ: Uwy = 12 · (3 / 4) = 9 V.'
  },
  {
    id: 'f-parallel',
    name: 'Rezystancja zastępcza połączenia równoległego',
    category: 'Prąd stały (DC)',
    formula: '\\frac{1}{R_z} = \\frac{1}{R_1} + \\frac{1}{R_2} \\implies R_z = \\frac{R_1 \\cdot R_2}{R_1 + R_2}',
    description: 'Wypadkowy opór dwóch elementów połączonych równolegle.',
    variables: [
      { symbol: 'R_z', desc: 'Rezystancja wypadkowa zastępcza', unit: 'Ω' },
      { symbol: 'R1, R2', desc: 'Rezystory gałęziowe', unit: 'Ω' }
    ],
    example: 'Dla R1 = 100 Ω i R2 = 100 Ω: Rz = (100 · 100) / 200 = 50 Ω.'
  },
  {
    id: 'f-xc',
    name: 'Reaktancja pojemnościowa kondensatora',
    category: 'Prąd zmienny (AC)',
    formula: 'X_C = \\frac{1}{\\omega \\cdot C} = \\frac{1}{2 \\cdot \\pi \\cdot f \\cdot C}',
    description: 'Opór pozorny bierny, jaki kondensator stawia prądowi sinusoidalnie zmiennemu.',
    variables: [
      { symbol: 'Xc', desc: 'Reaktancja pojemnościowa', unit: 'Ω' },
      { symbol: 'f', desc: 'Częstotliwość sygnału AC', unit: 'Hz' },
      { symbol: 'C', desc: 'Pojemność kondensatora', unit: 'F (Farad)' }
    ],
    example: 'Dla f = 50 Hz i C = 10 µF: Xc ≈ 1 / (314,16 · 10^-5) ≈ 318,3 Ω.'
  },
  {
    id: 'f-xl',
    name: 'Reaktancja indukcyjna cewki',
    category: 'Prąd zmienny (AC)',
    formula: 'X_L = \\omega \\cdot L = 2 \\cdot \\pi \\cdot f \\cdot L',
    description: 'Opór pozorny bierny cewki indukcyjnej w obwodzie prądu zmiennego.',
    variables: [
      { symbol: 'X_L', desc: 'Reaktancja indukcyjna', unit: 'Ω' },
      { symbol: 'f', desc: 'Częstotliwość', unit: 'Hz' },
      { symbol: 'L', desc: 'Indukcyjność cewki', unit: 'H (Henr)' }
    ],
    example: 'Dla f = 1 kHz i L = 10 mH: XL = 2 · π · 1000 · 0,01 ≈ 62,8 Ω.'
  },
  {
    id: 'f-thomson',
    name: 'Wzór Thomsona (Częstotliwość rezonansowa RLC)',
    category: 'Prąd zmienny (AC)',
    formula: 'f_0 = \\frac{1}{2 \\cdot \\pi \\cdot \\sqrt{L \\cdot C}}',
    description: 'Częstotliwość rezonansu napięć lub prądów w obwodzie szeregowym/równoległym LC.',
    variables: [
      { symbol: 'f_0', desc: 'Częstotliwość rezonansowa', unit: 'Hz' },
      { symbol: 'L', desc: 'Indukcyjność', unit: 'H' },
      { symbol: 'C', desc: 'Pojemność', unit: 'F' }
    ],
    example: 'Dla L = 1 mH i C = 1 µF: f0 ≈ 1 / (6,283 · 3,162·10^-5) ≈ 5033 Hz ≈ 5,03 kHz.'
  },
  {
    id: 'f-opamp-inv',
    name: 'Wzmacniacz operacyjny odwracający fazę',
    category: 'Półprzewodniki',
    formula: 'k_u = -\\frac{R_f}{R_1} \\quad \\implies \\quad U_{wy} = -U_{we} \\cdot \\frac{R_f}{R_1}',
    description: 'Wzmocnienie napięciowe z ujemnym sprzężeniem zwrotnym z wejściem odwracającym (-).',
    variables: [
      { symbol: 'k_u', desc: 'Wzmocnienie napięciowe', unit: 'V/V' },
      { symbol: 'Rf', desc: 'Rezystor pętli sprzężenia zwrotnego', unit: 'Ω' },
      { symbol: 'R1', desc: 'Rezystor wejściowy', unit: 'Ω' }
    ],
    example: 'Dla Rf = 47 kΩ i R1 = 4,7 kΩ: Ku = -10 (sygnał odwrócony o 180° i 10x wzmocniony).'
  },
  {
    id: 'f-opamp-noninv',
    name: 'Wzmacniacz operacyjny nieodwracający fazy',
    category: 'Półprzewodniki',
    formula: 'k_u = 1 + \\frac{R_f}{R_1}',
    description: 'Wzmocnienie układu z sygnałem podawanym na wejście nieodwracające (+).',
    variables: [
      { symbol: 'k_u', desc: 'Wzmocnienie napięciowe (zawsze ≥ 1)', unit: 'V/V' },
      { symbol: 'Rf', desc: 'Rezystor sprzężenia', unit: 'Ω' },
      { symbol: 'R1', desc: 'Rezystor do masy', unit: 'Ω' }
    ],
    example: 'Dla Rf = 90 kΩ i R1 = 10 kΩ: Ku = 1 + (90/10) = 1 + 9 = 10.'
  },
  {
    id: 'f-led',
    name: 'Dobór rezystora ograniczającego prąd diody LED',
    category: 'Półprzewodniki',
    formula: 'R = \\frac{U_{zas} - U_F}{I_F}',
    description: 'Kluczowy wzór przy projektowaniu wskaźników optycznych.',
    variables: [
      { symbol: 'Uzas', desc: 'Napięcie zasilające obwód', unit: 'V' },
      { symbol: 'UF', desc: 'Spadek napięcia przewodzenia diody', unit: 'V' },
      { symbol: 'IF', desc: 'Znamionowy prąd pracy diody LED', unit: 'A' }
    ],
    example: 'Dla Uzas = 9 V, UF = 2 V, IF = 14 mA (0,014 A): R = 7 / 0,014 = 500 Ω.'
  }
];

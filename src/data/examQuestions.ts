import { QuizQuestion } from '../types';
import { ELM02_DIGITAL_SMD_QUESTIONS } from './elm02DigitalSmdQuestions';

const BASE_EXAM_QUESTIONS: QuizQuestion[] = [
  // =========================================================================
  // KWALIFIKACJA ELM.02 (Montaż oraz instalowanie układów i urządzeń elektronicznych)
  // =========================================================================

  // 1. [BHP i Ochrona ESD] - Oficjalne CKE
  {
    id: 'cke-elm02-new-01',
    qualification: 'ELM.02',
    category: 'BHP i Ochrona ESD',
    officialRef: 'ELM.02.1 (8)',
    question: 'Technik zajmujący się naprawą urządzenia bez odłączenia go od sieci doznał porażenia prądem elektrycznym. Jaka powinna być pierwsza czynność ratownicza?',
    options: [
      'Położenie poszkodowanego na brzuchu z odchyloną głową',
      'Natychmiastowe odłączenie zasilania lub odciągnięcie poszkodowanego od źródła prądu za pomocą izolatora',
      'Wykonanie wstrząsu defibrylatorem AED',
      'Podanie poszkodowanemu płynów do picia'
    ],
    correctAnswer: 1, // B
    hint: 'Pamiętaj o nadrzędnej zasadzie bezpieczeństwa ratownika przed przystąpieniem do pierwszej pomocy.',
    explanation: 'Pierwszym i kluczowym krokiem ratowniczym jest uwolnienie poszkodowanego spod napięcia poprzez bezpieczne wyłączenie zasilania lub użycie sprzętu dielektrycznego, aby ratownik sam nie uległ porażeniu.'
  },

  // 2. [Mierniki i Ustroje Pomiarowe] - Oficjalne CKE
  {
    id: 'cke-elm02-new-02',
    qualification: 'ELM.02',
    category: 'Mierniki i Ustroje Pomiarowe',
    officialRef: 'ELM.02.2 (8)',
    question: 'Jaki ustrój pomiarowy w mierniku analogowym wykorzystuje zjawisko wciągania miękkiego żelaza do wnętrza cewki, przez którą płynie mierzony prąd?',
    options: [
      'Magnetoelektryczny',
      'Elektromagnetyczny',
      'Elektrodynamiczny',
      'Indukcyjny'
    ],
    correctAnswer: 1, // B
    hint: 'Zwróć uwagę na ruchomy element ferromagnetyczny (miękkie żelazo) w polu nieruchomej cewki.',
    explanation: 'Ustrój elektromagnetyczny (ruchome żelazo) opiera się na oddziaływaniu pola magnetycznego cewki na element ferromagnetyczny. Cechuje go wysoka odporność mechaniczna i możliwość pomiaru prądu stałego oraz zmiennego.'
  },

  // 3. [Montaż i Technologia Lutowania] - Oficjalne CKE
  {
    id: 'cke-elm02-new-03',
    qualification: 'ELM.02',
    category: 'Montaż i Technologia Lutowania',
    officialRef: 'ELM.02.3 (3)',
    question: 'Które ze spoiw lutowniczych spełnia wymagania unijnej dyrektywy RoHS dotyczącej ograniczenia substancji niebezpiecznych w sprzęcie elektronicznym?',
    options: [
      'Sn60Pb40 (stop cynowo-ołowiowy)',
      'SAC305 (stop cynowo-srebrno-miedziowy)',
      'Stop ołowiu z bizmutem',
      'Czysty ołów z topnikiem kalafoniowym'
    ],
    correctAnswer: 1, // B
    hint: 'Dyrektywa RoHS eliminuje stopy zawierające ołów (Pb). Szukaj stopu bezołowiowego z zawartością srebra i miedzi.',
    explanation: 'Dyrektywa RoHS zakazuje stosowania ołowiu w urządzeniach komercyjnych. Zastąpiono go stopami bezołowiowymi, z których najbardziej popularny w montażu SMT/THT jest stop SAC305 (Sn96.5Ag3.0Cu0.5).'
  },

  // 4. [BHP i Ochrona ESD] - Oficjalne CKE
  {
    id: 'cke-elm02-new-04',
    qualification: 'ELM.02',
    category: 'BHP i Ochrona ESD',
    officialRef: 'ELM.02.1 (1, 6)',
    question: 'Jaka jest rola rezystora o wartości 1 MΩ wpiętego szeregowo w opaskę antystatyczną podłączoną do punktu uziemienia strefy EPA?',
    options: [
      'Służy do przyspieszenia rozładowania ładunku elektrostatycznego',
      'Chroni pracownika przed porażeniem prądem w przypadku dotknięcia elementu pod napięciem',
      'Zwiększa pojemność ładunku na powierzchni ciała',
      'Stanowi filtr zakłóceń elektromagnetycznych'
    ],
    correctAnswer: 1, // B
    hint: 'Zastanów się, co stałoby się z człowiekiem podłączonym czystym drutem do uziemienia w razie dotknięcia fazy 230 V.',
    explanation: 'Rezystor ochronny 1 MΩ w opasce ESD ogranicza prąd płynący przez ciało operatora do bezpiecznej wartości (poniżej 1 mA) w przypadku przypadkowego dotknięcia przewodów pod napięciem sieciowym.'
  },

  // 5. [Instalacje i Zabezpieczenia] - Oficjalne CKE
  {
    id: 'cke-elm02-new-05',
    qualification: 'ELM.02',
    category: 'Instalacje i Zabezpieczenia',
    officialRef: 'ELM.02.4 (5)',
    question: 'Wyłącznik różnicowoprądowy (RCD) o znamionowym prądzie różnicowym IΔn = 30 mA jest stosowany w instalacjach elektrycznych głównie w celu:',
    options: [
      'Zabezpieczenia obwodów przed zwarciem',
      'Zabezpieczenia transformatora przed przeciążeniem',
      'Ochrony dodatkowej przed porażeniem prądem (ochrona przeciwporażeniowa)',
      'Pomiaru zużycia energii elektrycznej'
    ],
    correctAnswer: 2, // C
    hint: 'Wartość 30 mA jest uznawana za maksymalny bezpieczny próg niepowodujący migotania komór serca.',
    explanation: 'Wyłączniki RCD o czułości 30 mA reagują na prąd upływu wywołany np. porażeniem człowieka lub uszkodzeniem izolacji, odłączając zasilanie w czasie poniżej 40 ms.'
  },

  // Dodatkowe zadania ELM.02 z podstaw elektrotechniki i montażu
  {
    id: 'cke-elm02-01',
    qualification: 'ELM.02',
    category: 'Podstawy elektrotechniki',
    officialRef: 'ELM.02.2 (3)',
    question: 'W obwodzie prądu stałego dwa oporniki R1 = 40 Ω i R2 = 60 Ω połączono równolegle. Ile wynosi wypadkowa rezystancja zastępcza tego układu?',
    options: ['24 Ω', '100 Ω', '50 Ω', '20 Ω'],
    correctAnswer: 0,
    hint: 'Zastosuj wzór na połączenie równoległe dwóch rezystorów: Rz = (R1 · R2) / (R1 + R2).',
    explanation: 'Dla dwóch rezystorów połączonych równolegle wzór na rezystancję zastępczą to:\nRz = (R1 · R2) / (R1 + R2) = (40 · 60) / (40 + 60) = 2400 / 100 = 24 Ω.'
  },
  {
    id: 'cke-elm02-02',
    qualification: 'ELM.02',
    category: 'Podstawy elektrotechniki',
    officialRef: 'ELM.02.2 (3)',
    question: 'Przez rezystor o oporze R = 220 Ω płynie prąd o natężeniu I = 50 mA. Jakie napięcie odłoży się na zaciskach tego rezystora?',
    options: ['11 V', '1,1 V', '4,4 V', '110 V'],
    correctAnswer: 0,
    hint: 'Zamień miliampery na ampery (50 mA = 0,05 A) i zastosuj prawo Ohma: U = I · R.',
    explanation: 'Z prawa Ohma: U = I · R = 0,05 A · 220 Ω = 11 V.'
  },
  {
    id: 'cke-elm02-03',
    qualification: 'ELM.02',
    category: 'Podstawy elektrotechniki',
    officialRef: 'ELM.02.2 (3)',
    question: 'Kondensator o pojemności C = 100 nF i cewka o indukcyjności L = 10 mH połączone są w obwód rezonansowy. Zgodnie ze wzorem Thomsona, częstotliwość rezonansowa f0 tego obwodu wynosi w przybliżeniu:',
    options: ['ok. 5,03 kHz', 'ok. 50,3 kHz', 'ok. 503 Hz', 'ok. 1,59 kHz'],
    correctAnswer: 0,
    hint: 'Wzór Thomsona: f0 = 1 / (2 · π · √(L · C)). Zwróć uwagę na przedrostki mH (10^-2 H) i nF (10^-7 F).',
    explanation: 'f0 = 1 / (2 · π · √(L · C)) = 1 / (2 · 3,1416 · √(10·10^-3 · 100·10^-9)) ≈ 5033 Hz ≈ 5,03 kHz.'
  },
  {
    id: 'cke-elm02-04',
    qualification: 'ELM.02',
    category: 'Podstawy elektrotechniki',
    officialRef: 'ELM.02.2 (3)',
    question: 'Jak zmieni się reaktancja pojemnościowa Xc kondensatora, jeśli częstotliwość f prądu sinusoidalnego wzrośnie dwukrotnie?',
    options: [
      'Zmaleje dwukrotnie',
      'Wzrośnie dwukrotnie',
      'Wzrośnie czterokrotnie',
      'Nie ulegnie zmianie'
    ],
    correctAnswer: 0,
    hint: 'Reaktancja pojemnościowa wyraża się wzorem Xc = 1 / (2 · π · f · C).',
    explanation: 'Ponieważ częstotliwość f znajduje się w mianowniku wzoru Xc = 1 / (2πfC), dwukrotny wzrost częstotliwości powoduje 2-krotne zmniejszenie reaktancji pojemnościowej kondensatora.'
  },
  {
    id: 'cke-elm02-05',
    qualification: 'ELM.02',
    category: 'Elementy i układy',
    officialRef: 'ELM.02.2 (4)',
    question: 'Główną zaletą diody Schottky’ego w porównaniu do standardowej diody krzemowej ze złączem p-n jest:',
    options: [
      'Niższy spadek napięcia w kierunku przewodzenia (0,3-0,4 V) oraz bardzo krótki czas przełączania',
      'Bardzo wysokie dopuszczalne napięcie wsteczne rzędu kilkunastu kilowoltów',
      'Możliwość pracy jako generator promieniowania laserowego',
      'Wbudowana rezystancja ujemna'
    ],
    correctAnswer: 0,
    hint: 'Dioda Schottky posiada złącze metal-półprzewodnik.',
    explanation: 'Dioda Schottky’ego bazuje na złączu metal-półprzewodnik (brak nośników mniejszościowych), dzięki czemu charakteryzuje się niskim spadkiem napięcia przewodzenia (0,3–0,4 V) i brakiem czasu retencji ładunku, co czyni ją idealną do zasilaczy impulsowych w.cz.'
  },
  {
    id: 'cke-elm02-06',
    qualification: 'ELM.02',
    category: 'Elementy i układy',
    officialRef: 'ELM.02.2 (4)',
    question: 'We wzmacniaczu odwracającym ze scalonym wzmacniaczem operacyjnym rezystor wejściowy wynosi R1 = 10 kΩ, a rezystor w pętli sprzężenia zwrotnego wynosi Rf = 100 kΩ. Wzmocnienie napięciowe Ku tego układu wynosi:',
    options: ['-10 V/V', '+10 V/V', '+11 V/V', '-100 V/V'],
    correctAnswer: 0,
    hint: 'Wzór na wzmocnienie wzmacniacza odwracającego to Ku = - (Rf / R1).',
    explanation: 'Dla wzmacniacza operacyjnego w konfiguracji odwracającej: Ku = -Rf / R1 = -100 kΩ / 10 kΩ = -10 (znak minus oznacza odwrócenie fazy sygnału o 180°).'
  },
  {
    id: 'cke-elm02-07',
    qualification: 'ELM.02',
    category: 'Elementy i układy',
    officialRef: 'ELM.02.2 (4)',
    question: 'W mostku prostowniczym Graetza zasilanym transformatorem napięciem sinusoidalnym o częstotliwości f = 50 Hz, częstotliwość tętnień napięcia wyprostowanego na wyjściu prostownika wynosi:',
    options: ['100 Hz', '50 Hz', '25 Hz', '200 Hz'],
    correctAnswer: 0,
    hint: 'Mostek Graetza jest prostownikiem dwupołówkowym.',
    explanation: 'Prostownik dwupołówkowy (mostkowy) przewodzi prąd w obu połówkach okresu napięcia zmiennego, dlatego częstotliwość pulsacji napięcia wyprostowanego ulega podwojeniu: f_tętnień = 2 · 50 Hz = 100 Hz.'
  },
  {
    id: 'cke-elm02-08',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Jaka jest liczba 1011 0110 (2) zapisana w systemie szesnastkowym (HEX)?',
    options: ['B6 (16)', 'A6 (16)', 'C5 (16)', '96 (16)'],
    correctAnswer: 0,
    hint: 'Podziel liczbę na czwórki bitów (tetrady): 1011 oraz 0110.',
    explanation: '1011 (2) = 8 + 2 + 1 = 11 w systemie dziesiętnym, co w zapisie HEX odpowiada literze B.\n0110 (2) = 4 + 2 = 6 w systemie HEX.\nZatem 1011 0110 (2) = B6 (16).'
  },
  {
    id: 'cke-elm02-09',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Bramka logiczna posiadająca dwa wejścia A i B daje stan 0 na wyjściu wyłącznie wtedy, gdy oba wejścia znajdują się w stanie 1 (A=1 i B=1). Jest to bramka:',
    options: ['NAND', 'AND', 'NOR', 'OR'],
    correctAnswer: 0,
    hint: 'Jest to zaprzeczenie iloczynu logicznego.',
    explanation: 'Bramka NAND (Not-AND) daje stan niski 0 tylko wtedy, gdy na wszystkich wejściach jest stan wysoki 1. W pozostałych przypadkach na wyjściu panuje 1.'
  },
  {
    id: 'cke-elm02-12',
    qualification: 'ELM.02',
    category: 'Montaż i Technologia Lutowania',
    officialRef: 'ELM.02.3 (3)',
    question: 'Podczas montażu układów ze stopem bezołowiowym RoHS (np. SAC305) optymalna temperatura grota stacji lutowniczej powinna wynosić około:',
    options: ['350°C – 370°C', '220°C – 240°C', '180°C – 200°C', '450°C – 500°C'],
    correctAnswer: 0,
    hint: 'Temperatura topnienia stopu SAC305 to ok. 217°C, do czego dodaje się naddatek termiczny ok. 130-150°C na spadek ciepła na padzie i grocie.',
    explanation: 'Stop bezołowiowy SAC305 topi się w temp. 217–221°C. Aby zapewnić właściwy transfer ciepła i szybkie zwilżenie pól lutowniczych bez ich przegrzania, temperaturę grota ustawia się na ok. 350–370°C.'
  },
  {
    id: 'cke-elm02-13',
    qualification: 'ELM.02',
    category: 'Montaż i Technologia Lutowania',
    officialRef: 'ELM.02.3 (5)',
    question: 'Wskaż prawidłowy opis wyglądu poprawnego połączenia lutowanego na płytce drukowanej PCB:',
    options: [
      'Gładka powierzchnia o wklęsłym menisku, łagodnie pokrywająca końcówkę elementu i pole lutownicze',
      'Matowa, ziarnista kulka cyny o wypukłym kształcie zakrywająca całkowicie wyprowadzenie',
      'Warstwa cyny z widocznymi mikropęknięciami wokół otworu metalizowanego',
      'Zimna cyna z widocznymi przypaleniami kalafonii rozlanymi na laminacie'
    ],
    correctAnswer: 0,
    hint: 'Prawidłowe zwilżenie charakteryzuje się wklęsłym kątem zwilżania (< 30°).',
    explanation: 'Prawidłowy lut charakteryzuje się wklęsłym meniskiem spoiwa, gładką powierzchnią, czystym kątem zwilżenia oraz wyraźnie zaznaczonym obrysem zalanego wyprowadzenia.'
  },
  {
    id: 'cke-elm02-14',
    qualification: 'ELM.02',
    category: 'Instalacje i Zabezpieczenia',
    officialRef: 'ELM.02.4 (5)',
    question: 'W którym układzie sieci elektroenergetycznej niskiego napięcia funkcja przewodu neutralnego i ochronnego połączona jest w jeden wspólny przewód PEN?',
    options: ['TN-C', 'TN-S', 'TT', 'IT'],
    correctAnswer: 0,
    hint: 'Litera C pochodzi od słowa "Combined" (połączony).',
    explanation: 'W układzie TN-C przewód neutralny N oraz ochronny PE tworzą wspólny przewód ochronno-neutralny PEN (TN-Combined).'
  },
  {
    id: 'cke-elm02-16',
    qualification: 'ELM.02',
    category: 'Instalacje i Zabezpieczenia',
    officialRef: 'ELM.02.4 (1)',
    question: 'Obudowa kamery zewnętrznej monitoringu CCTV posiada oznaczenie stopnia ochrony IP66. Oznacza to, że urządzenie jest:',
    options: [
      'Całkowicie pyłoszczelne i zabezpieczone przed silnymi strumieniami wody z dowolnego kierunku',
      'Odporne na ciągłe zanurzenie pod wodą na głębokość powyżej 5 metrów',
      'Zabezpieczone wyłącznie przed ciałami obcymi o średnicy powyżej 2,5 mm',
      'Przeznaczone do pracy wyłącznie wewnątrz suchych pomieszczeń'
    ],
    correctAnswer: 0,
    hint: 'Pierwsza cyfra 6 to maksymalna ochrona przed pyłem (pyłoszczelność), druga cyfra 6 to ochrona przed strugami wody pod ciśnieniem.',
    explanation: 'IP66: cyfra 6 oznacza pełną ochronę przed wnikaniem pyłu (pyłoszczelność), druga cyfra 6 oznacza odporność na silne strugi wody (100 l/min pod ciśnieniem 100 kPa).'
  },

  // =========================================================================
  // KWALIFIKACJA ELM.05 (Eksploatacja urządzeń elektronicznych)
  // =========================================================================

  // 6. [Instalacje Alarmowe SSWiN] - Oficjalne CKE
  {
    id: 'cke-elm05-new-06',
    qualification: 'ELM.05',
    category: 'Instalacje Alarmowe SSWiN',
    officialRef: 'ELM.05.3 (1)',
    question: 'Jaką główną funkcję pełni soczewka Fresnela zamontowana w obudowie pasywnej czujki ruchu PIR?',
    options: [
      'Emituje wiązki podczerwieni w stronę intruza',
      'Skupia promieniowanie podczerwone z chronionych stref na pyroelemencie',
      'Wyzwalana sygnałem radiowym włącza sabotaż',
      'Zapobiega zakłóceniom ze strony sieci Wi-Fi'
    ],
    correctAnswer: 1, // B
    hint: 'Pasywna czujka PIR niczego nie emituje (stąd passive) – jedynie odbiera i skupia promieniowanie cieplne.',
    explanation: 'Soczewka Fresnela podziale przestrzeń na strefy detekcji i skupia promieniowanie podczerwone (cieplne) emitowane przez ciało człowieka bezpośrednio na element piroelektryczny czujki.'
  },

  // 7. [Technika Światłowodowa] - Oficjalne CKE
  {
    id: 'cke-elm05-new-07',
    qualification: 'ELM.05',
    category: 'Technika Światłowodowa',
    officialRef: 'ELM.05.3 (3)',
    question: 'Czym charakteryzuje się światłowodowe złącze typu SC/APC w porównaniu ze złączem SC/UPC?',
    options: [
      'Czoło światłowodu w złączu SC/APC jest wypolerowane pod kątem 8 stopni, co zmniejsza odbicie zwrotne (Return Loss)',
      'SC/APC przenosi tylko sygnały elektryczne, a nie optyczne',
      'SC/APC ma zieloną obudowę i stosuje włókno szklane o średnicy 1 mm',
      'SC/APC jest przeznaczone wyłącznie do połączeń miedzianych RS-485'
    ],
    correctAnswer: 0, // A
    hint: 'Skrót APC oznacza Angled Physical Contact (szlif kątowy 8 stopni redukujący odbicia).',
    explanation: 'Złącza APC (Angled Physical Contact) posiadają czoło feruli zeszlifowane pod kątem 8°, co powoduje, że odbite światło ucieka do płaszcza i nie wraca do nadajnika. Rozpoznaje się je po zielonym kolorze obudowy.'
  },

  // 8. [Diagnostyka Podzespołów] - Oficjalne CKE
  {
    id: 'cke-elm05-new-08',
    qualification: 'ELM.05',
    category: 'Diagnostyka Podzespołów',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'Podczas testowania sprawnej diody prostowniczej krzemowej za pomocą cyfrowego multimetru w trybie "Test Diody", spadek napięcia w kierunku przewodzenia powinien wynosić około:',
    options: [
      '0.00 V',
      '0.15 V - 0.25 V',
      '0.60 V - 0.70 V',
      'Otwarty obwód (OL / 1)'
    ],
    correctAnswer: 2, // C
    hint: 'Dla krzemu (Si) napięcie kolana charakterystyki wynosi typowo ok. 0,7 V.',
    explanation: 'Złącze p-n diody krzemowej w stanie przewodzenia wykazuje naturalny spadek napięcia progowego rzędu 0,6 V - 0,7 V (dla diod germanowych jest to ok. 0,2 V - 0,3 V).'
  },

  // 9. [Diagnostyka Zasilaczy] - Oficjalne CKE
  {
    id: 'cke-elm05-new-09',
    qualification: 'ELM.05',
    category: 'Diagnostyka Zasilaczy',
    officialRef: 'ELM.05.4 (4, 9)',
    question: 'Jaki parametr kondensatora elektrolitycznego w zasilaczu impulsowym należy zmierzyć specjalnym miernikiem, aby ocenić jego stopień zużycia i starzenia, nawet jeśli pojemność mieści się w normie?',
    options: [
      'Indukcyjność uzwojenia (L)',
      'Zastępczą rezystancję szeregową (ESR)',
      'Rezystancję izolacji obudowy',
      'Współczynnik szumów termicznych'
    ],
    correctAnswer: 1, // B
    hint: 'ESR to Equivalent Series Resistance – pasożytniczy opór szeregowy rosnący wraz z wysychaniem elektrolitu.',
    explanation: 'Wysoki parametr ESR (Equivalent Series Resistance) w kondensatorach elektrolitycznych zasilaczy impulsowych wywołuje mocne nagrzewanie, spadek sprawności oraz tętnienia napięcia, mimo że nominalna pojemność w uF może jeszcze wydawać się poprawna.'
  },

  // 10. [Urządzenia Sieciowe IP] - Oficjalne CKE
  {
    id: 'cke-elm05-new-10',
    qualification: 'ELM.05',
    category: 'Urządzenia Sieciowe IP',
    officialRef: 'ELM.05.3 (5)',
    question: 'Które urządzenie sieciowe pracuje w 3. warstwie modelu OSI (warstwie sieciowej) i odpowiada za trasowanie pakietów IP pomiędzy różnymi podsieciami?',
    options: [
      'Przełącznik niezarządzalny (Switch Layer 2)',
      'Ruter (Router)',
      'Mostek sieciowy (Bridge)',
      'Repetytor sygnałowy (Repeater)'
    ],
    correctAnswer: 1, // B
    hint: 'Trasowanie pakietów IP (routing) to domena urządzeń warstwy 3 (Network Layer).',
    explanation: 'Ruter dokonuje trasowania (routingu) na podstawie adresów IP (Warstwa 3 OSI), łącząc odrębne sieci LAN/WAN. Przełączniki L2 pracują na adresach MAC (Warstwa 2).'
  },

  // Dodatkowe zadania ELM.05 z pomiarów i serwisu
  {
    id: 'cke-elm05-01',
    qualification: 'ELM.05',
    category: 'Technika Światłowodowa',
    officialRef: 'ELM.05.3 (3)',
    question: 'Światłowodowe złącze optyczne z polerowaniem APC (Angled Physical Contact) charakteryzuje się ferulą ściętą pod kątem 8° i posiada obudowę w kolorze:',
    options: ['Zielonym', 'Niebieskim', 'Szarym', 'Czerwonym'],
    correctAnswer: 0,
    hint: 'Zielony = APC (kąt 8°), Niebieski = UPC (płaski sferyczny 0°).',
    explanation: 'Złącza ze szlifem skośnym APC (8 stopni) są jednoznacznie kodowane kolorem ZIELONYM. Szlif ten zapobiega powrotowi fali odbitej do nadajnika laserowego.'
  },
  {
    id: 'cke-elm05-02',
    qualification: 'ELM.05',
    category: 'Technika Światłowodowa',
    officialRef: 'ELM.05.3 (4)',
    question: 'Do lokalizacji uszkodzenia, pomiaru tłumienności jednostkowej włókna oraz oceny jakości wykonanych spawów na długiej trasie światłowodowej stosuje się przyrząd:',
    options: [
      'Reflektometr optyczny OTDR (Optical Time Domain Reflectometer)',
      'Mostek Wheatstone’a',
      'Watomierz indukcyjny',
      'Generator funkcyjny z wobulatorem'
    ],
    correctAnswer: 0,
    hint: 'Przyrząd wysyła impulsy świetlne i analizuje zjawisko rozpraszania wstecznego Rayleigha.',
    explanation: 'OTDR (Optical Time Domain Reflectometer) wysyła impulsy światła i rejestruje sygnał rozpraszania Rayleigha oraz odbicia Fresnela, umożliwiając stworzenie wykresu (reflektogramu) ze wszystkimi złączami, spawami i przerwami.'
  },
  {
    id: 'cke-elm05-03',
    qualification: 'ELM.05',
    category: 'Mierniki i Ustroje Pomiarowe',
    officialRef: 'ELM.05.3 (9)',
    question: 'Na ekranie oscyloskopu ustawiono podstawę czasu Time/div na 2 ms/dz. Jeden pełny okres przebiegu sinusoidalnego zajmuje na osi poziomej dokładnie 5 działek. Częstotliwość f mierzonego sygnału wynosi:',
    options: ['100 Hz', '50 Hz', '200 Hz', '10 Hz'],
    correctAnswer: 0,
    hint: 'Okres T = liczba działek · współczynnik podstawy czasu. Częstotliwość f = 1 / T.',
    explanation: 'Okres sygnału: T = 5 dz · 2 ms/dz = 10 ms = 0,01 s.\nCzęstotliwość: f = 1 / T = 1 / 0,01 s = 100 Hz.'
  },
  {
    id: 'cke-elm05-04',
    qualification: 'ELM.05',
    category: 'Urządzenia Sieciowe IP',
    officialRef: 'ELM.05.3 (6)',
    question: 'Który z poniższych interfejsów komunikacyjnych wykorzystuje do transmisji sygnał różnicowy na dwuprzewodowej skrętce, umożliwiając zasięg magistrali do 1200 m w trudnych warunkach zakłóceń przemysłowych?',
    options: ['RS-485', 'RS-232', 'I2C', 'SPI'],
    correctAnswer: 0,
    hint: 'Popularny w protokole Modbus RTU i automatyce budynkowej.',
    explanation: 'Standard RS-485 wykorzystuje linie różnicowe A i B (napięcie różnicowe eliminuje zakłócenia składowej wspólnej), umożliwiając pracę na dystansie do 1200 m przy prędkości do 100 kbit/s.'
  },
  {
    id: 'cke-elm05-05',
    qualification: 'ELM.05',
    category: 'Diagnostyka Zasilaczy',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'W układzie zasilacza impulsowego przetwornica nie startuje, a na wyjściu napięcie wynosi 0 V. Bezpiecznik topikowy po stronie sieciowej 230 V jest nienaruszony. Od jakiego pomiaru należy rozpocząć diagnostykę?',
    options: [
      'Pomiaru napięcia stałego na głównym kondensatorze filtrującym po stronie pierwotnej (ok. 320 V DC)',
      'Natychmiastowej wymiany transformatora impulsowego',
      'Wylutowania procesora zarządzającego',
      'Zmierzenia temperatury radiatora dotykiem dłoni przy włączonym zasilaniu'
    ],
    correctAnswer: 0,
    hint: 'Sprawdź czy działa prostownik wejściowy i kondensator pierwotny.',
    explanation: 'Jeśli bezpiecznik nie uległ przepaleniu, pierwszym logicznym krokiem jest sprawdzenie czy mostek prostowniczy zasila główny kondensator elektrolityczny strony pierwotnej (napięcie wyprostowane 230V · √2 ≈ 325 V DC).'
  },
  {
    id: 'cke-elm05-07',
    qualification: 'ELM.05',
    category: 'Diagnostyka Podzespołów',
    officialRef: 'ELM.05.4 (10)',
    question: 'Podczas badania tranzystora bipolarnego NPN multimetrem w trybie testu diody, prawidłowy tranzystor wykazuje spadek napięcia w kierunku przewodzenia rzędu 0,6–0,7 V pomiędzy sondą czerwoną (+) a czarną (-) przyłożonymi odpowiednio do:',
    options: [
      'Bazy (+) i Emitera (-), oraz Bazy (+) i Kolektora (-)',
      'Kolektora (+) i Bazy (-)',
      'Emitera (+) i Kolektora (-)',
      'Kolektora (+) i Emitera (-)'
    ],
    correctAnswer: 0,
    hint: 'Tranzystor NPN można schematycznie wyobrazić sobie jako dwie diody połączone anodami w punkcie Bazy.',
    explanation: 'W tranzystorze NPN baza ma strukturę typu P, a emiter i kolektor typu N. Spadek napięcia złącza przewodzącego krzemowego (~0,6–0,7 V) występuje przy podłączeniu plusa miernika (anody) do Bazy, a minusa do Emitera lub Kolektora.'
  },
  {
    id: 'cke-elm05-08',
    qualification: 'ELM.05',
    category: 'Konserwacja i naprawa',
    officialRef: 'ELM.05.4 (5, 6)',
    question: 'Do czyszczenia zabrudzonych optyk laserowych, złączy światłowodowych oraz styków obwodów drukowanych z resztek topnika po lutowaniu należy używać:',
    options: [
      'Alkoholu izopropylowego o wysokiej czystości (IPA 99,9%)',
      'Acetonu technicznego',
      'Wody z kranu z dodatkiem detergentu',
      'Rozpuszczalnika nitro'
    ],
    correctAnswer: 0,
    hint: 'Preparat nie może rozpuszczać tworzyw sztucznych ani zostawiać osadów mineralnych.',
    explanation: 'Alkohol izopropylowy (IPA 99,9%) nie reaguje chemicznie z większością tworzyw, błyskawicznie odparowuje, doskonale usuwa żywice i kalafonię oraz nie pozostawia smug ani zanieczyszczeń.'
  }
];

export const EXAM_QUESTIONS: QuizQuestion[] = [
  ...BASE_EXAM_QUESTIONS,
  ...ELM02_DIGITAL_SMD_QUESTIONS
];

import { ModuleItem } from '../types';

export const CURRICULUM_MODULES: ModuleItem[] = [
  {
    id: 'elm02-bhp',
    qualificationId: 'ELM.02',
    code: 'ELM.02.1',
    title: 'Bezpieczeństwo i Higiena Pracy oraz Ochrona ESD',
    hours: 30,
    description: 'Zasady bezpiecznej pracy na stanowisku elektronika, ochrona przed wyładowaniami elektrostatycznymi (ESD), strefy EPA, pierwsza pomoc w porażeniach prądem.',
    lessons: [
      {
        id: 'lesson-esd-epa',
        qualificationId: 'ELM.02',
        moduleId: 'elm02-bhp',
        unitCode: 'ELM.02.1 (1, 6)',
        title: 'Ochrona antystatyczna (ESD) i organizacja strefy EPA',
        durationMinutes: 20,
        xpReward: 50,
        description: 'Poznaj genezę wyładowań elektrostatycznych, wpływ na układy scalone CMOS oraz zasady budowy bezpiecznego stanowiska EPA.',
        learningOutcomes: [
          'Rozpoznaje symbole związane z ochroną antystatyczną ESD',
          'Dobiera wyposażenie stanowiska pracy zgodnie z wymaganiami ochrony antystatycznej (mata, opaska, jonizatory)',
          'Wskazuje metody eliminacji niebezpiecznych ładunków elektrostatycznych'
        ],
        blocks: [
          {
            type: 'text',
            title: 'Dlaczego ładunki elektrostatyczne niszczą półprzewodniki?',
            content: 'Wyładowanie elektrostatyczne (ESD – Electrostatic Discharge) to nagły przepływ ładunku pomiędzy ciałami o różnych potencjałach. Człowiek odczuwa przeskok iskry dopiero od ok. 3000 V, podczas gdy bramki nowoczesnych tranzystorów MOSFET czy układów CMOS ulegają przebiciu dielektrycznemu już przy napięciach rzędu 20–100 V. Uszkodzenia mogą być ukryte (tzw. usterka utajona), co powoduje awarię urządzenia dopiero po kilku tygodniach pracy u klienta.'
          },
          {
            type: 'diagram',
            diagramType: 'esd_station',
            title: 'Schemat poprawnego stanowiska EPA (Electrostatic Protected Area)',
            content: 'Prawidłowe uziemienie: stół z matą rozpraszającą (rezystancja 10^6 - 10^9 Ω) połączony przez rezystor 1 MΩ z punktem EBP (Earth Bonding Point), uziemiona opaska na nadgarstku serwisanta, uziemione posadzki i obuwie antystatyczne.'
          },
          {
            type: 'table',
            title: 'Kluczowe elementy ochrony ESD wg normy PN-EN 61340-5-1',
            content: 'Zestawienie podstawowych środków ochrony i ich parametrów',
            tableData: {
              headers: ['Element stanowiska', 'Rola i wymaganie', 'Wartość rezystancji'],
              rows: [
                ['Opaska na rękę z przewodem', 'Odprowadzanie ładunku z ciała', 'Rezystor bezpieczeństwa 1 MΩ w przewodzie'],
                ['Mata stołowa antystatyczna', 'Bezpieczne odkładanie płytek PCB i układów', 'Rezystancja upływu: 10^6 do 10^9 Ω'],
                ['Pojemniki i folie ESD', 'Ekranowanie komponentów (torebki metalizowane)', 'Rezystancja powierzchniowa < 10^5 Ω'],
                ['Jonizator powietrza', 'Neutralizacja ładunków na dielektrykach (plastikach)', 'Zasięg roboczy 30–60 cm nad płytką']
              ]
            }
          },
          {
            type: 'warning',
            title: 'Złota zasada bezpieczeństwa personelu',
            content: 'Rezystor 1 MΩ w opasce nadgarstkowej i przewodach uziemiających matę NIE służy do ochrony elektroniki, lecz do OCHRONY ŻYCIA pracownika! W razie przypadkowego dotknięcia przewodu fazowego 230 V prąd rażenia nie przekroczy bezpiecznej wartości 0,23 mA.'
          }
        ],
        practiceQuestions: [
          {
            id: 'q-esd-1',
            qualification: 'ELM.02',
            category: 'BHP i ESD',
            question: 'Jaka jest główna rola rezystora o wartości 1 MΩ umieszczonego szeregowo w przewodzie opaski antystatycznej?',
            options: [
              'Zapewnienie ochrony pracownika przed porażeniem prądem w razie dotknięcia fazy sieci 230 V',
              'Przyspieszenie rozładowania ładunku z ciała do zera w ułamku nanosekundy',
              'Zapobieganie nagrzewaniu się opaski podczas lutowania',
              'Zwiększenie pojemności elektrycznej ciała serwisanta'
            ],
            correctAnswer: 0,
            explanation: 'Rezystor 1 MΩ ogranicza prąd przepływający przez ciało człowieka do wartości poniżej 1 mA w przypadku kontaktu z napięciem sieciowym 230 V, chroniąc przed śmiertelnym porażeniem.'
          }
        ]
      },
      {
        id: 'lesson-pierwsza-pomoc',
        qualificationId: 'ELM.02',
        moduleId: 'elm02-bhp',
        unitCode: 'ELM.02.1 (8)',
        title: 'Pierwsza pomoc przy porażeniu prądem i RKO',
        durationMinutes: 15,
        xpReward: 40,
        description: 'Algorytm postępowania ratowniczego, odłączenie zasilania, ocena stanu poszkodowanego oraz resuscytacja krążeniowo-oddechowa (RKO).',
        learningOutcomes: [
          'Zabezpiecza siebie i miejsce wypadku odcinając źródło prądu',
          'Ocenia stan przytomności i oddechu u poszkodowanego',
          'Prowadzi resuscytację krążeniowo-oddechową (30 uciśnięć : 2 wdechy)'
        ],
        blocks: [
          {
            type: 'text',
            title: 'Kroki ratownicze na stanowisku pracy elektronika',
            content: '1. Bezpieczeństwo własne: NIE dotykaj poszkodowanego, dopóki jest pod napięciem! Wyłącz wyłącznik awaryjny (grzybek) lub odłącz wtyczkę urządzenia.\n2. W razie braku możliwości wyłączenia: odciągnij poszkodowanego używając przedmiotu izolacyjnego (sucha drewniana deska, drążek izolacyjny).\n3. Ocena przytomności i drożności dróg oddechowych (odchylenie głowy, 10 sekund na ocenę oddechu: widzę, słyszę, czuję).\n4. Wezwanie pomocy: numer alarmowy 112 lub 999.\n5. Resuscytacja: 30 uciśnięć klatki piersiowej na głębokość 5-6 cm z częstością 100-120/min oraz 2 oddechy ratownicze (użyj AED jeśli dostępne).'
          },
          {
            type: 'tip',
            title: 'Wskazówka egzaminacyjna CKE',
            content: 'W pytaniach egzaminacyjnych pierwszym krokiem ratownika ZAWSZE jest odłączenie źródła zasilania lub użycie wyłącznika awaryjnego. Każda odpowiedź sugerująca bezpośrednie badanie tętna czy dotykanie poszkodowanego będącego pod napięciem jest błędna.'
          }
        ],
        practiceQuestions: [
          {
            id: 'q-bhp-2',
            qualification: 'ELM.02',
            category: 'BHP i ESD',
            question: 'Jaka jest pierwsza i bezwzględna czynność ratownika w przypadku porażenia prądem na pracowni elektronicznej?',
            options: [
              'Natychmiastowe odłączenie napięcia (wyłącznik awaryjny, wyjęcie wtyczki)',
              'Wykonanie resuscytacji krążeniowo-oddechowej 30:2',
              'Ułożenie poszkodowanego w pozycji bezpiecznej',
              'Poddanie poszkodowanemu wody do picia'
            ],
            correctAnswer: 0,
            explanation: 'Pierwszym i nadrzędnym krokiem jest zapewnienie bezpieczeństwa ratownika poprzez odcięcie zasilania.'
          }
        ]
      }
    ]
  },
  {
    id: 'elm02-podstawy',
    qualificationId: 'ELM.02',
    code: 'ELM.02.2',
    title: 'Podstawy Elektrotechniki i Elektroniki',
    hours: 180,
    description: 'Prawa Ohma i Kirchhoffa, dzielniki napięcia, parametry elementów RLC, diody półprzewodnikowe, tranzystory BJT/MOSFET, układy cyfrowe i bramki logiczne.',
    lessons: [
      {
        id: 'lesson-prawo-ohma-kirchhoffa',
        qualificationId: 'ELM.02',
        moduleId: 'elm02-podstawy',
        unitCode: 'ELM.02.2 (3)',
        title: 'Prawa Ohma i Kirchhoffa w obwodach prądu stałego',
        durationMinutes: 30,
        xpReward: 60,
        description: 'Fundament elektrotechniki: obliczanie natężenia, spadków napięć, rezystancji zastępczej oraz bilansu prądów i napięć.',
        learningOutcomes: [
          'Stosuje prawo Ohma do wyznaczania U, I, R oraz mocy P',
          'Stosuje I prawo Kirchhoffa (prądowe) dla węzła obwodu',
          'Stosuje II prawo Kirchhoffa (napięciowe) dla oczka obwodu',
          'Oblicza rezystancję zastępczą dla połączeń szeregowych i równoległych'
        ],
        blocks: [
          {
            type: 'formula',
            title: 'Prawo Ohma i bilans mocy',
            content: 'Natężenie prądu I płynącego przez przewodnik jest wprost proporcjonalne do przyłożonego napięcia U i odwrotnie proporcjonalne do jego rezystancji R.',
            formula: 'I = \\frac{U}{R} \\iff U = I \\cdot R \\iff R = \\frac{U}{I}',
            variables: [
              { symbol: 'U', name: 'Napięcie elektryczne', unit: 'Wolt [V]' },
              { symbol: 'I', name: 'Natężenie prądu', unit: 'Amper [A]' },
              { symbol: 'R', name: 'Rezystancja (opór)', unit: 'Om [Ω]' },
              { symbol: 'P', name: 'Moc elektryczna (P = U · I = I² · R = U² / R)', unit: 'Wat [W]' }
            ]
          },
          {
            type: 'text',
            title: 'Prawa Kirchhoffa',
            content: 'I Prawo Kirchhoffa (Węzłowe): Suma algebraiczna prądów wpływających do węzła jest równa sumie prądów wypływających z tego węzła (Σ I_we = Σ I_wy).\n\nII Prawo Kirchhoffa (Oczkowe): W dowolnym oczku zamkniętym obwodu suma algebraiczna sił elektromotorycznych (napięć źródłowych) jest równa sumie algebraicznej spadków napięć na rezystancjach (Σ E = Σ (I_k · R_k)).'
          },
          {
            type: 'table',
            title: 'Rezystancja zastępcza (Rz) w połączeniach',
            content: 'Podsumowanie wzorów na łączenie rezystorów',
            tableData: {
              headers: ['Typ połączenia', 'Wzór na rezystancję zastępczą', 'Charakterystyka obwodu'],
              rows: [
                ['Szeregowe (2 lub więcej)', 'R_z = R_1 + R_2 + ... + R_n', 'Taki sam prąd I przez wszystkie elementy; napięcia się sumują (U = U1 + U2)'],
                ['Równoległe (dowolna liczba)', '1 / R_z = 1/R_1 + 1/R_2 + ... + 1/R_n', 'Takie samo napięcie U na wszystkich elementach; prądy się sumują'],
                ['Równoległe (dwa rezystory)', 'R_z = (R_1 · R_2) / (R_1 + R_2)', 'Wygodny wzór iloczyn przez sumę dla 2 oporników; R_z zawsze mniejsze od najmniejszego']
              ]
            }
          }
        ],
        practiceQuestions: [
          {
            id: 'q-ohm-1',
            qualification: 'ELM.02',
            category: 'Podstawy elektrotechniki',
            question: 'Dwa rezystory o wartościach R1 = 30 Ω i R2 = 60 Ω połączono równolegle i podłączono do źródła napięcia stałego U = 12 V. Ile wynosi prąd pobierany ze źródła?',
            options: ['0,6 A', '0,4 A', '0,13 A', '1,2 A'],
            correctAnswer: 0,
            explanation: 'Rezystancja zastępcza połączenia równoległego: Rz = (30 * 60) / (30 + 60) = 1800 / 90 = 20 Ω. Z prawa Ohma: I = U / Rz = 12 V / 20 Ω = 0,6 A.'
          },
          {
            id: 'q-ohm-2',
            qualification: 'ELM.02',
            category: 'Podstawy elektrotechniki',
            question: 'Jaka moc wydzieli się na rezystorze R = 100 Ω, przez który płynie prąd o natężeniu I = 200 mA?',
            options: ['4 W', '20 W', '40 W', '0,4 W'],
            correctAnswer: 0,
            explanation: 'Pamiętamy o zamianie jednostek: I = 200 mA = 0,2 A. Wzór na moc: P = I² · R = (0,2)² · 100 = 0,04 · 100 = 4 W.'
          }
        ]
      },
      {
        id: 'lesson-dzielnik-napiecia',
        qualificationId: 'ELM.02',
        moduleId: 'elm02-podstawy',
        unitCode: 'ELM.02.2 (3)',
        title: 'Dzielnik napięcia i pomiary pośrednie',
        durationMinutes: 25,
        xpReward: 50,
        description: 'Zasada działania bezobciążeniowego i obciążonego dzielnika napięcia, wpływ rezystancji wejściowej woltomierza.',
        learningOutcomes: [
          'Wyprowadza i stosuje wzór na napięcie wyjściowe dzielnika',
          'Rozumie wpływ dołączenia odbiornika (obciążenia) na spadek napięcia',
          'Dobiera rezystory do uzyskania żądanego napięcia polaryzacji'
        ],
        blocks: [
          {
            type: 'formula',
            title: 'Wzór na dzielnik rezystancyjny (stan jałowy)',
            content: 'Napięcie wyjściowe U_wy pobierane z dolnego rezystora R2 w szeregowym połączeniu R1 i R2:',
            formula: 'U_{wy} = U_{we} \\cdot \\frac{R_2}{R_1 + R_2}',
            variables: [
              { symbol: 'U_we', name: 'Napięcie zasilające wejściowe', unit: 'Wolt [V]' },
              { symbol: 'U_wy', name: 'Napięcie wyjściowe na R2', unit: 'Wolt [V]' },
              { symbol: 'R1', name: 'Rezystor górny szeregowy', unit: 'Om [Ω]' },
              { symbol: 'R2', name: 'Rezystor dolny', unit: 'Om [Ω]' }
            ]
          },
          {
            type: 'diagram',
            diagramType: 'voltage_divider',
            title: 'Schemat dzielnika napięcia',
            content: 'Układ dwóch rezystorów połączonych szeregowo. Punkt środkowy daje napięcie proporcjonalne do stosunku R2 / (R1 + R2).'
          },
          {
            type: 'tip',
            title: 'Wpływ rezystancji miernika na pomiar',
            content: 'Idealny woltomierz ma rezystancję wewnętrzną Rv = ∞. Rzeczywisty multimetr cyfrowy ma typowo Rv = 10 MΩ. Jeśli dzielnik zbudowany jest z rezystorów o dużej wartości (np. 1 MΩ), podłączenie woltomierza zmieni wypadkową rezystancję dolnej gałęzi, powodując błąd pomiarowy (metoda bezpośrednia).'
          }
        ],
        practiceQuestions: [
          {
            id: 'q-div-1',
            qualification: 'ELM.02',
            category: 'Podstawy elektrotechniki',
            question: 'Dzielnik napięcia zasilany napięciem U_we = 24 V składa się z rezystorów R1 = 10 kΩ i R2 = 30 kΩ. Jakie napięcie U_wy panuje na rezystorze R2 w stanie jałowym?',
            options: ['18 V', '6 V', '12 V', '8 V'],
            correctAnswer: 0,
            explanation: 'U_wy = U_we · (R2 / (R1 + R2)) = 24 V · (30 kΩ / 40 kΩ) = 24 · 0,75 = 18 V.'
          }
        ]
      },
      {
        id: 'lesson-diody-polprzewodnikowe',
        qualificationId: 'ELM.02',
        moduleId: 'elm02-podstawy',
        unitCode: 'ELM.02.2 (4, 5)',
        title: 'Elementy półprzewodnikowe: Diody i ich zastosowania',
        durationMinutes: 30,
        xpReward: 55,
        description: 'Złącze p-n, polaryzacja w kierunku przewodzenia i zaporowym, diody krzemowe, Schottky, Zenera oraz diody świecące (LED).',
        learningOutcomes: [
          'Rozpoznaje symbole graficzne diod: prostowniczej, Zenera, Schottky, LED',
          'Wskazuje napięcie przewodzenia UF dla złącza krzemowego (~0,7V), germanowego (~0,3V) i Schottky (~0,3-0,4V)',
          'Wyjaśnia zjawisko lawinowego przebicia w diodzie Zenera i jej rolę stabilizacyjną',
          'Oblicza rezystor ograniczający prąd diody LED'
        ],
        blocks: [
          {
            type: 'text',
            title: 'Właściwości złącza p-n',
            content: 'Dioda półprzewodnikowa przewodzi prąd w jednym kierunku (od Anody do Katody), gdy potencjał anody przewyższa potencjał katody o tzw. napięcie progowe (kolano charakterystyki). Dla krzemu (Si) wynosi ono ok. 0,6–0,7 V, a dla germanu (Ge) 0,2–0,3 V. Przy polaryzacji zaporowej płynie jedynie znikomy prąd wsteczny mierzony w nA/μA, aż do osiągnięcia napięcia przebicia.'
          },
          {
            type: 'table',
            title: 'Rodzaje diod i kluczowe parametry',
            content: 'Zestawienie diod najczęściej spotykanych w arkuszach CKE',
            tableData: {
              headers: ['Typ diody', 'Napięcie progowe UF', 'Główne zastosowanie', 'Cecha szczególna'],
              rows: [
                ['Prostownicza (np. 1N4007)', '0,7 V (krzemowa)', 'Prostowniki sieciowe 50 Hz, zabezpieczenie przed zmianą biegunowości', 'Maksymalne napięcie wsteczne do 1000 V, prąd ciągły 1 A'],
                ['Schottky (np. 1N5819)', '0,3–0,4 V (złącze metal-półprzewodnik)', 'Zasilacze impulsowe, przetwornice DC-DC dużej częstotliwości', 'Bardzo krótki czas przełączania (brak ładunku pojemnościowego złącza)'],
                ['Zenera (np. BZX55C5V1)', 'Praca w kierunku ZAPOROWYM (Uz)', 'Stabilizacja napięcia odniesienia w zasilaczach liniowych', 'Utrzymuje stałe napięcie Uz w szerokim zakresie prądu zaporowego Iz'],
                ['LED (świecąca)', '1,8 V (czerwona) do 3,3 V (niebieska/biała)', 'Sygnalizacja optyczna, podświetlenia paneli', 'Wymaga bezwzględnie szeregowego rezystora ograniczającego prąd (typowo 10–20 mA)']
              ]
            }
          },
          {
            type: 'formula',
            title: 'Wzór na rezystor ograniczający prąd diody LED',
            content: 'Spadek napięcia na rezystorze wynosi (U_zas - U_F), zatem z prawa Ohma:',
            formula: 'R = \\frac{U_{zas} - U_F}{I_F}',
            variables: [
              { symbol: 'U_zas', name: 'Napięcie zasilania obwodu', unit: 'Wolt [V]' },
              { symbol: 'U_F', name: 'Napięcie przewodzenia diody LED (Forward Voltage)', unit: 'Wolt [V]' },
              { symbol: 'I_F', name: 'Znamionowy prąd diody (Forward Current, np. 0,02 A)', unit: 'Amper [A]' }
            ]
          }
        ],
        practiceQuestions: [
          {
            id: 'q-dio-1',
            qualification: 'ELM.02',
            category: 'Elementy i układy',
            question: 'Jaką wartość rezystora należy zastosować do zasilenia czerwonej diody LED (UF = 2,0 V, IF = 20 mA) ze źródła napięcia stałego Uzas = 12 V?',
            options: ['500 Ω', '600 Ω', '100 Ω', '1 kΩ'],
            correctAnswer: 0,
            explanation: 'R = (Uzas - UF) / IF = (12 V - 2 V) / 0,02 A = 10 V / 0,02 A = 500 Ω.'
          },
          {
            id: 'q-dio-2',
            qualification: 'ELM.02',
            category: 'Elementy i układy',
            question: 'W jakim kierunku polaryzowana jest dioda Zenera, gdy pełni funkcję elementu stabilizującego napięcie?',
            options: ['W kierunku zaporowym', 'W kierunku przewodzenia', 'Naprzemiennie', 'W stanie zwarcia'],
            correctAnswer: 0,
            explanation: 'Dioda Zenera wykorzystuje kontrolowane przebicie zaporowe do utrzymywania stałego napięcia Uz przy polaryzacji zaporowej (katoda do potencjału wyższego).'
          }
        ]
      },
      {
        id: 'lesson-bramki-logiczne',
        qualificationId: 'ELM.02',
        moduleId: 'elm02-podstawy',
        unitCode: 'ELM.02.2 (6, 7)',
        title: 'Bramki logiczne i algebra Boole’a w technice cyfrowej',
        durationMinutes: 35,
        xpReward: 65,
        description: 'Bramki AND, OR, NOT, NAND, NOR, XOR, tabele prawdy, prawa De Morgana oraz układy kombinacyjne.',
        learningOutcomes: [
          'Zna symbole graficzne bramek w normie ANSI (amerykańska) i IEC (europejska)',
          'Definiuje funkcje logiczne i odczytuje tablice prawdy',
          'Stosuje prawa De Morgana do przekształcania schematów na bramki NAND/NOR',
          'Określa poziomy napięć stanów logicznych TTL (0: 0-0.8V, 1: 2.0-5.0V) i CMOS'
        ],
        blocks: [
          {
            type: 'text',
            title: 'Podstawowe operacje algebry Boole’a',
            content: 'Elektronika cyfrowa operuje na stanach dwuwartościowych: 0 (fałsz / niski stan napięcia LOW) oraz 1 (prawda / wysoki stan napięcia HIGH).\n\n1. Iloczyn logiczny (Koniunkcja - AND): Y = A · B (wyjście 1 tylko gdy OBA wejścia są 1).\n2. Suma logiczna (Alternatywa - OR): Y = A + B (wyjście 1 gdy CHOCIAŻ JEDNO wejście to 1).\n3. Negacja (Inwerter - NOT): Y = ¬A lub Ā (odwrócenie stanu logicznego).\n4. Dysjunkcja (NAND): Negacja iloczynu, uniwersalna bramka funkcjonalnie pełna.\n5. Negacja sumy (NOR): Negacja alternatywy, również bramka uniwersalna.\n6. Różnica symetryczna (XOR): Y = A ⊕ B (wyjście 1 gdy wejścia RÓŻNIĄ się od siebie).'
          },
          {
            type: 'formula',
            title: 'Prawa De Morgana',
            content: 'Niezbędne w arkuszach egzaminacyjnych przy zadaniach z minimalizacji funkcji cyfrowych:',
            formula: '\\overline{A \\cdot B} = \\overline{A} + \\overline{B} \\quad \\text{oraz} \\quad \\overline{A + B} = \\overline{A} \\cdot \\overline{B}',
            variables: [
              { symbol: 'A, B', name: 'Zmienne logiczne (0 lub 1)', unit: 'Stan binarny' }
            ]
          },
          {
            type: 'table',
            title: 'Standardy poziomów logicznych układów scalonych',
            content: 'Porównanie poziomów napięciowych logiki TTL 5V i CMOS 5V',
            tableData: {
              headers: ['Standard', 'Napięcie zasilania Vcc', 'Stan niski logiczny (0)', 'Stan wysoki logiczny (1)', 'Stan zabroniony (nieustalony)'],
              rows: [
                ['TTL (seria 74xx)', '5,0 V ± 5%', '0,0 V do 0,8 V', '2,0 V do 5,0 V', '0,8 V do 2,0 V'],
                ['CMOS (seria 4000 / 74HC)', '3,0 V do 15,0 V (lub 5V)', '< 0,3 · Vdd (np. <1,5 V)', '> 0,7 · Vdd (np. >3,5 V)', '1,5 V do 3,5 V']
              ]
            }
          }
        ],
        practiceQuestions: [
          {
            id: 'q-log-1',
            qualification: 'ELM.02',
            category: 'Układy cyfrowe',
            question: 'Która dwuwejściowa bramka logiczna daje na wyjściu stan logiczny 1 wtedy i tylko wtedy, gdy na wejściach panują różne stany logiczne (0 i 1 lub 1 i 0)?',
            options: ['Bramka XOR (Exclusive-OR)', 'Bramka AND', 'Bramka NOR', 'Bramka XNOR'],
            correctAnswer: 0,
            explanation: 'Bramka XOR (Exclusive-OR) realizuje funkcję sumy symetrycznej: daje 1 na wyjściu, gdy dokładnie jedno z wejść ma stan 1.'
          },
          {
            id: 'q-log-2',
            qualification: 'ELM.02',
            category: 'Układy cyfrowe',
            question: 'Zgodnie z I prawem De Morgana negacja iloczynu logicznego ~(A · B) jest równoważna wyrażeniu:',
            options: ['~A + ~B (suma zanegowanych zmiennych)', '~A · ~B', 'A + B', '~(A + B)'],
            correctAnswer: 0,
            explanation: 'Pierwsze prawo De Morgana mówi, że zaprzeczenie koniunkcji jest równe alternatywie zaprzeczeń: ~(A · B) = ~A + ~B.'
          }
        ]
      }
    ]
  },
  {
    id: 'elm02-montaz',
    qualificationId: 'ELM.02',
    code: 'ELM.02.3',
    title: 'Montaż i Demontaż Układów Elektronicznych (THT i SMD)',
    hours: 180,
    description: 'Technologia montażu przewlekanego i powierzchniowego, spoiwa bezołowiowe i ołowiowe, topniki, identyfikacja wad lutowniczych, obsługa stacji lutowniczych i rozlutownic.',
    lessons: [
      {
        id: 'lesson-lutowanie-tht-smd',
        qualificationId: 'ELM.02',
        moduleId: 'elm02-montaz',
        unitCode: 'ELM.02.3 (2, 3, 4, 5)',
        title: 'Technologia lutowania miękkiego, spoiwa i inspekcja połączeń',
        durationMinutes: 30,
        xpReward: 60,
        description: 'Profile temperaturowe lutowania, skład stopów lutowniczych, topniki, wady połączeń lutowanych na płytkach drukowanych PCB.',
        learningOutcomes: [
          'Dobiera temperaturę grota lutownicy do spoiwa ołowiowego (~300-330°C) i bezołowiowego SAC305 (~350-380°C)',
          'Wskazuje rodzaje i zastosowanie topników kalafoniowych i typu No-Clean',
          'Rozpoznaje wady połączeń lutowanych: zimny lut, mostki lutownicze, nadmiar lub brak spoiwa'
        ],
        blocks: [
          {
            type: 'text',
            title: 'Spoiwa lutownicze: Sn63Pb37 vs SAC305 (RoHS)',
            content: 'Tradycyjny stop eutektyczny ołowiowy Sn63Pb37 (63% cyny, 37% ołowiu) ma temperaturę topnienia 183°C. Po wejściu w życie dyrektywy unijnej RoHS w produkcji komercyjnej obowiązują stopy bezołowiowe, najczęściej SAC305 (96,5% Sn, 3,0% Ag, 0,5% Cu) o temperaturze topnienia ok. 217–221°C. Wymaga to wyższej temperatury grota lutownicy (350–380°C) oraz większej ostrożności, aby nie odparzyć pól lutowniczych (padów) na laminacie FR4.'
          },
          {
            type: 'table',
            title: 'Wady lutowania rozpoznawane w arkuszach CKE',
            content: 'Typowe usterki montażowe i ich przyczyny',
            tableData: {
              headers: ['Nazwa wady lutowniczej', 'Objaw wizualny', 'Przyczyna usterki', 'Sposób naprawy'],
              rows: [
                ['Zimny lut (Cold joint)', 'Matowa, ziarnista powierzchnia spoiwa, brak menisku wklęsłego', 'Zbyt niska temperatura grota, poruszenie elementem podczas krzepnięcia, brak topnika', 'Oczyszczenie, dodanie świeżego topnika, dogrzanie grotem do pełnego rozpływu'],
                ['Mostek lutowniczy (Solder bridge)', 'Zwarcie cynowe między sąsiednimi nóżkami układu lub padami', 'Zbyt duża ilość spoiwa, zanieczyszczony grot', 'Użycie plecionki miedzianej (knot rozlutowniczy) nasączonej topnikiem lub odsysacza'],
                ['Oderwany pad / ścieżka', 'Pole lutownicze odkleja się od laminatu FR-4', 'Zbyt długi czas grzania (>3-4 s) lub zbyt wysoka temperatura (>400°C)', 'Konieczność wykonania połączenia krosowego cienkim przewodem kynar'],
                ['Efekt nagrobkowy (Tombstoning)', 'Element SMD (np. 0805) unosi się pionowo na jednym padzie', 'Nierównomierne nagrzewanie padów lub nierównomierna ilość pasty lutowniczej', 'Wyrównanie padów gorącym powietrzem (hot-air) z dociśnięciem pęsetą']
              ]
            }
          },
          {
            type: 'tip',
            title: 'Jak wygląda idealne połączenie lutowane?',
            content: 'Prawidłowy lut ma gładką, błyszczącą (lub satynową przy bezołowiu) powierzchnię, tworzy wyraźny WKLĘSŁY menisk łagodnie przechodzący z wyprowadzenia na pole lutownicze, a końcówka elementu jest widoczna pod warstwą cyny.'
          }
        ],
        practiceQuestions: [
          {
            id: 'q-mon-1',
            qualification: 'ELM.02',
            category: 'Montaż THT/SMD',
            question: 'Co jest bezpośrednią przyczyną powstania tzw. „zimnego lutu” podczas ręcznego lutowania elementów elektronicznych?',
            options: [
              'Niedogrzanie łączonych elementów lub poruszenie końcówką podczas stygnięcia',
              'Użycie zbyt cienkiego spoiwa cynowego o średnicy 0,5 mm',
              'Zastosowanie maty antystatycznej na stole roboczym',
              'Zbyt krótki czas studzenia płytki'
            ],
            correctAnswer: 0,
            explanation: 'Zimny lut powstaje w wyniku zbyt niskiej temperatury podgrzania końcówki i pola lutowniczego lub na skutek drgań/poruszenia elementu w fazie krystalizacji spoiwa.'
          },
          {
            id: 'q-mon-2',
            qualification: 'ELM.02',
            category: 'Montaż THT/SMD',
            question: 'Które z narzędzi jest najbardziej odpowiednie do usunięcia zwarcia cynowego (mostka lutowniczego) spomiędzy gęsto upakowanych wyprowadzeń układu scalonego SMD w obudowie QFP?',
            options: [
              'Plecionka miedziana nasączona topnikiem (knot rozlutowniczy)',
              'Szczypce boczne tnące',
              'Wkrętak płaski izolowany',
              'Pilnik iglak do metalu'
            ],
            correctAnswer: 0,
            explanation: 'Plecionka miedziana przyłożona do zwarcia wraz z podgrzanym grotem lutownicy zasysa nadmiar cyny dzięki zjawisku kapilarnemu.'
          }
        ]
      }
    ]
  },
  {
    id: 'elm02-instalacje',
    qualificationId: 'ELM.02',
    code: 'ELM.02.4',
    title: 'Wykonywanie Instalacji Urządzeń Elektronicznych',
    hours: 360,
    description: 'Układy sieci zasilających TN-S, TN-C, TT, IT, zabezpieczenia nadprądowe i różnicowoprądowe (RCD), instalacje SSWiN, CCTV, domofonowe, RTV-SAT i klasy ochrony IP.',
    lessons: [
      {
        id: 'lesson-sieci-zasilajace-bezpieczniki',
        qualificationId: 'ELM.02',
        moduleId: 'elm02-instalacje',
        unitCode: 'ELM.02.4 (5)',
        title: 'Układy sieci zasilających (TN-S, TN-C, TT) i zabezpieczenia instalacji',
        durationMinutes: 30,
        xpReward: 65,
        description: 'Klasyfikacja układów sieci nn, dobór przewodów L, N, PE, charakterystyki wyłączników nadprądowych B, C, D oraz wyłączników różnicowoprądowych RCD.',
        learningOutcomes: [
          'Rozpoznaje układy sieciowe TN-S (rozdzielony PE i N), TN-C (wspólny PEN), TT i IT',
          'Wskazuje kolory izolacji żył: Faza L (brązowy/czarny/szary), Neutralny N (niebieski), Ochronny PE (żółto-zielony)',
          'Dobiera charakterystykę wyłącznika nadprądowego (B - oświetlenie, C - silniki/transformatory, D - duży prąd rozruchowy)',
          'Objaśnia działanie wyłącznika różnicowoprądowego RCD o prądzie zadziałania 30 mA'
        ],
        blocks: [
          {
            type: 'text',
            title: 'Układy sieci zasilających niskiego napięcia (230/400V)',
            content: 'W instalacjach elektrycznych wyróżnia się oznaczenia literowe:\nPierwsza litera określa stan punktu neutralnego transformatora (T – uziemiony, I – izolowany od ziemi).\nDruga litera określa stan części przewodzących dostępnych odbiorników (N – połączone z punktem neutralnym, T – uziemione niezależnym uziomem).\nKolejne litery oznaczają rozdział przewodów: S (Separate – rozdzielony przewód neutralny N i ochronny PE), C (Combined – wspólny przewód PEN).\n\nObecnym standardem w budownictwie jest układ TN-S z 3 przewodami w instalacji 1-fazowej: L (faza), N (neutralny), PE (ochronny).'
          },
          {
            type: 'table',
            title: 'Charakterystyki wyzwalania wyłączników nadprądowych (MCB)',
            content: 'Krotność prądu znamionowego In powodująca natychmiastowe zadziałanie wyzwalacza elektromagnetycznego',
            tableData: {
              headers: ['Typ charakterystyki', 'Krotność prądu zwarciowego (Ia / In)', 'Zastosowanie w elektronice i budownictwie'],
              rows: [
                ['Charakterystyka B', '3 do 5 · In', 'Obwody oświetleniowe, obwody gniazd wtykowych ogólnego przeznaczenia (odbiorniki rezystancyjne)'],
                ['Charakterystyka C', '5 do 10 · In', 'Zasilacze transformatorowe, silniki elektryczne, urządzenia o umiarkowanym prądzie udarowym załączania'],
                ['Charakterystyka D', '10 do 20 · In', 'Transformatory toroidalne dużej mocy, spawarki, falowniki przemysłowe o bardzo dużym prądzie rozruchu']
              ]
            }
          },
          {
            type: 'warning',
            title: 'Zasada stosowania wyłącznika różnicowoprądowego RCD',
            content: 'Wyłącznik RCD (najczęściej o prądzie różnicowym IΔn = 30 mA) chroni przed skutkami dotyku pośredniego i bezpośredniego. Działa poprzez porównanie sumy prądów w przewodach fazowych i neutralnym za pomocą przekładnika Ferrantiego. W układzie sieci TN-C stosowanie wyłączników RCD jest NIEDOPUSZCZALNE z powodu braku wydzielonego przewodu ochronnego PE!'
          }
        ],
        practiceQuestions: [
          {
            id: 'q-inst-1',
            qualification: 'ELM.02',
            category: 'Instalacje',
            question: 'Jaki kolor izolacji musi bezwzględnie posiadać przewód ochronny (PE) w instalacji elektrycznej zgodnie z obowiązującą normą PN-HD 60364?',
            options: ['Żółto-zielony', 'Jasnoniebieski', 'Brązowy', 'Czarny'],
            correctAnswer: 0,
            explanation: 'Przewód ochronny PE jest bezwzględnie oznaczany dwubarwną kombinacją żółto-zieloną. Kolor niebieski jest zarezerwowany dla przewodu neutralnego N.'
          },
          {
            id: 'q-inst-2',
            qualification: 'ELM.02',
            category: 'Instalacje',
            question: 'Który wyłącznik nadprądowy należy dobrać do zabezpieczenia obwodu zasilającego transformator sieciowy o znacznym prądzie rozruchowym?',
            options: [
              'Wyłącznik o charakterystyce C',
              'Wyłącznik o charakterystyce B',
              'Wyłącznik o charakterystyce A',
              'Standardowy bezpiecznik topikowy bardzo szybki'
            ],
            correctAnswer: 0,
            explanation: 'Do obwodów z odbiornikami indukcyjnymi (np. silniki, transformatory zasilaczy), które pobierają podwyższony prąd przy włączaniu, stosuje się wyłączniki o charakterystyce C (krotność 5-10 In).'
          }
        ]
      },
      {
        id: 'lesson-instalacje-cctv-sswin',
        qualificationId: 'ELM.02',
        moduleId: 'elm02-instalacje',
        unitCode: 'ELM.02.4 (2, 3, 4)',
        title: 'Systemy zabezpieczeń technicznych: SSWiN, CCTV i klasy IP',
        durationMinutes: 30,
        xpReward: 55,
        description: 'Struktura systemów sygnalizacji włamania (SSWiN), linie parametryzowane EOL/2EOL, monitoring wizyjny IP PoE oraz stopnie ochrony obudów IP.',
        learningOutcomes: [
          'Rozróżnia czujki ruchu PIR, kontaktrony magnetyczne oraz bariery podczerwieni',
          'Objaśnia parametryzację linii dozorowych EOL (jeden rezystor) oraz 2EOL/NC (dwa rezystory: alarm i sabotaż TAMPER)',
          'Interpretuje kod IPXX (np. IP65 - pyłoszczelna i odporna na strugi wody)'
        ],
        blocks: [
          {
            type: 'text',
            title: 'Linie parametryzowane 2EOL/NC w centralach alarmowych',
            content: 'W nowoczesnych systemach SSWiN stosuje się linie 2EOL/NC (dwuparametryczne). W czujce PIR umieszcza się dwa rezystory (np. 2x 1,1 kΩ lub 2x 2,2 kΩ):\n- Stan czuwania (brak ruchu, obudowa zamknięta): centrala mierzy rezystancję R (np. 1,1 kΩ).\n- Stan alarmu (wykryty ruch, rozwarcie styków NC): w obwód włączają się oba rezystory szeregowo -> centrala mierzy 2R (np. 2,2 kΩ).\n- Stan sabotażu (przecięcie przewodu): rozwarcie obwodu -> rezystancja ∞.\n- Stan sabotażu (zwarcie żył przewodu): rezystancja 0 Ω.\nDzięki temu centrala rozróżnia alarm od próby zniszczenia instalacji!'
          },
          {
            type: 'table',
            title: 'Stopnie ochrony obudów urządzeń (Kod IP wg PN-EN 60529)',
            content: 'Pierwsza cyfra: ochrona przed ciałami stałymi (0-6). Druga cyfra: ochrona przed wodą (0-8).',
            tableData: {
              headers: ['Oznaczenie IP', 'Pierwsza cyfra (ciała stałe / pył)', 'Druga cyfra (ciecze / woda)', 'Typowe zastosowanie'],
              rows: [
                ['IP20', '2: Ciała stałe > 12,5 mm (palec)', '0: Brak ochrony', 'Wnętrza budynków, sucha tablica rozdzielcza'],
                ['IP44', '4: Ciała stałe > 1 mm (drut)', '4: Bryzgi wody z dowolnego kierunku', 'Łazienki, zadaszone korytarze'],
                ['IP65', '6: Pełna pyłoszczelność (brak wnikania pyłu)', '5: Strumień wody (12,5 l/min)', 'Kamery zewnętrzne CCTV, oprawy zewnętrzne'],
                ['IP67 / IP68', '6: Pełna pyłoszczelność', '7/8: Zanurzenie krótkotrwałe lub ciągłe w wodzie', 'Urządzenia pracujące w studzienkach teletechnicznych']
              ]
            }
          }
        ],
        practiceQuestions: [
          {
            id: 'q-sswin-1',
            qualification: 'ELM.02',
            category: 'Instalacje',
            question: 'W linii alarmowej 2EOL/NC o rezystorach parametrycznych 2x 1,1 kΩ centrala zmierzyła rezystancję bliską 0 Ω. Co to oznacza?',
            options: [
              'Sabotaż linii (zwarcie przewodów w kablu)',
              'Prawidłowy stan czuwania czujki',
              'Wykrycie ruchu przez czujkę (stan alarmu)',
              'Przecięcie przewodu zasilającego'
            ],
            correctAnswer: 0,
            explanation: 'Rezystancja 0 Ω oznacza zwarcie przewodów na trasie linii parametryzowanej, co centrala interpretuje jako próbę sabotażu (stan TAMPER).'
          }
        ]
      }
    ]
  },
  {
    id: 'elm05-pomiary',
    qualificationId: 'ELM.05',
    code: 'ELM.05.3',
    title: 'Użytkowanie Urządzeń Elektronicznych i Pomiary Sygnałów',
    hours: 150,
    description: 'Technologia światłowodowa (włókna SM/MM, złącza APC/UPC, pomiary OTDR), magistrale szeregowe i interfejsy cyfrowe (I2C, SPI, UART, RS-485), pomiary oscyloskopowe.',
    lessons: [
      {
        id: 'lesson-swiatlowody',
        qualificationId: 'ELM.05',
        moduleId: 'elm05-pomiary',
        unitCode: 'ELM.05.3 (3, 4)',
        title: 'Transmisja światłowodowa, typy włókien i złącza optyczne',
        durationMinutes: 30,
        xpReward: 60,
        description: 'Budowa włókna światłowodowego, zjawisko całkowitego wewnętrznego odbicia, jednomodowe vs wielomodowe, złącza SC/APC, pomiary reflektometrem OTDR.',
        learningOutcomes: [
          'Rozróżnia światłowody jednomodowe SM (rdzeń 9 µm, okna 1310/1550 nm) i wielomodowe MM (rdzeń 50 lub 62,5 µm, okna 850/1300 nm)',
          'Wskazuje zalety polerowania złączy APC (szlif kątowy 8 stopni, zielony kolor) w porównaniu do UPC (niebieski)',
          'Interpretuje reflektogram optyczny OTDR: zdarzenia refleksyjne (złącza) i nierefleksyjne (spawy, zgięcia)'
        ],
        blocks: [
          {
            type: 'text',
            title: 'Światłowody jednomodowe (SM) vs wielomodowe (MM)',
            content: 'Transmisja światła w światłowodzie opiera się na zjawisku całkowitego wewnętrznego odbicia na granicy rdzenia (wyższy współczynnik załamania n1) i płaszcza (niższy współczynnik załamania n2).\n\n- Włókno wielomodowe (Multi-Mode, MM): Duża średnica rdzenia (50 lub 62,5 µm) pozwala na rozchodzenie się wielu modów (promieni pod różnymi kątami), co wywołuje dyspersję modową ograniczającą zasięg do kilkuset metrów (lokalne sieci LAN, centra danych).\n- Włókno jednomodowe (Single-Mode, SM): Bardzo mały rdzeń (9 µm) pozwala na propagację tylko jednego modu osiowego. Brak dyspersji modowej umożliwia transmisję na odległości dziesiątek i setek kilometrów!'
          },
          {
            type: 'table',
            title: 'Złącza optyczne i rodzaje szlifów',
            content: 'Kolorystyka złączy światłowodowych ma ścisłe znaczenie techniczne!',
            tableData: {
              headers: ['Typ szlifu feruli', 'Kąt ścięcia', 'Kolor złącza / osłonki', 'Tłumienie odbicia wstecznego (Return Loss)', 'Zastosowanie'],
              rows: [
                ['PC (Physical Contact)', 'Płaski / lekko sferyczny (0°)', 'Czarny / szary', '> 30 dB', 'Starsze sieci wielomodowe'],
                ['UPC (Ultra Physical Contact)', 'Płaski sferyczny polerowany (0°)', 'Niebieski', '> 50 dB', 'Telekomunikacja cyfrowa, sieci Ethernet'],
                ['APC (Angled Physical Contact)', 'Ścięty pod kątem 8°', 'Zielony', '> 60 dB', 'Telewizja kablowa CATV, sieci FTTH GPON, sygnały analogowe (odbicie ucieka do płaszcza)']
              ]
            }
          },
          {
            type: 'warning',
            title: 'Nigdy nie łącz złącza UPC z APC!',
            content: 'Połączenie wtyku zielonego APC (szlif 8°) z niebieskim UPC (szlif płaski 0°) spowoduje mechaniczne zniszczenie delikatnej ceramicznej feruli oraz drastyczny wzrost tłumienia toru optycznego!'
          }
        ],
        practiceQuestions: [
          {
            id: 'q-opt-1',
            qualification: 'ELM.05',
            category: 'Pomiary i diagnostyka',
            question: 'Jaki kolor obudowy posiada złącze światłowodowe z ferulą szlifowaną pod kątem 8 stopni (standard APC)?',
            options: ['Zielony', 'Niebieski', 'Czarny', 'Czerwony'],
            correctAnswer: 0,
            explanation: 'Złącza APC (Angled Physical Contact, szlif 8°) są zgodnie ze standardem oznaczane kolorem zielonym. Kolor niebieski oznacza szlif UPC (0°).'
          },
          {
            id: 'q-opt-2',
            qualification: 'ELM.05',
            category: 'Pomiary i diagnostyka',
            question: 'Jaka jest typowa średnica rdzenia standardowego światłowodu jednomodowego (SMF-28)?',
            options: ['9 µm', '50 µm', '62,5 µm', '125 µm'],
            correctAnswer: 0,
            explanation: 'Światłowód jednomodowy posiada rdzeń o średnicy 9 µm (płaszcz ma średnicę 125 µm, stąd oznaczenie włókna 9/125 µm).'
          }
        ]
      },
      {
        id: 'lesson-interfejsy-cyfrowe',
        qualificationId: 'ELM.05',
        moduleId: 'elm05-pomiary',
        unitCode: 'ELM.05.3 (6, 7)',
        title: 'Magistrale komunikacyjne w elektronice: UART, RS-485, I2C, SPI',
        durationMinutes: 25,
        xpReward: 50,
        description: 'Przegląd standardów transmisji szeregowej, sygnały różnicowe, magistrala dwuprzewodowa I2C i czteroprzewodowa SPI.',
        learningOutcomes: [
          'Porównuje transmisję asynchroniczną (UART, RS-232, RS-485) ze synchroniczną z zegarem (I2C, SPI)',
          'Wskazuje zalety transmisji różnicowej w standardzie RS-485 (odporność na zakłócenia, zasięg do 1200 m)',
          'Zna linie magistrali I2C (SDA, SCL z rezystorami pull-up) oraz SPI (MOSI, MISO, SCK, CS/SS)'
        ],
        blocks: [
          {
            type: 'table',
            title: 'Zestawienie interfejsów w urządzeniach elektronicznych',
            content: 'Kluczowe właściwości najpopularniejszych magistral cyfrowych',
            tableData: {
              headers: ['Interfejs', 'Liczba linii', 'Typ transmisji', 'Maksymalny zasięg', 'Topologia'],
              rows: [
                ['UART', '2 (TX, RX)', 'Asynchroniczna, punkt-punkt', 'Kilka metrów', 'P2P (Point-to-Point)'],
                ['RS-485', '2 (A, B) lub 4', 'Różnicowa (symetryczna)', 'Do 1200 m', 'Magistrala wielopunktowa (do 32-128 urządzeń)'],
                ['I2C', '2 (SDA - dane, SCL - zegar)', 'Synchroniczna, adresowalna (7 lub 10 bit)', 'Do kilkudziesięciu cm (na PCB)', 'Master - Multiple Slaves z rezystorami podciągającymi do Vcc'],
                ['SPI', '4 (MOSI, MISO, SCK, CS)', 'Synchroniczna, Full-Duplex', 'Kilkadziesiąt cm (na PCB)', 'Master - Slave z osobnymi liniami Chip Select dla każdego układu']
              ]
            }
          }
        ],
        practiceQuestions: [
          {
            id: 'q-int-1',
            qualification: 'ELM.05',
            category: 'Pomiary i diagnostyka',
            question: 'Który z interfejsów transmisji danych wykorzystuje sygnał różnicowy na liniach oznaczanych zwykle jako A i B, zapewniając zasięg do 1200 metrów w środowisku przemysłowym?',
            options: ['RS-485', 'I2C', 'SPI', 'RS-232'],
            correctAnswer: 0,
            explanation: 'RS-485 jest standardem transmisji różnicowej (napięcie mierzone między liniami A i B), co zapewnia ogromną odporność na zakłócenia elektromagnetyczne i duży zasięg.'
          }
        ]
      }
    ]
  },
  {
    id: 'elm05-naprawa',
    qualificationId: 'ELM.05',
    code: 'ELM.05.4',
    title: 'Konserwacja i Naprawa Instalacji oraz Urządzeń Elektronicznych',
    hours: 210,
    description: 'Metodyka lokalizacji uszkodzeń, pomiary diagnostyczne, analiza uszkodzeń zasilaczy impulsowych, kondensatorów ESR, tranzystorów mocy, sporządzanie dokumentacji serwisowej.',
    lessons: [
      {
        id: 'lesson-diagnostyka-usterek',
        qualificationId: 'ELM.05',
        moduleId: 'elm05-naprawa',
        unitCode: 'ELM.05.4 (2, 4, 7, 10)',
        title: 'Metodyka wykrywania usterek i naprawy zasilaczy impulsowych',
        durationMinutes: 30,
        xpReward: 60,
        description: 'Algorytm diagnostyczny krok po kroku: oględziny wzrokowe, pomiary napięć zasilania, testowanie kondensatorów elektrolitycznych miernikiem ESR.',
        learningOutcomes: [
          'Stosuje schemat blokowy urządzenia do lokalizacji niesprawnego bloku funkcjonalnego',
          'Przeprowadza oględziny wzrokowe: spuchnięte kondensatory, przegrzane rezystory, pęknięte obudowy układów',
          'Mierzy zastępczą rezystancję szeregową ESR kondensatorów elektrolitycznych',
          'Sprawdza złącza tranzystorów bipolarnych i diod testem diody w multimetrze'
        ],
        blocks: [
          {
            type: 'text',
            title: 'Kolejność diagnostyki w serwisie elektronicznym',
            content: '1. Oględziny wzrokowe i organoleptyczne (zapach spalenizny, spuchnięte kondensatory, zimne luty, przepalone bezpieczniki).\n2. Pomiar rezystancji wejścia zasilania przed podłączeniem prądu (sprawdzenie czy nie ma zwarcia do masy).\n3. Pomiar napięć stałych na wyjściu zasilacza (linie +3.3V, +5V, +12V itp.).\n4. Sprawdzenie tętnień napięcia zasilania za pomocą oscyloskopu.\n5. Izolacja uszkodzonego stopnia (np. odłączenie stopnia mocy od układu sterującego).\n6. Wymiana uszkodzonego elementu na zgodny z notą katalogową (datasheet).'
          },
          {
            type: 'tip',
            title: 'Kondensatory a pomiar parametru ESR',
            content: 'Kondensator elektrolityczny może zachować poprawną pojemność przy pomiarze prostym miernikiem pojemności, a mimo to być całkowicie niesprawny z powodu drastycznego wzrostu rezystancji ESR (Equivalent Series Resistance). Wzrost ESR w zasilaczu impulsowym prowadzi do przegrzewania kondensatora i niestabilnej pracy przetwornicy.'
          }
        ],
        practiceQuestions: [
          {
            id: 'q-serw-1',
            qualification: 'ELM.05',
            category: 'Konserwacja i naprawa',
            question: 'Podczas oględzin płyty zasilacza impulsowego stwierdzono wybrzuszenie górnego denka aluminiowego kondensatora elektrolitycznego. Co należy zrobić?',
            options: [
              'Kondensator jest uszkodzony i należy go wymienić na nowy o takiej samej pojemności, napięciu (lub wyższym) i niskim ESR (Low-ESR)',
              'Wcisnąć denko z powrotem i kontynuować testy',
              'Zmierzyć napięcie i jeśli urządzenie działa, pozostawić element',
              'Odlutować kondensator i zmostkować jego pady na płytce drukowanej'
            ],
            correctAnswer: 0,
            explanation: 'Wybrzuszenie denka świadczy o wzroście ciśnienia gazów spowodowanym przegrzaniem elektrolitu na skutek wzrostu parametru ESR. Element kwalifikuje się do bezwzględnej wymiany.'
          }
        ]
      }
    ]
  }
];

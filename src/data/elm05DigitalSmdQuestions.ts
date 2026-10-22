import { QuizQuestion } from '../types';

export const ELM05_DIGITAL_SMD_QUESTIONS: QuizQuestion[] = [
  // =========================================================================
  // DIAGNOSTYKA UKŁADÓW CYFROWYCH I MIKROPROCESOROWYCH - 30 PYTAŃ (ELM.05)
  // =========================================================================

  // 1. Sonda logiczna i stan Hi-Z
  {
    id: 'cke-elm05-dig-01',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'Podczas badania magistrali cyfrowej sondą logiczną (próbnikiem stanów logicznych), żadna z diod LED (LOW ani HIGH) nie świeci, a wskaźnik sygnalizuje przerwę. Świadczy to o tym, że linia znajduje się w stanie:',
    options: [
      'Niskim stanie logicznym 0 (zwarcie do masy)',
      'Wysokiej impedancji (Hi-Z / stan pływający) lub odłączenia wyjścia trójstanowego',
      'Wysokim stanie logicznym 1 (zwarcie do VCC)',
      'Ciągłej generacji przebiegu prostokątnego o częstotliwości powyżej 100 MHz'
    ],
    correctAnswer: 1,
    hint: 'Trójstanowe bufory magistrali odłączają się od szyny, przechodząc w stan wysokiej impedancji Hi-Z.',
    explanation: 'Sonda logiczna posiada próg detekcji dla stanu 0 (np. <0,8 V) i stanu 1 (>2,0 V). Brak świecenia obu diod oznacza napięcie w strefie zabronionej lub stan wysokiej impedancji (Hi-Z), w którym linia nie jest wysterowana przez żaden aktywny układ.'
  },

  // 2. Analizator stanów logicznych - wyzwalanie
  {
    id: 'cke-elm05-dig-02',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 8)',
    question: 'W celu zarejestrowania błędu transmisji na magistrali szeregowej I2C za pomocą cyfrowego analizatora stanów logicznych, warunek wyzwalania (trigger) należy skonfigurować na:',
    options: [
      'Wartość skuteczną napięcia sieciowego 230 V',
      'Sekwencję ramki protokołu, np. zbocze opadające na linii SDA przy wysokim stanie SCL (warunek START) lub brak bitu ACK',
      'Przekroczenie temperatury radiatora powyżej 60°C',
      'Zanurzenie sondy pomiarowej w elektrolicie'
    ],
    correctAnswer: 1,
    hint: 'Magistrala I2C definiuje warunek START jako przejście SDA z 1 na 0, gdy linia zegara SCL jest w stanie 1.',
    explanation: 'Analizatory logiczne posiadają sprzętowe dekodery protokołów. Wyzwalanie protokołowe (Protocol Trigger) pozwala zatrzymać bufor pamięci dokładnie w momencie wystąpienia określonego adresu urządzenia lub braku potwierdzenia ACK (stan NACK).'
  },

  // 3. Brak rezystorów pull-up w magistrali I2C
  {
    id: 'cke-elm05-dig-03',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'W diagnozowanym urządzeniu mikrokontroler nie może nawiązać komunikacji z pamięcią EEPROM na magistrali I2C. Oscyloskop wykazuje, że linie SDA i SCL stale utrzymują poziom 0 V. Prawdopodobną przyczyną usterki jest:',
    options: [
      'Brak zasilania na rezystorach podciągających (pull-up) lub zwarcie jednej z linii do masy przez uszkodzony układ scalony',
      'Zbyt wysoka częstotliwość kwarcu mikroprocesora',
      'Odwrotne podłączenie anteny Wi-Fi',
      'Zastosowanie zbyt grubych ścieżek na PCB'
    ],
    correctAnswer: 0,
    hint: 'Magistrala I2C pracuje w układzie otwartego drenu (Open-Drain) – stan wysoki zależy wyłącznie od rezystorów pull-up.',
    explanation: 'Ponieważ układy na magistrali I2C mogą jedynie ściągać linie do masy (Open-Drain/Open-Collector), obecność stałego poziomu 0 V oznacza brak zasilania rezystorów pull-up, ich uszkodzenie lub zwarcie wewnętrznego tranzystora wyjściowego w jednym z podłączonych układów scalonych.'
  },

  // 4. Diagnoza magistrali SPI - linia CS/SS
  {
    id: 'cke-elm05-dig-04',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'Układ peryferyjny na magistrali SPI nie odpowiada na komendy procesora, mimo że sygnały zegara SCK i danych MOSI są prawidłowe. Pomiary wykazały, że linia CS (Chip Select) stale znajduje się w stanie wysokim (+3.3 V). Co oznacza ten stan?',
    options: [
      'Układ Slave jest zablokowany, ponieważ aktywacja transmisji SPI w większości układów wymaga wymuszenia stanu niskiego (CS = 0)',
      'Układ Slave pracuje w trybie przyspieszonego zapisu DMA',
      'Linia CS uległa zwarciu z anteną nadawczą',
      'Jest to stan całkowicie prawidłowy i oznacza gotowość do odbioru danych'
    ],
    correctAnswer: 0,
    hint: 'Linia Chip Select (CS/SS) jest zazwyczaj aktywna poziomem niskim (active-low, oznaczana z kreską u góry /CS).',
    explanation: 'Magistrala SPI wybiera układ podrzędny (Slave) poprzez wystawienie stanu niskiego na linii CS (Active-Low). Stały stan wysoki 3.3 V oznacza, że port mikroprocesora nie aktywuje układu, co uniemożliwia jakąkolwiek wymianę danych na linii MISO.'
  },

  // 5. Pomiar rezonatora kwarcowego
  {
    id: 'cke-elm05-dig-05',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 8)',
    question: 'Podczas diagnozowania martwego mikrokontrolera technik bada oscyloskopem wyprowadzenia rezonatora kwarcowego (XTAL). Na ekranie widoczne jest jedynie stałe napięcie stałe bez oscylacji sinusoidalnej. Oznacza to:',
    options: [
      'Prawidłową pracę generatora w trybie oszczędzania energii',
      'Brak pracy generatora zegarowego spowodowany uszkodzeniem kwarcu, zwarciem kondensatorów odsprzęgających do masy lub uszkodzeniem wewnętrznego inwertera Pierce’a',
      'Pracę generatora z częstotliwością w zakresie mikrofalowym',
      'Uszkodzenie sondy oscyloskopowej wskutek braku tłumika 1000x'
    ],
    correctAnswer: 1,
    hint: 'Sprawny generator zegarowy wytwarza na pinach XTAL stabilny przebieg sinusoidalny o amplitudzie rzędu 0,5–2 V.',
    explanation: 'Brak generacji na rezonatorze kwarcowym uniemożliwia taktowanie rdzenia mikroprocesora. Najczęstsze przyczyny to uszkodzenie mechaniczne kwarcu (np. po upadku urządzenia), pęknięcie lutu SMD, zwarcie kondensatorów 15–22 pF lub uszkodzenie struktury procesora.'
  },

  // 6. Układ resetu mikroprocesora
  {
    id: 'cke-elm05-dig-06',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'W diagnozowanym sterowniku mikroprocesorowym napięcie na pinie RESET (aktywnym stanem niskim) wynosi stale 0.05 V zamiast wymaganego 3.3 V. Jaki jest tego skutek?',
    options: [
      'Procesor stale znajduje się w stanie permanentnego resetu i nie rozpoczyna wykonywania programu z pamięci Flash',
      'Procesor pracuje z maksymalną częstotliwością taktowania',
      'Procesor automatycznie uruchamia procedurę kasowania pamięci RAM',
      'Układ przechodzi w tryb bezprzewodowej transmisji danych'
    ],
    correctAnswer: 0,
    hint: 'Dopóki na wejściu /RESET panuje stan niski, rejestry procesora są wyzerowane i licznik rozkazów nie startuje.',
    explanation: 'Wejście /RESET (Active-Low) wymaga stanu wysokiego do normalnej pracy. Napięcie bliskie 0 V trzyma procesor w uśpieniu/resecie. Przyczyną bywa uszkodzony kondensator filtrujący w obwodzie resetu (zwarcie wewnętrzne), uszkodzony przycisk mikrostyku lub układ supervisory IC.'
  },

  // 7. Szumy zasilania i kondensatory odsprzęgające
  {
    id: 'cke-elm05-dig-07',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'Układ cyfrowy o gęstym upakowaniu bramek losowo zawiesza się podczas intensywnej pracy. Oscyloskop podłączony do linii VCC wykazuje obecność szpilek napięciowych o amplitudzie do 1.5 V przy każdym takcie zegara. Co jest przyczyną?',
    options: [
      'Brak lub uszkodzenie ceramicznych kondensatorów odsprzęgających (decoupling 100 nF) w bezpośrednim sąsiedztwie pinów zasilania układów scalonych',
      'Zastosowanie zbyt czystego stopu miedzi w ścieżkach laminatu',
      'Zbyt wysoka rezystancja uziemienia stacji lutowniczej',
      'Użycie pamięci Flash zamiast dysku HDD'
    ],
    correctAnswer: 0,
    hint: 'Kondensatory 100 nF MLCC montuje się tuż przy wyprowadzeniach VDD/GND scalaka, by kompensować indukcyjność ścieżek zasilających.',
    explanation: 'Przełączanie tysięcy bramek jednocześnie wywołuje gwałtowne impulsy prądowe (di/dt). Pasożytnicza indukcyjność ścieżek zasilających generuje szpilki spadku napięcia (ground bounce / VDD sag). Kondensatory ceramiczne 100 nF umieszczone tuż przy nóżkach scalaka eliminują te tętnienia.'
  },

  // 8. Zwarcie na magistrali - Bus Contention
  {
    id: 'cke-elm05-dig-08',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'Zjawisko konfliktu magistrali (ang. bus contention) w układach mikroprocesorowych zachodzi, gdy:',
    options: [
      'Dwa lub więcej układów podłączonych do wspólnej szyny danych próbuje jednocześnie wystawić przeciwne stany logiczne (jeden wystawia 1, a drugi 0)',
      'Magistrala zostanie odłączona od zasilania głównego',
      'Częstotliwość transmisji jest niższa niż 1 kHz',
      'Zastosowano przewód ekranowany zamiast taśmy płaskiej'
    ],
    correctAnswer: 0,
    hint: 'Gdy dwa wyjścia typu Push-Pull sterują tą samą linią w przeciwne strony, powstaje niemal zwarcie zasilania do masy.',
    explanation: 'Konflikt na magistrali prowadzi do przepływu bardzo dużych prądów zwarciowych pomiędzy stopniami wyjściowymi układów scalonych, powodując ich gwałtowne nagrzewanie, spadek napięcia szyny do poziomu pośredniego (np. 1,6 V) i potencjalne uszkodzenie struktury krzemowej.'
  },

  // 9. Bufory trójstanowe 74HC245
  {
    id: 'cke-elm05-dig-09',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'W 8-bitowym dwukierunkowym buforze magistrali 74HC245, wejście sterujące /OE (Output Enable) odpowiada za:',
    options: [
      'Włączenie wyjść bufora stanem niskim (0) lub wprowadzenie ich w stan wysokiej impedancji Hi-Z stanem wysokim (1)',
      'Wybór kierunku transmisji A->B lub B->A',
      'Zmianę kodu binarnego na kod Graya',
      'Wyłączenie zasilania wewnętrznych bramek'
    ],
    correctAnswer: 0,
    hint: 'Wejście /OE ma kreskę oznaczającą negację (aktywne stanem 0). Wejście DIR decyduje o kierunku.',
    explanation: 'Gdy wejście /OE (Output Enable) jest w stanie wysokim (1), wszystkie wyjścia układu 74HC245 przechodzą w stan odcięcia (Hi-Z), izolując obie strony magistrali od siebie. Podanie zera logicznego na /OE uaktywnia przekazywanie danych.'
  },

  // 10. Diagnostyka przetwornika ADC
  {
    id: 'cke-elm05-dig-10',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 8)',
    question: 'W sterowniku mikroprocesorowym odczyty z czujnika temperatury podłączonego do wejścia ADC są zaniżone o około 30% w stosunku do rzeczywistości. Co w pierwszej kolejności należy sprawdzić?',
    options: [
      'Wartość i stabilność napięcia odniesienia przetwornika (Vref) na dedykowanym wyprowadzeniu mikrokontrolera',
      'Kolor obudowy mikrokontrolera',
      'Kierunek nawinięcia cewki przekaźnika wyjściowego',
      'Polaryzację gniazda Ethernet'
    ],
    correctAnswer: 0,
    hint: 'Wynik konwersji ADC zależy bezpośrednio od proporcji: Wynik = (Vin / Vref) · (2^n - 1).',
    explanation: 'Jeżeli napięcie referencyjne Vref wzrośnie (np. w wyniku uszkodzenia diody zenera lub scalonego źródła Vref), mierzona wartość cyfrowa dla tego samego napięcia wejściowego Vin proporcjonalnie zmaleje. Błędy zasilania Vref to główna przyczyna fałszywych pomiarów ADC.'
  },

  // 11. Błędy transmisji UART
  {
    id: 'cke-elm05-dig-11',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'Podczas testu komunikacji asynchronicznej UART odbiornik zamiast czytelnego tekstu odbiera losowe, nieprawidłowe znaki (tzw. "krzaki" / błędy ramki Framing Error). Najczęstszą przyczyną tego problemu jest:',
    options: [
      'Niezgodność prędkości transmisji (Baud Rate) pomiędzy nadajnikiem a odbiornikiem lub błędna liczba bitów stopu/parzystości',
      'Zastosowanie zbyt długiego kabla zasilającego z sieci 230 V',
      'Podłączenie mikroprocesora do monitora VGA',
      'Brak anteny ferrytowej'
    ],
    correctAnswer: 0,
    hint: 'Transmisja asynchroniczna UART nie posiada osobnego zegara – obie strony muszą mieć identycznie skonfigurowaną prędkość bodów.',
    explanation: 'W interfejsie UART taktowanie odbiornika musi zgadzać się z nadajnikiem z dokładnością do ok. 2–3%. Jeśli nadajnik wysyła z prędkością 115200 bps, a odbiornik nasłuchuje na 9600 bps (lub ma inną parzystość), bity danych zostaną zinterpretowane błędnie.'
  },

  // 12. Przeciążenie stabilizatora LDO zasilania logiki
  {
    id: 'cke-elm05-dig-12',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'Na płycie cyfrowej stabilizator liniowy LDO (np. AMS1117-3.3) mocno się nagrzewa, a napięcie wyjściowe wynosi zaledwie 0.9 V zamiast 3.3 V. Po odcięciu zasilania rezystancja szyny 3.3 V względem masy wynosi zaledwie 1.2 Ω. Wskazuje to na:',
    options: [
      'Zwarcie wewnętrzne struktury jednego z układów scalonych lub kondensatora filtrującego zasilanego z tej szyny',
      'Prawidłowe działanie stabilizatora w trybie standby',
      'Uszkodzenie transformatora sieciowego po stronie pierwotnej',
      'Brak wgranego oprogramowania do pamięci RAM'
    ],
    correctAnswer: 0,
    hint: 'Rezystancja 1,2 Ω przy 3,3 V oznacza prąd zwarciowy rzędu prawie 3 A, co wyzwala zabezpieczenie termiczne LDO.',
    explanation: 'Niska rezystancja (poniżej kilku omów) na szynie zasilającej logikę świadczy o zwarciu (np. przebity kondensator ceramiczny MLCC lub uszkodzona struktura mikrokontrolera). Stabilizator LDO przechodzi w tryb ograniczenia prądu i dusi napięcie wyjściowe.'
  },

  // 13. Diagnoza pamięci Flash SPI
  {
    id: 'cke-elm05-dig-13',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'W urządzeniu z pamięcią SPI Flash (np. Winbond 25Q64) procesor po włączeniu zasilania generuje na liniach CS i SCK krótką sekwencję impulsów, po czym całkowicie zamiera. Co jest najbardziej prawdopodobną przyczyną?',
    options: [
      'Uszkodzenie zawartości oprogramowania układowego (ang. firmware corruption / błąd sumy kontrolnej bootloadera)',
      'Zbyt wysoka temperatura otoczenia w pokoju',
      'Odwrotne podłączenie głośnika piezoelektrycznego',
      'Zastosowanie zbyt szybkiej karty pamięci SD'
    ],
    correctAnswer: 0,
    hint: 'Procesor próbuje odczytać bootloader z kości Flash, ale napotykając uszkodzone dane, zawiesza się lub wchodzi w pętlę błędu.',
    explanation: 'Krótki pakiet transmisji po resecie dowodzi, że linie magistrali SPI oraz zasilanie pamięci są sprawne. Zatrzymanie pracy po odczytaniu nagłówka świadczy o uszkodzonym programie (błąd sumy kontrolnej / skasowany wsad Flash), co wymaga ponownego zaprogramowania programatorem.'
  },

  // 14. Uszkodzenie diod zabezpieczających pin GPIO
  {
    id: 'cke-elm05-dig-14',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'Podczas pomiaru spoczynkowego pinu wejściowego mikrokontrolera w trybie testu diody względem masy miernik wskazuje 0.02 V w obu kierunkach polaryzacji. Oznacza to:',
    options: [
      'Przebicie i zwarcie wewnętrznej diody zabezpieczającej ESD zintegrowanej w strukturze portu mikroprocesora',
      'Prawidłowe działanie podciągania rezystorem pull-down',
      'Obecność sygnału wysokiej częstotliwości',
      'Włączenie przetwornika cyfrowo-analogowego'
    ],
    correctAnswer: 0,
    hint: 'Wewnętrzne diody ESD chronią pin przed przepięciem powyżej VDD i poniżej GND.',
    explanation: 'Piny mikrokontrolerów posiadają zintegrowane diody zaciskające (clamping diodes) do masy i zasilania. Przepięcie elektrostatyczne (ESD) lub podanie zbyt wysokiego napięcia trwale przetapia złącze półprzewodnikowe, powodując zwarcie pinu do masy (0,02 V).'
  },

  // 15. Brak terminatora RS-485
  {
    id: 'cke-elm05-dig-15',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'W przemysłowej sieci opartej na magistrali RS-485 o długości 500 metrów pojawiają się cykliczne błędy sumy kontrolnej CRC ramek. Na oscyloskopie na zboczach impulsów różnicowych A-B widoczne są silne oscylacje tłumione (dzwonienie). Przyczyną jest:',
    options: [
      'Brak rezystorów terminujących 120 Ω na fizycznych końcach linii transmisyjnej, co powoduje odbicia fali elektromagnetycznej',
      'Zastosowanie zbyt grubych kabli miedzianych',
      'Zasilanie układów napięciem stałym z akumulatora',
      'Zbyt wysoka rezystancja izolacji przewodu'
    ],
    correctAnswer: 0,
    hint: 'Terminacja linii dopasowuje impedancję falową przewodu (skrętka ma impedancję ok. 120 Ω).',
    explanation: 'Brak terminatora na końcu długiej linii transmisyjnej powoduje odbicie sygnału od otwartego końca kabla. Fala odbita nakłada się na sygnał nadawany, tworząc dzwonienie i zakłócając poziomy logiczne odbiorników.'
  },

  // 16. Dryft generatora RC
  {
    id: 'cke-elm05-dig-16',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 8)',
    question: 'Układ czasowy oparty na wewnętrznym generatorze RC mikrokontrolera po nagrzaniu urządzenia zmienia interwał odmierzania czasu o kilkanaście procent. Jaka modyfikacja konstrukcyjna rozwiązuje ten problem?',
    options: [
      'Zastosowanie zewnętrznego stabilizowanego rezonatora kwarcowego (kwarcu) o niskim współczynniku temperaturowym PPM',
      'Zwiększenie pojemności kondensatorów elektrolitycznych w zasilaczu',
      'Wymiana przewodów zasilających na kable aluminiowe',
      'Zmniejszenie napięcia zasilania do 1.0 V'
    ],
    correctAnswer: 0,
    hint: 'Rezonatory kwarcowe posiadają stabilność częstotliwości rzędu kilkudziesięciu części na milion (PPM), podczas gdy wewnętrzne oscylatory RC silnie zależą od temperatury.',
    explanation: 'Wewnętrzne generatory RC w strukturach krzemowych cechują się dużą niestabilnością termiczną (dryft częstotliwości nawet rzędu 5–10% w zakresie roboczym). Zastosowanie kwarcu piezoelektrycznego zapewnia stabilność rzędu 20–50 ppm.'
  },

  // 17. Jitter i dzwonienie na linii zegarowej
  {
    id: 'cke-elm05-dig-17',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 8)',
    question: 'W szybkim układzie cyfrowym na sygnale zegarowym CLK pojawiają się przerzuty napięcia (ang. overshoot) przekraczające dopuszczalne napięcie zasilania o 1.5 V. Jakim prostym elementem włączonym szeregowo przy wyjściu sterownika eliminuje się ten efekt?',
    options: [
      'Rezystorem tłumiącym dopasowania szeregowego o wartości 22 Ω – 47 Ω (damping resistor)',
      'Dławikiem indukcyjnym 10 H',
      'Kondensatorem elektrolitycznym 1000 µF',
      'Transformantem impulsowym'
    ],
    correctAnswer: 0,
    hint: 'Tzw. source termination resistor tłumi odbicia fali na początku linii przesyłowej.',
    explanation: 'Rezystor szeregowy (np. 33 Ω) zamontowany tuż przy wyjściu nadajnika dopasowuje niską impedancję wyjściową bramki do impedancji falowej ścieżki PCB, skutecznie pochłaniając fale powrotne i tłumiąc przerzuty (overshoot).'
  },

  // 18. Wiszące wejście CMOS (Floating input)
  {
    id: 'cke-elm05-dig-18',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'Dlaczego w sprawnym urządzeniu cyfrowym żadne niewykorzystane wejście bramki w technologii CMOS nie może pozostać niepodłączone ("wiszące w powietrzu")?',
    options: [
      'Niezwykle wysoka impedancja wejściowa bramki CMOS powoduje ładowanie ładunków elektrostatycznych i wprowadzenie tranzystorów w stan przewodzenia skrośnego, co drastycznie zwiększa pobór prądu i może zniszczyć układ',
      'Płytka PCB zacznie emitować światło widzialne',
      'Nastąpi trwałe rozmagnesowanie rdzenia dławika',
      'Zmniejszy się częstotliwość sieci energetycznej'
    ],
    correctAnswer: 0,
    hint: 'Pływające wejście przyjmuje potencjał pośredni (np. 1,6 V), przy którym oba tranzystory komplementarne (P-MOS i N-MOS) zaczynają jednocześnie przewodzić prąd.',
    explanation: 'Nieużywane wejścia CMOS muszą być zawsze podłączone do VDD lub GND (bezpośrednio lub przez rezystor pull-up/down). Wiszące wejście działa jak antena, wchodzi w stan liniowy powodując potężny prąd skrośny zasilania i przegrzewanie struktury.'
  },

  // 19. Weryfikacja sygnału PWM
  {
    id: 'cke-elm05-dig-19',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 8)',
    question: 'Podczas testowania cyfrowego sterownika obrotów silnika BLDC oscyloskop podłączony do wyjścia PWM wykazuje stały stan wysoki (+5 V) bez względu na nastawę potencjometru zadającego. Świadczy to o:',
    options: [
      'Wypełnieniu impulsu równym 100% (brak modulacji szerokości impulsu, pełne wysterowanie) lub zablokowaniu pinu procesora w stanie nasycenia',
      'Częstotliwości sygnału równej 0 Hz przy wyłączonym silniku',
      'Prawidłowej modulacji częstotliwościowej FM',
      'Uszkodzeniu ekranu oscyloskopu'
    ],
    correctAnswer: 0,
    hint: 'Sygnał PWM przy normalnej regulacji powinien posiadać zmienny czas trwania impulsu wysokiego (Duty Cycle od 0% do 100%).',
    explanation: 'Stały stan wysoki odpowiada wypełnieniu Duty Cycle = 100%. Oznacza to brak kluczowania PWM, co może wynikać z błędu programowego, zwarcia tranzystora wyjściowego do szyny zasilającej lub uszkodzenia timera sprzętowego w procesorze.'
  },

  // 20. Pętla Watchdoga (WDT)
  {
    id: 'cke-elm05-dig-20',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'W sterowniku pieca gazowego procesor wykonuje cykliczny restart dokładnie co 1.0 sekundy, nie reagując na przyciski panelu. Co jest najbardziej prawdopodobną przyczyną serwisową?',
    options: [
      'Zawieszenie programu w nieskończonej pętli i brak cyklicznego zerowania licznika układu zabezpieczającego Watchdog Timer (WDT)',
      'Zużycie elektrod zapłonowych w komorze spalania',
      'Zbyt wysoka prędkość obrotowa wentylatora wyciągowego',
      'Rozładowanie baterii pilota podczerwieni'
    ],
    correctAnswer: 0,
    hint: 'Układ Watchdog resetuje procesor, jeśli program w określonym czasie nie wykona instrukcji wyczyszczenia licznika WDT.',
    explanation: 'Watchdog to sprzętowy strażnik. Jeśli oprogramowanie utknie w pętli obsługi błędu lub ulegnie zawieszeniu i nie zresetuje timera WDT przed upływem limitu (np. 1 s), układ wymusza sprzętowy reset procesora.'
  },

  // 21. Test pętli zwrotnej (Loopback)
  {
    id: 'cke-elm05-dig-21',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'W celu szybkiej weryfikacji sprzętowej poprawności działania portu szeregowego RS-232 / UART w urządzeniu wykonuje się tzw. test pętli zwrotnej (Loopback Test), polegający na:',
    options: [
      'Zwarciu linii nadawczej TXD z linią odbiorczą RXD i sprawdzeniu czy wysłane znaki są natychmiast poprawnie odbierane',
      'Podłączeniu linii TXD do gniazdka 230 V',
      'Zwarciu zasilania procesora do obudowy',
      'Mierzeniu rezystancji kabla omomierzem wskazówkowym'
    ],
    correctAnswer: 0,
    hint: 'Wszystko co nadajnik wyśle (TX), wraca bezpośrednio do odbiornika (RX).',
    explanation: 'Test pętli zwrotnej (loopback) pozwala natychmiast odróżnić uszkodzenie sprzętowe portu (nadajnik/odbiornik UART, konwerter MAX232) od błędów w urządzeniu zewnętrznym lub oprogramowaniu komunikacyjnym.'
  },

  // 22. Histereza przerzutnika Schmitta
  {
    id: 'cke-elm05-dig-22',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'W wejściowych obwodach cyfrowych narażonych na zakłócenia stosuje się bramki z wejściem z przerzutnikiem Schmitta (np. 74HC14). Ich główną cechą diagnostyczną jest:',
    options: [
      'Obecność histerezy napięciowej (dwóch różnych progów przełączania dla zbocza narastającego VT+ i opadającego VT-), co zapobiega drganiom na wyjściu przy wolnych zboczach',
      'Możliwość bezpośredniego podłączenia napięcia zmiennego 400 V',
      'Generowanie stałego napięcia odniesienia 10 V',
      'Podwajanie częstotliwości wejściowej w każdym cyklu'
    ],
    correctAnswer: 0,
    hint: 'Histereza sprawia, że szum nałożony na wolno narastające zbocze sygnału nie wywołuje wielokrotnego przełączania bramki.',
    explanation: 'Wejście ze Schmittem posiada dwa oddzielne progi: wyższy VT+ (np. 3,0 V) przy narastaniu i niższy VT- (np. 1,5 V) przy opadaniu. Różnica (histereza) eliminuje generowanie fałszywych paczek impulsów przy sygnałach zanieczyszczonych zakłóceniami.'
  },

  // 23. Interfejs SWD / JTAG
  {
    id: 'cke-elm05-dig-23',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'W nowoczesnych 32-bitowych mikrokontrolerach (np. rodzina ARM Cortex-M) do zaawansowanej diagnostyki sprzętowej, odczytu rejestrów rdzenia oraz programowania pamięci Flash stosuje się 2-przewodowy interfejs:',
    options: [
      'SWD (Serial Wire Debug) wykorzystujący linie SWDIO (dane) oraz SWCLK (zegar)',
      'Modem telefoniczny V.90',
      'Złącze optyczne Toslink',
      'Magistralę równolegową Centronics'
    ],
    correctAnswer: 0,
    hint: 'SWD to zredukowany wariant standardu JTAG opracowany przez ARM, wymagający tylko 2 linii sygnałowych.',
    explanation: 'Interfejs SWD (Serial Wire Debug) pozwala serwisantowi na bezpośrednie podłączenie debugera (np. ST-Link, J-Link), odczytanie pamięci RAM/Flash, weryfikację zawartości rejestrów mikrokontrolera oraz uruchamianie programu krok po kroku.'
  },

  // 24. Konwerter poziomów logicznych (Level Shifter)
  {
    id: 'cke-elm05-dig-24',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'Dwukierunkowy translator poziomów logicznych (Logic Level Shifter) oparty na tranzystorze MOSFET z kanałem N stosuje się przy łączeniu magistrali cyfrowych pracujących z różnymi napięciami w celu:',
    options: [
      'Bezpiecznego dopasowania poziomów sygnałów np. pomiędzy logiką 5 V a logiką 3.3 V bez ryzyka zniszczenia układów niskonapięciowych',
      'Zwiększenia prędkości obrotowej wentylatorów chłodzących',
      'Izolacji galwanicznej odpornej na napięcie 50 kV',
      'Generowania napięcia ujemnego do zasilania wyświetlacza LCD'
    ],
    correctAnswer: 0,
    hint: 'Bezpośrednie podanie 5 V z procesora AVR na wejście 3.3 V układu scalonego ESP32 spowodowałoby przepalenie diod zabezpieczających.',
    explanation: 'Układ z tranzystorem MOSFET i rezystorami pull-up do obu szyn zasilania (3,3 V i 5 V) umożliwia dwukierunkowy przepływ sygnałów logicznych, chroniąc delikatniejsze układy zasilane z 3,3 V przed przepięciem.'
  },

  // 25. Prądy upływu GPIO
  {
    id: 'cke-elm05-dig-25',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'W urządzeniu bateryjnym czas pracy uległ skróceniu z 2 lat do 3 tygodni. W trybie uśpienia (Deep Sleep) prąd pobierany przez układ wynosi 15 mA zamiast deklarowanych 20 µA. Co najczęściej jest przyczyną?',
    options: [
      'Pozostawienie pinów wejściowo-wyjściowych GPIO w stanie nieustalonym (pływającym) lub uszkodzenie diody ESD jednego z portów wywołujące stały prąd upływu',
      'Zmiana koloru cyny na połączeniach lutowanych',
      'Użycie zbyt grubego przewodu uziemiającego',
      'Spadek ciśnienia atmosferycznego w pomieszczeniu'
    ],
    correctAnswer: 0,
    hint: 'Układy CMOS w stanie uśpienia powinny pobierać ułamki mikroampera, o ile wszystkie piny są prawidłowo spolaryzowane.',
    explanation: 'Niewłaściwa konfiguracja rejestrów portów (pływające wejścia) lub częściowe uszkodzenie struktury półprzewodnikowej złącza ESD na jednym z pinów wywołuje ciągły pobór prądu upływu, uniemożliwiając osiągnięcie trybu mikroamperowego w Deep Sleep.'
  },

  // 26. Bateria podtrzymująca RTC
  {
    id: 'cke-elm05-dig-26',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'Po każdym wyłączeniu zasilania sieciowego sterownik przemysłowy gubi aktualną datę, godzinę oraz nastawy technologiczne w pamięci NVRAM. Napięcie zmierzone na baterii litowej CR2032 wynosi 1.1 V. Wskaż prawidłowe działanie:',
    options: [
      'Wymiana baterii CR2032 na nową (jej nominalne napięcie powinno wynosić powyżej 3.0 V)',
      'Wymiana płyty głównej urządzenia na nową',
      'Wgranie nowego systemu operacyjnego Linux',
      'Zwiększenie bezpiecznika sieciowego z 2 A na 16 A'
    ],
    correctAnswer: 0,
    hint: 'Bateria litowo-manganowa CR2032 ma napięcie nominalne 3,0 V. Napięcie 1,1 V oznacza całkowite rozładowanie.',
    explanation: 'Bateria pastylkowa CR2032 podtrzymuje zasilanie rejestrów zegara czasu rzeczywistego (RTC) i pamięci statycznej CMOS. Przy napięciu poniżej 2,2 V układy tracą zdolność podtrzymania danych po zaniku zasilania głównego.'
  },

  // 27. Zabezpieczenie Brown-Out Reset (BOR)
  {
    id: 'cke-elm05-dig-27',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'Wbudowany w mikrokontroler układ BOR (Brown-Out Reset) ma za zadanie:',
    options: [
      'Wprowadzić procesor w stan bezpiecznego zatrzymania (resetu), gdy napięcie zasilania spadnie poniżej ustalonego progu krytycznego, zapobiegając błędnym zapisom do pamięci Flash/EEPROM',
      'Chłodzić procesor podczas pracy z dużą mocą obliczeniową',
      'Automatycznie zwiększać częstotliwość taktowania rdzenia',
      'Odłączać masę urządzenia przy zwarciu obudowy'
    ],
    correctAnswer: 0,
    hint: 'Gdy napięcie zasilania spada np. z 3,3 V do 2,3 V, tranzystory wewnątrz procesora pracują niestabilnie i mogą uszkodzić zapisywane dane.',
    explanation: 'Układ BOR monitoruje napięcie szyny zasilającej. Jeśli wystąpi krótkotrwały spadek napięcia (tzw. brownout), BOR natychmiast generuje sygnał resetu, chroniąc przed wykonywaniem przypadkowych instrukcji i uszkodzeniem struktur pamięci.'
  },

  // 28. Uszkodzenie stopnia wyjściowego Push-Pull GPIO
  {
    id: 'cke-elm05-dig-28',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'Pin wyjściowy procesora skonfigurowany jako wyjście cyfrowe bez problemu wymusza stan niski (0.05 V), ale przy próbie ustawienia stanu wysokiego napięcie wynosi zaledwie 0.4 V. Obciążenie pinu wynosi zaledwie 100 kΩ. Co uległo uszkodzeniu?',
    options: [
      'Górny tranzystor (P-MOSFET) w komplementarnym stopniu wyjściowym push-pull tego wyprowadzenia uległ przerwaniu/spaleniu',
      'Dolny tranzystor N-MOS uległ zwarciu do radiatora',
      'Rezonator kwarcowy utracił stabilność fazową',
      'Przepalił się bezpiecznik topikowy w obwodzie pierwotnym transformatora'
    ],
    correctAnswer: 0,
    hint: 'Stopień push-pull składa się z górnego tranzystora podciągającego do VCC i dolnego ściągającego do GND.',
    explanation: 'Prawidłowy stopień wyjściowy push-pull steruje stanem wysokim przez włączenie górnego tranzystora P-MOS. Jego uszkodzenie (przerwa) uniemożliwia podanie prądu z szyny VCC, przez co pin pozostaje na niskim potencjale.'
  },

  // 29. Długość linii a pojemność magistrali I2C
  {
    id: 'cke-elm05-dig-29',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'Dlaczego standardowa magistrala I2C ma ograniczony zasięg fizyczny do kilkudziesięciu centymetrów (maksymalna pojemność linii Cb <= 400 pF)?',
    options: [
      'Pojemność pasożytnicza długich przewodów w połączeniu z rezystorami pull-up drastycznie wydłuża czas narastania zbocza (stała czasowa RC), co uniemożliwia prawidłowe odczytanie bitów przy wyższych prędkościach',
      'Światło słoneczne rozprasza fale logiczne w miedzi',
      'W przewodach dłuższych niż 1 metr dochodzi do zaniku zjawiska grawitacji elektronowej',
      'Prawo telekomunikacyjne zabrania transmisji cyfrowej powyżej 1 metra'
    ],
    correctAnswer: 0,
    hint: 'Zbocze narastające w I2C tworzone jest pasywnie przez ładowanie pojemności magistrali przez rezystor pull-up.',
    explanation: 'Czas narastania sygnału tr = 0,8473 · R_pullup · C_bus. Wraz ze wzrostem długości kabla rośnie pojemność Cb. Gdy zbocze staje się zbyt wolne, odbiornik nie zarejestruje stanu wysokiego w oknie taktowania SCL.'
  },

  // 30. Kody POST w diagnostyce komputerowej
  {
    id: 'cke-elm05-dig-30',
    qualification: 'ELM.05',
    category: 'Diagnostyka układów cyfrowych i mikroprocesorowych',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'W diagnostyce płyt głównych komputerów i sterowników przemysłowych karta diagnostyczna kodów POST (Power-On Self-Test) podłączana do szyny systemowej pozwala na:',
    options: [
      'Odczytanie dwucyfrowych kodów szesnastkowych (HEX) wysyłanych przez BIOS/UEFI w trakcie inicjalizacji kolejnych układów, co pozwala precyzyjnie wskazać uszkodzony komponent (np. RAM, procesor, GPU)',
      'Pomiar poboru prądu z dokładnością do 1 pikoampera',
      'Bezpośrednie lutowanie układów BGA bez użycia ciepła',
      'Czyszczenie pamięci cache procesora za pomocą wiązki lasera'
    ],
    correctAnswer: 0,
    hint: 'Kody POST wysyłane są na port diagnostyczny 80h w architekturze x86 na każdym etapie startu sprzętu.',
    explanation: 'Karta POST przechwytuje kody generowane przez procedurę startową firmware. Zatrzymanie się kodu na danej wartości (np. błąd inicjalizacji pamięci RAM lub mostka) natychmiast wskazuje obszar awarii na płycie głównej.'
  },

  // =========================================================================
  // SERWIS I MONTAŻ PAKIETÓW SMD - 30 PYTAŃ (ELM.05)
  // =========================================================================

  // 31. Termowizja w lokalizacji zwarć SMD
  {
    id: 'cke-elm05-smd-01',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (2, 8)',
    question: 'W nowoczesnym serwisie elektronicznym kamera termowizyjna o wysokiej rozdzielczości makro jest niezastąpionym narzędziem służącym do:',
    options: [
      'Błyskawicznej lokalizacji zwarć w gałęziach zasilania poprzez detekcję punktu o podwyższonej temperaturze (tzw. "hot-spotu") wywołanej przepływem prądu przez uszkodzony element SMD',
      'Pomiaru pojemności kondensatorów elektrolitycznych w stanie beznapięciowym',
      'Wypalania napisów laserowych na obudowach układów scalonych',
      'Rozpoznawania kodu paskowego rezystorów przewlekanych'
    ],
    correctAnswer: 0,
    hint: 'Zgodnie z prawem Joule’a-Lenza (P = I^2 · R) element ze zwarciem lub upływnością wydziela ciepło pod wpływem prądu zasilacza.',
    explanation: 'Po podaniu niskiego napięcia (np. 1–2 V) z zasilacza laboratoryjnego na gałąź ze zwarciem, prąd płynie przez uszkodzony element (przebity kondensator MLCC, zwarty MOSFET). Kamera termowizyjna bezdotykowo uwidacznia go jako świecący punkt o wyższej temperaturze.'
  },

  // 32. Próba zwarciowa
  {
    id: 'cke-elm05-smd-02',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'Podczas wykonywania tzw. "próby zwarciowej" na płycie głównej ze zwartą główną linią zasilania (np. linia 19 V lub 12 V) kluczową zasadą bezpieczeństwa jest:',
    options: [
      'Ustawienie na zasilaczu laboratoryjnym napięcia znacznie niższego niż napięcie znamionowe gałęzi (np. 1.0 V – 1.5 V) z kontrolowanym ograniczeniem prądowym, aby nie uszkodzić zasilanych z tej linii rdzeni procesorów',
      'Ustawienie maksymalnego napięcia 60 V DC',
      'Zasilenie płyty bezpośrednio z gniazda 230 V bez transformatora',
      'Odwrotne podłączenie biegunów zasilacza'
    ],
    correctAnswer: 0,
    hint: 'W przypadku przebicia górnego klucza przetwornicy podanie 19 V natychmiast uśmierciłoby procesor zasilany napięciem 0,9 V.',
    explanation: 'Zawsze zaczyna się od niskiego napięcia (ok. 1 V) z ograniczeniem prądu do 1–2 A. Zapobiega to zniszczeniu delikatnych układów scalonych w sytuacji, gdy zwarcie wynika z przebitego tranzystora MOSFET w przetwornicy obniżającej (Step-Down).'
  },

  // 33. Pęknięcia kondensatorów MLCC
  {
    id: 'cke-elm05-smd-03',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'W miniaturowych urządzeniach elektronicznych jedną z najczęstszych przyczyn nagłego pełnego zwarcia linii zasilania do masy (0.0 Ω) jest:',
    options: [
      'Mikropęknięcie struktury dielektryka ceramicznego wielowarstwowego kondensatora SMD (MLCC) wywołane naprężeniami mechanicznymi laminatu lub szokiem termicznym',
      'Rozpuszczenie się miedzi w laminacie FR4 pod wpływem tlenu',
      'Poluzowanie się nakrętki mocującej gniazdo USB',
      'Zmniejszenie liczby zwojów w transformatorze'
    ],
    correctAnswer: 0,
    hint: 'Kondensatory MLCC są wykonane z kruchej ceramiki tytanianu baru, która pod wpływem ugięcia płytki PCB pęka i zwiera elektrody wewnętrzne.',
    explanation: 'Wielowarstwowe kondensatory ceramiczne MLCC (np. 10 µF w obudowie 0805 lub 0603) posiadają setki mikroskopijnych warstw elektrod oddzielonych ceramiką. Pęknięcie mechaniczne płyty powoduje natychmiastowe wewnętrzne zwarcie elektrod i całkowitą blokadę przetwornicy.'
  },

  // 34. Podgrzewacz dolny (Preheater)
  {
    id: 'cke-elm05-smd-04',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (4, 6)',
    question: 'Dlaczego podczas demontażu dużych układów scalonych SMD (np. QFN z padem termicznym lub BGA) z wielowarstwowych płyt PCB konieczne jest stosowanie podgrzewacza dolnego (ang. preheater)?',
    options: [
      'Wstępne podgrzanie całej płyty do 120°C–150°C zmniejsza straty ciepła do wewnętrznych płaszczyzn miedzi (GND/VCC) i zapobiega wyginaniu oraz delaminacji laminatu',
      'Podgrzewacz dolny służy wyłącznie do suszenia farby opisowej na PCB',
      'Pozwala na lutowanie elementów bez włączania zasilania stacji Hot-Air',
      'Chłodzi laminat strumieniem ciekłego azotu'
    ],
    correctAnswer: 0,
    hint: 'Wielowarstwowe płyty (np. 8-warstwowe) błyskawicznie odprowadzają ciepło z miejsca lutowania do płaszczyzn masy.',
    explanation: 'Grube miedziane warstwy masy działają jak potężny radiator. Bez podgrzewacza dolnego grzanie punktowe z góry stacją Hot-Air wymagałoby skrajnie wysokich temperatur (>420°C), co prowadzi do zwęglenia laminatu, oderwania padów i delaminacji.'
  },

  // 35. Reballing układów BGA
  {
    id: 'cke-elm05-smd-05',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (4, 6)',
    question: 'Procedura serwisowa zwana reballingiem układu BGA polega na:',
    options: [
      'Całkowitym usunięciu starego spoiwa z padów wylutowanego układu, nałożeniu dedykowanego szablonu (sita) i wgrzaniu nowej, precyzyjnej matrycy kulek lutowniczych',
      'Wymianie wewnętrznej struktury krzemowej układu scalonego',
      'Czyszczeniu obudowy procesora sprężonym powietrzem pod ciśnieniem 10 barów',
      'Mechanicznym zeszlifowaniu nóżek układu pilnikiem iglakiem'
    ],
    correctAnswer: 0,
    hint: 'Re-balling oznacza dosłownie ponowne nałożenie kulek (balls) lutowniczych.',
    explanation: 'Reballing jest stosowany w przypadku utraty połączenia (zimnych lutów) pod procesorami lub układami graficznymi BGA: układ jest wylutowywany, oczyszczany z resztek utlenionego spoiwa, po czym za pomocą sita nakłada się nowe kulki i wgrzewa profilowaną temperaturą.'
  },

  // 36. Spoiwo ołowiowe vs bezołowiowe w serwisie BGA
  {
    id: 'cke-elm05-smd-06',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (4, 6)',
    question: 'Dlaczego w serwisowych naprawach pogwarancyjnych do reballingu BGA technicy często preferują kulki ze stopu ołowiowego Sn63Pb37 zamiast bezołowiowego SAC305?',
    options: [
      'Stop Sn63Pb37 topi się w znacznie niższej temperaturze (183°C wobec 217°C), co radykalnie zmniejsza szok termiczny i ryzyko uszkodzenia rdzenia procesora podczas montażu',
      'Stop ołowiowy jest całkowicie przezroczysty dla promieni rentgenowskich',
      'Spoiwo ołowiowe przewodzi prąd stały bez oporu elektrycznego (nadprzewodnictwo w 20°C)',
      'Dyrektywa RoHS nakazuje stosowanie ołowiu we wszystkich naprawach domowych'
    ],
    correctAnswer: 0,
    hint: 'Niższa temperatura topnienia (183°C vs 217°C) oznacza, że układ scalony i laminat są poddawane znacznie mniejszemu stresowi termicznemu.',
    explanation: 'Eutektyczny stop cynowo-ołowiowy Sn63Pb37 topi się w 183°C. Lutowanie w niższej temperaturze (ok. 210°C szczytowo zamiast 245–250°C dla SAC305) chroni cienkie laminaty i delikatne struktury BGA przed wybrzuszeniem (ang. popcorn effect) i degradacją termiczną.'
  },

  // 37. Diagnoza pękniętych kulek BGA
  {
    id: 'cke-elm05-smd-07',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'Karta graficzna generuje artefakty (paski i przekłamania na ekranie), które natychmiast znikają po wywarciu lekkiego mechanicznego docisku na korpus procesora BGA lub po jego lekkim podgrzaniu. Objaw ten jednoznacznie wskazuje na:',
    options: [
      'Pęknięcie połączenia lutowanego (zimny lut / fractured solder joint) pod jedną z kulek układu BGA',
      'Uszkodzenie kabla HDMI',
      'Brak sterowników w systemie Windows',
      'Zmniejszenie luminancji matrycy monitora'
    ],
    correctAnswer: 0,
    hint: 'Mechaniczny docisk tymczasowo zbliża pęknięte powierzchnie kulki lutowia, przywracając ciągłość elektryczną obwodu.',
    explanation: 'Cykle nagrzewania i stygnięcia (rozszerzalność termiczna CTE) wywołują mikropęknięcia zmęczeniowe na złączach BGA. Docisk lub rozszerzalność cieplna podgrzanego metalu czasowo zwiera przerwę, potwierdzając konieczność wykonania reflow lub reballingu.'
  },

  // 38. Zwichrowanie laminatu (Warping)
  {
    id: 'cke-elm05-smd-08',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (4, 6)',
    question: 'Podczas wymiany układu BGA zaniechanie podparcia płyty głównej i brak jej równomiernego podgrzania może wywołać zjawisko "warping", czyli:',
    options: [
      'Trwałe zwichrowanie i wygięcie łukowate laminatu PCB pod wpływem naprężeń termicznych, co prowadzi do zwarcia kulek w centrum i braku kontaktu na krawędziach',
      'Samoczynne rozmagnesowanie transformatorów',
      'Polaryzację ładunków na obudowie z tworzywa',
      'Wyparowanie wewnętrznych ścieżek miedzianych'
    ],
    correctAnswer: 0,
    hint: 'Gdy góra płyty jest gorąca (240°C), a dół zimny (20°C), powstaje potężna asymetria rozszerzalności termicznej wyginająca laminat jak bimetal.',
    explanation: 'Wypaczenie płyty (warping) powoduje, że wklęsły lub wypukły laminat uniemożliwia równe przyleganie kulek BGA do padów. W centrum kulki zostają zgniecione (mostki), a na obrzeżach unoszą się nad padami (brak połączenia).'
  },

  // 39. Naprawa zerwanych padów SMD
  {
    id: 'cke-elm05-smd-09',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (4, 6)',
    question: 'Podczas nieumiejętnego odrywania układu scalonego od laminatu doszło do wyrwania kilku pól lutowniczych (padów). Prawidłowa procedura naprawcza zgodnie ze standardem IPC-7721 polega na:',
    options: [
      'Oczyszczeniu ścieżki dochodzącej, wlutowaniu dedykowanego miedzianego płatka naprawczego (padu) z folii miedzianej i utwardzeniu go termoodporną maską UV',
      'Zalaniu całego obszaru klejem na gorąco (Hot-Melt)',
      'Zwarciu wszystkich sąsiednich pinów grubym drutem miedzianym',
      'Wyszlifowaniu laminatu aż do następnej warstwy wewnętrznej'
    ],
    correctAnswer: 0,
    hint: 'Zestawy naprawcze padów zawierają wytrawione miedziane oczka z wypustkami do przylutowania do ścieżki i utwardzenia lakierem UV.',
    explanation: 'Standard IPC-7721 dopuszcza rekonstrukcję zerwanych padów SMD przy użyciu precyzyjnych kształtek miedzianych zgrzewanych lub lutowanych do mikroskopijnego fragmentu ocalałej ścieżki, zabezpieczonych dielektryczną żywicą utwardzaną światłem UV.'
  },

  // 40. Lutowanie gniazd USB-C / microUSB
  {
    id: 'cke-elm05-smd-10',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (4, 6)',
    question: 'Podczas montażu nowego gniazda USB-C o rastrze pinów sygnałowych 0.5 mm najskuteczniejszą techniką usunięcia ewentualnych mostków spoiwa między nóżkami jest:',
    options: [
      'Nałożenie topnika żelowego i delikatne zebranie nadmiaru cyny cienką miedzianą plecionką rozlutowniczą lub grotem typu minifala (concave)',
      'Uderzenie płytką o blat stołu w celu strząśnięcia ciekłej cyny',
      'Zwiększenie temperatury grota do 500°C w celu odparowania miedzi',
      'Przecięcie zwarcia nożem introligatorskim pod napięciem'
    ],
    correctAnswer: 0,
    hint: 'Topnik zwiększa napięcie powierzchniowe ciekłego stopu, a miedziana plecionka wchłania nadmiar cyny siłami kapilarnymi.',
    explanation: 'Zastosowanie topnika no-clean oraz miedzianej tasiemki rozlutowniczej (ang. desoldering wick) pozwala na precyzyjne odessanie zbędnego spoiwa bez mechanicznego uszkadzania delikatnych pinów i soldermaski gniazda USB-C.'
  },

  // 41. Pomiary spadku napięcia w trybie diody na liniach zasilania
  {
    id: 'cke-elm05-smd-11',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'Dlaczego w nowoczesnej diagnostyce płyt głównych serwisanci mierzą spadek napięcia w trybie testu diody (czerwona sonda do masy GND, czarna do badanej linii zasilania) zamiast zwykłego pomiaru rezystancji?',
    options: [
      'Pozwala to na szybkie i powtarzalne porównanie spadków napięć na złączach p-n układów scalonych z płytą wzorcową (ang. diode mode readings) oraz natychmiastowe wykrycie zwarć i przerw',
      'Pomiar w trybie diody generuje napięcie 100 V czyszczące tlenki',
      'Tryb diody pozwala na pomiar bez użycia baterii w multimetrze',
      'Pomiar rezystancji jest zabroniony przez normy europejskie'
    ],
    correctAnswer: 0,
    hint: 'Sonda czerwona na masę spolaryzuje w kierunku przewodzenia wewnętrzne diody ochronne ESD układów scalonych podłączonych do szyny.',
    explanation: 'Pomiar w trybie diody bada spadek napięcia na strukturach półprzewodnikowych układów scalonych podłączonych do badanej gałęzi. Odczyt 0.00 V oznacza pełne zwarcie, a brak odczytu (OL) – przerwę w obwodzie lub brak połączenia z procesorem.'
  },

  // 42. Bezpieczna temperatura i czas nadmuchu Hot-Air
  {
    id: 'cke-elm05-smd-12',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (4, 6)',
    question: 'Podczas demontażu plastikowego układu scalonego SMD przy użyciu stacji gorącego powietrza (Hot-Air) bez podgrzewacza dolnego, optymalne parametry chroniące element przed stopieniem tworzywa to:',
    options: [
      'Temperatura nawiewu ok. 350°C–370°C, umiarkowany przepływ powietrza i czas nagrzewania nieprzekraczający 40–60 sekund z ciągłym ruchem dyszy wokół układu',
      'Temperatura 600°C z nieruchomą dyszą trzymaną 1 mm nad obudową przez 5 minut',
      'Temperatura 100°C przez 1 godzinę',
      'Maksymalny nadmuch zimnego powietrza z pistoletu pneumatycznego'
    ],
    correctAnswer: 0,
    hint: 'Ciągły ruch kołowy dyszy zapobiega miejscowemu przepaleniu plastikowej obudowy układu scalonego.',
    explanation: 'Plastikowe obudowy układów (epoxy mold compound) ulegają zwęgleniu lub pęcznieniu przy punktowym przegrzaniu. Ruch okrężny dyszy zapewnia równomierny transfer ciepła do wszystkich padów jednocześnie, pozwalając na zdjęcie układu w czasie poniżej minuty.'
  },

  // 43. Rola topnika żelowego (Gel Flux)
  {
    id: 'cke-elm05-smd-13',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (3, 6)',
    question: 'W profesjonalnym montażu i wymianie układów SMD topnik w postaci gęstego żelu (ang. tacky gel flux w strzykawce) ma przewagę nad rzadkim topnikiem w płynie, ponieważ:',
    options: [
      'Dłużej utrzymuje się na polach lutowniczych, nie odparowuje gwałtownie pod strumieniem Hot-Air i stabilnie przytrzymuje lekki komponent na miejscu przed stopieniem spoiwa',
      'Jest całkowicie niepalny w temperaturze 2000°C',
      'Zastępuje cynę lutowniczą jako przewodnik prądu',
      'Można go bezpiecznie spożywać bez środków ochrony BHP'
    ],
    correctAnswer: 0,
    hint: 'Żelowa konsystencja topnika zapobiega jego zdmuchnięciu przez gorące powietrze i działa jak lepik.',
    explanation: 'Topniki żelowe (np. typu RMA lub No-Clean w tubach z tłoczkiem) posiadają wysoką lepkość roboczą. Nie spływają z padów i nie rozpryskują się pod wpływem nadmuchu Hot-Air, zapewniając ciągłą ochronę przed utlenianiem w całym cyklu lutowania.'
  },

  // 44. Zjawisko samopozycjonowania (Self-Alignment)
  {
    id: 'cke-elm05-smd-14',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (4, 6)',
    question: 'Zjawisko samopozycjonowania (ang. self-alignment) w montażu układów SMD polega na tym, że:',
    options: [
      'Siły napięcia powierzchniowego roztopionego spoiwa lutowniczego samoczynnie dociągają lekko przesunięty komponent do idealnego środka pól lutowniczych',
      'Układ scalony obraca się automatycznie pod wpływem pola magnetycznego Ziemi',
      'Kamera optyczna przesuwa płytkę za pomocą serwomotorów',
      'Elementy SMD same wędrują po płytce pod wpływem ładunków statycznych'
    ],
    correctAnswer: 0,
    hint: 'Gdy cyna na wszystkich padach przechodzi w stan płynny, dąży do minimalizacji energii powierzchniowej menisku, centrując nóżki na padach.',
    explanation: 'Równomierne zwilżenie wszystkich padów pokrytych płynną cyną generuje symetryczne siły napięcia powierzchniowego, które potrafią skorygować błąd ułożenia elementu (ang. self-alignment effect) nawet o kilkadziesiąt procent szerokości padu.'
  },

  // 45. Inspekcja mikroskopowa złącza QFP
  {
    id: 'cke-elm05-smd-15',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (2, 5)',
    question: 'Podczas kontroli jakości połączeń lutowanych nóżek układu scalonego w obudowie QFP pod mikroskopem stereoskopowym, prawidłowe złącze lutowane charakteryzuje się:',
    options: [
      'Gładkim, lśniącym lub lekko satynowym wklęsłym meniskiem spoiwa obejmującym stopkę nóżki (heel, toe i boki) z widocznym kątem zwilżania poniżej 30°',
      'Wypukłą, okrągłą bryłą cyny całkowicie zakrywającą nóżkę aż do korpusu układu scalonego',
      'Matową, porowatą strukturą z widocznymi szczelinami przy laminacie',
      'Całkowitym brakiem cyny na nóżkach'
    ],
    correctAnswer: 0,
    hint: 'Zgodnie z IPC-A-610 prawidłowy lut musi posiadać wklęsły profil zwilżenia i wyraźnie widoczną stopkę wyprowadzenia.',
    explanation: 'Zgodnie ze standardem IPC-A-610 dla wyprowadzeń typu gull-wing kluczowe jest prawidłowe uformowanie menisku w tylnej części stopki (heel fillet), co gwarantuje odporność mechaniczną na drgania i pękanie.'
  },

  // 46. Wymiana układu PowerSO-8 / DFN
  {
    id: 'cke-elm05-smd-16',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (4, 6)',
    question: 'Układ przetwornicy w obudowie DFN z dużym padem masy pod spodem nie daje się zdjąć pęsetą mimo roztopienia cyny na bocznych nóżkach. Prawidłowym postępowaniem serwisanta jest:',
    options: [
      'Dalsze równomierne dogrzewanie strefy z wykorzystaniem podgrzewacza dolnego, aż stopi się spoiwo pod centralnym padem termicznym (nigdy nie podważać elementu na siłę!)',
      'Złapanie układu kombinerkami i gwałtowne oderwanie od laminatu',
      'Przewiercenie obudowy wiertłem 3 mm w celu osłabienia mocowania',
      'Zalanie płyty zimną wodą w trakcie grzania'
    ],
    correctAnswer: 0,
    hint: 'Próba siłowego uniesienia układu przed stopieniem padu termicznego nieodwracalnie wyrwie miedź z laminatu PCB.',
    explanation: 'Centralny pad termiczny odbiera najwięcej ciepła do wewnętrznych warstw masy. Podważenie elementu przed osiągnięciem punktu płynności (liquidus) na padzie termicznym doprowadzi do katastrofalnego wyrwania padu i zniszczenia płyty.'
  },

  // 47. Delaminacja laminatu FR4
  {
    id: 'cke-elm05-smd-17',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (5, 6)',
    question: 'Wada laminatu zwana delaminacją (ang. delamination / powstawanie pęcherzy wewnątrz płyty PCB) powstaje najczęściej w wyniku:',
    options: [
      'Zbyt długiego miejscowego przegrzewania wilgotnego laminatu wysoką temperaturą, co powoduje rozwarstwienie warstw włókna szklanego i żywicy epoksydowej pod ciśnieniem pary wodnej',
      'Lutowania w temperaturze poniżej 100°C',
      'Czyszczenia płytki alkoholem izopropylowym',
      'Przechowywania urządzenia w suchym pomieszczeniu'
    ],
    correctAnswer: 0,
    hint: 'Wilgoć uwięziona w mikroporach żywicy epoksydowej FR4 wrze podczas gwałtownego nagrzewania, tworząc bąble i rozrywając warstwy.',
    explanation: 'Delaminacja to nieodwracalne uszkodzenie struktury laminatu FR4. Aby jej zapobiec na starych lub zawilgoconych płytach wielowarstwowych, płytę przed skomplikowanym montażem BGA należy wygrzać (wysuszyć) w piecu w 100°C przez kilka godzin.'
  },

  // 48. Czyszczenie padów BGA plecionką
  {
    id: 'cke-elm05-smd-18',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (4, 6)',
    question: 'Podczas usuwania starego spoiwa z pól lutowniczych BGA miedzianą plecionką i grotem lutowniczym, aby nie zedrzeć delikatnej soldermaski między padami, należy:',
    options: [
      'Nałożyć obficie topnik żelowy, prowadzić plecionkę płasko po powierzchni bez wywierania nacisku mechanicznego, opierając grot na plecionce i pozwalając ciepłu roztapiać cynę',
      'Dociskać grot z maksymalną siłą dłoni do laminatu i szorować w poprzek padów',
      'Używać suchej, utlenionej plecionki bez topnika',
      'Prowadzić grot o ostrej igłowej końcówce z dużą prędkością'
    ],
    correctAnswer: 0,
    hint: 'Nacisk mechaniczny grota na plecionkę zdziera mikroskopijne mostki soldermaski (ang. solder mask dam), co uniemożliwi późniejsze przylutowanie BGA.',
    explanation: 'Soldermaska pomiędzy padami BGA ma grubość ułamków milimetra. Dociskanie plecionki zrywa mostki maski i może poderwać pady miedziane. Jedynie płynny ślizg z nasyceniem świeżym topnikiem gwarantuje bezpieczne oczyszczenie pól.'
  },

  // 49. Zmywanie pozostałości topnika
  {
    id: 'cke-elm05-smd-19',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (5, 6)',
    question: 'Dlaczego po zakończeniu lutowania naprawczego SMD należy dokładnie zmyć resztki topnika (nawet typu No-Clean) alkoholem IPA lub dedykowanym zmywaczem PCB Cleaner?',
    options: [
      'Przypalony topnik wiąże wilgoć i kurz z otoczenia, co z czasem obniża rezystancję izolacji powierzchniowej (SIR), może wywołać korozję elektrochemiczną i utrudnia inspekcję optyczną',
      'Topnik po ostygnięciu zamienia się w metaliczny ołów',
      'Obecność topnika uniemożliwia przepływ prądu przez złącza lutowane',
      'Topnik wchodzi w reakcję z powietrzem emitując szkodliwe promieniowanie gamma'
    ],
    correctAnswer: 0,
    hint: 'Pozostałości topnika w obecności wilgoci i napięcia stałego prowadzą do migracji jonowej i powstawania mikroskopijnych dendrytów.',
    explanation: 'Chociaż topniki No-Clean są bezpieczniejsze od agresywnych topników kwasowych, ich zwęglone resztki są higroskopijne. W układach wysokoomowych lub w.cz. brudny topnik wywołuje upływności prądu, a w środowisku wilgotnym – powstawanie korozyjnych dendrytów powodujących zwarcia.'
  },

  // 50. Lakierowanie ochronne (Conformal Coating)
  {
    id: 'cke-elm05-smd-20',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (5, 6)',
    question: 'Lakier ochronny (ang. conformal coating) nakładany na pakiety elektroniczne pracujące w trudnych warunkach środowiskowych (np. elektronika samochodowa, morska) ma na celu:',
    options: [
      'Zabezpieczenie elementów i spoin lutowniczych przed wilgocią, kondensacją pary wodnej, pyłem, solanką oraz korozją elektrochemiczną',
      'Zwiększenie poboru mocy urządzenia w celu ogrzewania kabiny',
      'Trwałe zablokowanie możliwości demontażu elementów w celach gwarancyjnych',
      'Zastąpienie metalowych śrub montażowych'
    ],
    correctAnswer: 0,
    hint: 'Cienka powłoka polimerowa (akrylowa, silikonowa lub poliuretanowa) szczelnie izoluje całą powierzchnię płytki PCB.',
    explanation: 'Lakier ochronny tworzy elastyczną barierę dielektryczną o grubości 25–75 µm. Chroni płytkę przed rosą, solą drogową i chemikaliami, zapobiegając zwarciom i degradacji złączy lutowanych w trudnych warunkach eksploatacji.'
  },

  // 51. Rezystory zerowe i bezpiecznikowe SMD
  {
    id: 'cke-elm05-smd-21',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'Element SMD oznaczony kodem cyfrowym "0" lub "000" o wymiarach 1206 w obwodzie wejściowym zasilania pełni rolę:',
    options: [
      'Zworki technologicznej (zwory zerowej 0 Ω) mogącej pełnić również funkcję łatwo wymiennego bezpiecznika topikowego przy gwałtownym przeciążeniu',
      'Kondensatora o zerowej pojemności',
      'Dławika filtrującego o indukcyjności nieskończonej',
      'Diody blokującej o zerowym napięciu przewodzenia'
    ],
    correctAnswer: 0,
    hint: 'Rezystor 0 omów (tzw. zero-ohm jumper) pozwala na konfigurację płytki na linii automatycznej lub zabezpiecza linię.',
    explanation: 'Rezystory zero-omowe (0 Ω) są standardowo montowane przez maszyny Pick & Place zamiast przewlekanych zworek z drutu. W gałęziach zasilania przy zwarciu ulegają przepaleniu jak bezpiecznik (przerwa w obwodzie).'
  },

  // 52. Diagnoza dławików i cewek SMD
  {
    id: 'cke-elm05-smd-22',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (2, 8)',
    question: 'W przetwornicy impulsowej dławik SMD mocno się nagrzewa, trzeszczy, a sprawność układu drastycznie spadła, mimo że zwykły omomierz multimetru wskazuje ciągłość uzwojenia (0.1 Ω). Jaka jest przyczyna?',
    options: [
      'Zwarcie międzyzwojowe w cewce lub pęknięcie i nasycenie ferrytowego rdzenia magnetycznego, co redukuje indukcyjność do ułamka wartości nominalnej',
      'Zastosowanie zbyt czystego oleju chłodzącego w multimetrze',
      'Za mała rezystancja przewodów sondy miernika',
      'Przepalenie bezpiecznika sieciowego 230 V'
    ],
    correctAnswer: 0,
    hint: 'Zwykły omomierz mierzy tylko rezystancję stałoprądową R_DC (drut miedziany zawsze ma ułamki oma), nie wykrywając zwarcia między sąsiednimi zwojami.',
    explanation: 'Zwarcie międzyzwojowe lub pęknięcie rdzenia ferrytowego drastycznie obniża indukcyjność L i dobroć Q dławika. Rdzeń wchodzi w nasycenie magnetyczne, prąd w kluczach gwałtownie rośnie, wywołując potężne straty mocy i przegrzewanie.'
  },

  // 53. Uszkodzenia diod TVS (Transil) SMD
  {
    id: 'cke-elm05-smd-23',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'Dioda przeciwprzepięciowa TVS (Transil) montowana na wejściu zasilania urządzenia samochodowego po wystąpieniu silnego impulsu przepięciowego z alternatora uszkadza się zazwyczaj w charakterystyczny sposób:',
    options: [
      'Przechodzi w stan trwałego, niskoomowego zwarcia do masy, powodując natychmiastowe przepalenie bezpiecznika wejściowego i ratując resztę układu przed zniszczeniem',
      'Zamienia się w rezystor o oporze dokładnie 1 MΩ',
      'Zaczyna emitować światło ultrafioletowe',
      'Zwiększa napięcie wejściowe dwukrotnie'
    ],
    correctAnswer: 0,
    hint: 'Zasada działania diody TVS jako elementu ochronnego polega na zwarciu (crowbar effect / fail-short mode) przy przeciążeniu energią.',
    explanation: 'Diody Transil (TVS) w przypadku przekroczenia maksymalnej energii pochłanianej (Pppm) ulegają trwałemu przebiciu w stan pełnego zwarcia metalicznego. Zwarcie to wymusza przepalenie bezpiecznika topikowego, skutecznie odcinając zasilanie od drogich układów scalonych.'
  },

  // 54. Mikroprobing
  {
    id: 'cke-elm05-smd-24',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (2, 8)',
    question: 'W mikroelektronice technika pomiarowa zwana "mikroprobingiem" (ang. microprobing) polega na:',
    options: [
      'Wykonywaniu pomiarów sygnałów bezpośrednio z mikroskopijnych ścieżek PCB lub padów testowych za pomocą ultracienkich igieł pomiarowych pod mikroskopem stereoskopowym',
      'Badaniu fal radiowych za pomocą anteny satelitarnej',
      'Pomiarze temperatury pokojowej termometrem rtęciowym',
      'Uderzaniu młotkiem w obudowę w celu sprawdzenia odporności udarowej'
    ],
    correctAnswer: 0,
    hint: 'Specjalne sondy ze szlifowanymi igłami z węglika wolframu umożliwiają wkłucie się przez soldermaskę do ścieżek o szerokości poniżej 0,1 mm.',
    explanation: 'W gęsto upakowanych urządzeniach (np. smartfony, płyty główne laptopów) ścieżki i przelotki nie posiadają złączy testowych. Mikroprobing pod mikroskopem pozwala na pomiar napięć i przebiegów bezpośrednio z mikroskopijnych punktów testowych bez zwarcia sąsiednich linii.'
  },

  // 55. Ochrona ESD w serwisie pakietów SMD
  {
    id: 'cke-elm05-smd-25',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.1 (1, 6)',
    question: 'Który z poniższych zestawów wyposażenia jest bezwzględnie wymagany na profesjonalnym stanowisku serwisu i napraw pakietów SMD zgodnie z normą PN-EN 61340-5-1?',
    options: [
      'Uziemiona mata stołowa ESD, opaska na nadgarstek z rezystorem 1 MΩ, antystatyczne pęsety ESD oraz lutownica z uziemionym grotem (potencjał grota < 2 mV względem uziemienia)',
      'Wełniany sweter, gumowe kalosze i plastikowa pęseta biurowa',
      'Mata ze styropianu i grzałka na propan-butan',
      'Zwykła lutownica transformatorowa bez uziemienia grota'
    ],
    correctAnswer: 0,
    hint: 'Brak uziemienia grota lub ładunek na ciele serwisanta natychmiast przebija tlenkową izolację bramek tranzystorów MOSFET o grubości nanometrów.',
    explanation: 'Zgodnie z normą ESD strefa EPA wymaga uziemienia wszystkich elementów przewodzących ładunek: maty stołowej, operatora (przez opaskę z rezystorem bezpieczeństwa 1 MΩ) oraz sprzętu lutowniczego, którego grot musi być pewnie połączony z szyną PE uziemienia.'
  },

  // 56. Starzenie połączeń lutowanych
  {
    id: 'cke-elm05-smd-26',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (5, 6)',
    question: 'Wieloletnia eksploatacja urządzeń elektronicznych w podwyższonej temperaturze prowadzi do degradacji spoin lutowanych wskutek rozrostu:',
    options: [
      'Kruchej warstwy międzymetalicznej IMC (ang. Intermetallic Compound, np. związki Cu6Sn5 i Cu3Sn), co drastycznie obniża wytrzymałość zmęczeniową spoiny i prowadzi do mikropęknięć',
      'Warstwy czystego złota na ścieżkach laminatu',
      'Włókien celulozowych w laminacie',
      'Średnicy otworów montażowych w obudowie'
    ],
    correctAnswer: 0,
    hint: 'Warstwa IMC powstaje na granicy miedzi i cyny. Z czasem staje się zbyt gruba i krucha jak szkło.',
    explanation: 'Na granicy fazowej miedź-spoiwo zachodzi dyfuzja atomowa tworząca związki międzymetaliczne IMC. W podwyższonych temperaturach warstwa ta narasta, staje się porowata i skrajnie krucha, co przy naprężeniach termicznych powoduje oderwanie spoiny od padu.'
  },

  // 57. Zjawisko wąsów cynowych (Tin Whiskers)
  {
    id: 'cke-elm05-smd-27',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (5, 6)',
    question: 'Zjawisko powstawania "wąsów cynowych" (ang. tin whiskers) w urządzeniach z bezołowiowym montażem SMD polega na:',
    options: [
      'Samoistnym wyrastaniu z powierzchni czystej cyny mikroskopijnych, przewodzących prąd igiełek/włosków metalicznych o długości do kilku milimetrów, które wywołują zwarcia między sąsiednimi pinami ukruszonymi w gęstym rastrze',
      'Pojawieniu się pleśni bakteryjnej na powłoce soldermaski',
      'Skraplaniu się par rozpuszczalnika na nóżkach układu scalonego',
      'Korozji wkrętów mocujących płytkę drukowaną'
    ],
    correctAnswer: 0,
    hint: 'Wąsy cynowe rosną samoczynnie w wyniku naprężeń mechanicznych w powłokach z czystej bezołowiowej cyny (Sn).',
    explanation: 'Tin whiskers to monokryształy cyny wyrastające z bezołowiowych powłok galwanicznych pod wpływem wewnętrznych naprężeń ściskających. W urządzeniach o drobnym rastrze (np. 0,4 mm) wąsy te mostkują sąsiednie piny, wywołując niewyjaśnione awarie i zwarcia.'
  },

  // 58. Przetwornice synchroniczne SMD
  {
    id: 'cke-elm05-smd-28',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (2, 7)',
    question: 'W nowoczesnej synchronicznej przetwornicy obniżającej (Buck Converter) zasilającej rdzeń procesora przebicie i zwarcie dren-źródło górnego tranzystora MOSFET (High-Side) skutkuje:',
    options: [
      'Pojawieniem się pełnego napięcia wejściowego (np. 19 V lub 12 V) bezpośrednio na zasilanym rdzeniu procesora (Vcore nominalnie ok. 1.0 V) i jego natychmiastowym, nieodwracalnym zniszczeniem',
      'Płynnym przejściem przetwornicy w tryb ładowania akumulatora',
      'Zmniejszeniem poboru prądu zasilacza do zera',
      'Podwojeniem częstotliwości kluczowania'
    ],
    correctAnswer: 0,
    hint: 'Górny klucz łączy szynę wejściową z dławikiem. Zwarcie tego klucza to bezpośrednie podanie 19 V na procesor.',
    explanation: 'Przebicie górnego tranzystora MOSFET (High-Side) to najgroźniejsza awaria przetwornicy Step-Down. Jeśli zabezpieczenie nadnapięciowe (OVP) nie zadziała w ułamku mikrosekundy, pełne napięcie wejściowe 19 V przepływa przez cewkę na rdzeń CPU/GPU, trwale go niszcząc.'
  },

  // 59. Zalanie cieczą i korozja elektrochemiczna
  {
    id: 'cke-elm05-smd-29',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (4, 6)',
    question: 'Płytka elektroniczna urządzenia mobilnego została zalana napojem gazowanym pod napięciem baterii. Prawidłowa procedura czyszczenia serwisowego przed podłączeniem zasilania laboratoryjnego obejmuje:',
    options: [
      'Natychmiastowe odłączenie baterii, demontaż ekranów, dokładne mycie w myjce ultradźwiękowej z dedykowanym płynem usuwającym sole i tlenki, płukanie w IPA 99.9% oraz długotrwałe suszenie komorowe',
      'Włożenie urządzenia na 24 godziny do woreczka z suchym ryżem i natychmiastowe podłączenie ładowarki',
      'Wyczyszczenie obudowy szczotką drucianą na sucho',
      'Wygrzanie płyty palnikiem gazowym do temperatury 400°C'
    ],
    correctAnswer: 0,
    hint: 'Mit z ryżem nie usuwa produktów korozji elektrochemicznej ani soli pod układami BGA – konieczne jest profesjonalne mycie ultradźwiękowe.',
    explanation: 'Ciecz z elektrolitem w obecności napięcia baterii wywołuje błyskawiczną korozję galwaniczną (trawienie miedzi, zielenienie padów). Myjka ultradźwiękowa dociera pod układy scalone BGA i rozbija osady soli, a kąpiel w IPA usuwa resztki wody przed suszeniem.'
  },

  // 60. Norma IPC-7711/7721 w naprawach pakietów
  {
    id: 'cke-elm05-smd-30',
    qualification: 'ELM.05',
    category: 'Serwis i montaż pakietów SMD',
    officialRef: 'ELM.05.4 (5, 6)',
    question: 'Międzynarodowy standard IPC-7711/7721 ("Rework, Modification and Repair of Electronic Assemblies") jest w profesjonalnym serwisie elektronicznym zbiorem procedur określających:',
    options: [
      'Certyfikowane metody i wytyczne technologiczne dotyczące bezpiecznego demontażu, lutowania naprawczego komponentów SMD/THT oraz regeneracji uszkodzonych ścieżek i laminatów PCB',
      'Cennik usług serwisowych dla klientów indywidualnych',
      'Zasady utylizacji starych kineskopów telewizyjnych',
      'Sposób pakowania przesyłek kurierskich z elektroniką'
    ],
    correctAnswer: 0,
    hint: 'Norma IPC-7711/7721 to biblia serwisu elektronicznego – definiuje jak wymienić element, nie naruszając fabrycznej niezawodności pakietu.',
    explanation: 'IPC-7711 definiuje procedury wymiany elementów (rework), a IPC-7721 metody naprawy uszkodzeń laminatu i ścieżek (repair). Przestrzeganie tych standardów gwarantuje, że naprawiony sprzęt wojskowy, medyczny czy przemysłowy zachowa pełną niezawodność.'
  }
];

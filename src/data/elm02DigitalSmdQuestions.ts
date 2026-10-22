import { QuizQuestion } from '../types';

export const ELM02_DIGITAL_SMD_QUESTIONS: QuizQuestion[] = [
  // =========================================================================
  // UKŁADY CYFROWE - 30 PYTAŃ (Kwalifikacja ELM.02)
  // =========================================================================

  // 1. Bramka XOR
  {
    id: 'cke-elm02-dig-01',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Dwuwejściowa bramka logiczna XOR (Exclusive-OR) przyjmuje stan logiczny 1 na wyjściu wtedy i tylko wtedy, gdy:',
    options: [
      'Na obu wejściach panuje wysoki stan logiczny 1',
      'Stany logiczne na obu wejściach są różne (jedno wejście 0, drugie 1)',
      'Na obu wejściach panuje niski stan logiczny 0',
      'Na wejściu A panuje stan 0 niezależnie od wejścia B'
    ],
    correctAnswer: 1,
    hint: 'Bramka XOR jest zwana sumatorem modulo 2 lub funkcją nierównoważności (różnicy).',
    explanation: 'Bramka XOR daje stan 1 wyłącznie wtedy, gdy bity wejściowe mają różne wartości (0 i 1 lub 1 i 0). Gdy wejścia są jednakowe (0-0 lub 1-1), wyjście wynosi 0.'
  },

  // 2. Prawa De Morgana
  {
    id: 'cke-elm02-dig-02',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Zgodnie z I prawem De Morgana, zanegowany iloczyn logiczny NOT(A AND B) jest tożsamy z wyrażeniem:',
    options: [
      'NOT(A) AND NOT(B)',
      'A OR B',
      'NOT(A) OR NOT(B)',
      'NOT(A XOR B)'
    ],
    correctAnswer: 2,
    hint: 'Prawa De Morgana mówią: negacja koniunkcji to alternatywa negacji, a negacja alternatywy to koniunkcja negacji.',
    explanation: 'I prawo De Morgana głosi, że zaprzeczenie iloczynu logicznego jest równe sumie logicznej zaprzeczonych argumentów: /(A · B) = /A + /B.'
  },

  // 3. Tablica Karnaugh
  {
    id: 'cke-elm02-dig-03',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Do minimalizacji funkcji logicznej czterech zmiennych wejściowych (A, B, C, D) stosuje się tablicę Karnaugha zawierającą dokładnie:',
    options: [
      '8 komórek',
      '12 komórek',
      '16 komórek',
      '32 komórki'
    ],
    correctAnswer: 2,
    hint: 'Liczba pól w tablicy Karnaugha wynosi 2^n, gdzie n to liczba zmiennych wejściowych.',
    explanation: 'Dla n = 4 zmiennych wejściowych liczba możliwych kombinacji stanów wynosi 2^4 = 16. Siatka tablicy Karnaugha posiada wymiary 4 x 4 pola z kodem Graya na osiach.'
  },

  // 4. Przerzutnik RS
  {
    id: 'cke-elm02-dig-04',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'W asynchronicznym przerzutniku RS zbudowanym na bramkach NOR, stanem zabronionym (nieustalonym) jest podanie na wejścia kombinacji:',
    options: [
      'S = 0, R = 0',
      'S = 1, R = 0',
      'S = 0, R = 1',
      'S = 1, R = 1'
    ],
    correctAnswer: 3,
    hint: 'Jednoczesna próba ustawienia (Set) i skasowania (Reset) powoduje konflikt logiczny na wyjściach Q i /Q.',
    explanation: 'W przerzutniku RS na bramkach NOR podanie jednoczesnego stanu S=1 i R=1 wymusza zero na obu wyjściach (Q=0 i /Q=0), co narusza definicję komplementarności wyjść i po jednoczesnym zdjęciu sygnałów prowadzi do wyścigu.'
  },

  // 5. Przerzutnik typu D
  {
    id: 'cke-elm02-dig-05',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Synchroniczny przerzutnik typu D (Data / Delay) taktowany dodatnim zboczem zegara po nadejściu impulsu CLK przepisuje na wyjście Q:',
    options: [
      'Stan przeciwny do aktualnego stanu wyjścia Q',
      'Zawsze stan niski 0 niezależnie od wejścia',
      'Stan logiczny obecny na wejściu informacyjnym D w chwili zbocza zegarowego',
      'Sygnał sumy logicznej wejścia D i zegara CLK'
    ],
    correctAnswer: 2,
    hint: 'Nazwa przerzutnika D pochodzi od słowa Data lub Delay (przeniesienie bitu na zboczu zegara).',
    explanation: 'Przerzutnik D przepisuje na wyjście Q wartość z wejścia D dokładnie w momencie aktywnego zbocza sygnału taktującego CLK, pamiętając ten stan do kolejnego zbocza.'
  },

  // 6. Przerzutnik JK w trybie T
  {
    id: 'cke-elm02-dig-06',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'W przerzutniku synchronicznym typu JK, aby układ pracował w trybie zliczania/negacji (Toggle - zmiana stanu wyjścia na przeciwny przy każdym takcie), należy ustawić wejścia:',
    options: [
      'J = 0, K = 0',
      'J = 1, K = 0',
      'J = 0, K = 1',
      'J = 1, K = 1'
    ],
    correctAnswer: 3,
    hint: 'Gdy J=K=0 przerzutnik pamięta stan. Gdy J=K=1 przerzutnik zmienia stan na przeciwny.',
    explanation: 'Kombinacja J=1 i K=1 jest cechą wyróżniającą przerzutnik JK (brak stanu zabronionego). Przy każdym aktywnym zboczu zegara wyjście Q ulega zanegowaniu (Q(n+1) = /Q(n)), co pozwala na dzielenie częstotliwości przez 2.'
  },

  // 7. Licznik asynchroniczny
  {
    id: 'cke-elm02-dig-07',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Główną wadą wielobitowych liczników asynchronicznych (ang. ripple counter) w porównaniu do liczników synchronicznych jest:',
    options: [
      'Konieczność stosowania zasilania symetrycznego',
      'Kumulowanie się czasów propagacji kolejnych przerzutników, co ogranicza maksymalną częstotliwość pracy',
      'Brak możliwości zliczania w dół (rewersyjności)',
      'Duża liczba bramek sterujących wejściami zegarowymi'
    ],
    correctAnswer: 1,
    hint: 'W liczniku asynchronicznym każdy kolejny przerzutnik jest taktowany wyjściem poprzedniego.',
    explanation: 'W liczniku asynchronicznym impuls zegarowy przemieszcza się szeregowo od stopnia do stopnia. Całkowity czas propagacji rośnie proporcjonalnie do liczby bitów (n · tpd), co przy wyższych częstotliwościach wywołuje fałszywe stany przejściowe (szpilki hazardowe).'
  },

  // 8. Licznik BCD
  {
    id: 'cke-elm02-dig-08',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Licznik dziesiętny zliczający w kodzie BCD (modulo 10) zbudowany z 4 przerzutników po osiągnięciu stanu binarnego 1001 (9) w kolejnym takcie powinien:',
    options: [
      'Przejść do stanu 1010 (10 dziesiętnie)',
      'Zresetować się do stanu 0000 (0 dziesiętnie) i wygenerować impuls przeniesienia',
      'Zatrzymać zliczanie do momentu ręcznego wyzerowania',
      'Przejść do stanu 1111 (15 dziesiętnie)'
    ],
    correctAnswer: 1,
    hint: 'Modulo 10 oznacza, że licznik posiada dokładnie 10 stanów roboczych od 0 do 9.',
    explanation: 'Licznik modulo 10 (dziesiętny BCD) zlicza od 0000 do 1001 (9). Po nadejściu dziesiątego impulsu następuje powrót do 0000 oraz wygenerowanie sygnału przepełnienia (Carry Out) dla kolejnej dekady.'
  },

  // 9. Minimalna liczba przerzutników
  {
    id: 'cke-elm02-dig-09',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Jaka jest minimalna liczba przerzutników bistabilnych potrzebna do zbudowania licznika binarnego zliczającego do 64 impulsów (modulo 64)?',
    options: [
      '5 przerzutników',
      '6 przerzutników',
      '7 przerzutników',
      '8 przerzutników'
    ],
    correctAnswer: 1,
    hint: 'Liczba stanów licznika n-bitowego wynosi N = 2^n.',
    explanation: 'Ponieważ 2^6 = 64, do realizacji licznika o 64 unikalnych stanach (od 0 do 63) potrzeba dokładnie 6 przerzutników (dla 5 przerzutników zakres wynosi tylko 2^5 = 32).'
  },

  // 10. Rejestr PISO
  {
    id: 'cke-elm02-dig-10',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Rejestr przesuwny typu PISO (Parallel-In Serial-Out) służy w systemach cyfrowych przede wszystkim do:',
    options: [
      'Przekształcania słowa danych z formatu równoległego na ciąg szeregowy bitów',
      'Generowania sygnału zegarowego o regulowanym wypełnieniu',
      'Mnożenia dwóch liczb binarnych w jednym cyklu',
      'Zamiany sygnału analogowego na kod Graya'
    ],
    correctAnswer: 0,
    hint: 'PISO: Parallel In (równoległe wejście) -> Serial Out (szeregowe wyjście).',
    explanation: 'Układy PISO zatrzaskują jednocześnie wszystkie bity słowa magistrali równoległej, a następnie takt po takcie wysyłają je jednym przewodem wyjściowym (np. w transmiterach UART lub SPI).'
  },

  // 11. Rejestr Johnsona
  {
    id: 'cke-elm02-dig-11',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Ile unikalnych stanów zlicza n-bitowy licznik Johnsona (rejestr przesuwny z odwróconym sprzężeniem zwrotnym /Q do D pierwszego stopnia)?',
    options: [
      'n stanów',
      '2 · n stanów',
      '2^n stanów',
      'n^2 stanów'
    ],
    correctAnswer: 1,
    hint: 'Dla n=4 bitów licznik Johnsona (np. układ CD4017 z dekoderem) ma 2 · 4 = 8 stanów.',
    explanation: 'W liczniku Johnsona zanegowane wyjście ostatniego przerzutnika jest podłączone do wejścia pierwszego. Daje to 2n stanów (dla 4 bitów: 8 stanów, dla 5 bitów: 10 stanów - układ 4017).'
  },

  // 12. Multiplekser MUX
  {
    id: 'cke-elm02-dig-12',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Układ cyfrowy zwany selektorem danych lub multiplekserem (MUX) realizuje funkcję:',
    options: [
      'Przekazywania sygnału z jednego z wielu wejść danych na pojedyncze wyjście w oparciu o kod na wejściach adresowych',
      'Rozdzielania jednego wejścia na wiele wyjść równoległych',
      'Dodawania dwóch liczb binarnych ze znakiem',
      'Zapamiętywania bajtu danych w komórkach EEPROM'
    ],
    correctAnswer: 0,
    hint: 'Multiplekser działa jak cyfrowy przełącznik obrotowy sterowany adresem binarnym.',
    explanation: 'Multiplekser (MUX) wybiera jedno z wielu wejść informacyjnych i dołącza je do wyjścia Y na podstawie stanu podanego na wejścia adresowe S.'
  },

  // 13. Adresacja multipleksera 8:1
  {
    id: 'cke-elm02-dig-13',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Ile linii adresowych musi posiadać cyfrowy multiplekser 8-wejściowy (MUX 8 do 1)?',
    options: [
      '2 linie adresowe',
      '3 linie adresowe',
      '4 linie adresowe',
      '8 linii adresowych'
    ],
    correctAnswer: 1,
    hint: 'Liczba adresowanych wejść wynosi K = 2^n, gdzie n to liczba linii adresowych.',
    explanation: 'Aby zaadresować 8 niezależnych wejść danych (od D0 do D7), potrzeba 3 linii adresowych, ponieważ 2^3 = 8 (kombinacje od 000 do 111).'
  },

  // 14. Demultiplekser DEMUX
  {
    id: 'cke-elm02-dig-14',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Jaką funkcję pełni układ demultipleksera (DEMUX) w układach automatyki cyfrowej?',
    options: [
      'Kieruje sygnał z jednego wspólnego wejścia danych na jedno z wybranych wyjść zależnie od kodu adresowego',
      'Sumuje prądy ze wszystkich gałęzi wejściowych',
      'Zamienia częstotliwość impulsów na napięcie stałe',
      'Wyznacza parzystość słowa binarnego'
    ],
    correctAnswer: 0,
    hint: 'Demultiplekser wykonuje operację odwrotną do multipleksera.',
    explanation: 'Demultiplekser (DEMUX) posiada jedno wejście danych, wejścia adresowe i wiele wyjść. Przepisuje sygnał wejściowy na to wyjście, którego numer określa słowo adresowe.'
  },

  // 15. Dekoder 7-segmentowy
  {
    id: 'cke-elm02-dig-15',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Scalony dekoder typu 7447 z wyjściami typu otwarty kolektor (active LOW) służy do sterowania wyświetlaczem 7-segmentowym LED ze:',
    options: [
      'Wspólną katodą (Common Cathode)',
      'Wspólną anodą (Common Anode)',
      'Interfejsem szeregowym SPI',
      'Wyświetlaczem ciekłokrystalicznym bez polaryzacji'
    ],
    correctAnswer: 1,
    hint: 'Wyjścia aktywne stanem niskim 0 ściągają segment do masy, więc anody muszą być na stałe zasilone z VCC.',
    explanation: 'Układ 7447 steruje wyświetlaczami ze wspólną anodą (plus zasilania podłączony do anody, a zapalenie segmentu następuje przez wymuszenie stanu niskiego na wyjściu dekodera).'
  },

  // 16. Kod Graya
  {
    id: 'cke-elm02-dig-16',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Dlaczego w enkoderach optycznych i pomiarach pozycji kątowej stosuje się kod Graya zamiast naturalnego kodu binarnego (NKB)?',
    options: [
      'Umożliwia zapis liczb ujemnych bez bitu znaku',
      'Pomiędzy dwoma sąsiednimi pozycjami zmienia się wartość tylko jednego bitu, co eliminuje błędy odczytu i stany nieustalone',
      'Wymaga mniejszej liczby fototranzystorów odbiorczych',
      'Zapewnia automatyczną korekcję błędów CRC'
    ],
    correctAnswer: 1,
    hint: 'Zwróć uwagę na odległość Hamminga równą 1 między kolejnymi słowami.',
    explanation: 'W naturalnym kodzie binarnym przy przejściu np. z 0111 na 1000 zmieniają się 4 bity naraz, co przy mikroskopijnych nierównościach tarczy wywołuje fałszywe odczyty. Kod Graya zmienia tylko 1 bit na krok.'
  },

  // 17. Hazard w układach cyfrowych
  {
    id: 'cke-elm02-dig-17',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Zjawisko hazardu w układach kombinacyjnych polega na:',
    options: [
      'Chwilowym pojawieniu się błędnego impulsu (szpilki) na wyjściu na skutek różnych czasów propagacji sygnałów w poszczególnych ścieżkach logicznych',
      'Trwałym zniszczeniu struktury krzemowej wskutek ładunku ESD',
      'Utracie danych w pamięci RAM przy zaniku zasilania',
      'Zmianie polaryzacji kondensatora elektrolitycznego'
    ],
    correctAnswer: 0,
    hint: 'Hazard (ang. glitch) wynika z asymetrii opóźnień bramek logicznych.',
    explanation: 'Gdy zmiana sygnału wejściowego dociera do bramki wyjściowej dwiema różnymi ścieżkami o odmiennych opóźnieniach tpd, na wyjściu może pojawić się krótkotrwały fałszywy impuls zwany hazardem statycznym lub dynamicznym.'
  },

  // 18. Pełny sumator FA
  {
    id: 'cke-elm02-dig-18',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Jednobitowy pełny sumator binarny (Full Adder - FA) posiada:',
    options: [
      '2 wejścia (A, B) oraz 1 wyjście (S)',
      '3 wejścia (A, B, Cin) oraz 2 wyjścia (S - Suma, Cout - Przeniesienie)',
      '4 wejścia i 4 wyjścia równoległe',
      '1 wejście zegarowe i wyjście trójstanowe'
    ],
    correctAnswer: 1,
    hint: 'Pełny sumator uwzględnia przeniesienie z poprzedniej (młodszej) pozycji bitowej.',
    explanation: 'Full Adder dodaje 3 bity: argument A, argument B oraz przeniesienie z niższej pozycji Cin, generując wynik sumy S oraz przeniesienie do wyższej pozycji Cout.'
  },

  // 19. Półsumator HA
  {
    id: 'cke-elm02-dig-19',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Półsumator binarny (Half Adder - HA) można zbudować przy użyciu zaledwie dwóch podstawowych bramek logicznych:',
    options: [
      'XOR (dla sumy S) oraz AND (dla przeniesienia Cout)',
      'OR (dla sumy S) oraz NAND (dla przeniesienia Cout)',
      'NOT oraz NOR',
      'XNOR oraz OR'
    ],
    correctAnswer: 0,
    hint: 'Suma binarna to 0+0=0, 0+1=1, 1+0=1, 1+1=0 (przeniesienie 1).',
    explanation: 'Suma dwóch bitów A i B odpowiada operacji XOR (S = A ⊕ B), natomiast przeniesienie pojawia się tylko gdy A=1 i B=1, co odpowiada iloczynowi AND (Cout = A · B).'
  },

  // 20. Komparator cyfrowy
  {
    id: 'cke-elm02-dig-20',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: '4-bitowy cyfrowy komparator wielkości (np. scalony układ 7485) na swoich wyjściach sygnalizuje relacje między liczbami A i B w postaci stanów logicznych:',
    options: [
      'Tylko A = B',
      'A > B, A = B oraz A < B',
      'Wartość różnicy arytmetycznej A - B w kodzie U2',
      'Iloczyn logiczny A AND B'
    ],
    correctAnswer: 1,
    hint: 'Komparator określa która liczba jest większa, mniejsza lub czy są równe.',
    explanation: 'Komparator wielkości posiada 3 niezależne wyjścia informujące o relacji między dwoma słowami binarnymi: A > B, A = B oraz A < B.'
  },

  // 21. Obciążalność fan-out
  {
    id: 'cke-elm02-dig-21',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Parametr fan-out (współczynnik obciążalności wyjścia) bramki logicznej definiuje:',
    options: [
      'Maksymalną temperaturę złącza krzemowego podczas zwarcia',
      'Maksymalną liczbę wejść bramek tej samej rodziny, jakie można równolegle podłączyć do wyjścia bez utraty poprawnych poziomów napięć logicznych',
      'Czas opadania zbocza impulsu wyjściowego w nanosekundach',
      'Napięcie przebicia złącza izolacyjnego'
    ],
    correctAnswer: 1,
    hint: 'Fan-out określa zdolność prądową wyjścia w stanie niskim i wysokim.',
    explanation: 'Fan-out to maksymalna liczba standardowych wejść logicznych, które dane wyjście może wysterować zachowując gwarantowane marginesy szumów i poziomy napięć VOL i VOH.'
  },

  // 22. Standard TTL vs CMOS
  {
    id: 'cke-elm02-dig-22',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Wskaż fundamentalną zaletę scalonych układów logicznych w technologii CMOS (np. seria 74HC, 4000) w porównaniu z klasycznymi bipolarnymi układami TTL (seria 74):',
    options: [
      'Wybitnie mały pobór mocy w stanie statycznym oraz bardzo wysoka rezystancja wejściowa',
      'Całkowity brak wrażliwości na wyładowania elektrostatyczne ESD',
      'Możliwość pracy wyłącznie przy zasilaniu niestabilizowanym 230 V',
      'Zdolność do bezpośredniego sterowania silnikami trójfazowymi'
    ],
    correctAnswer: 0,
    hint: 'Tranzystory polowe MOS sterowane są napięciowo i w stanie ustalonym prawie nie pobierają prądu z bramki.',
    explanation: 'Bramki CMOS wykorzystują komplementarne pary tranzystorów MOSFET z izolowaną bramką SiO2. W stanie statycznym jeden z tranzystorów jest zawsze zatkany, przez co prąd spoczynkowy wynosi ułamki mikroampera.'
  },

  // 23. Napięcia progowe TTL
  {
    id: 'cke-elm02-dig-23',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Dla standardowej rodziny logicznej TTL zasilanej napięciem 5 V, maksymalny poziom napięcia gwarantujący pewne rozpoznanie logicznego zera na wejściu (VIL max) wynosi:',
    options: [
      '0.8 V',
      '2.0 V',
      '3.5 V',
      '0.0 V'
    ],
    correctAnswer: 0,
    hint: 'Dla TTL 5V: stan niski na wejściu to 0 V do 0,8 V, a stan wysoki to 2,0 V do 5,0 V.',
    explanation: 'W logice TTL napięcie wejściowe poniżej VIL max = 0,8 V jest interpretowane jako stan niski (0). Napięcie powyżej VIH min = 2,0 V to stan wysoki (1). Przedział 0,8 V - 2,0 V stanowi obszar zabroniony.'
  },

  // 24. Czas propagacji tpd
  {
    id: 'cke-elm02-dig-24',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Czas propagacji (ang. propagation delay time) bramki logicznej jest mierzony jako czas pomiędzy:',
    options: [
      'Włączeniem zasilania a ustabilizowaniem się temperatury obudowy',
      'Punktem 50% amplitudy zmiany sygnału wejściowego a punktem 50% amplitudy odpowiadającej zmiany na wyjściu',
      'Początkiem impulsu zegarowego a całkowitym rozładowaniem kondensatora filtrującego',
      'Poziomem 10% a 90% napięcia zasilania'
    ],
    correctAnswer: 1,
    hint: 'Zgodnie z normami pomiarowymi opóźnienie mierzy się w połowie wysokości zbocza (50% amplitudy).',
    explanation: 'Czas propagacji tpd (tPLH / tPHL) to odstęp czasu mierzony między poziomem 50% narastającego lub opadającego zbocza wejściowego a osiągnięciem 50% zbocza na wyjściu bramki.'
  },

  // 25. Przetwornik DAC R-2R
  {
    id: 'cke-elm02-dig-25',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Główną zaletą przetwornika cyfrowo-analogowego (DAC) z drabinką rezystorową typu R-2R w porównaniu z przetwornikiem o wagach rezystorowych jest:',
    options: [
      'Konieczność użycia rezystorów o tylko dwóch precyzyjnych wartościach (R oraz 2R), co ułatwia produkcję i kompensację termiczną w układach scalonych',
      'Całkowity brak potrzeby zasilania napięciem odniesienia Vref',
      'Wytwarzanie na wyjściu sygnału czysto optycznego bez wzmacniacza operacyjnego',
      'Możliwość bezpośredniego podłączenia do sieci Ethernet'
    ],
    correctAnswer: 0,
    hint: 'W przetwornikach wagowych dla 16 bitów stosunek skrajnych rezystorów wynosi 1:65536, co jest niemal niemożliwe do precyzyjnego wykonania w krzemie.',
    explanation: 'Drabinka R-2R wymaga wyłącznie dwóch nominałów rezystorów (np. 10 kΩ i 20 kΩ), dzięki czemu laserowe trymowanie i współczynniki temperaturowe na strukturze scalonej są identyczne dla wszystkich bitów.'
  },

  // 26. Przetwornik ADC SAR
  {
    id: 'cke-elm02-dig-26',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'W przetworniku analogowo-cyfrowym z sukcesywną aproksymacją (SAR - Successive Approximation Register) proces konwersji polega na:',
    options: [
      'Jednoczesnym porównaniu napięcia wejściowego na matrycy setek komparatorów',
      'Porównywaniu napięcia wejściowego krok po kroku z napięciem z wewnętrznego przetwornika DAC, zaczynając od najbardziej znaczącego bitu (MSB) do najmniej znaczącego (LSB)',
      'Zliczaniu czasu rozładowania kondensatora stałym prądem',
      'Pomiarze przesunięcia fazowego fali nośnej'
    ],
    correctAnswer: 1,
    hint: 'Zasada przypomina ważenie na wadze szalkowej od najcięższego odważnika do najlżejszego.',
    explanation: 'Przetwornik SAR ustala kolejne bity wyniku binarnego w n cyklach zegara: testuje stan bitu od MSB do LSB za pomocą komparatora i rejestru aproksymacji, osiągając świetny kompromis szybkości i rozdzielczości.'
  },

  // 27. Przetwornik Flash ADC
  {
    id: 'cke-elm02-dig-27',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Do zbudowania n-bitowego równoległego przetwornika analogowo-cyfrowego typu Flash (najszybszy typ ADC) potrzeba dokładnie:',
    options: [
      'n komparatorów napięcia',
      '2 · n komparatorów napięcia',
      '2^n - 1 szybkich komparatorów napięcia',
      'Tylko jednego komparatora i mikroprocesora'
    ],
    correctAnswer: 2,
    hint: 'Dla 8-bitowego przetwornika Flash (np. w oscyloskopach cyfrowych) potrzeba 2^8 - 1 = 255 komparatorów.',
    explanation: 'Flash ADC dokonuje konwersji w jednym takcie zegara dzięki równoległej matrycy 2^n - 1 komparatorów zasilanych z dzielnika rezystorowego, po czym dekoder priorytetowy zamienia kod termometryczny na binarny.'
  },

  // 28. Pamięci SRAM vs DRAM
  {
    id: 'cke-elm02-dig-28',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Dlaczego pamięci dynamiczne DRAM wymagają ciągłego procesu cyklicznego odświeżania (ang. memory refresh)?',
    options: [
      'Informacja przechowywana jest w postaci ładunku w mikroskopijnych pojemnościach pasożytniczych bramek MOS, który stopniowo zanika wskutek upływności złączy',
      'Wykorzystują one miniaturowe przekaźniki bistabilne, które opadają pod wpływem grawitacji',
      'W strukturze krzemowej dochodzi do zaniku domieszek donorowych',
      'Prąd zasilania musi okresowo odwracać kierunek w celu ochrony przed elektrolizą'
    ],
    correctAnswer: 0,
    hint: 'Pojedyncza komórka DRAM to 1 tranzystor i 1 miniaturowy kondensator 1T-1C.',
    explanation: 'Komórka DRAM składa się z tranzystora i maleńkiego kondensatora. Ładunek ucieka przez prądy upływu w czasie milisekund, dlatego kontroler pamięci musi regularnie odczytywać i doładowywać wszystkie wiersze.'
  },

  // 29. Magistrala I2C
  {
    id: 'cke-elm02-dig-29',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'Magistrala szeregowa I2C (Inter-Integrated Circuit) wykorzystuje dwie dwukierunkowe linie ze stopniami typu otwarty dren/kolektor (Open-Drain), co wymaga:',
    options: [
      'Podłączenia zewnętrznych rezystorów podciągających (pull-up) do dodatniej szyny zasilania VDD',
      'Podłączenia rezystorów terminujących 120 Ω na końcach magistrali',
      'Stosowania izolatorów optycznych na każdym urządzeniu',
      'Symetrycznego zasilania ±15 V'
    ],
    correctAnswer: 0,
    hint: 'Linie SDA (dane) i SCL (zegar) w stanie spoczynku są wciągane do stanu wysokiego przez oporniki.',
    explanation: 'Stopnie Open-Drain mogą jedynie ściągać linię do masy (stan niski). Stan wysoki na liniach SDA i SCL wymuszają rezystory podciągające pull-up (typowo 2.2 kΩ – 4.7 kΩ), co zapobiega zwarciom przy kolizji.'
  },

  // 30. Magistrala SPI
  {
    id: 'cke-elm02-dig-30',
    qualification: 'ELM.02',
    category: 'Układy cyfrowe',
    officialRef: 'ELM.02.2 (6)',
    question: 'W 4-przewodowej magistrali synchronicznej SPI (Serial Peripheral Interface) linia oznaczana jako MOSI odpowiada za:',
    options: [
      'Transmisję danych od urządzenia nadrzędnego do podrzędnego (Master Output, Slave Input)',
      'Transmisję danych od urządzenia podrzędnego do nadrzędnego (Master Input, Slave Output)',
      'Doprowadzenie sygnału taktującego zegara z kwarcu',
      'Wybór układu podrzędnego stanem niskim (Chip Select)'
    ],
    correctAnswer: 0,
    hint: 'Rozwiń skrót MOSI: Master Out -> Slave In.',
    explanation: 'Linia MOSI (Master Out Slave In) przesyła bity danych z układu Master do wybranego urządzenia Slave. Kierunek powrotny realizuje linia MISO (Master In Slave Out).'
  },

  // =========================================================================
  // MONTAŻ SMD I TECHNOLOGIA SMT - 30 PYTAŃ (Kwalifikacja ELM.02)
  // =========================================================================

  // 31. Wymiary obudowy 0805
  {
    id: 'cke-elm02-smd-01',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (3, 4)',
    question: 'Oznaczenie wymiarowe obudowy elementu pasywnego SMD "0805" w standardzie calowym oznacza, że jego nominalne wymiary długość x szerokość wynoszą:',
    options: [
      '0.08 cala na 0.05 cala (ok. 2.0 mm x 1.25 mm)',
      '0.8 mm na 0.5 mm',
      '8.0 mm na 5.0 mm',
      '0.08 mm na 0.05 mm'
    ],
    correctAnswer: 0,
    hint: 'Dwie pierwsze cyfry to długość w setnych częściach cala, dwie kolejne to szerokość.',
    explanation: 'Wymiary calowe: 08 oznacza 0,08 cala (2,0 mm), a 05 oznacza 0,05 cala (1,25 mm). Odpowiednikiem w kodzie metrycznym jest rozmiar 2012.'
  },

  // 32. Wymiary obudowy 0402
  {
    id: 'cke-elm02-smd-02',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (3, 4)',
    question: 'Miniaturowa obudowa rezystora SMD o kodzie calowym 0402 w układzie metrycznym odpowiada elementowi o przybliżonych wymiarach:',
    options: [
      'ok. 1.0 mm x 0.5 mm (metryczne 1005)',
      'ok. 0.4 mm x 0.2 mm',
      'ok. 2.5 mm x 1.2 mm',
      'ok. 4.0 mm x 2.0 mm'
    ],
    correctAnswer: 0,
    hint: '0,04 cala = ok. 1,0 mm, a 0,02 cala = ok. 0,5 mm.',
    explanation: 'Obudowa 0402 (calowa) mierzy 1,0 mm długości i 0,5 mm szerokości, co w oznaczeniu metrycznym nosi symbol 1005. Wymaga dużej precyzji podczas ręcznego lutowania pod mikroskopem.'
  },

  // 33. Obudowa SOT-23
  {
    id: 'cke-elm02-smd-03',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (3, 4)',
    question: 'Popularna obudowa półprzewodnikowa SMD typu SOT-23 (Small Outline Transistor) posiada standardowo:',
    options: [
      '3 miniaturowe wyprowadzenia wygięte na zewnątrz (dwa po jednej stronie, jedno po drugiej)',
      '14 nóżek w dwóch rzędach',
      'Matrycę 16 kulek lutowniczych pod spodem',
      'Tylko 2 elektrody bez nóżek w formie walca'
    ],
    correctAnswer: 0,
    hint: 'Stosowana do tranzystorów małej mocy (baza, emiter, kolektor) oraz diod podwójnych.',
    explanation: 'SOT-23 to 3-wyprowadzeniowa miniaturowa obudowa do tranzystorów bipolarnych, MOSFET oraz układów scalonych (np. stabilizatorów TL431, czujników temperatury).'
  },

  // 34. Obudowa SOIC
  {
    id: 'cke-elm02-smd-04',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (3, 4)',
    question: 'Obudowa scalona typu SOIC (Small Outline Integrated Circuit) charakteryzuje się standardowym rastrem (odstępem osiowym między sąsiednimi wyprowadzeniami) wynoszącym:',
    options: [
      '1.27 mm (50 mils)',
      '2.54 mm (100 mils)',
      '0.5 mm',
      '0.3 mm'
    ],
    correctAnswer: 0,
    hint: 'Jest to dokładnie połowa tradycyjnego rastra obudowy przewlekanej DIP (2,54 mm / 2).',
    explanation: 'Obudowy SOIC (SO-8, SO-14, SO-16) mają raster 1,27 mm (0,05 cala), a ich wyprowadzenia w kształcie mewich skrzydeł (gull-wing) ułatwiają inspekcję optyczną.'
  },

  // 35. Obudowa QFP
  {
    id: 'cke-elm02-smd-05',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (3, 4)',
    question: 'Obudowa układu scalonego typu QFP (Quad Flat Package - np. LQFP, TQFP) wyróżnia się:',
    options: [
      'Wyprowadzeniami w kształcie skrzydełek mewy (gull-wing) rozmieszczonymi na wszystkich czterech krawędziach kwadratowej obudowy',
      'Wyprowadzeniami umieszczonymi tylko wzdłuż dwóch dłuższych boków',
      'Okrągłą metalową puszką z kołnierzem uziemiającym',
      'Brakiem jakichkolwiek widocznych wyprowadzeń zewnętrznych'
    ],
    correctAnswer: 0,
    hint: 'Słowo Quad oznacza cztery strony obudowy.',
    explanation: 'QFP (Quad Flat Package) to płaska obudowa z wyprowadzeniami po 4 stronach korpusu o gęstym rastrze (od 0,8 mm do 0,4 mm), powszechna w mikrokontrolerach AVR (np. ATmega328P w Arduino Nano) i STM32.'
  },

  // 36. Obudowa QFN i pad termiczny
  {
    id: 'cke-elm02-smd-06',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (3, 4)',
    question: 'Jaką główną funkcję pełni duży odsłonięty pad miedziany (ang. exposed thermal pad) umieszczony w centralnej części spodu obudowy QFN/DFN?',
    options: [
      'Efektywne odprowadzanie ciepła ze struktury krzemowej do płytki drukowanej oraz zapewnienie stabilnej masy RF/w.cz.',
      'Służy jako punkt pomiarowy dla sondy oscyloskopowej',
      'Umożliwia mechaniczny montaż śrubą M3',
      'Izoluje galwanicznie układ od laminatu'
    ],
    correctAnswer: 0,
    hint: 'Pod padem termicznym projektuje się przelotki termiczne (thermal vias) do warstw wewnętrznych PCB.',
    explanation: 'Centralny pad pod obudową QFN/DFN lutuje się bezpośrednio do dedykowanego pola miedzi z przelotkami termicznymi, co redukuje rezystancję termiczną złącze-otoczenie (Rth) i redukuje indukcyjność masy.'
  },

  // 37. Obudowa BGA
  {
    id: 'cke-elm02-smd-07',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (3, 4)',
    question: 'W układach scalonych w obudowach BGA (Ball Grid Array) połączenia elektryczne z płytką drukowaną realizowane są za pomocą:',
    options: [
      'Kulek ze stopu lutowniczego rozmieszczonych w regularnej matrycy pod dolną powierzchnią korpusu układu',
      'Giętkich nóżek ze złoconego brązu fosforowego',
      'Złączy krawędziowych wsuwanych w gniazdo PCI-Express',
      'Docisku mechanicznego bez użycia spoiwa'
    ],
    correctAnswer: 0,
    hint: 'Ball Grid Array = matryca kulek lutowniczych.',
    explanation: 'BGA zastępuje wyprowadzenia krawędziowe siatką kulek lutowniczych pod obudową. Pozwala to na uzyskanie setek połączeń w małym rozmiarze przy minimalnej indukcyjności pasożytniczej.'
  },

  // 38. Szablon Stencil
  {
    id: 'cke-elm02-smd-08',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (3)',
    question: 'W procesie wielkoseryjnego montażu powierzchniowego SMT szablon laserowy (ang. stencil) służy do:',
    options: [
      'Precyzyjnego naniesienia pasty lutowniczej na pola lutownicze PCB przed nałożeniem elementów',
      'Frezowania krawędzi laminatu po zakończeniu lutowania',
      'Optycznego rozpoznawania kodów kreskowych na linii produkcyjnej',
      'Zabezpieczenia złącz przed działaniem lakieru konforemnego'
    ],
    correctAnswer: 0,
    hint: 'Rakla przesuwa pastę lutowniczą po powierzchni szablonu, przeciskając ją przez otwory (apertures).',
    explanation: 'Szablon (stencil) to cienka blacha ze stali nierdzewnej z otworami odpowiadającymi padom SMD. Pasta lutownicza jest przeciskana przez apertury za pomocą metalowej rakli (squeegee).'
  },

  // 39. Grubość szablonu Stencil
  {
    id: 'cke-elm02-smd-09',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (3)',
    question: 'Typowa grubość precyzyjnych szablonów metalowych (stencil) stosowanych w standardowym montażu SMT wynosi zwykle:',
    options: [
      '100 µm do 150 µm (0.10 mm – 0.15 mm)',
      '1.0 mm do 1.5 mm',
      '5 µm do 10 µm',
      '2.5 mm do 3.0 mm'
    ],
    correctAnswer: 0,
    hint: 'Zbyt gruba blacha spowodowałaby powstawanie zwarć (mostków), a zbyt cienka – niedolewy spoiny.',
    explanation: 'Najczęściej spotykana grubość szablonu ze stali nierdzewnej to 120 µm – 130 µm (około 4–5 mils), co zapewnia optymalny współczynnik Area Ratio i prawidłową objętość depozytu pasty dla rastrów 0,5–1,27 mm.'
  },

  // 40. Skład pasty lutowniczej
  {
    id: 'cke-elm02-smd-10',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (3)',
    question: 'Pasta lutownicza (ang. solder paste) stosowana w montażu SMT jest zawiesiną składającą się z:',
    options: [
      'Mikroskopijnych kulek stopu lutowniczego (np. SAC305) zawieszonych w lepkiej bazie topnika (fluxu) z rozpuszczalnikami i aktywatorami',
      'Sproszkowanego kleju cyjanoakrylowego i grafitu',
      'Kwasu solnego zmieszanego z czystym ołowiem',
      'Kalafonii rozpuszczonej w benzynie ekstrakcyjnej bez metalu'
    ],
    correctAnswer: 0,
    hint: 'Zawartość metalu w paście wynosi typowo 88–90% wagowo.',
    explanation: 'Pasta lutownicza łączy proszek stopu lutowniczego (kuleczki o określonej granulacji) z topnikiem żelowym, który usuwa tlenki, zapewnia lepkość utrzymującą elementy przed piecem oraz ułatwia rozpływ.'
  },

  // 41. Typ ziarna pasty
  {
    id: 'cke-elm02-smd-11',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (3)',
    question: 'Do montażu układów o drobnym rastrze (fine pitch poniżej 0,5 mm) oraz elementów 0402/0201 zaleca się stosowanie pasty lutowniczej o granulacji:',
    options: [
      'Typu 4 (Type 4: ziarno 20–38 µm) lub Typu 5 (15–25 µm)',
      'Typu 1 (ziarno powyżej 150 µm)',
      'Dowolnej, gdyż rozmiar ziarna nie ma wpływu na uwalnianie pasty z apertur',
      'Pasty bezziarnistej na bazie ciekłego polimeru'
    ],
    correctAnswer: 0,
    hint: 'Zgodnie z regułą 5 kul (5-ball rule), w najmniejszym otworze szablonu musi zmieścić się co najmniej 5 kulek lutu w linii.',
    explanation: 'Drobniejsze ziarno (Type 4 lub 5) zapewnia łatwe i powtarzalne uwalnianie pasty ze zminiaturyzowanych otworów szablonu bez zatykania apertur i powstawania braków spoiwa.'
  },

  // 42. Maszyna Pick and Place
  {
    id: 'cke-elm02-smd-12',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (4)',
    question: 'W automatycznej maszynie układającej elementy SMD (ang. Pick and Place) komponenty są pobierane z podajników i pozycjonowane na płytce za pomocą:',
    options: [
      'Głowicy z miniaturowymi ssawkami podciśnieniowymi (próżniowymi) oraz układu kamer wizyjnych (ang. vision alignment)',
      'Magnetycznych chwytaków elektromagnesowych',
      'Mechanicznych kleszczy pneumatycznych z siłą docisku 50 N',
      'Strumienia sprężonego powietrza wdmuchującego elementy w pastę'
    ],
    correctAnswer: 0,
    hint: 'Podciśnienie bezpiecznie trzyma delikatne elementy krzemowe i ceramiczne bez ich kruszenia.',
    explanation: 'Głowica P&P zasysa komponent ssawką próżniową, przemieszcza go nad kamerę optyczną (która w locie koryguje kąt i przesunięcie osiowe X/Y), po czym precyzyjnie osadza w paście lutowniczej.'
  },

  // 43. Podajniki taśmowe Tape and Reel
  {
    id: 'cke-elm02-smd-13',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (4)',
    question: 'Drobne komponenty SMD (rezystory, kondensatory) dostarczane są do podajników (feederów) maszyny montażowej w:',
    options: [
      'Perforowanych taśmach papierowych lub z tworzywa zabezpieczonych folią ochronną (taśmy na szpulach Tape & Reel)',
      'Woreczkach strunowych z talkiem',
      'Pojemnikach z płynnym olejem syntetycznym',
      'Luzem w metalowych puszkach do ręcznego wysypania'
    ],
    correctAnswer: 0,
    hint: 'Podajnik automatycznie odrywa przezroczystą folię górną (cover tape) i przesuwa taśmę o skok ząbka.',
    explanation: 'Standardem podawania elementów w SMT są szpule z taśmami wytłaczanymi (ang. embossed tape) o szerokości 8 mm, 12 mm, 16 mm itd., z których podajnik automatycznie odsłania i podaje komponenty pod ssawkę.'
  },

  // 44. Cztery strefy pieca reflow
  {
    id: 'cke-elm02-smd-14',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (4)',
    question: 'Prawidłowy profil temperaturowy w piecu konwekcyjnym do lutowania rozpływowego (Reflow) składa się z 4 kolejnych faz:',
    options: [
      'Podgrzewanie wstępne (Preheat) → Wygrzewanie/Aktywacja (Soak) → Rozpływ właściwy (Reflow) → Chłodzenie (Cooling)',
      'Chłodzenie → Rozpływ → Odparowanie → Czyszczenie ultradźwiękowe',
      'Płukanie kwasem → Podgrzewanie → Hartowanie w wodzie → Suszenie',
      'Wygrzewanie próżniowe → Zgrzewanie punktowe → Rozdmuch → Pasywacja'
    ],
    correctAnswer: 0,
    hint: 'Układ musi powoli się rozgrzać, aktywować topnik, wejść w krótki pik temperatury i szybko ostygnąć.',
    explanation: 'Standardowy profil reflow obejmuje: Preheat (stopniowy wzrost T), Soak (wyrównanie temperatur na PCB i aktywacja topnika), Reflow (przekroczenie temperatury ciekłego spoiwa) oraz Cooling (krystalizacja spoiny).'
  },

  // 45. Ramp-up rate w profilu reflow
  {
    id: 'cke-elm02-smd-15',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (4)',
    question: 'Dlaczego w fazie podgrzewania wstępnego (Preheat) szybkość narostu temperatury (ramp-up rate) nie powinna przekraczać 2°C – 3°C na sekundę?',
    options: [
      'Zbyt szybkie nagrzewanie powoduje szok termiczny, pękanie ceramicznych kondensatorów MLCC oraz gwałtowne wrzenie topnika wywołujące odpryski kulek lutu',
      'Płytka PCB zaczęłaby przewodzić prąd stały',
      'Stop SAC305 zmieniłby się w stop ołowiowy',
      'Zmniejszyłaby się czułość układów radiowych'
    ],
    correctAnswer: 0,
    hint: 'Gwałtowna zmiana temperatury wywołuje naprężenia mechaniczne i wybuchowe parowanie rozpuszczalników.',
    explanation: 'Przekroczenie gradientu 3°C/s prowadzi do pęknięć dielektryka w kondensatorach ceramicznych MLCC (delaminacja), niszczenia obudów układów scalonych oraz rozrzucania kulek lutowia (solder beads).'
  },

  // 46. Parametr TAL w lutowaniu
  {
    id: 'cke-elm02-smd-16',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (4)',
    question: 'W technologii lutowania bezołowiowego parametr TAL (Time Above Liquidus) oznacza:',
    options: [
      'Czas, w którym temperatura lutowia na płytce przekracza punkt topnienia stopu (np. powyżej 217°C dla SAC305)',
      'Czas od włączenia pieca do uzyskania gotowości roboczej',
      'Czas przydatności pasty lutowniczej po wyjęciu z lodówki',
      'Dopuszczalny czas pracy pracownika przy wyciągu oparów'
    ],
    correctAnswer: 0,
    hint: 'Liquidus to temperatura, powyżej której stop przechodzi całkowicie w stan płynny.',
    explanation: 'TAL (Time Above Liquidus) to kluczowy parametr profilu termicznego. Dla SAC305 (temp. topnienia 217°C) wynosi zazwyczaj 45–90 sekund. Zbyt krótki TAL daje zimne luty, zbyt długi tworzy kruchą warstwę międzymetaliczną (IMC).'
  },

  // 47. Lutowanie w atmosferze azotu N2
  {
    id: 'cke-elm02-smd-17',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (4)',
    question: 'W jakim celu w zaawansowanych tunelowych piecach lutowniczych stosuje się osłonę gazu obojętnego – azotu (N2)?',
    options: [
      'Zmniejsza utlenianie padów miedzianych i stopu lutowniczego, polepszając zwilżalność i redukując pęcherze gazowe (voids)',
      'Całkowicie eliminuje potrzebę stosowania grzałek elektrycznych',
      'Pozwala na lutowanie elementów drewnianych',
      'Zwiększa grubość powłoki miedzi na ścieżkach'
    ],
    correctAnswer: 0,
    hint: 'Azot wypiera tlen z komory pieca (poziom tlenu poniżej 500 ppm).',
    explanation: 'Atmosfera azotu minimalizuje utlenianie ciekłego spoiwa i metali bazowych, co znacząco obniża napięcie powierzchniowe, poprawia zwilżanie i kąt menisku oraz redukuje powstawanie żużlu i mikropustek.'
  },

  // 48. Efekt nagrobkowy (Tombstoning)
  {
    id: 'cke-elm02-smd-18',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (5)',
    question: 'Wada lutownicza zwana "efektem nagrobkowym" (ang. tombstoning / manhattan effect) polega na:',
    options: [
      'Uniesieniu się elementu dwukońcówkowego (np. rezystora 0603) do pozycji pionowej na jednym padzie wskutek asymetrii sił napięcia powierzchniowego ciekłego lutowia',
      'Trwałym zwęgleniu laminatu FR4 wokół układu scalonego',
      'Zimnym lucie powstałym na skutek zbyt wczesnego poruszenia płytki',
      'Pęknięciu ścieżki miedzianej pod wpływem drgań'
    ],
    correctAnswer: 0,
    hint: 'Gdy spoiwo na jednym padzie stopi się ułamek sekundy wcześniej niż na drugim, pociąga element do góry.',
    explanation: 'Tombstoning powstaje, gdy jedno wyprowadzenie topi się szybciej (np. z powodu połączenia z dużą płaszczyzną masy bez pułapki termicznej). Siła napięcia powierzchniowego stawia element pionowo jak nagrobek.'
  },

  // 49. Mostki lutownicze
  {
    id: 'cke-elm02-smd-19',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (5)',
    question: 'Co jest bezpośrednią przyczyną powstawania "mostków lutowniczych" (ang. solder bridging) pomiędzy nóżkami układów QFP/SOIC?',
    options: [
      'Zbyt duża objętość nałożonej pasty lutowniczej, rozmazanie nadruku lub niewłaściwa odległość między padami',
      'Zbyt wysoka czystość chemiczna alkoholu izopropylowego',
      'Zbyt niska temperatura grota lutownicy podczas suszenia PCB',
      'Zastosowanie zbyt wąskich ścieżek sygnałowych'
    ],
    correctAnswer: 0,
    hint: 'Mostek lutowniczy to niepożądane zwarcie elektryczne z nadmiaru spoiwa.',
    explanation: 'Mostkowanie (zwarcie) powstaje najczęściej w wyniku nadmiernego depozytu pasty, niewspółosiowości nadruku szablonu, zbyt dużego nacisku rakli lub braku maski lutowniczej (soldermaski) między padami.'
  },

  // 50. Pustki w spoinie (Voids)
  {
    id: 'cke-elm02-smd-20',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (5)',
    question: 'Pustki gazowe (ang. voids) w spoinie lutowniczej pod padem masy układu scalonego QFN powstają głównie w wyniku:',
    options: [
      'Uwięzienia odparowujących gazów i frakcji lotnych topnika, które nie zdołały wydostać się przed zakrzepnięciem ciekłego spoiwa',
      'Reakcji chemicznej azotu ze złotem na pinach',
      'Przegrzania cyny powyżej 1000°C',
      'Wytworzenia próżni absolutnej pod elementem'
    ],
    correctAnswer: 0,
    hint: 'Topnik wrze podczas rozpływu, tworząc pęcherze gazowe pod dużą płaską powierzchnią.',
    explanation: 'Gazy z odparowującego topnika uwięzione pod dużym padem termicznym tworzą puste przestrzenie (voids). Aby je ograniczyć, pole pasty na szablonie dzieli się na mniejsze okienka (ang. window-pane pattern).'
  },

  // 51. Kulki lutowia (Solder balls)
  {
    id: 'cke-elm02-smd-21',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (5)',
    question: 'Występowanie niepożądanych mikroskopijnych kulek spoiwa (solder balls) rozrzuconych na soldermasce obok elementów SMD jest najczęściej spowodowane:',
    options: [
      'Zawilgoceniem pasty lutowniczej lub zbyt szybkim ramp-upem wywołującym gwałtowne "strzelanie" gotującego się rozpuszczalnika',
      'Niedostateczną ilością cyny na szpuli',
      'Lutowaniem w temperaturze poniżej 150°C',
      'Stosowaniem antystatycznych rękawiczek ESD'
    ],
    correctAnswer: 0,
    hint: 'Woda lub lotne składniki topnika gwałtownie wrzą i wyrzucają kropelki płynnego metalu.',
    explanation: 'Kulki lutu powstają, gdy pasta wchłonie wilgoć z powietrza lub profil pieca nagrzewa się zbyt gwałtownie, co powoduje wybuchowe parowanie i rozpryskiwanie drobinek spoiwa poza obszar padów.'
  },

  // 52. Lutowanie Hot-Air
  {
    id: 'cke-elm02-smd-22',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (4)',
    question: 'Podczas demontażu i montażu układów SMD za pomocą stacji gorącego powietrza (Hot-Air) kluczowe znaczenie ma:',
    options: [
      'Dobranie odpowiedniej dyszy profilowanej, równomierne nagrzewanie całego obszaru oraz zabezpieczenie sąsiednich elementów taśmą kaptonową',
      'Ustawienie maksymalnego nadmuchu powietrza na poziomie 100% z odległości 1 mm',
      'Używanie wody destylowanej do schładzania układu w trakcie grzania',
      'Całkowity brak stosowania jakiegokolwiek topnika'
    ],
    correctAnswer: 0,
    hint: 'Zbyt silny nadmuch zdmuchnie drobne elementy z sąsiednich padów, dlatego stosuje się taśmę poliamidową (Kapton).',
    explanation: 'Przy pracy z Hot-Air osłania się sąsiednie komponenty folią aluminiową lub taśmą kaptonową odporną do 350°C, dobiera dyszę o profilu układu i stosuje umiarkowany nadmuch z żelem topnikowym flux.'
  },

  // 53. Termopęseta SMD
  {
    id: 'cke-elm02-smd-23',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (4)',
    question: 'Pęseta termiczna (ang. thermal tweezers) podłączana do stacji lutowniczej jest specjalistycznym narzędziem zaprojektowanym do:',
    options: [
      'Szybkiego demontażu i montażu dwukońcówkowych elementów pasywnych SMD (0402–1206) poprzez jednoczesne rozgrzewanie obu pól lutowniczych',
      'Zaciskania złączek kompresyjnych na kablach koncentrycznych',
      'Pomiaru napięcia stałego na tranzystorach',
      'Przecinania wielożyłowych kabli zasilających'
    ],
    correctAnswer: 0,
    hint: 'Dwa podgrzewane groty stykają się równocześnie z oboma padami rezystora lub kondensatora.',
    explanation: 'Termopęseta posiada dwa równolegle sterowane termicznie groty, co pozwala natychmiast roztopić spoiwo na obu wyprowadzeniach elementu i podnieść go bez ryzyka oderwania padów z laminatu.'
  },

  // 54. Plecionka rozlutownicza
  {
    id: 'cke-elm02-smd-24',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (4)',
    question: 'Miedziana plecionka rozlutownicza (ang. desoldering wick) pokryta topnikiem służy w pracach serwisowych SMD do:',
    options: [
      'Usuwania nadmiaru spoiwa z padów lub usuwania zwarć (mostków) pomiędzy nóżkami układów metodą podciągania kapilarnego',
      'Wykonywania ekranowania elektromagnetycznego transformatorów',
      'Łączenia akumulatorów Li-Ion w pakiety metodą zgrzewania',
      'Czyszczenia grota z tlenków na sucho'
    ],
    correctAnswer: 0,
    hint: 'Miedź nasycona topnikiem zasysa ciekłe spoiwo dzięki zjawisku włoskowatości (kapilarnemu).',
    explanation: 'Rozgrzana grotem plecionka miedziana dzięki siłom kapilarnym wchłania ciekłą cynę z płytki PCB, idealnie oczyszczając pady po wylutowanym układzie BGA lub usuwając mostki z nóżek QFP.'
  },

  // 55. Topnik No-Clean
  {
    id: 'cke-elm02-smd-25',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (3)',
    question: 'Topniki oznaczone klasyfikacją "No-Clean" charakteryzują się tym, że:',
    options: [
      'Ich stałe pozostałości po procesie lutowania nie są korozyjne i mają wysoką rezystancję izolacji, przez co w standardowych warunkach nie wymagają obowiązkowego mycia',
      'Nie zawierają żadnych substancji chemicznych usuwających tlenki',
      'Lutują elementy bez użycia energii cieplnej',
      'Są toksycznym kwasem wymagającym natychmiastowej neutralizacji zasadą'
    ],
    correctAnswer: 0,
    hint: 'No-Clean = brak konieczności mycia w typowej elektronice konsumenckiej.',
    explanation: 'Topniki No-Clean mają obniżoną zawartość ciał stałych (poniżej 2–5%) i aktywatorów halogenkowych. Pozostawiają bezpieczny, suchy osad o wysokiej rezystancji powierzchniowej SIR.'
  },

  // 56. Myjka ultradźwiękowa
  {
    id: 'cke-elm02-smd-26',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (4)',
    question: 'W myjkach ultradźwiękowych do usuwania zanieczyszczeń i topnika z pakietów elektronicznych zjawiskiem fizycznym odpowiedzialnym za skuteczne odrywanie brudu jest:',
    options: [
      'Kawitacja (powstawanie i gwałtowne implodowanie mikroskopijnych pęcherzyków próżniowych/gazowych w cieczy)',
      'Zjawisko Seebecka',
      'Polaryzacja dielektryczna laminatu',
      'Indukcja magnetyczna w ścieżkach'
    ],
    correctAnswer: 0,
    hint: 'Ultradźwięki o częstotliwości 40 kHz wywołują fale ciśnieniowe w kąpieli myjącej.',
    explanation: 'Kawitacja wywołana falą ultradźwiękową generuje miliony mikroskopijnych pęcherzyków, które zapadając się (implozja), tworzą mikro-strumienie cieczy o potężnej energii odrywającej zabrudzenia nawet spod obudów BGA.'
  },

  // 57. Poziom wilgoci MSL
  {
    id: 'cke-elm02-smd-27',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (3)',
    question: 'Parametr MSL (Moisture Sensitivity Level według normy J-STD-020) określa dla układów scalonych SMD:',
    options: [
      'Klasę wrażliwości obudowy na pochłanianie wilgoci z otoczenia oraz dopuszczalny czas jej przebywania na powietrzu przed lutowaniem reflow (ang. floor life)',
      'Maksymalny prąd upływu w warunkach wilgotności 100%',
      'Stopień wodoszczelności urządzenia zgodnie z normą IP',
      'Rezystancję ścieżek przy zalaniu wodą morską'
    ],
    correctAnswer: 0,
    hint: 'Skala MSL wynosi od 1 (nielimitowany czas) do 6 (wymagane bezwzględne suszenie przed lutowaniem).',
    explanation: 'Wilgoć wchłonięta przez plastikową obudowę podczas gwałtownego nagrzania w piecu reflow (240°C–260°C) zamienia się w parę pod wysokim ciśnieniem, co rozrywa obudowę (tzw. efekt popcornu / popcorn effect).'
  },

  // 58. Suszenie komponentów (Baking)
  {
    id: 'cke-elm02-smd-28',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (3)',
    question: 'Jeżeli komponenty scalone w obudowie BGA przekroczyły dopuszczalny czas ekspozycji na wilgoć (floor life) według karty wskaźnika HIC, przed wprowadzeniem na linię SMT należy:',
    options: [
      'Poddać je procesowi powolnego wygrzewania i suszenia (ang. baking) w komorze suszarniczej w temperaturze np. 125°C przez określony normą czas',
      'Natychmiast zutylizować elementy jako nienadające się do użycia',
      'Przepłukać je w zimnej wodzie destylowanej',
      'Włożyć na 24 godziny do zamrażarki'
    ],
    correctAnswer: 0,
    hint: 'Baking to powolne usuwanie cząsteczek wody z żywicy epoksydowej poniżej temperatury wrzenia pod ciśnieniem.',
    explanation: 'Zgodnie z J-STD-033 zawilgocone komponenty suszy się w dedykowanych piecach (baking oven) np. w 125°C przez 24–48 godzin, aby bezpiecznie usunąć wilgoć i zapobiec delaminacji struktury podczas reflow.'
  },

  // 59. System inspekcji 3D AOI
  {
    id: 'cke-elm02-smd-29',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (5)',
    question: 'Nowoczesny system automatycznej inspekcji optycznej 3D AOI (Automated Optical Inspection) na linii montażu SMT pozwala na:',
    options: [
      'Wykrywanie braków elementów, przesunięć, nieprawidłowej polaryzacji oraz pomiar wysokości i objętości menisku spoiny lutowniczej za pomocą projekcji światła strukturalnego',
      'Badanie składu atomowego krzemu w strukturze układu scalonego',
      'Mechaniczne testowanie wytrzymałości na zerwanie ścieżek z siłą 100 N',
      'Programowanie pamięci Flash mikrokontrolerów'
    ],
    correctAnswer: 0,
    hint: 'Kamery z projektorami prążków mierzą profil 3D spoiny i wykrywają uniesione piny (ang. coplanarity/lifted leads).',
    explanation: 'Maszyna 3D AOI analizuje zmontowane płytki z wysoką prędkością: sprawdza obecność i poprawność montażu podzespołów, oznaczenia, polaryzację diod/kondensatorów oraz przestrzenny profil spoiny lutowniczej.'
  },

  // 60. Inspekcja rentgenowska AXI
  {
    id: 'cke-elm02-smd-30',
    qualification: 'ELM.02',
    category: 'Montaż SMD i Technologia SMT',
    officialRef: 'ELM.02.3 (5)',
    question: 'Do nieniszczącej oceny jakości połączeń lutowniczych pod obudowami BGA, CSP oraz ocenienia wielkości pustek (voids) pod padami termicznymi QFN stosuje się:',
    options: [
      'Automatyczną inspekcję rentgenowską AXI (ang. Automated X-ray Inspection)',
      'Mikroskop optyczny ze światłem spolaryzowanym',
      'Miernik rezystancji izolacji (megaomomierz 1000 V)',
      'Tester przewodności igłowej typu Flying Probe'
    ],
    correctAnswer: 0,
    hint: 'Promieniowanie X przenika przez plastik i krzem, a ołów i cyna silnie je pochłaniają.',
    explanation: 'Połączenia BGA i pady masowe QFN są całkowicie ukryte pod korpusem elementu. Inspekcja rentgenowska (AXI / mikrotomografia X-ray) pozwala zajrzeć w głąb spoiny, wykrywając mostki, zimne luty i procent pustek (voiding ratio).'
  }
];

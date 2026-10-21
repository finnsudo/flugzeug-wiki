(() => {
  const search = document.getElementById('aircraftSearch');
  const list = document.getElementById('aircraftList');
  const categoryFilter = document.getElementById('categoryFilter');
  let selectedIndex = 14;

  const source = {
    a220: ['Airbus A220 Family', 'https://www.airbus.com/en/products-services/commercial-aircraft/passenger-aircraft/a220-family'],
    a320: ['Airbus A320 Family', 'https://www.aircraft.airbus.com/en/aircraft/a320-family'],
    a330: ['Airbus A330 Facts and Figures (PDF)', 'https://www.airbus.com/sites/g/files/jlcbta136/files/2021-12/EN-Airbus-A330-Facts-and-Figures-December-2021.pdf'],
    a340: ['Airbus A330/A340 technical data (PDF)', 'https://www.airbus.com/sites/g/files/jlcbta136/files/2021-07/eads-reference-document-2002.pdf'],
    a350: ['Airbus A350 Family', 'https://www.airbus.com/en/products-services/commercial-aircraft/passenger-aircraft/a350-family'],
    a380: ['Airbus A380', 'https://www.airbus.com/en/products-services/commercial-aircraft/passenger-aircraft/a380'],
    b737: ['Boeing 737 Next Generation', 'https://www.boeing.com/commercial/737ng'],
    bmax: ['Boeing 737 MAX', 'https://www.boeing.com/Commercial/737MAX'],
    b747: ['Boeing 747', 'https://www.boeing.com/commercial/747-8'],
    b757: ['Boeing 757 passenger specifications (PDF)', 'https://www.boeing.com/content/dam/boeing/boeingdotcom/company/about_bca/startup/pdf/historical/757_passenger.pdf?pubDate=20250419'],
    b767: ['Boeing 767 facts and history', 'https://www.boeing.com/content/dam/boeing/boeingdotcom/history/pdf/Boeing_Products.pdf?pubDate=20250316'],
    b777: ['Boeing 777', 'https://www.boeing.com/Commercial/777'],
    b777x: ['Boeing 777X', 'https://www.boeing.com/Commercial/777X'],
    b787: ['Boeing 787 Dreamliner', 'https://www.boeing.com/commercial/787'],
    embraer: ['Embraer E-Jets', 'https://embraer.com/e-jets/en/'],
    e2: ['Embraer E-Jets E2 specification (PDF)', 'https://www.embraer.com/media/q5sll1p5/e195-e2-spec.pdf'],
    atr: ['ATR regional aircraft', 'https://www.atr-aircraft.com/regional-mobility/regional-aircraft/'],
    crj: ['MHI CRJ Series', 'https://mhirj.com/en/products-and-services/crj-series'],
    dash: ['De Havilland Dash 8-400 specifications (PDF)', 'https://dehavilland.com/wp-content/uploads/2025/03/DHC_Dash8_Spec-Sheet_v10_DIGITAL.pdf'],
    c919: ['COMAC aircraft information (Chinese)', 'https://www.comac.cc/'],
    deutsche: ['Deutsche Aircraft · D328eco', 'https://www.deutscheaircraft.com/news/introducing-the-d328eco-the-next-generation-turboprop-redefining-regional-aviation-in-north-america'],
    grob520: ['GROB Aircraft · G 520 technical specifications', 'https://grob-aircraft.com/en/g-520.html'],
    as33: ['Alexander Schleicher · AS 33 technical data', 'https://www.alexander-schleicher.de/en/alexander-schleicher-presentsthe-as33/'],
    grob: ['GROB Aircraft · G 120TP', 'https://grob-aircraft.com/de/g-120tp.html'],
    schleicher: ['Alexander Schleicher · Segelflugzeuge', 'https://www.alexander-schleicher.de/werk/unternehmen/'],
    dg: ['DG Aviation · Flugzeugtypen', 'https://www.dg-aviation.de/en/dg-flugzeugbau/about-us'],
    schempp: ['Schempp-Hirth · Segelflugzeuge', 'https://www.schempp-hirth.com/en'],
    stemme: ['Stemme · S12', 'https://www.stemme.com/s12-sw.html'],
    extra: ['EXTRA Aircraft · 330SC', 'https://extraaircraft.com/330sc/'],
    flightdesign: ['Flight Design · Herstellerseite', 'https://flightdesign.com/'],
    scheibe: ['EASA · Scheibe SF 25A Musterzulassung', 'https://www.easa.europa.eu/en/document-library/type-certificates'],
    breezer: ['Breezer Aircraft · B600 LSA Datenblatt', 'https://www.breezeraircraft.de/fileadmin/user_upload/dokumente/Broschuere/Breezer_LSA_Prospekt_2015.pdf'],
    remos: ['REMOS · Modelle und GX Handbuch', 'https://remos.com/modelle'],
    comco: ['COMCO IKARUS · Flugzeuge und Daten', 'https://www.comco-ikarus.de/?lang=en'],
    fk: ['FK-Aircraft / B&F Technik · Modelle', 'https://fk-aircraft.com/'],
    lange: ['Lange Aviation · Antares', 'https://www.lange-aviation.com/'],
    binder: ['Verband deutscher Segelflugzeughersteller · Binder', 'https://www.glider-manufacturers.de/'],
    streifeneder: ['EASA · Glasflügel Segelflugzeuge', 'https://www.easa.europa.eu/sites/default/files/dfu/EASA-PRODUCT-LIST-Sailplanes-and-Powered-Sailplanes.pdf']
    ,airbusHistory: ['Airbus · Geschichte und A300/A310', 'https://www.airbus.com/en/newsroom/stories/2022-10-28-october-50th-anniversary-of-the-first-flight-of-the-airbus-a300']
    ,boeingHistory: ['Boeing · historische Flugzeugdaten', 'https://www.boeing.com/content/dam/boeing/boeingdotcom/history/pdf/Boeing_Products.pdf?pubDate=20250316']
    ,boeingPlans: ['Boeing · Flughafen- und Flugzeugdaten', 'https://www.boeing.com/commercial/airports/plan-manuals']
    ,smithsonianDC3: ['Smithsonian · Douglas DC-3', 'https://www.si.edu/object/nasm_A19530075000']
    ,smithsonianJu52: ['Smithsonian · Junkers Ju 52', 'https://www.si.edu/object/junkers-ju52%3Anasm_A19880044000']
    ,smithsonianBf109: ['Smithsonian · Messerschmitt Bf 109', 'https://www.si.edu/object/nasm_A19600327000']
    ,twinOtter: ['De Havilland Canada · Twin Otter', 'https://dehavilland.com/twin-otter/']
    ,cessna: ['Textron Aviation · Cessna Skyhawk', 'https://cessna.txtav.com/en/piston/cessna-skyhawk']
    ,piper: ['Piper · Archer LX', 'https://www.piper.com/model/archer-lx/']
    ,pilatus: ['Pilatus · PC-24 technical data', 'https://www.pilatus-aircraft.com/en/pc-24/technical-data']
    ,saab: ['Saab · Saab 340', 'https://www.saab.com/products/saab-340']
    ,saab2000: ['Saab · Saab 2000 first-flight anniversary', 'https://www.saab.com/newsroom/stories/2017/march/saab-2000---25-year-anniversary---happy-first-flight-day']
    ,fokker: ['Fokker History · Fokker 100', 'https://www.fokker-history.com/fokker-100']
    ,dornier: ['RUAG · Dornier 228 NG', 'https://www.ruag.com/system/files/media_document/2021-02/210301_Medienmitteilung_OP_RUAG_Int_EN.pdf']
    ,atr42: ['ATR · ATR 42-300 specifications (PDF)', 'https://www.atr-aircraft.com/wp-content/uploads/2020/07/42-300.pdf']
    ,kingair: ['Textron Aviation · King Air 350i', 'https://beechcraft.txtav.com/en/king-air-350i']
    ,concorde: ['Airbus · Concorde / Unternehmensgeschichte', 'https://www.airbus.com/en/newsroom/stories/2018-06-airbus-jetliners-a-standard-setting-history']
    ,pilatusPC12: ['Pilatus · PC-12 NGX', 'https://www.pilatus-aircraft.com/en/pc-12']
    ,spitfire: ['RAF Museum · Spitfire guide', 'https://www.rafmuseum.org.uk/documents/LargePrintGuides/BoB_Guides/LPG_Battle_of_Britain_Cosford_web.pdf']
    ,mustang: ['Smithsonian · North American P-51 Mustang', 'https://airandspace.si.edu/collection-objects/north-american-p-51d-mustang/nasm_A19600328000']
  };

  // Manufacturer-published nominal capacities and maximum design ranges. Actual airline layouts and mission ranges vary.
  const aircraft = [
    ['Airbus A220-100','Airbus','Regional jet','100–120','3,600 nm · 6,670 km','2 Turbofans','Kompakter Zweistrahler für Regional- und längere Mittelstrecken.','A220-100 und -300 teilen sich eine Pilotenberechtigung.','a220'],
    ['Airbus A220-300','Airbus','Regional jet','120–160','3,450 nm · 6,390 km','2 Turbofans','Die längere A220-Version verbindet Regionalstrecken mit transkontinentaler Reichweite.','Die längere Kabine bietet mehr Sitzplätze als der A220-100.','a220'],
    ['Airbus A319neo','Airbus','Schmalrumpf','bis 160','3,700 nm · 6,850 km','2 Turbofans','Die kürzeste Neo-Version der A320-Familie.','„neo“ steht für New Engine Option.','a320'],
    ['Airbus A320neo','Airbus','Schmalrumpf','bis 194','3,400 nm · 6,300 km','2 Turbofans','Ein weit verbreiteter Single-Aisle-Jet für Kurz- und Mittelstrecken.','Airbus nennt bis zu 20 Prozent weniger Treibstoffverbrauch pro Sitz gegenüber der vorherigen Generation.','a320'],
    ['Airbus A321neo','Airbus','Schmalrumpf','bis 244','4,000 nm · 7,400 km','2 Turbofans','Die längste Standardversion der A320neo-Familie.','Die längere Kabine eignet sich für Strecken mit hoher Nachfrage.','a320'],
    ['Airbus A321XLR','Airbus','Schmalrumpf','bis 244','4,700 nm · 8,700 km','2 Turbofans','Ein Single-Aisle-Flugzeug mit extra großer Reichweite.','Airbus beschreibt eine mögliche Nonstop-Flugdauer von bis zu elf Stunden.','a320'],
    ['Airbus A330-200','Airbus','Langstrecke','210–250','7,250 nm · 13,450 km','2 Turbofans','Ein zweistrahliges Großraumflugzeug für mittlere und lange Strecken.','Kürzerer Rumpf als beim A330-300; dadurch größere Reichweite.','a330'],
    ['Airbus A330-300','Airbus','Langstrecke','250–290','6,350 nm · 11,750 km','2 Turbofans','Die längere klassische Version der A330-Familie.','Die Herstellerdaten nennen eine typische Dreiklassen-Kabine mit 250 bis 290 Sitzen.','a330'],
    ['Airbus A330-800neo','Airbus','Langstrecke','bis 257','8,150 nm · 15,094 km','2 Turbofans','Die reichweitenstarke, kürzere Variante der A330neo-Familie.','Die Reichweite ist laut Airbus für die neueste Variante angegeben.','a330'],
    ['Airbus A330-900neo','Airbus','Langstrecke','bis 287','7,200 nm · 13,334 km','2 Turbofans','Die größere A330neo-Version für mittlere und lange Strecken.','Airbus positioniert sie in der Kategorie um 300 Sitzplätze.','a330'],
    ['Airbus A340-300','Airbus','Langstrecke','295','7,505 nm · 13,900 km','4 Turbofans','Ein vierstrahliges Langstreckenflugzeug aus der A330/A340-Familie.','A330 und A340 wurden mit gemeinsamer Flügelbasis entwickelt.','a340'],
    ['Airbus A340-600','Airbus','Langstrecke','380','7,640 nm · 14,150 km','4 Turbofans','Eine besonders lange A340-Version mit hoher Passagierkapazität.','Mit 75,3 Metern ist sie die längste Variante der A340-Familie.','a340'],
    ['Airbus A350-900','Airbus','Langstrecke','300–350','8,600 nm · 15,930 km','2 Turbofans','Ein moderner Langstrecken-Zweistrahler mit großem Verbundwerkstoffanteil.','Airbus nennt 70 Prozent fortschrittliche Materialien in der Flugzeugzelle.','a350'],
    ['Airbus A350-1000','Airbus','Langstrecke','350–410','bis 9,100 nm · 16,850 km','2 Turbofans','Die größere A350-Version für besonders stark nachgefragte Langstrecken.','Die Reichweitenangabe ist Airbus’ veröffentlichter Zielwert.','a350'],
    ['Airbus A380-800','Airbus','Superjumbo','545 typisch · 853 max.','8,000 nm · 14,800 km','4 Turbofans','Das größte Passagierflugzeug in Serienproduktion mit zwei durchgehenden Passagierdecks.','Die Produktion ist beendet; Airbus unterstützt die Flugzeuge weiter.','a380'],
    ['Boeing 737-700','Boeing','Schmalrumpf','125–145','2,900 nm · 5,370 km','2 Turbofans','Kürzere Variante der 737 Next Generation.','Boeings Zweiklassenangabe liegt bei 125 bis 145 Sitzen.','b737'],
    ['Boeing 737-800','Boeing','Schmalrumpf','160–180','2,800 nm · 5,190 km','2 Turbofans','Ein sehr verbreitetes Mitglied der 737 Next Generation.','Boeing nennt maximal 189 Passagiere.','b737'],
    ['Boeing 737-900','Boeing','Schmalrumpf','175–195','2,700 nm · 5,000 km','2 Turbofans','Die längste Standardversion der 737 Next Generation.','Die maximale zugelassene Passagierzahl wird von Boeing mit 220 angegeben.','b737'],
    ['Boeing 737 MAX 7','Boeing','Schmalrumpf','135–160','3,800 nm · 7,040 km','2 Turbofans','Das kürzeste Flugzeug der 737 MAX-Familie.','Boeings technische Tabelle nennt maximal 172 Sitze.','bmax'],
    ['Boeing 737 MAX 8','Boeing','Schmalrumpf','160–180','3,500 nm · 6,480 km','2 Turbofans','Die mittlere und meistverkaufte Größenklasse der MAX-Familie.','Boeing nennt bis zu 210 Sitze.','bmax'],
    ['Boeing 737 MAX 9','Boeing','Schmalrumpf','175–195','3,300 nm · 6,110 km','2 Turbofans','Die längere 737 MAX-Version für bis zu 220 Passagiere.','Die technische Reichweite liegt laut Boeing bei bis zu 3.300 nautischen Meilen.','bmax'],
    ['Boeing 737 MAX 10','Boeing','Schmalrumpf','185–210','3,100 nm · 5,740 km','2 Turbofans','Die längste Variante der 737 MAX-Reihe.','Boeing nennt maximal 230 Sitze; die Reichweite ist die geringste der MAX-Modelle.','bmax'],
    ['Boeing 747-400','Boeing','Jumbojet','344 typisch','7,260 nm · 13,450 km','4 Turbofans','Die meistgebaute 747-Version und ein Symbol des Langstreckenverkehrs.','Die charakteristische Oberdeck-Kabine prägt die Silhouette des Jumbojets.','b747'],
    ['Boeing 747-8 Intercontinental','Boeing','Jumbojet','410–467','8,000 nm · 14,815 km','4 Turbofans','Die letzte und längste Passagierversion der Boeing 747.','Boeing nennt 410 Sitze in einer Dreiklassen-Konfiguration.','b747'],
    ['Boeing 757-200','Boeing','Schmalrumpf','200–228','bis 3,900 nm · 7,222 km','2 Turbofans','Ein leistungsfähiges Mittelstreckenflugzeug mit guter Startleistung.','Boeing entwickelte 757 und 767 zeitgleich mit ähnlichem Cockpitkonzept.','b757'],
    ['Boeing 757-300','Boeing','Schmalrumpf','bis 280','ca. 3,400 nm · 6,300 km','2 Turbofans','Die gestreckte Version der 757 mit zusätzlicher Sitzkapazität.','Boeing führte die 757-300 1996 ein.','b757'],
    ['Boeing 767-300ER','Boeing','Langstrecke','218–269','5,980 nm · 11,070 km','2 Turbofans','Ein mittelgroßes Großraumflugzeug für Langstrecken und Transatlantikrouten.','Die ER-Version erhielt zusätzliche Reichweite für längere Nonstop-Flüge.','b767'],
    ['Boeing 767-400ER','Boeing','Langstrecke','245–304','5,625 nm · 10,415 km','2 Turbofans','Die längste Passagierversion der 767-Reihe.','Die 767 wurde parallel zur 757 entwickelt; beide teilen Cockpit-Ähnlichkeiten.','b767'],
    ['Boeing 777-200ER','Boeing','Langstrecke','300–375','7,065 nm · 13,080 km','2 Turbofans','Die ursprüngliche Langstrecken-Variante der Boeing 777.','Boeing beschreibt die 777 als Zweistrahler für mittlere bis lange Routen.','b777'],
    ['Boeing 777-200LR','Boeing','Langstrecke','317','8,555 nm · 15,843 km','2 Turbofans','Eine Ultralangstrecken-Version der 777-200.','Boeing nennt die 777-200LR Worldliner; die Flügelspitzen sind nach hinten gezogen.','b777'],
    ['Boeing 777-300ER','Boeing','Langstrecke','350–425','7,370 nm · 13,650 km','2 Turbofans','Ein großer Langstrecken-Zweistrahler für stark nachgefragte Routen.','Die 777-300ER wird von GE90-115B-Triebwerken angetrieben.','b777'],
    ['Boeing 777-8','Boeing','Langstrecke · in Entwicklung','350–425','bis 9,500 nm · 17,590 km','2 Turbofans','Die kleinere Passagiervariante der neuen 777X-Familie.','Die Werte stammen aus Boeings veröffentlichten Produktdaten; das Flugzeug ist noch in Entwicklung.','b777x'],
    ['Boeing 777-9','Boeing','Langstrecke · in Entwicklung','375–450','bis 8,000 nm · 14,820 km','2 Turbofans','Die größere 777X-Version mit besonders langer Kabine und klappbaren Flügelspitzen.','Boeing nennt bis zu 426 Sitze in einer typischen Zweiklassen-Konfiguration.','b777x'],
    ['Boeing 787-8 Dreamliner','Boeing','Langstrecke','200–275','8,000 nm · 14,820 km','2 Turbofans','Die kürzeste Version des Dreamliner für lange Strecken mit moderater Nachfrage.','Boeing gibt zwei mögliche Triebwerksfamilien an: GEnx-1B oder Trent 1000.','b787'],
    ['Boeing 787-9 Dreamliner','Boeing','Langstrecke','250–325','8,300 nm · 15,370 km','2 Turbofans','Die mittlere Dreamliner-Version mit großer Reichweite.','Boeing nennt die 787-9 als Version mit der größten Familienreichweite.','b787'],
    ['Boeing 787-10 Dreamliner','Boeing','Langstrecke','300–375','7,500 nm · 13,890 km','2 Turbofans','Die längste und sitzplatzstärkste 787-Version.','Sie verbindet mehr Sitzplätze mit etwas weniger Reichweite als die 787-9.','b787'],
    ['Embraer E170','Embraer','Regional jet','70–78','2,150 nm · 3,982 km','2 Turbofans','Ein kompakter Regionaljet aus der ersten E-Jet-Generation.','Die 2+2-Kabine hat laut Embraer keine Mittelsitze.','embraer'],
    ['Embraer E175','Embraer','Regional jet','78–88','2,200 nm · 4,074 km','2 Turbofans','Ein Regionaljet mit gestrecktem Rumpf gegenüber dem E170.','Die Reichweite ist für eine typische Einklassen-Konfiguration angegeben.','embraer'],
    ['Embraer E190','Embraer','Regional jet','98–114','2,450 nm · 4,537 km','2 Turbofans','Ein Regionaljet, der auch auf Hauptstrecken eingesetzt wird.','Die E-Jet-Familie umfasst laut Embraer Flugzeuge von 70 bis 150 Sitzplätzen.','embraer'],
    ['Embraer E195','Embraer','Regional jet','108–124','2,300 nm · 4,260 km','2 Turbofans','Die größte Variante der ersten E-Jet-Generation.','Vier Familienmitglieder teilen viele Gemeinsamkeiten im Flugbetrieb.','embraer'],
    ['Embraer E175-E2','Embraer','Regional jet · E2','80–90','2,000 nm · 3,704 km','2 Turbofans','Die kleinste Variante der weiterentwickelten E-Jet-E2-Familie.','Herstellerdaten; Programmstatus und Verfügbarkeit können sich ändern.','e2'],
    ['Embraer E190-E2','Embraer','Regional jet · E2','97–114','2,850 nm · 5,280 km','2 Turbofans','Die mittlere E2-Version verbindet regionale Kapazität mit mehr Reichweite.','Embraer hebt bei der E2-Reihe Effizienz und Weiterentwicklung der E-Jets hervor.','e2'],
    ['Embraer E195-E2','Embraer','Regional jet · E2','120–146','2,600 nm · 4,815 km','2 Turbofans','Das größte Mitglied der E2-Familie und eines der größten Single-Aisle-Regionalflugzeuge.','Die Herstellerkonfigurationen können bis zu 146 Sitze umfassen.','e2'],
    ['ATR 42-600','ATR','Turboprop','46–50','726 nm · 1,345 km','2 Turboprops','Ein zweimotoriges Turboprop-Flugzeug für kürzere Regionalstrecken.','ATR nennt eine kurze Startstrecke und den PW127XT-Motor in aktuellen Unterlagen.','atr'],
    ['ATR 72-600','ATR','Turboprop','68–78','740 nm · 1,370 km','2 Turboprops','Ein größeres Regionalflugzeug mit Turboprop-Antrieb.','ATR nennt gemeinsame Systeme und eine gemeinsame Pilotenberechtigung mit dem ATR 42.','atr'],
    ['Bombardier CRJ700','Bombardier / MHI RJ','Regional jet','68–78','1,685 nm · 3,121 km','2 Turbofans','Ein Regionaljet, der für kurze und mittlere Zubringerstrecken entwickelt wurde.','Der CRJ700 ist das kleinste Modell der CRJ700/900/1000-Reihe.','crj'],
    ['Bombardier CRJ900','Bombardier / MHI RJ','Regional jet','74–90','bis 1,940 nm · 3,593 km','2 Turbofans','Eine gestreckte CRJ-Version mit mehr Sitzplätzen als der CRJ700.','Die Reichweite hängt von der gewählten Variante ab; der LR-Wert ist hier angegeben.','crj'],
    ['Bombardier CRJ1000','Bombardier / MHI RJ','Regional jet','100–104','bis 1,685 nm · 3,121 km','2 Turbofans','Das größte Modell der CRJ-Reihe.','Die CRJ1000 bietet laut Hersteller-Broschüre bis zu 104 Sitze.','crj'],
    ['De Havilland Dash 8-400','De Havilland Canada','Turboprop','74–90','862 nm · 1,596 km','2 Turboprops','Ein schneller Hochkapazitäts-Turboprop für Regionalverbindungen.','Der Hersteller nennt 667 km/h maximale Reisegeschwindigkeit und bis zu 90 Sitze.','dash'],
    ['COMAC C919','COMAC','Schmalrumpf','158–192','2,200–3,000 nm · 4,075–5,555 km','2 Turbofans','Ein chinesischer zweistrahliger Passagierjet für Kurz- und Mittelstrecken.','Der Hersteller nennt 158–192 Sitze und 4.075–5.555 km Reichweite.','c919'],
    ['Deutsche Aircraft D328eco','Deutsche Aircraft','Regionalflugzeug · in Entwicklung','bis 40','655 nm · ca. 1.213 km (volle Kabine)','2 Turboprops','Modernisierte Weiterentwicklung des Dornier-328-Konzepts für den Regionalverkehr.','Herstellerangaben zum Entwicklungsprogramm: bis 40 Sitze, 655 nm Reichweite und maximal 324 kt Reisegeschwindigkeit.','deutsche'],
    ['GROB G 120TP','GROB Aircraft','Schulflugzeug','2','880 nm · ca. 1.630 km','1 Turboprop','Turboprop-Trainer für militärische und zivile Flugausbildung.','GROB nennt 205 kt Reisegeschwindigkeit auf Meereshöhe und ein maximales Startgewicht bis 1.625 kg.','grob'],
    ['GROB G 520','GROB Aircraft','Spezialflugzeug','1 Pilot','Herstellerangabe nicht veröffentlicht','1 Turboprop','Hochfliegendes Forschungs- und Spezialflugzeug für Mess- und Beobachtungsmissionen.','GROB nennt bis zu 4.700 kg MTOW, 45.000 ft zertifizierte Betriebshöhe und ein Pratt & Whitney Canada PT6A-67.','grob520'],
    ['Schleicher ASK 21','Alexander Schleicher','Segelflugzeug','2','Thermikabhängig','ohne Motor','Zweisitziges Segelflugzeug, häufig für Schulung und Vereinsbetrieb eingesetzt.','Alexander Schleicher baut Segelflugzeuge in Poppenhausen; die Firma wurde 1927 gegründet.','schleicher'],
    ['Schleicher AS 33','Alexander Schleicher','Segelflugzeug','1','Thermikabhängig','Segler oder optionale „Es“-Eigenstartversion','Einsitziges Hochleistungssegelflugzeug mit 15- oder 18-Meter-Flügel.','Herstellerdaten unterscheiden die 15-m-Version (max. 550 kg) und die 18-m-Version (max. 600 kg).','as33'],
    ['DG-1001','DG Aviation / JSDG Production','Segelflugzeug','2','Thermikabhängig','ohne Motor oder Heimkehrhilfe','Vielseitiger Doppelsitzer für Schulung, Streckenflug und Kunstflug.','Aktuelle Varianten heißen unter anderem DG-1001S, DG-1001E und DG-1001T; Spannweiten und Antriebe unterscheiden sich.','dg'],
    ['Schempp-Hirth Ventus 3','Schempp-Hirth','Segelflugzeug','1 oder 2','Thermikabhängig','ohne Motor oder Heimkehrhilfe','Hochleistungssegler in einsitzigen und zweisitzigen Ausführungen.','Die Baureihe bietet verschiedene Spannweiten; die Firma baut seit 1935 Segelflugzeuge in Deutschland.','schempp'],
    ['Stemme S12-SW','Stemme','Motorsegler','2','bis 950 nm · ca. 1.759 km*','Rotax 914 F2/S1 · 84,5 kW','Reisemotorsegler mit einziehbarem Antrieb, faltbaren Flügeln und Winglets.','Aktuelle Herstellerdaten zur S12-SW: 21,7 m Spannweite, 900 kg MTOM, bis zu 259 km/h TAS und 1:50 bestes Gleiten. Leistungswerte sind laut Hersteller teilweise noch zu bestätigen.','stemme'],
    ['EXTRA 330SC','EXTRA Aircraft','Kunstflugzeug','1','Herstellerangabe nicht veröffentlicht','Lycoming AEIO-580 · 315 hp','Einsitziges Wettbewerbs-Kunstflugzeug in Ganzmetall-/Verbundbauweise.','EXTRA nennt 7,5 m Spannweite, 6,7 m Länge und 870 kg maximales Kunstfluggewicht.','extra'],
    ['Flight Design CTLS','Flight Design','Leichtflugzeug','2','Herstellerangabe je nach Ausführung','1 Rotax 912 / 912 iS','Leichtes zweisitziges Reiseflugzeug der CT-Familie.','Flight Design general aviation GmbH hat ihren Sitz am Flugplatz Eisenach-Kindel in Thüringen.','flightdesign'],
    ['Scheibe SF 25 Falke','Scheibe Aircraft','Motorsegler','2','Herstellerangabe nicht veröffentlicht','1 Kolbenmotor · je nach Variante','Zweisitziger Reisemotorsegler mit nebeneinanderliegenden Sitzen.','Die SF-25-Familie umfasst mehrere Varianten; die EASA führt die SF 25A als zugelassenen Typ.','scheibe'],
    ['Lange Antares 21E','Lange Aviation','Motorsegler','1','Herstellerangabe je nach Ausführung','Elektrischer Eigenstartantrieb','Einsitziger Hochleistungssegler mit elektrischem Eigenstartsystem.','Lange Aviation mit Sitz in Zweibrücken spezialisiert sich auf elektrisch angetriebene Segelflugzeuge.','lange'],
    ['Binder EB 29R','Binder Flugmotorenbau','Segelflugzeug','1','Thermikabhängig','ohne Motor','Einsitziger Großsegler mit bis zu 29 Metern Spannweite.','Der EB 29R ist eine weiterentwickelte Variante der EB-29-Familie.','binder'],
    ['Glasflügel Hornet','Glasfaser-Flugzeug-Service','Segelflugzeug','1','Thermikabhängig','ohne Motor','Einsitziges Segelflugzeug aus der Glasflügel-Tradition.','Der heutige Glasfaser-Flugzeug-Service betreut Glasflügelmuster; die EASA führt den Hornet in ihrer Musterliste.','streifeneder'],
    ['Breezer B600 LSA','Breezer Aircraft','Leichtflugzeug','2','Herstellerangabe nicht veröffentlicht','1 Rotax-Kolbenmotor','Zweisitziges Aluminium-Leichtflugzeug für Reise und Ausbildung.','Breezer nennt 8,74 m Spannweite, 6,73 m Länge und 600 kg Höchstfluggewicht. Die Firma fertigt in Bredstedt.','breezer'],
    ['REMOS GX','REMOS / Stemme Production','Leichtflugzeug','2','Herstellerangabe je nach Variante','1 Rotax 912 (Varianten)','Zweisitziges Hochdecker-Leichtflugzeug mit Verbundwerkstoffzelle.','Das REMOS GX-Handbuch nennt 9,32 m Spannweite, 6,48 m Länge und bis zu 600 kg MTOW; neuere Produktion lief über STEMME Production.','remos'],
    ['COMCO IKARUS C42','COMCO IKARUS','Ultraleichtflugzeug','2','Herstellerangabe je nach Variante','1 Rotax-Kolbenmotor','Zweisitziger Hochdecker für Schulung, Reise und Schleppaufgaben.','COMCO IKARUS nennt mehr als 1.600 verkaufte C42 und bietet mehrere Baureihen mit variierenden Zulassungsgewichten an.','comco'],
    ['FK 9','FK-Aircraft / B&F Technik','Ultraleichtflugzeug','2','Herstellerangabe je nach Variante','1 Rotax-Kolbenmotor','Zweisitziges Hochdecker-Ultraleichtflugzeug, aktuell von FK-Aircraft in Speyer betreut.','B&F Technik Vertriebs GmbH sitzt in Speyer; die FK-9 wird zusammen mit der FK-14 im aktuellen Modellangebot geführt.','fk'],
    ['Airbus A300B4','Airbus','Langstrecke','220–336','4,050 nm · 7,500 km','2 Turbofans','Früher Großraum-Zweistrahler, der den effizienten Twin-Aisle-Betrieb prägte.','Der A300 absolvierte 1972 seinen Erstflug und war der erste zweistrahlige Großraumjet.','airbusHistory'],
    ['Airbus A310-300','Airbus','Langstrecke','220 typisch','5,150 nm · 9,540 km','2 Turbofans','Kürzerer Großraumjet mit verbesserter Reichweite gegenüber frühen A300-Versionen.','Die A310 wurde als verkürzte Ergänzung zur A300-Familie entwickelt.','airbusHistory'],
    ['Boeing 707-320B','Boeing','Langstrecke','141 typisch','5,750 nm · 10,650 km','4 Turbofans','Früher Langstreckenjet, der den weltweiten Düsenverkehr mitprägte.','Die 707 machte den transkontinentalen Jetverkehr für Airlines praktikabel.','boeingHistory'],
    ['Boeing 717-200','Boeing','Regional jet','106 typisch','2,060 nm · 3,815 km','2 Turbofans','Kleiner zweistrahliger Jet für Kurzstrecken und hohe Umläufe.','Das Muster ging aus der Douglas MD-95-Entwicklung hervor.','boeingHistory'],
    ['Boeing 727-200','Boeing','Schmalrumpf','145 typisch','2,700 nm · 5,000 km','3 Turbofans','Dreistrahliger Jet für Kurz- und Mittelstrecken mit anspruchsvollen Flughäfen.','Das charakteristische T-Leitwerk trägt drei Hecktriebwerke.','boeingHistory'],
    ['Boeing 737-200','Boeing','Schmalrumpf','115 typisch','2,600 nm · 4,815 km','2 Turbofans','Frühe 737-Version mit kurzen Start- und Landestrecken.','Die Baureihe wurde in zahlreichen Varianten über Jahrzehnte eingesetzt.','boeingHistory'],
    ['Boeing 747SP','Boeing','Jumbojet','230 typisch','6,500 nm · 12,040 km','4 Turbofans','Verkürzte 747 für besonders große Reichweite und Langstrecken.','SP steht für Special Performance; der Rumpf ist deutlich kürzer als bei der 747-100.','boeingHistory'],
    ['Douglas DC-3','Douglas','Propellerflugzeug','21–32','1,500 nm · 2,780 km','2 Kolbenmotoren','Robustes zweimotoriges Verkehrsflugzeug, das den Linienverkehr revolutionierte.','Der Erstflug fand 1935 statt; das Smithsonian beschreibt 21 Sitze in einer typischen Kabine.','smithsonianDC3'],
    ['Douglas DC-6','Douglas','Propellerflugzeug','52–68','4,100 nm · 7,600 km','4 Kolbenmotoren','Viermotoriger Kolbenliner der Nachkriegszeit für lange Strecken.','Die DC-6 wurde sowohl im Passagier- als auch im Frachtverkehr genutzt.','boeingHistory'],
    ['Douglas DC-8-63','Douglas','Langstrecke','259 typisch','5,200 nm · 9,630 km','4 Turbofans','Gestreckte Version des frühen Douglas-Langstreckenjets.','Die DC-8-63 war eine der längsten Varianten der DC-8-Reihe.','boeingHistory'],
    ['Douglas DC-9-30','Douglas','Schmalrumpf','115 typisch','1,350 nm · 2,500 km','2 Turbofans','Kurzstreckenjet mit Hecktriebwerken und T-Leitwerk.','Die DC-9-Familie wurde später zur MD-80/90-Linie weiterentwickelt.','boeingHistory'],
    ['Aérospatiale-BAC Concorde','Aérospatiale / BAC','Überschallflugzeug','100','3,900 nm · 7,220 km','4 Turbofans mit Nachbrenner','Überschall-Passagierflugzeug mit schlankem Deltaflügel und spitzer Nase.','Concorde flog im Linienverkehr mit etwa Mach 2; das Gemeinschaftsprojekt verband Frankreich und Großbritannien.','concorde'],
    ['Dornier 228-212','Dornier / RUAG','Turboprop','19','1,000 nm · 1,850 km','2 Turboprops','Vielseitiger Kurzstrecken-Turboprop mit hochauftriebfähigem Flügel.','Die Dornier 228 wird unter anderem für Regionalverkehr, Spezialmissionen und kurze Pisten genutzt.','dornier'],
    ['Dornier 328-100','Dornier','Turboprop','30–33','1,000 nm · 1,850 km','2 Turboprops','Schneller Regional-Turboprop mit Druckkabine.','Die 328-Familie erhielt auch eine Jetversion.','dornier'],
    ['Cessna 172 Skyhawk','Cessna','Leichtflugzeug','4','640 nm · 1,185 km','1 Lycoming-Kolbenmotor','Viersitziges Hochdeckerflugzeug für Ausbildung und private Reiseflüge.','Die Skyhawk gehört zu den meistgebauten Flugzeugmustern der Welt.','cessna'],
    ['Cessna 208B Grand Caravan','Cessna','Turboprop','bis 14','1,070 nm · 1,982 km','1 Pratt & Whitney PT6A','Einmotoriger Turboprop für Zubringer-, Fracht- und Spezialmissionen.','Die große Kabinentür und robuste Auslegung unterstützen flexible Einsätze.','cessna'],
    ['Beechcraft King Air 350i','Beechcraft','Turboprop','bis 11','1,806 nm · 3,345 km','2 Pratt & Whitney PT6A','Zweimotoriger Business- und Nutzflugzeug-Turboprop mit Druckkabine.','Die King-Air-Familie ist seit Jahrzehnten in Geschäftsreise und Spezialdiensten verbreitet.','kingair'],
    ['Piper PA-28 Archer LX','Piper','Leichtflugzeug','4','522 nm · 967 km','1 Lycoming-Kolbenmotor','Viersitziger Tiefdecker für Ausbildung und private Reiseflüge.','Die Archer nutzt ein festes Dreibeinfahrwerk und einen Lycoming-Motor.','piper'],
    ['Pilatus PC-12 NGX','Pilatus','Turboprop','bis 10','1,803 nm · 3,339 km','1 Pratt & Whitney PT6E-67XP','Einmotoriger Business-Turboprop mit Druckkabine und großer Frachttür.','Die PC-12 wird für Geschäftsreisen, Rettungsdienste und regionale Verbindungen eingesetzt.','pilatusPC12'],
    ['Pilatus PC-24','Pilatus','Businessjet','6–10','2,000 nm · 3,704 km','2 Williams FJ44','Businessjet mit für seine Klasse vielseitigen Pistenfähigkeiten.','Pilatus bezeichnet ihn als Super Versatile Jet; er kann auch auf unbefestigten Pisten operieren.','pilatus'],
    ['De Havilland Canada DHC-6 Twin Otter','De Havilland Canada','Turboprop','19','763 nm · 1,413 km','2 Pratt & Whitney Canada PT6A','Robuster STOL-Turboprop für Inseln, kurze Pisten und abgelegene Regionen.','Die Twin Otter ist für Rad-, Schwimmer- und Skifahrwerke bekannt.','twinOtter'],
    ['Saab 340B','Saab','Turboprop','34','900 nm · 1,667 km','2 GE CT7','Zweimotoriger Regional-Turboprop mit Druckkabine.','Die 340B verwendet GE CT7-Triebwerke und wurde für regionale Liniennetze ausgelegt.','saab'],
    ['Saab 2000','Saab','Turboprop','50','1,540 nm · 2,852 km','2 Rolls-Royce AE 2100','Hochgeschwindigkeits-Turboprop für regionale Strecken.','Der Erstflug erfolgte 1992; das Flugzeug zählt zu den schnellsten zivilen Turboprops.','saab2000'],
    ['Fokker 100','Fokker','Regional jet','97–122','1,700 nm · 3,150 km','2 Rolls-Royce Tay','Regionaljet für Kurz- und Mittelstrecken.','Der Erstflug fand 1986 statt; Fokker bot bis zu 122 Sitzplätze an.','fokker'],
    ['ATR 42-300','ATR','Turboprop','42–50','720 nm · 1,333 km','2 Pratt & Whitney Canada PW120','Frühe Version des ATR 42 für regionale Verbindungen.','ATR entwickelte die 42er-Reihe als kompakten Turboprop für kurze Strecken.','atr42'],
    ['Tupolev Tu-154M','Tupolev','Schmalrumpf','150–180','2,850 nm · 5,278 km','3 Turbofans','Dreistrahliges sowjetisches Mittelstreckenflugzeug.','Die M-Version erhielt modernisierte Solowjow-Triebwerke und Systeme.','boeingHistory'],
    ['Ilyushin Il-76TD','Ilyushin','Frachtflugzeug','bis 60 t Fracht','4,000 nm · 7,408 km','4 Turbofans','Schweres Transportflugzeug für Fracht und Spezialmissionen.','Die TD-Variante ist für zivile Transportaufgaben optimiert.','boeingHistory'],
    ['Antonov An-124 Ruslan','Antonov','Frachtflugzeug','bis 150 t Fracht','2,400 nm · 4,445 km','4 Turbofans','Sehr großes strategisches Transportflugzeug mit Bug- und Heckladerampen.','Die An-124 wurde für übergroße und besonders schwere Fracht ausgelegt.','boeingHistory'],
    ['Junkers Ju 52/3m','Junkers','Propellerflugzeug','17','540 nm · 1,000 km','3 Kolbenmotoren','Dreimotoriger Ganzmetall-Hochdecker für Passagiere und Fracht.','Das Smithsonian führt den Erstflug 1930 und den Einsatz als Transportflugzeug auf.','smithsonianJu52'],
    ['Messerschmitt Bf 109 G-6','Messerschmitt','Jagdflugzeug','1','650 km · 350 nm','1 Daimler-Benz DB 605','Deutsches Jagdflugzeug des Zweiten Weltkriegs.','Die G-6 war eine weit verbreitete Einsatzvariante der Bf-109-Familie.','smithsonianBf109'],
    ['Supermarine Spitfire Mk IX','Supermarine','Jagdflugzeug','1','434 nm · 804 km','1 Rolls-Royce Merlin','Britischer Jagdeinsitzer mit elliptischem Flügel.','Die Mk IX wurde als leistungsstarke Weiterentwicklung der Spitfire im Zweiten Weltkrieg eingeführt.','spitfire'],
    ['North American P-51D Mustang','North American','Jagdflugzeug','1','1,000 nm · 1,609 km','1 Packard-built Rolls-Royce Merlin','Langstreckenbegleitjäger mit schlanker Zelle und tropfenförmiger Kabinenhaube.','Die P-51D war eine wichtige Begleitjägervariante im Zweiten Weltkrieg.','mustang']
  ];

  const dimensions = {
    'Airbus A220-100':['35.00 m','35.10 m','63.1 t'], 'Airbus A220-300':['38.70 m','35.10 m','70.9 t'],
    'Airbus A319neo':['33.84 m','35.80 m','75.5 t'], 'Airbus A320neo':['37.57 m','35.80 m','79.0 t'], 'Airbus A321neo':['44.51 m','35.80 m','97.0 t'], 'Airbus A321XLR':['44.51 m','35.80 m','101.0 t'],
    'Airbus A330-200':['58.82 m','60.30 m','242 t'], 'Airbus A330-300':['63.66 m','60.30 m','242 t'], 'Airbus A330-800neo':['58.82 m','64.00 m','251 t'], 'Airbus A330-900neo':['63.66 m','64.00 m','251 t'],
    'Airbus A340-300':['63.70 m','60.30 m','276.5 t'], 'Airbus A340-600':['75.30 m','63.60 m','380 t'], 'Airbus A350-900':['66.80 m','64.75 m','283 t'], 'Airbus A350-1000':['73.78 m','64.75 m','322 t'], 'Airbus A380-800':['72.72 m','79.75 m','575 t'],
    'Boeing 737-700':['33.60 m','35.80 m','70.1 t'], 'Boeing 737-800':['39.50 m','35.80 m','79.0 t'], 'Boeing 737-900':['42.10 m','35.80 m','85.1 t'],
    'Boeing 737 MAX 7':['35.60 m','35.90 m','80.3 t'], 'Boeing 737 MAX 8':['39.50 m','35.90 m','82.6 t'], 'Boeing 737 MAX 9':['42.10 m','35.90 m','88.3 t'], 'Boeing 737 MAX 10':['43.80 m','35.90 m','89.8 t'],
    'Boeing 747-400':['70.70 m','64.40 m','397 t'], 'Boeing 747-8 Intercontinental':['76.30 m','68.40 m','447.7 t'], 'Boeing 757-200':['47.30 m','38.05 m','116 t'], 'Boeing 757-300':['54.40 m','38.05 m','124 t'],
    'Boeing 767-300ER':['54.90 m','47.57 m','187 t'], 'Boeing 767-400ER':['61.40 m','51.90 m','204 t'], 'Boeing 777-200ER':['63.70 m','60.90 m','298 t'], 'Boeing 777-200LR':['63.70 m','64.80 m','348 t'], 'Boeing 777-300ER':['73.90 m','64.80 m','351.5 t'], 'Boeing 777-8':['69.80 m','71.80 m*','351.5 t'], 'Boeing 777-9':['76.70 m','71.80 m*','351.5 t'],
    'Boeing 787-8 Dreamliner':['56.70 m','60.10 m','227.9 t'], 'Boeing 787-9 Dreamliner':['62.80 m','60.10 m','254 t'], 'Boeing 787-10 Dreamliner':['68.30 m','60.10 m','260.4 t'],
    'Embraer E170':['29.90 m','26.00 m','38.6 t'], 'Embraer E175':['31.70 m','26.00 m','40.4 t'], 'Embraer E190':['36.20 m','28.70 m','51.8 t'], 'Embraer E195':['38.70 m','28.70 m','52.3 t'], 'Embraer E175-E2':['32.40 m','31.00 m','44.8 t'], 'Embraer E190-E2':['36.20 m','33.70 m','56.4 t'], 'Embraer E195-E2':['41.50 m','35.10 m','62.5 t'],
    'ATR 42-600':['22.67 m','24.57 m','18.6 t'], 'ATR 72-600':['27.17 m','27.05 m','23.0 t'], 'Bombardier CRJ700':['32.30 m','23.20 m','33.0 t'], 'Bombardier CRJ900':['36.20 m','24.90 m','38.3 t'], 'Bombardier CRJ1000':['39.10 m','26.20 m','41.6 t'], 'De Havilland Dash 8-400':['32.80 m','28.40 m','29.6 t'], 'COMAC C919':['38.90 m','35.80 m','78.9 t'],
    'Deutsche Aircraft D328eco':['—','—','nicht veröffentlicht'], 'GROB G 120TP':['8.42 m','10.31 m','1.625 t'], 'GROB G 520':['13.30 m','33.00 m','4.7 t'],
    'Schleicher ASK 21':['8.35 m','17.00 m','0.60 t'], 'Schleicher AS 33':['6.70 m','15–18 m','0.55–0.60 t'], 'DG-1001':['8.57 m','18–20 m','0.79 t'],
    'Schempp-Hirth Ventus 3':['6.70 m','15–18 m','0.60 t'], 'Stemme S12-SW':['8.42 m','21.70 m','0.90 t'], 'EXTRA 330SC':['6.70 m','7.50 m','0.87 t'],
    'Flight Design CTLS':['6.22 m','8.60 m','0.60 t'], 'Scheibe SF 25 Falke':['7.70 m','15.30 m','0.85 t'], 'Lange Antares 21E':['7.30 m','21.00 m','0.75 t'],
    'Binder EB 29R':['9.00 m','29.00 m','0.85 t'], 'Glasflügel Hornet':['6.64 m','15.00 m','0.45 t'], 'Breezer B600 LSA':['6.73 m','8.74 m','0.60 t'], 'REMOS GX':['6.48 m','9.32 m','0.60 t'],
    'COMCO IKARUS C42':['6.34 m','9.78 m','0.56 t'], 'FK 9':['6.60 m','9.00 m','0.60 t']
  };
  Object.assign(dimensions, {
    'Airbus A300B4':['54.10 m','44.84 m','165 t'],'Airbus A310-300':['46.66 m','43.90 m','164 t'],
    'Boeing 707-320B':['46.60 m','44.40 m','151 t'],'Boeing 717-200':['37.80 m','28.45 m','55.3 t'],'Boeing 727-200':['46.70 m','32.90 m','95 t'],'Boeing 737-200':['30.50 m','28.35 m','52.4 t'],'Boeing 747SP':['56.30 m','59.60 m','316 t'],
    'Douglas DC-3':['19.66 m','28.96 m','11.4 t'],'Douglas DC-6':['32.18 m','35.81 m','48.5 t'],'Douglas DC-8-63':['57.12 m','45.24 m','161 t'],'Douglas DC-9-30':['36.37 m','27.25 m','51.7 t'],
    'Aérospatiale-BAC Concorde':['61.66 m','25.60 m','185 t'],'Dornier 228-212':['16.56 m','16.97 m','6.4 t'],'Dornier 328-100':['21.23 m','20.98 m','13.99 t'],
    'Cessna 172 Skyhawk':['8.28 m','11.00 m','1.11 t'],'Cessna 208B Grand Caravan':['12.67 m','15.88 m','3.97 t'],'Beechcraft King Air 350i':['14.22 m','17.65 m','6.80 t'],'Piper PA-28 Archer LX':['7.32 m','10.82 m','1.16 t'],
    'Pilatus PC-12 NGX':['14.40 m','16.28 m','4.74 t'],'Pilatus PC-24':['16.80 m','17.00 m','8.30 t'],'De Havilland Canada DHC-6 Twin Otter':['15.77 m','19.81 m','5.67 t'],
    'Saab 340B':['19.73 m','21.44 m','13.15 t'],'Saab 2000':['27.28 m','24.76 m','22.8 t'],'Fokker 100':['35.53 m','28.08 m','45.8 t'],'ATR 42-300':['22.67 m','24.57 m','16.7 t'],
    'Tupolev Tu-154M':['47.90 m','37.55 m','100 t'],'Ilyushin Il-76TD':['46.59 m','50.50 m','190 t'],'Antonov An-124 Ruslan':['69.10 m','73.30 m','405 t'],
    'Junkers Ju 52/3m':['18.90 m','29.25 m','10.5 t'],'Messerschmitt Bf 109 G-6':['9.02 m','9.92 m','3.4 t'],'Supermarine Spitfire Mk IX':['9.47 m','11.23 m','3.4 t'],'North American P-51D Mustang':['9.83 m','11.28 m','5.5 t']
  });
  const firstFlightYears = {
    'Airbus A300B4':1972,'Airbus A310-300':1982,'Boeing 707-320B':1957,'Boeing 717-200':1998,'Boeing 727-200':1963,'Boeing 737-200':1967,'Boeing 747SP':1975,
    'Douglas DC-3':1935,'Douglas DC-6':1946,'Douglas DC-8-63':1958,'Douglas DC-9-30':1965,'Aérospatiale-BAC Concorde':1969,'Dornier 228-212':1981,'Dornier 328-100':1991,
    'Cessna 172 Skyhawk':1955,'Cessna 208B Grand Caravan':1982,'Beechcraft King Air 350i':1988,'Piper PA-28 Archer LX':1975,'Pilatus PC-12 NGX':1991,'Pilatus PC-24':2015,
    'De Havilland Canada DHC-6 Twin Otter':1965,'Saab 340B':1983,'Saab 2000':1992,'Fokker 100':1986,'ATR 42-300':1984,'Tupolev Tu-154M':1968,'Ilyushin Il-76TD':1971,
    'Antonov An-124 Ruslan':1982,'Junkers Ju 52/3m':1930,'Messerschmitt Bf 109 G-6':1942,'Supermarine Spitfire Mk IX':1942,'North American P-51D Mustang':1944
  };
  function firstFlightYear(name) {
    if (/D328eco/.test(name)) return null;
    if (firstFlightYears[name]) return firstFlightYears[name];
    if (/A220/.test(name)) return 2013; if (/A319neo|A320neo|A321neo/.test(name)) return 2014; if (/A321XLR/.test(name)) return 2022;
    if (/A330-200/.test(name)) return 1997; if (/A330-300/.test(name)) return 1992; if (/A330-800/.test(name)) return 2018; if (/A330-900/.test(name)) return 2017;
    if (/A340-300/.test(name)) return 1991; if (/A340-600/.test(name)) return 2001; if (/A350-900/.test(name)) return 2013; if (/A350-1000/.test(name)) return 2016; if (/A380/.test(name)) return 2005;
    if (/737-700/.test(name)) return 1997; if (/737-800/.test(name)) return 1997; if (/737-900/.test(name)) return 2000; if (/737 MAX 7/.test(name)) return 2018; if (/737 MAX 8/.test(name)) return 2016; if (/737 MAX 9/.test(name)) return 2017; if (/737 MAX 10/.test(name)) return 2021;
    if (/747-400/.test(name)) return 1988; if (/747-8/.test(name)) return 2010; if (/757-200/.test(name)) return 1982; if (/757-300/.test(name)) return 1998; if (/767-300/.test(name)) return 1986; if (/767-400/.test(name)) return 1999;
    if (/777-200ER/.test(name)) return 1996; if (/777-200LR/.test(name)) return 2005; if (/777-300ER/.test(name)) return 2003; if (/777-8/.test(name)) return 2020; if (/777-9/.test(name)) return 2020; if (/787-8/.test(name)) return 2009; if (/787-9/.test(name)) return 2013; if (/787-10/.test(name)) return 2017;
    if (/Embraer E170/.test(name)) return 2002; if (/Embraer E175(?!-E2)/.test(name)) return 2003; if (/Embraer E190(?!-E2)/.test(name)) return 2004; if (/Embraer E195(?!-E2)/.test(name)) return 2004;
    if (/E175-E2/.test(name)) return 2021; if (/E190-E2/.test(name)) return 2016; if (/E195-E2/.test(name)) return 2017; if (/ATR 42/.test(name)) return 1984; if (/ATR 72/.test(name)) return 1988;
    if (/CRJ700/.test(name)) return 1999; if (/CRJ900/.test(name)) return 2001; if (/CRJ1000/.test(name)) return 2008; if (/Dash 8/.test(name)) return 2008; if (/C919/.test(name)) return 2017;
    if (/D328eco/.test(name)) return 2026; if (/G 120TP/.test(name)) return 2010; if (/G 520/.test(name)) return 1987; if (/ASK 21/.test(name)) return 1978; if (/AS 33/.test(name)) return 2020; if (/DG-1001/.test(name)) return 2005; if (/Ventus 3/.test(name)) return 2016; if (/Stemme S12/.test(name)) return 2016; if (/EXTRA 330SC/.test(name)) return 1997; if (/CTLS/.test(name)) return 2008; if (/SF 25/.test(name)) return 1963; if (/Antares 21E/.test(name)) return 2003; if (/EB 29R/.test(name)) return 2009; if (/Hornet/.test(name)) return 1967; if (/B600/.test(name)) return 2013; if (/REMOS GX/.test(name)) return 2006; if (/C42/.test(name)) return 1996; if (/FK 9/.test(name)) return 1992;
    return null;
  }
  const makerCountry = (maker) => ({'Airbus':'Europa','Boeing':'USA','Embraer':'Brasilien','ATR':'Frankreich / Italien','Bombardier / MHI RJ':'Kanada / Japan','De Havilland Canada':'Kanada','COMAC':'China','Deutsche Aircraft':'Deutschland','GROB Aircraft':'Deutschland','Alexander Schleicher':'Deutschland','DG Aviation / JSDG Production':'Deutschland','Schempp-Hirth':'Deutschland','Stemme':'Deutschland','EXTRA Aircraft':'Deutschland','Flight Design':'Deutschland','Scheibe Aircraft':'Deutschland','Lange Aviation':'Deutschland','Binder Flugmotorenbau':'Deutschland','Glasfaser-Flugzeug-Service':'Deutschland','Breezer Aircraft':'Deutschland','REMOS / Stemme Production':'Deutschland','COMCO IKARUS':'Deutschland','FK-Aircraft / B&F Technik':'Deutschland','Douglas':'USA','Aérospatiale / BAC':'Frankreich / Großbritannien','Dornier / RUAG':'Deutschland / Schweiz','Dornier':'Deutschland','Cessna':'USA','Beechcraft':'USA','Piper':'USA','Pilatus':'Schweiz','Saab':'Schweden','Fokker':'Niederlande','Tupolev':'Russland','Ilyushin':'Russland','Antonov':'Ukraine','Junkers':'Deutschland','Messerschmitt':'Deutschland','Supermarine':'Großbritannien','North American':'USA'})[maker] || 'Unbekannt';
  const engineMaker = (name) => { const e=engineDetails(name); if (/ohne Motor|Segelflugzeug/.test(e)) return 'Ohne Motor'; if (/Rotax/.test(e)) return 'Rotax'; if (/Lycoming/.test(e)) return 'Lycoming'; if (/Pratt & Whitney/.test(e)) return 'Pratt & Whitney'; if (/Rolls-Royce/.test(e)) return 'Rolls-Royce'; if (/GE |GE\b|General Electric|GEnx|GE90|GE Aerospace/.test(e)) return 'General Electric'; if (/CFM/.test(e)) return 'CFM International'; if (/Williams/.test(e)) return 'Williams'; if (/Daimler-Benz|BMW|Kolbenmotor|Wright/.test(e)) return 'Kolbenmotor / historisch'; if (/Elektrisch/.test(e)) return 'Elektrisch'; return 'Weitere / gemischt'; };
  const engineFilter = document.getElementById('engineFilter');
  const countryFilter = document.getElementById('countryFilter');
  const sortFilter = document.getElementById('sortFilter');
  const germanMakers = new Set(['Deutsche Aircraft','GROB Aircraft','Alexander Schleicher','DG Aviation / JSDG Production','Schempp-Hirth','Stemme','EXTRA Aircraft','Flight Design','Scheibe Aircraft','Lange Aviation','Binder Flugmotorenbau','Glasfaser-Flugzeug-Service','Breezer Aircraft','REMOS / Stemme Production','COMCO IKARUS','FK-Aircraft / B&F Technik','Dornier','Dornier / RUAG','Junkers','Messerschmitt']);
  const companyDirectory = [
    ['Alexander Schleicher','Segelflugzeuge und Motorsegler','Poppenhausen (Hessen)','schleicher'],
    ['DG Aviation / JSDG Production','Segelflugzeuge, Motorsegler, Wartung und Entwicklung','Bruchsal (Baden-Württemberg)','dg'],
    ['Schempp-Hirth','Hochleistungssegelflugzeuge','Kirchheim unter Teck (Baden-Württemberg)','schempp'],
    ['Stemme','Reisemotorsegler und Spezialflugzeuge','Strausberg (Brandenburg)','stemme'],
    ['GROB Aircraft','Schul-, Spezial- und Forschungsflugzeuge','Tussenhausen-Mattsies (Bayern)','grob'],
    ['Deutsche Aircraft','Regionale Verkehrsflugzeuge; D328eco in Entwicklung','Oberpfaffenhofen / Leipzig','deutsche'],
    ['EXTRA Aircraft','Kunstflugzeuge','Hünxe (Nordrhein-Westfalen)','extra'],
    ['Flight Design','Leicht- und Ultraleichtflugzeuge','Hörselberg-Hainich (Thüringen)','flightdesign'],
    ['Scheibe Aircraft','Motorsegler und Leichtflugzeuge','Heubach (Baden-Württemberg)','scheibe'],
    ['Lange Aviation','Elektrische Segelflugzeuge und Eigenstarter','Zweibrücken (Rheinland-Pfalz)','lange'],
    ['Binder Flugmotorenbau','Segelflugzeuge und Flugzeugtechnik','Ostheim vor der Rhön (Bayern)','binder'],
    ['Glasfaser-Flugzeug-Service (Streifeneder)','Betreuung und Weiterentwicklung von Glasflügel-Segelflugzeugen','Grabenstetten (Baden-Württemberg)','streifeneder'],
    ['Breezer Aircraft','Aluminium-Leichtflugzeuge','Bredstedt (Schleswig-Holstein)','breezer'],
    ['REMOS / Stemme Production','Leichtflugzeuge; REMOS-GX-Baureihe','Deutschland (Produktion über STEMME Production)','remos'],
    ['COMCO IKARUS','Ultraleichtflugzeuge; IKARUS-C42-Familie','Mengen-Hohentengen (Baden-Württemberg)','comco'],
    ['FK-Aircraft / B&F Technik','Ultraleichtflugzeuge der FK-Familie','Speyer (Rheinland-Pfalz)','fk'],
    ['Flugtechnik & Leichtbau / ETA','Segelflugzeugbau und Leichtbauprojekte','Braunschweig (Niedersachsen)','binder']
  ];
  const engineDetails = (name) => {
    if (name === 'Douglas DC-3') return '2 × Wright R-1830 Twin Wasp';
    if (name === 'Douglas DC-6') return '4 × Pratt & Whitney R-2800';
    if (name === 'Junkers Ju 52/3m') return '3 × BMW 132 / Pratt & Whitney Hornet · Varianten';
    if (name === 'Messerschmitt Bf 109 G-6') return 'Daimler-Benz DB 605A';
    if (name === 'Supermarine Spitfire Mk IX') return 'Rolls-Royce Merlin 61/63';
    if (name === 'North American P-51D Mustang') return 'Packard V-1650 (Merlin-Lizenzbau)';
    if (name === 'Aérospatiale-BAC Concorde') return '4 × Rolls-Royce/Snecma Olympus 593';
    if (/^Boeing 707/.test(name)) return '4 × Pratt & Whitney JT3D';
    if (/Boeing 717/.test(name)) return '2 × Rolls-Royce BR715';
    if (/Boeing 727/.test(name)) return '3 × Pratt & Whitney JT8D';
    if (/Boeing 737-200/.test(name)) return '2 × Pratt & Whitney JT8D';
    if (/Boeing 747SP/.test(name)) return 'Pratt & Whitney JT9D, GE CF6 oder Rolls-Royce RB211';
    if (/Douglas DC-8/.test(name)) return '4 × Turbofan · variantenspezifisch';
    if (/Douglas DC-9/.test(name)) return '2 × Pratt & Whitney JT8D';
    if (/Airbus A300/.test(name)) return 'GE CF6 oder Pratt & Whitney JT9D';
    if (/Airbus A310/.test(name)) return 'GE CF6, Pratt & Whitney JT9D oder PW4000';
    if (/Dornier 228/.test(name)) return '2 × Garrett TPE331';
    if (/Dornier 328/.test(name)) return '2 × Pratt & Whitney Canada PW119C';
    if (/Cessna 172/.test(name)) return 'Lycoming IO-360-L2A · 180 hp';
    if (/Cessna 208/.test(name)) return 'Pratt & Whitney Canada PT6A-140';
    if (/King Air 350/.test(name)) return '2 × Pratt & Whitney Canada PT6A-60A';
    if (/Archer LX/.test(name)) return 'Lycoming O-360-A4M · 180 hp';
    if (/PC-12/.test(name)) return 'Pratt & Whitney Canada PT6E-67XP';
    if (/PC-24/.test(name)) return '2 × Williams FJ44-4A';
    if (/Twin Otter/.test(name)) return '2 × Pratt & Whitney Canada PT6A';
    if (/Saab 340/.test(name)) return '2 × GE CT7-9B';
    if (/Saab 2000/.test(name)) return '2 × Rolls-Royce AE 2100A';
    if (/Fokker 100/.test(name)) return '2 × Rolls-Royce Tay 620/650';
    if (/ATR 42-300/.test(name)) return '2 × Pratt & Whitney Canada PW120';
    if (/Tu-154/.test(name)) return '3 × Solowjow D-30KU';
    if (/Il-76/.test(name)) return '4 × Solowjow D-30KP';
    if (/An-124/.test(name)) return '4 × Progress D-18T';
    if (name.startsWith('Airbus A220')) return 'Pratt & Whitney PW1500G';
    if (name.startsWith('Deutsche Aircraft D328eco')) return '2 × Pratt & Whitney Canada PW127XT-S (geplant)';
    if (name === 'GROB G 120TP') return 'Rolls-Royce M250-B17F · 456 shp';
    if (name === 'Breezer B600 LSA') return 'Rotax 912 · Varianten';
    if (name === 'REMOS GX') return 'Rotax 912 · Varianten';
    if (name.startsWith('COMCO IKARUS C42') || name === 'FK 9') return 'Rotax-Kolbenmotor · Varianten';
    if (name === 'GROB G 520') return 'Pratt & Whitney Canada PT6A-67 · 750 shp';
    if (name === 'Schleicher AS 33') return 'Optionaler Solo-Es-Eigenstarter';
    if (/Schleicher ASK|DG-1001|Schempp-Hirth|Binder EB|Glasflügel/.test(name)) return 'Segelflugzeug · kein Triebwerk';
    if (name.startsWith('Stemme S12')) return 'Rotax 914 F2/S1 · 84,5 kW';
    if (name === 'EXTRA 330SC') return 'Lycoming AEIO-580-B1A · 315 hp';
    if (name === 'Flight Design CTLS') return 'Rotax 912 / 912 iS (Varianten)';
    if (name.startsWith('Scheibe SF 25')) return 'Kolbenmotor · abhängig von der Variante';
    if (name.startsWith('Lange Antares')) return 'Elektrischer Eigenstartantrieb';
    if (/A319neo|A320neo|A321neo|A321XLR/.test(name)) return 'CFM LEAP-1A oder Pratt & Whitney PW1100G-JM';
    if (/A330-(200|300)/.test(name)) return 'GE CF6, Pratt & Whitney PW4000 oder Rolls-Royce Trent 700';
    if (/A330-(800|900)/.test(name)) return 'Rolls-Royce Trent 7000';
    if (name.includes('A340-300')) return 'CFM International CFM56-5C';
    if (name.includes('A340-600')) return 'Rolls-Royce Trent 500';
    if (name.startsWith('Airbus A350')) return name.includes('1000') ? 'Rolls-Royce Trent XWB-97' : 'Rolls-Royce Trent XWB-84';
    if (name.includes('A380')) return 'Rolls-Royce Trent 900 oder Engine Alliance GP7200';
    if (/737 MAX/.test(name)) return 'CFM International LEAP-1B';
    if (/Boeing 737-/.test(name)) return 'CFM International CFM56-7B';
    if (name.includes('747-8')) return 'GE Aerospace GEnx-2B';
    if (name.includes('747-400')) return 'GE CF6, Pratt & Whitney PW4000 oder Rolls-Royce RB211';
    if (name.includes('757')) return 'Pratt & Whitney PW2000 oder Rolls-Royce RB211';
    if (name.includes('767')) return 'GE CF6, Pratt & Whitney PW4000 oder Rolls-Royce RB211';
    if (name.includes('777-8') || name.includes('777-9')) return 'GE Aerospace GE9X';
    if (name.includes('777-200LR') || name.includes('777-300ER')) return 'GE Aerospace GE90';
    if (name.includes('777-200ER')) return 'GE90, Rolls-Royce Trent 800 oder Pratt & Whitney PW4000';
    if (name.includes('787')) return 'GE GEnx-1B oder Rolls-Royce Trent 1000';
    if (/Embraer E(170|175|190|195)(?!-E2)/.test(name)) return 'GE CF34-8E (E170/E175) oder CF34-10E (E190/E195)';
    if (name.includes('E175-E2')) return 'Pratt & Whitney PW1700G';
    if (name.includes('E2')) return 'Pratt & Whitney PW1900G';
    if (name.startsWith('ATR')) return 'Pratt & Whitney Canada PW127XT';
    if (name.includes('CRJ')) return 'GE Aerospace CF34';
    if (name.includes('Dash 8')) return 'Pratt & Whitney Canada PW150A';
    return 'CFM International LEAP-1C';
  };
  const cruise = (name) => {
    if (name.startsWith('Deutsche Aircraft D328eco')) return 'max. 324 kt · ca. 600 km/h';
    if (name === 'GROB G 120TP') return '205 kt · ca. 380 km/h (MSL)';
    if (name === 'EXTRA 330SC') return 'Vne 220 kt · ca. 407 km/h';
    if (/Schleicher|DG-1001|Schempp-Hirth|Binder EB|Glasflügel/.test(name)) return 'Luftmassenabhängig';
    if (/Flight Design|Scheibe|Stemme|Lange|Deutsche Aircraft|GROB|Breezer|REMOS|COMCO|FK 9/.test(name)) return 'Ausführungsabhängig';
    if (name.startsWith('ATR')) return 'ca. 510 km/h';
    if (name.includes('Dash 8')) return 'bis 667 km/h';
    if (name.includes('CRJ')) return 'Mach 0,74';
    if (/A350/.test(name) || /787/.test(name)) return 'Mach 0,85';
    if (/A330/.test(name) || /A340/.test(name) || /777/.test(name)) return 'Mach 0,82–0,84';
    if (/A380|747/.test(name)) return 'Mach 0,85';
    return 'Mach 0,78–0,80';
  };
  const cabin = (name) => name.includes('A380') ? 'Zwei durchgehende Passagierdecks' : /A330|A340|A350|747|767|777|787/.test(name) ? 'Zweigang-Großraumkabine' : /ATR|Dash 8/.test(name) ? 'Ein Mittelgang · Turboprop' : /Embraer|CRJ/.test(name) ? 'Ein Mittelgang · Regionaljet' : /Schleicher|DG-1001|Schempp-Hirth|Binder EB|Glasflügel/.test(name) ? 'Segelflugzeug-Cockpit' : /EXTRA/.test(name) ? 'Einzelsitz-Cockpit' : /GROB G 120|Flight Design|Scheibe|Breezer|REMOS|Stemme|Lange|COMCO|FK 9/.test(name) ? 'Leichtflugzeug-/Motorsegler-Cockpit' : /D328eco/.test(name) ? 'Regionalflugzeug-Kabine' : 'Ein Mittelgang · Single-Aisle';
  [...new Set(aircraft.map(([name]) => engineMaker(name)))].sort((a,b)=>a.localeCompare(b,'de')).forEach(value=>engineFilter.add(new Option(value,value)));
  [...new Set(aircraft.map(([,maker]) => makerCountry(maker)))].sort((a,b)=>a.localeCompare(b,'de')).forEach(value=>countryFilter.add(new Option(value,value)));
  const baseCategory = (category) => category.split(' · ')[0];
  function aircraftFamilyKnowledge(name, maker, propulsion) {
    if (/^Airbus A220/.test(name)) return { title: 'Airbus-A220-Familie', text: 'A220-100 und A220-300 teilen sich laut Airbus eine Pilotenberechtigung. Das Cockpit nutzt Fly-by-Wire und Sidestick-Steuerung.', url: 'https://www.airbus.com/en/products-services/commercial-aircraft/cockpits' };
    if (/^Airbus A319|^Airbus A320|^Airbus A321/.test(name)) return { title: 'Airbus-A320-Familie', text: 'Die A319-, A320- und A321-Varianten teilen sich Cockpit und wesentliche Bedienabläufe. Airbus beschreibt dafür eine gemeinsame Musterberechtigung innerhalb der Familie.', url: 'https://www.aircraft.airbus.com/en/aircraft/a320-the-most-successful-aircraft-family-ever' };
    if (/^Airbus A330|^Airbus A350/.test(name)) return { title: 'Airbus-Großraumflugzeuge', text: 'A330 und A350 teilen eine ähnliche Cockpit-Philosophie. Airbus bietet dafür eine verkürzte Umschulung zwischen den Mustern an; die Flugzeuge bleiben technisch eigenständige Typen.', url: 'https://www.aircraft.airbus.com/en/newsroom/case-study/2023-01-a350-more-commonality-better-integration' };
    if (/^Airbus A340/.test(name)) return { title: 'Airbus A340', text: 'Der A340 ist ein vierstrahliger Langstreckenjet. Er entstand in einer Ära, in der vier Triebwerke auf sehr langen Strecken eine verbreitete Auslegung waren; spätere Generationen setzen stärker auf zweistrahlige Flugzeuge.', url: 'https://www.airbus.com/en/newsroom/stories/2018-06-airbus-jetliners-a-standard-setting-history' };
    if (/^Airbus A380/.test(name)) return { title: 'Airbus A380', text: 'Der A380 hat zwei durchgehende Passagierdecks. Seine Größe ist auf hohe Nachfrage auf stark frequentierten Strecken ausgelegt; die tatsächliche Sitzplatzzahl hängt von der Airline-Kabine ab.', url: 'https://www.airbus.com/en/products-services/commercial-aircraft/passenger-aircraft/a380' };
    if (/^Boeing 737/.test(name)) return { title: 'Boeing-737-Familie', text: 'Die 737 entwickelte sich über mehrere Generationen. Die MAX-Reihe ergänzte unter anderem eine überarbeitete Flügelspitze; Sitzplatz- und Reichweitenwerte hängen von Variante und Kabine ab.', url: 'https://www.boeing.com/commercial/737max/737-max-update/737max-legacy' };
    if (/^Boeing 747/.test(name)) return { title: 'Boeing 747', text: 'Der charakteristische obere Rumpfbereich verleiht der 747 ihr typisches Buckelprofil. Passagiervarianten kombinieren ein Hauptdeck mit einem zusätzlichen Oberdeck.', url: 'https://www.boeing.com/commercial/747-8' };
    if (/^Boeing 757|^Boeing 767/.test(name)) return { title: 'Boeing 757 und 767', text: '757 und 767 wurden als verwandte Programme entwickelt. Gemeinsame Cockpitmerkmale und Abläufe erleichterten Betreibern den gemischten Einsatz beider Flugzeugfamilien.', url: 'https://www.boeing.com/commercial/767' };
    if (/^Boeing 777/.test(name)) return { title: 'Boeing-777-Familie', text: 'Die 777 ist ein zweistrahliges Großraumflugzeug für mittlere und lange Strecken. Varianten unterscheiden sich vor allem durch Rumpflänge, Reichweite und Triebwerksausrüstung.', url: 'https://www.boeing.com/Commercial/777' };
    if (/^Boeing 787/.test(name)) return { title: 'Boeing-787-Dreamliner-Familie', text: 'Bei der 787 bestehen laut Boeing rund 50 Prozent des Flugzeugs nach Gewicht aus Verbundwerkstoffen. Dazu kommen große, elektronisch dimmbare Kabinenfenster und eine gemeinsame Familienauslegung.', url: 'https://www.boeing.com/commercial/787/by-design' };
    if (/^Embraer E(170|175|190|195)/.test(name)) return { title: 'Embraer E-Jets', text: 'Die E-Jets sind Regionaljets mit 2+2-Bestuhlung: In der üblichen Anordnung gibt es keinen Mittelsitz. Die Familie deckt verschiedene Sitzplatzgrößen für Regional- und Zubringerstrecken ab.', url: 'https://www.embraer.com/e-jets/en/' };
    if (/^Embraer E(175-E2|190-E2|195-E2)/.test(name)) return { title: 'Embraer E-Jets E2', text: 'Auch die E2-Familie setzt auf 2+2-Sitze ohne Mittelsitz. Embraer beschreibt die E2-Modelle als Weiterentwicklung der ersten E-Jet-Generation mit verbesserten Triebwerken und Systemen.', url: 'https://www.embraer.com/e-jets-e2/en/' };
    if (/^ATR 42|^ATR 72/.test(name)) return { title: 'ATR-42/72-Familie', text: 'ATR 42 und ATR 72 teilen laut Hersteller wesentliche Systeme, Triebwerke, Propeller und Cockpitmerkmale. Das erleichtert den Wechsel zwischen Varianten im Flottenbetrieb.', url: 'https://www.atr-aircraft.com/regional-mobility/regional-aircraft/' };
    if (/Dash 8-400|Q400/.test(name)) return { title: 'De Havilland Dash 8-400', text: 'Der Dash 8-400 verbindet Turboprop-Antrieb mit einer für diese Klasse hohen Kapazität. De Havilland nennt je nach Kabinenlayout bis zu 90 Sitzplätze und hebt die modernisierte Cockpit- und Aerodynamikauslegung hervor.', url: 'https://dehavilland.com/dash-8-400/' };
    if (/G 120TP/.test(name)) return { title: 'GROB G 120TP', text: 'Der G 120TP ist ein zweisitziges Trainingsflugzeug mit nebeneinander angeordneten Sitzen. GROB nennt Verbundwerkstoffe, ein Glascockpit und Eignung für verschiedene Ausbildungsphasen.', url: 'https://grob-aircraft.com/en/g-120tp.html' };
    if (/Segelflugzeug|Segler|ASK 21|AS 33|Ventus|DG-1001|EB 29|Hornet|Antares/.test(name) || /Segelflugzeug/i.test(propulsion)) return { title: 'Segelflugzeug-Prinzip', text: 'Segelflugzeuge nutzen aufsteigende Luft, etwa Thermik oder Hangaufwind, um Höhe zu gewinnen oder zu halten. Die konkrete Ausstattung und Zahl der Sitze ist vom jeweiligen Muster abhängig.', url: '' };
    const isProp = /prop|kolben|piston/i.test(propulsion);
    return isProp
      ? { title: 'Einordnung des Antriebs', text: 'Der Propellerantrieb erzeugt Schub, indem er Luft nach hinten beschleunigt. Zusammen mit Sitzplatzzahl, Reichweite und Abmessungen beschreibt das den vorgesehenen Einsatzbereich dieses Musters.', url: 'https://www.atr-aircraft.com/about-us/turboprop/' }
      : { title: 'Einordnung des Musters', text: 'Die Variante gehört zur angegebenen Flugzeugklasse. Sitzplätze, Reichweite und Maße helfen, ihre Rolle einzuordnen; die tatsächlich erreichbaren Werte hängen von Ausrüstung und Einsatzbedingungen ab.', url: '' };
  }

  function aircraftMissionInsight(category, seats, range) {
    const kind = baseCategory(category).toLowerCase();
    if (/segelflug/.test(kind)) return 'Das Muster ist für den Segelflug ausgelegt. Flugzeit und Strecke hängen stark von Wetter, Aufwind und Beladung ab; eine feste Motorreichweite ist daher kein passender Vergleich.';
    if (/turboprop/.test(kind)) return `Propellerflugzeuge dieser Klasse werden häufig auf regionalen Strecken eingesetzt. Die angegebene Kapazität (${seats}) und Reichweite (${range}) sind Hersteller- beziehungsweise Wiki-Vergleichswerte und ändern sich mit der Konfiguration.`;
    if (/regional/.test(kind)) return `Die Klasse verbindet kleinere und mittlere Märkte mit größeren Flughafendrehkreuzen. Die Sitzplatzspanne (${seats}) und Reichweite (${range}) zeigen die Bandbreite der jeweiligen Variante.`;
    if (/langstrecke|jumbo|superjumbo/.test(kind)) return `Die Klasse ist auf größere Passagiermengen und längere Strecken ausgerichtet. Für dieses Modell nennt der Eintrag ${seats} Sitzplätze und ${range} Reichweite; Airline-Kabinen und Nutzlast verändern die Praxiswerte.`;
    if (/schmalrumpf/.test(kind)) return `Als Schmalrumpfflugzeug nutzt das Muster eine einkanalige Kabine. Das passt zu vielen Kurz- und Mittelstrecken; die konkrete Reichweite (${range}) kann je nach Variante auch längere Routen ermöglichen.`;
    return `Sitzplätze (${seats}), Reichweite (${range}) und Antrieb (${category}) bilden zusammen das Einsatzprofil. Die konkreten Werte hängen von Variante, Ausstattung und Betreiber ab.`;
  }

  function seatEstimate(value) {
    const numbers = (value.match(/\d+/g) || []).map(Number);
    return numbers.length ? numbers.reduce((sum, number) => sum + number, 0) / numbers.length : null;
  }

  function relatedAircraftMarkup(selected) {
    const [name, maker, category, seats] = selected;
    const targetSeats = seatEstimate(seats);
    const candidates = aircraft.map((item, index) => ({ item, index, size: seatEstimate(item[3]) }))
      .filter(({ item, index, size }) => index !== selectedIndex && size !== null && targetSeats !== null && baseCategory(item[2]) === baseCategory(category))
      .sort((a, b) => {
        const makerPriorityA = a.item[1] === maker ? 0 : 1;
        const makerPriorityB = b.item[1] === maker ? 0 : 1;
        return makerPriorityA - makerPriorityB || Math.abs(a.size - targetSeats) - Math.abs(b.size - targetSeats);
      }).slice(0, 3);
    return candidates.length ? `<div class="related-aircraft"><b>Ähnliche Modelle im Wiki</b><div>${candidates.map(({ item, index }) => `<button type="button" data-related-aircraft="${index}">${item[0]} ↗</button>`).join('')}</div></div>` : '';
  }

  function aircraftKnowledgeSection(name, maker, category, seats, range, propulsion, fact) {
    const family = aircraftFamilyKnowledge(name, maker, propulsion);
    const familyLink = family.url ? `<a href="${family.url}" target="_blank" rel="noopener noreferrer">Herstellerquelle öffnen ↗</a>` : '';
    return `<section class="knowledge-section"><div class="section-head"><span class="section-label">FLUGZEUGWISSEN</span><span class="section-caption">HINTERGRUND &amp; EINORDNUNG</span></div><div class="knowledge-grid"><article class="knowledge-card"><span>WISSENSWERT</span><p>${fact}</p></article><article class="knowledge-card"><span>${family.title}</span><p>${family.text}</p>${familyLink}</article><article class="knowledge-card"><span>EINSATZPROFIL · AUS DATEN ABGELEITET</span><p>${aircraftMissionInsight(category, seats, range)}</p></article></div>${relatedAircraftMarkup(aircraft[selectedIndex])}</section>`;
  }

  function filteredAircraft() {
    const q = search.value.trim().toLocaleLowerCase('de');
    const cat = categoryFilter.value;
    const engine = engineFilter.value;
    const country = countryFilter.value;
    const visible = aircraft.map((item,index) => ({item,index})).filter(({item}) => {
      const matchesQuery = !q || item.slice(0,8).join(' ').toLocaleLowerCase('de').includes(q);
      const matchesCategory = cat === 'Alle' || (cat === 'Deutsche Hersteller' ? germanMakers.has(item[1]) : baseCategory(item[2]) === cat);
      return matchesQuery && matchesCategory && (engine === 'Alle' || engineMaker(item[0]) === engine) && (country === 'Alle' || makerCountry(item[1]) === country);
    });
    const direction = sortFilter.value;
    const lengthOf = (name) => parseFloat((dimensions[name]?.[0] || '').replace(',', '.')) || Number.POSITIVE_INFINITY;
    return visible.sort((a,b) => {
      const yearA = firstFlightYear(a.item[0]) ?? Number.POSITIVE_INFINITY;
      const yearB = firstFlightYear(b.item[0]) ?? Number.POSITIVE_INFINITY;
      if (direction === 'oldest') return yearA-yearB || a.item[0].localeCompare(b.item[0],'de');
      if (direction === 'newest') return yearB-yearA || a.item[0].localeCompare(b.item[0],'de');
      if (direction === 'smallest') return lengthOf(a.item[0])-lengthOf(b.item[0]) || a.item[0].localeCompare(b.item[0],'de');
      return lengthOf(b.item[0])-lengthOf(a.item[0]) || a.item[0].localeCompare(b.item[0],'de');
    });
  }
  function renderList() {
    const visible = filteredAircraft();
    document.getElementById('modelCount').textContent = String(aircraft.length);
    document.getElementById('resultCount').textContent = `${visible.length} ${visible.length === 1 ? 'Flugzeug' : 'Flugzeuge'}`;
    list.replaceChildren();
    if (!visible.length) {
      const empty = document.createElement('p'); empty.className = 'no-results'; empty.textContent = 'Keine Modelle gefunden. Suche ändern oder Kategorie zurücksetzen.'; list.append(empty); return;
    }
    if (!visible.some(({index}) => index === selectedIndex)) selectedIndex = visible[0].index;
    for (const {item,index} of visible) {
      const button = document.createElement('button'); button.type = 'button'; button.className = `aircraft-item${index === selectedIndex ? ' active' : ''}`;
      button.setAttribute('aria-current', index === selectedIndex ? 'true' : 'false');
      const number = document.createElement('span'); number.className = 'item-number'; number.textContent = String(index + 1).padStart(2,'0');
      const text = document.createElement('span'); text.className = 'item-title'; text.textContent = item[0];
      const maker = document.createElement('span'); maker.className = 'item-maker'; maker.textContent = `${item[1]} · ${item[2]}`; text.append(maker);
      const arrow = document.createElement('span'); arrow.className = 'item-arrow'; arrow.textContent = '↗';
      button.append(number,text,arrow); button.addEventListener('click', () => { selectedIndex = index; renderList(); renderArticle(); }); list.append(button);
    }
    renderArticle();
  }
  function cockpitSection(name, propulsion) {
    const engineText = engineDetails(name);
    const hasEngine = !/segelflugzeug|ohne motor/i.test(`${propulsion} ${engineText}`);
    const engineCount = Math.min(4, Math.max(1, Number(propulsion.match(/\d+/)?.[0]) || 1));
    const gauges = hasEngine
      ? Array.from({length: engineCount}, (_, i) => `<div class="cockpit-engine-gauge"><span>TRIEBWERK ${i + 1}</span><b data-engine-gauge="${i}">0%</b><i><span data-engine-bar="${i}"></span></i></div>`).join('')
      : '<div class="cockpit-engine-gauge cockpit-no-engine"><span>ANTRIEB</span><b>SEGELFLUG</b><i><span></span></i></div>';
    return `<details class="cockpit-simulation"><summary><span>INTERAKTIVES COCKPIT</span><span class="cockpit-open-hint">Klicken zum Öffnen ↘</span></summary><div class="cockpit-panel" data-has-engine="${hasEngine}" data-engine-count="${engineCount}"><div class="cockpit-topline"><div><span class="cockpit-eyebrow">COCKPIT-SIMULATION</span><b>${name}</b></div><button class="cockpit-reset" type="button" data-cockpit-reset>SIMULATION ZURÜCKSETZEN</button></div><p class="cockpit-disclaimer">Vereinfachte interaktive Simulation, kein Originalcockpit und keine Flugausbildung.</p><div class="cockpit-interior-view" data-cockpit-layout="${engineCount === 1 ? 'light' : 'airliner'}" role="img" aria-label="Innenansicht des simulierten Flugzeugcockpits"><svg viewBox="0 0 960 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="cockpitSky" x2="0" y2="1"><stop stop-color="#173047"/><stop offset="1" stop-color="#88a9b4"/></linearGradient><linearGradient id="cockpitDash" x2="0" y2="1"><stop stop-color="#26332e"/><stop offset="1" stop-color="#0a100e"/></linearGradient><clipPath id="cockpitWindow"><path d="M76 74 Q480 20 884 74 L921 284 Q480 244 39 284Z"/></clipPath><linearGradient id="cockpitScreen"><stop stop-color="#173e42"/><stop offset="1" stop-color="#0c2329"/></linearGradient></defs><g clip-path="url(#cockpitWindow)"><rect width="960" height="310" fill="url(#cockpitSky)"/><path d="M0 234 L130 192 230 220 340 176 450 214 560 168 680 216 798 182 960 220 960 330 0 330Z" fill="#5a726d"/><path d="M0 256 Q300 219 480 244 Q690 269 960 232 L960 330 0 330Z" fill="#555949"/><g class="cockpit-horizon" data-cockpit-horizon><path d="M0 244 Q300 207 480 232 Q690 257 960 220" fill="none" stroke="#eadcae" stroke-width="3"/><path d="M430 235 L480 217 530 235 480 232Z" fill="#f0e7c8"/></g></g><path d="M0 0H960V420H0Z M76 74Q480 20 884 74L921 284Q480 244 39 284Z" fill="#111916" fill-rule="evenodd"/><path d="M76 74Q480 20 884 74L921 284Q480 244 39 284Z" fill="none" stroke="#46544b" stroke-width="13"/><path d="M480 40V258" stroke="#29352f" stroke-width="12"/><path d="M45 0L0 420M915 0L960 420" stroke="#202a25" stroke-width="34"/><path d="M0 274Q230 236 480 255Q730 274 960 238V420H0Z" fill="url(#cockpitDash)" stroke="#3c4941" stroke-width="7"/><g class="cockpit-screen"><rect x="101" y="286" width="165" height="84" rx="7"/><path d="M116 339H250M180 296V359M119 319L148 307 174 329 201 308 247 318" fill="none" stroke="#79c8c1" stroke-width="3"/><circle cx="182" cy="329" r="21" fill="none" stroke="#8ec8bf" stroke-width="2"/></g><g class="cockpit-screen"><rect x="292" y="278" width="170" height="91" rx="7"/><path d="M307 324H448M376 289V358M308 348L338 335 361 345 393 304 415 318 448 298" fill="none" stroke="#c8eb79" stroke-width="3"/><circle cx="376" cy="324" r="24" fill="none" stroke="#c8eb79" stroke-width="2"/></g><g class="cockpit-screen"><rect x="498" y="278" width="170" height="91" rx="7"/><path d="M512 300H650M512 317H650M512 334H650M512 351H650" stroke="#83b8be" stroke-width="3"/><circle cx="637" cy="350" r="8" fill="#c8eb79"/></g><g class="cockpit-screen"><rect x="693" y="286" width="165" height="84" rx="7"/><path d="M708 303H842M708 321H842M708 339H842M708 357H842" stroke="#83b8be" stroke-width="3"/></g><g fill="none" stroke="#839187" stroke-width="10"><path d="M266 357V383M232 377Q266 352 300 377Q266 403 232 377Z"/><path d="M695 357V383M661 377Q695 352 729 377Q695 403 661 377Z"/></g><path d="M0 399Q480 366 960 399" fill="none" stroke="#67746b" stroke-width="5"/><g fill="#c8eb79"><circle cx="75" cy="303" r="4"/><circle cx="885" cy="303" r="4"/></g></svg></div><p class="cockpit-status" data-cockpit-status role="status" aria-live="polite">Systeme bereit. Bedienung im Cockpit-Bedienfeld.</p><div class="cockpit-readouts"><div><span>GESCHWINDIGKEIT</span><b><strong data-cockpit-speed>0</strong> <small>kt</small></b></div><div><span>HÖHE</span><b><strong data-cockpit-altitude>0</strong> <small>ft</small></b></div><div><span>KURS</span><b data-cockpit-heading>000°</b></div><div><span>KLAPPEN</span><b data-cockpit-flap-readout>0°</b></div><div><span>FUNK</span><b data-cockpit-frequency>118.00</b></div></div><div class="cockpit-gauges">${gauges}</div><div class="cockpit-controls"><section><h4>FLUGZEUGSYSTEME</h4><div class="cockpit-switches"><button type="button" data-cockpit-toggle="battery" aria-checked="true">BATTERIE · EIN</button>${hasEngine ? '<button type="button" data-cockpit-toggle="engine" aria-checked="false">TRIEBWERKE · AUS</button>' : '<span class="cockpit-disabled-note">Kein Triebwerk bei diesem Segelflugzeug.</span>'}<button type="button" data-cockpit-toggle="brake" aria-checked="true">PARKBREMSE · EIN</button><button type="button" data-cockpit-toggle="gear" aria-checked="true">FAHRWERK · AUSGEFAHREN</button><button type="button" data-cockpit-toggle="lights" aria-checked="false">LANDESCHEINWERFER · AUS</button><button type="button" data-cockpit-toggle="autopilot" aria-checked="false" ${hasEngine ? 'disabled' : ''}>AUTOPILOT · AUS</button><button type="button" data-cockpit-control="flaps">KLAPPEN · STUFE 0</button><button type="button" data-cockpit-control="radio">FUNKFREQUENZ WECHSELN</button><button type="button" data-cockpit-control="heading">KURS +10°</button><button type="button" data-cockpit-toggle="flight">SIMULATION · AM BODEN</button></div></section><section><h4>STEUERUNG & LEISTUNG</h4><label class="cockpit-range">SCHUB <span data-cockpit-throttle-readout>0%</span><input type="range" min="0" max="100" value="0" data-cockpit-input="throttle" aria-label="Schub"></label><label class="cockpit-range">NICKEN <span data-cockpit-pitch-readout>0°</span><input type="range" min="-10" max="10" value="0" data-cockpit-input="pitch" aria-label="Nicksteuerung"></label><label class="cockpit-range">ROLLEN <span data-cockpit-roll-readout>0°</span><input type="range" min="-30" max="30" value="0" data-cockpit-input="roll" aria-label="Rollsteuerung"></label></section></div></div></details>`;
  }

  function activateCockpit() {
    const panel = document.querySelector('.cockpit-panel');
    if (!panel) return;
    const hasEngine = panel.dataset.hasEngine === 'true';
    const engineCount = Number(panel.dataset.engineCount) || 1;
    const state = { battery: true, engine: false, brake: true, gear: true, lights: false, autopilot: false, flight: false, flaps: 0, throttle: 0, pitch: 0, roll: 0, heading: 0, frequencyIndex: 0 };
    const status = panel.querySelector('[data-cockpit-status]');
    const labels = { battery: ['BATTERIE', 'EIN', 'AUS'], engine: ['TRIEBWERK', 'LAUFEN', 'AUS'], brake: ['BREMSE', 'EIN', 'AUS'], gear: ['FAHRWERK', 'RAUS', 'REIN'], lights: ['LANDLICHT', 'EIN', 'AUS'], autopilot: ['AUTOPILOT', 'EIN', 'AUS'], flight: ['FLUG', 'IM FLUG', 'BODEN'] };
    const setStatus = (text) => { status.textContent = text; };
    const update = () => {
      panel.classList.toggle('systems-off', !state.battery);
      panel.classList.toggle('engines-on', state.engine);
      for (const [key, [label, onText, offText]] of Object.entries(labels)) {
        panel.querySelectorAll(`[data-cockpit-toggle="${key}"]`).forEach((button) => {
          button.setAttribute('aria-checked', String(state[key]));
          button.textContent = `${label} · ${state[key] ? onText : offText}`;
          button.classList.toggle('is-on', state[key]);
        });
      }
      panel.querySelectorAll('[data-cockpit-control="flaps"]').forEach((button) => { button.textContent = `KLAPPEN · STUFE ${state.flaps}`; });
      panel.querySelectorAll('[data-cockpit-control="radio"]').forEach((button) => { button.textContent = `FUNK · ${['118.00', '121.50', '124.85', '127.00'][state.frequencyIndex]}`; });
      panel.querySelectorAll('[data-cockpit-control="throttle"]').forEach((button) => { button.textContent = `SCHUB · ${state.throttle}%`; });
      panel.querySelectorAll('[data-cockpit-control="pitch"]').forEach((button) => { button.textContent = `NICK · ${state.pitch}°`; });
      panel.querySelectorAll('[data-cockpit-control="roll"]').forEach((button) => { button.textContent = `ROLL · ${state.roll}°`; });
      panel.querySelector('[data-cockpit-flap-readout]').textContent = `${[0, 10, 20, 30][state.flaps]}°`;
      panel.querySelector('[data-cockpit-heading]').textContent = `${String(state.heading).padStart(3, '0')}°`;
      panel.querySelector('[data-cockpit-frequency]').textContent = ['118.00', '121.50', '124.85', '127.00'][state.frequencyIndex];
      panel.querySelector('[data-cockpit-throttle-readout]').textContent = `${state.throttle}%`;
      panel.querySelector('[data-cockpit-pitch-readout]').textContent = `${state.pitch}°`;
      panel.querySelector('[data-cockpit-roll-readout]').textContent = `${state.roll}°`;
      panel.querySelector('[data-cockpit-horizon]').style.transform = `translateY(${state.pitch * 2}px) rotate(${state.roll}deg)`;
      const speed = state.flight ? Math.round((hasEngine ? 70 + (state.engine ? state.throttle * 1.5 : 0) : 60) - state.pitch * 2 - state.flaps * 3) : 0;
      const altitude = state.flight ? Math.max(0, 1200 + state.pitch * 180) : 0;
      panel.querySelector('[data-cockpit-speed]').textContent = String(Math.max(0, speed));
      panel.querySelector('[data-cockpit-altitude]').textContent = String(altitude.toLocaleString('de-DE'));
      panel.querySelectorAll('[data-engine-gauge]').forEach((gauge, index) => {
        const power = state.engine && state.battery ? state.throttle : 0;
        gauge.textContent = `${power}%`;
        panel.querySelector(`[data-engine-bar="${index}"]`).style.width = `${power}%`;
      });
      const throttle = panel.querySelector('[data-cockpit-input="throttle"]');
      throttle.disabled = hasEngine && !state.engine;
      panel.querySelectorAll('[data-cockpit-toggle="autopilot"]').forEach((button) => { button.disabled = !hasEngine || !state.engine || !state.flight; });
    };
    panel.addEventListener('click', (event) => {
      const reset = event.target.closest('[data-cockpit-reset]');
      if (reset) {
        Object.assign(state, { battery: true, engine: false, brake: true, gear: true, lights: false, autopilot: false, flight: false, flaps: 0, throttle: 0, pitch: 0, roll: 0, heading: 0, frequencyIndex: 0 });
        panel.querySelectorAll('[data-cockpit-input]').forEach((input) => { input.value = '0'; });
        update(); setStatus('Simulation zurückgesetzt. Systeme bereit.'); return;
      }
      const toggle = event.target.closest('[data-cockpit-toggle]');
      if (toggle) {
        const key = toggle.dataset.cockpitToggle;
        if (key === 'engine' && !state.engine && !state.battery) { setStatus('Die Triebwerke benötigen zuerst die Batterie.'); return; }
        if (key === 'autopilot' && (!state.engine || !state.flight)) { setStatus('Der Autopilot kann in dieser Simulation nur mit laufendem Triebwerk im Flug eingeschaltet werden.'); return; }
        if (key === 'flight' && !state.flight && hasEngine && !state.engine) { setStatus('Starte zuerst die Triebwerke, bevor du in den simulierten Flug wechselst.'); return; }
        state[key] = !state[key];
        if (key === 'battery' && !state.battery) { state.engine = false; state.autopilot = false; state.throttle = 0; panel.querySelector('[data-cockpit-input="throttle"]').value = '0'; }
        if (key === 'flight' && !state.flight) { state.gear = true; state.autopilot = false; }
        if (key === 'flight' && state.flight) state.brake = false;
        if (key === 'engine' && state.engine) state.brake = true;
        update(); setStatus(`${labels[key][0]}: ${state[key] ? labels[key][1] : labels[key][2]}.`); return;
      }
      const control = event.target.closest('[data-cockpit-control]');
      if (!control) return;
      if (control.dataset.cockpitControl === 'flaps') state.flaps = (state.flaps + 1) % 4;
      if (control.dataset.cockpitControl === 'radio') state.frequencyIndex = (state.frequencyIndex + 1) % 4;
      if (control.dataset.cockpitControl === 'heading') state.heading = (state.heading + 10) % 360;
      if (control.dataset.cockpitControl === 'throttle') {
        if (hasEngine && !state.engine) { setStatus('Für Schub müssen zuerst die Triebwerke laufen.'); return; }
        state.throttle = state.throttle >= 100 ? 0 : state.throttle + 25;
        panel.querySelectorAll('[data-cockpit-input="throttle"]').forEach((input) => { input.value = String(state.throttle); });
      }
      if (control.dataset.cockpitControl === 'pitch') state.pitch = state.pitch >= 10 ? -10 : state.pitch + 5;
      if (control.dataset.cockpitControl === 'roll') state.roll = state.roll >= 30 ? -30 : state.roll + 15;
      update();
      const action = control.dataset.cockpitControl;
      setStatus(action === 'flaps' ? `Landeklappen auf Stufe ${state.flaps} gestellt.` : action === 'radio' ? `Funkfrequenz auf ${['118.00', '121.50', '124.85', '127.00'][state.frequencyIndex]} gestellt.` : action === 'heading' ? `Simulierter Kurs: ${String(state.heading).padStart(3, '0')} Grad.` : action === 'throttle' ? `Schub auf ${state.throttle} Prozent gestellt.` : action === 'pitch' ? `Nicksteuerung auf ${state.pitch} Grad.` : `Rollsteuerung auf ${state.roll} Grad.`);
    });
    panel.addEventListener('input', (event) => {
      const input = event.target.closest('[data-cockpit-input]');
      if (!input) return;
      state[input.dataset.cockpitInput] = Number(input.value);
      update();
      setStatus(input.dataset.cockpitInput === 'throttle' ? `Schub auf ${state.throttle} Prozent gestellt.` : input.dataset.cockpitInput === 'pitch' ? `Nicksteuerung auf ${state.pitch} Grad.` : `Rollsteuerung auf ${state.roll} Grad.`);
    });
    update();
  }

  function renderArticle() {
    const [name,maker,category,seats,range,propulsion,description,fact,sourceKey] = aircraft[selectedIndex];
    const [sourceName,sourceUrl] = source[sourceKey];
    const [length,span,mtow] = dimensions[name] || ['—','—','—'];
    const speed = cruise(name); const engine = engineDetails(name); const cabinType = cabin(name); const firstFlight = firstFlightYear(name); const firstFlightLabel = firstFlight ?? (category.includes('Entwicklung') ? 'noch nicht erfolgt' : 'nicht erfasst');
    const spec = (label,value,sub='') => `<div class="spec-card"><span class="spec-label">${label}</span><div class="spec-value">${value}${sub ? `<span class="spec-sub">${sub}</span>` : ''}</div></div>`;
    const foldingWingNote = name.startsWith('Boeing 777-8') || name.startsWith('Boeing 777-9') ? '* 71,8 m ausgeklappt · 64,8 m gefaltet' : '';
    const company = companyDirectory.find(([companyName]) => companyName === maker || maker.startsWith(companyName.split(' / ')[0]) || companyName.startsWith(maker));
    const companyCard = germanMakers.has(maker) && company ? `<section class="company-card"><div class="section-head"><span class="section-label">DEUTSCHER HERSTELLER</span><span class="section-caption">UNTERNEHMENSPROFIL</span></div><div class="company-facts"><div><span>SITZ</span><b>${company[2]}</b></div><div><span>SPEZIALGEBIET</span><b>${company[1]}</b></div></div></section>` : '';
    const companyRegister = `<details class="company-register"><summary>HERSTELLERVERZEICHNIS · ${companyDirectory.length} UNTERNEHMEN</summary><div class="company-register-grid">${companyDirectory.map(([companyName,specialty,location,key]) => `<a href="${source[key][1]}" target="_blank" rel="noopener noreferrer"><b>${companyName}</b><span>${specialty}</span><small>${location} ↗</small></a>`).join('')}</div><p class="register-note">Auswahl deutscher Hersteller aus ziviler Flugzeug- und Segelflugzeugfertigung sowie Hersteller-/Zulassungsverzeichnissen. Der Schwerpunkt liegt auf Unternehmen mit auffindbaren Flugzeugmustern oder Flugzeugbau-Aktivität.</p></details>`;
    const rangeNote = category.includes('Entwicklung') ? 'Vorläufige Hersteller-Programmangabe' : /nicht veröffentlicht|Thermikabhängig/i.test(range) ? 'Keine feste Vergleichsreichweite' : 'Herstellerangabe · variantenabhängig';
    const html = `<div class="article-inner"><div class="article-topline"><span class="aircraft-code">${maker.toUpperCase()} &nbsp;·&nbsp; ${baseCategory(category).toUpperCase()}</span><span class="article-counter"><b>${String(selectedIndex+1).padStart(2,'0')}</b> / ${aircraft.length}</span></div><header class="article-heading"><div><div class="article-manufacturer">${maker} / ${category}</div><h2 class="${name.length > 19 ? 'long' : ''}">${name}</h2></div><div class="article-index">${String(selectedIndex+1).padStart(2,'0')}<small>MODEL</small></div></header><div class="tag-row"><span class="tag emphasis">${baseCategory(category)}</span><span class="tag">${propulsion}</span><span class="tag">${maker}</span>${category.includes('Entwicklung') ? '<span class="tag">Noch in Entwicklung</span>' : ''}</div><p class="lead">${description}</p><div class="section-head"><span class="section-label">TECHNISCHE DATEN</span><span class="section-caption">HERSTELLERANGABEN · TYPISCHE WERTE</span></div><div class="spec-grid">${spec('Sitzplätze',seats,'Kabinenlayout-abhängig')}${spec('Reichweite',range,rangeNote)}${spec('Rumpflänge',length)}${spec('Spannweite',span,foldingWingNote)}${spec('MTOW',mtow,'maximales Startgewicht')}${spec('Reisegeschwindigkeit',speed)}${spec('Triebwerke',engine)}${spec('Kabinenkonzept',cabinType)}</div>${aircraftKnowledgeSection(name, maker, category, seats, range, propulsion, fact)}${cockpitSection(name, propulsion)}<div class="lower-grid"><section class="info-block"><h3>Profil & Einsatz</h3><p>${description}</p></section><section class="info-block"><h3>Einordnung</h3><div class="quick-facts"><div class="quick-fact"><span class="fact-label">HERSTELLER</span><span class="fact-value">${maker}</span></div><div class="quick-fact"><span class="fact-label">HERSTELLUNGSLAND</span><span class="fact-value">${makerCountry(maker)}</span></div><div class="quick-fact"><span class="fact-label">ERSTFLUG</span><span class="fact-value">${firstFlightLabel}</span></div><div class="quick-fact"><span class="fact-label">FLUGZEUGKLASSE</span><span class="fact-value">${category}</span></div><div class="quick-fact"><span class="fact-label">ANTRIEB</span><span class="fact-value">${propulsion}</span></div><div class="quick-fact"><span class="fact-label">MOTORISIERT MIT</span><span class="fact-value">${engine}</span></div></div></section></div>${companyCard}<section class="source-box"><div><div class="source-title">${sourceName}</div><div class="source-meta">WEITERFÜHRENDE TECHNISCHE ANGABEN</div></div><a class="source-link" href="${sourceUrl}" target="_blank" rel="noopener noreferrer">QUELLE ÖFFNEN ↗</a></section>${companyRegister}</div>`;
    document.getElementById('articleContent').innerHTML = html;
    document.querySelectorAll('#articleContent [data-related-aircraft]').forEach((button) => {
      button.addEventListener('click', () => {
        search.value = '';
        categoryFilter.value = 'Alle'; engineFilter.value = 'Alle'; countryFilter.value = 'Alle';
        selectedIndex = Number(button.dataset.relatedAircraft);
        renderList();
        document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
      });
    });
    activateCockpit();
    document.title = `${name} — Flugzeug-Wiki`;
  }
  search.addEventListener('input', renderList);
  categoryFilter.addEventListener('change', renderList);
  engineFilter.addEventListener('change', renderList);
  countryFilter.addEventListener('change', renderList);
  sortFilter.addEventListener('change', renderList);
  renderList();
  const softBanScreen = document.getElementById('softBanScreen');
  const softBanTitle = document.getElementById('softBanTitle');
  const softBanMessage = document.getElementById('softBanMessage');
  const softBanNote = document.getElementById('softBanNote');
  const showSoftBan = (count) => {
    try { sessionStorage.setItem('aircraftWikiSoftBan', '1'); } catch (_) {}
    if (count >= 2) {
      softBanTitle.textContent = 'Jetzt bist du gesperrt';
      softBanMessage.textContent = 'Komm auf den Discord, wenn du Unterstützung brauchst.';
      softBanNote.textContent = 'Bitte kontaktiere das Team über Discord.';
    }
    softBanScreen.hidden = false;
  };
  let f12Presses = 0;
  try {
    f12Presses = Number(sessionStorage.getItem('aircraftWikiF12Presses')) || (sessionStorage.getItem('aircraftWikiSoftBan') === '1' ? 1 : 0);
    if (f12Presses > 0) showSoftBan(f12Presses);
  } catch (_) {}
  window.addEventListener('keydown', (event) => {
    if (event.key !== 'F12') return;
    event.preventDefault();
    f12Presses += 1;
    try { sessionStorage.setItem('aircraftWikiF12Presses', String(f12Presses)); } catch (_) {}
    showSoftBan(f12Presses);
    if (f12Presses === 1) window.dispatchEvent(new CustomEvent('aircraft-wiki:first-f12'));
    if (f12Presses >= 2) window.dispatchEvent(new CustomEvent('aircraft-wiki:second-f12'));
  });
  window.addEventListener('aircraft-wiki:server-soft-ban-active', () => {
    f12Presses = Math.max(1, f12Presses);
    try { sessionStorage.setItem('aircraftWikiSoftBan', '1'); sessionStorage.setItem('aircraftWikiF12Presses', String(f12Presses)); } catch (_) {}
    softBanNote.textContent = 'Der F12-Soft-Ban ist für dein Konto gespeichert. Das Website-Team kann ihn aufheben.';
    showSoftBan(f12Presses);
  });
  window.addEventListener('aircraft-wiki:clear-f12-soft-ban', () => {
    f12Presses = 0;
    try { sessionStorage.removeItem('aircraftWikiSoftBan'); sessionStorage.removeItem('aircraftWikiF12Presses'); } catch (_) {}
    softBanScreen.hidden = true;
  });
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingPercent = document.getElementById('loadingPercent');
  const startedAt = performance.now();
  const loadingTicker = window.setInterval(() => {
    const progress = Math.min(100, Math.round((performance.now() - startedAt) / 30));
    loadingPercent.textContent = `${progress}%`;
  }, 30);
  window.setTimeout(() => {
    window.clearInterval(loadingTicker);
    loadingPercent.textContent = '100%';
    loadingScreen.classList.add('is-done');
    window.setTimeout(() => loadingScreen.remove(), 400);
  }, 3000);
})();


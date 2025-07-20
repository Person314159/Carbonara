import { NetworkData } from "@/app/lib/interfaces";

const networkData = {
    lines: [
        {
            id: "A01",
            name: "Big Bridge Georgian Branch",
            colour: "#b80b4b",
            type: "LSR"
        },
        {
            id: "A02",
            name: "Cypriot Line",
            colour: "#cec92a",
            type: "LSR"
        },
        {
            id: "A03",
            name: "Warzone Express",
            colour: "#662c91",
            type: "LSR"
        },
        {
            id: "A05",
            name: "Ararat Line",
            colour: "#ff9e1b",
            type: "LSR"
        },
        {
            id: "A06",
            name: "Badly Built Line",
            colour: "#000000",
            type: "LSR"
        },
        {
            id: "A07",
            name: "Iran Line",
            colour: "#ffd966",
            type: "LSR"
        },
        {
            id: "A08",
            name: "East Asia Main Line",
            colour: "#f78f4b",
            type: "LSR"
        },
        {
            id: "A09",
            name: "Korea Link",
            colour: "#b80b4b",
            type: "LSR"
        },
        {
            id: "E01",
            name: "Brighton Red Line",
            colour: "#ed1c2a",
            type: "LSR"
        },
        {
            id: "E02",
            name: "Birmingham Yellow Line",
            colour: "#ffcd02",
            type: "LSR"
        },
        {
            id: "E03",
            name: "Newcastle Green Line",
            colour: "#77c696",
            type: "LSR"
        },
        {
            id: "E04",
            name: "Vistula Express",
            colour: "#080e5c",
            type: "LSR"
        },
        {
            id: "E05",
            name: "Tatra Line",
            colour: "#f78f4b",
            type: "LSR"
        },
        {
            id: "E06",
            name: "Baltic Line",
            colour: "#ed1c2a",
            type: "LSR"
        },
        {
            id: "E07",
            name: "Dźwina Line",
            colour: "#4c90cd",
            type: "LSR"
        },
        {
            id: "E08",
            name: "Vistula Regional Line",
            colour: "#008c5a",
            type: "LSR"
        },
        {
            id: "E09",
            name: "Carpathia Line",
            colour: "#e0b03b",
            type: "LSR"
        },
        {
            id: "E10",
            name: "Dnieper Line",
            colour: "#ffcd02",
            type: "LSR"
        },
        {
            id: "E11",
            name: "E11",
            colour: "#ed1c2a",
            type: "LSR"
        },
        {
            id: "E12",
            name: "E12",
            colour: "#080e5c",
            type: "LSR"
        },
        {
            id: "E13",
            name: "Transylvania Line",
            colour: "#662c91",
            type: "LSR"
        },
        {
            id: "E14",
            name: "Zakynthos Line",
            colour: "#cccccc",
            type: "LSR"
        },
        {
            id: "E15",
            name: "Prespa Line",
            colour: "#b80b4b",
            type: "LSR"
        },
        {
            id: "E16",
            name: "Transadriatic Line",
            colour: "#c5a3cd",
            type: "LSR"
        },
        {
            id: "E17",
            name: "Finnish Regional Line",
            colour: "#006db8",
            type: "LSR"
        },
        {
            id: "E19",
            name: "Danish Line",
            colour: "#00b397",
            type: "LSR"
        },
        {
            id: "E20",
            name: "Balearic Line",
            colour: "#f9ebc8",
            type: "LSR"
        },
        {
            id: "E21",
            name: "E21",
            colour: "#cccccc",
            type: "LSR"
        },
        {
            id: "E22",
            name: "Silesia Line",
            colour: "#00665c",
            type: "LSR"
        },
        {
            id: "E23",
            name: "Moravia Line",
            colour: "#77c696",
            type: "LSR"
        },
        {
            id: "E27",
            name: "Rhine Line",
            colour: "#800000",
            type: "LSR"
        },
        {
            id: "E28",
            name: "Roman Line",
            colour: "#8d6539",
            type: "LSR"
        },
        {
            id: "E29",
            name: "Gotthard Line",
            colour: "#cccccc",
            type: "LSR"
        },
        {
            id: "E30",
            name: "Big Bridge Thessaloniki Branch",
            colour: "#bb4a9b",
            type: "LSR"
        },
        {
            id: "E31",
            name: "Big Bridge Mequinenza Branch",
            colour: "#b80b4b",
            type: "LSR"
        },
        {
            id: "E32",
            name: "E32",
            colour: "#006db8",
            type: "LSR"
        },
        {
            id: "E33",
            name: "Fjord Connection",
            colour: "#b9e8ea",
            type: "LSR"
        },
        {
            id: "E35",
            name: "Thrace Line",
            colour: "#521bfd",
            type: "LSR"
        },
        {
            id: "E37",
            name: "E37",
            colour: "#073941",
            type: "LSR"
        },
        {
            id: "E38",
            name: "Corsica Line",
            colour: "#a1dbe6",
            type: "LSR"
        },
        {
            id: "E39",
            name: "Latvian Regional Loop",
            colour: "#9d2235",
            type: "LSR"
        },
        {
            id: "E40",
            name: "Anabenraa Line",
            colour: "#e233ff",
            type: "LSR"
        },
        {
            id: "F01",
            name: "Lampedusa Line",
            colour: "#ffcd02",
            type: "LSR"
        },
        {
            id: "F02",
            name: "North Africa Line",
            colour: "#f78f4b",
            type: "LSR"
        },
        {
            id: "F03",
            name: "Sahara Line",
            colour: "#a8842d",
            type: "LSR"
        },
        {
            id: "HBL",
            name: "Blue HSR",
            colour: "#4c90cd",
            type: "HSR"
        },
        {
            id: "HCY",
            name: "Cyan HSR",
            colour: "#157788",
            type: "HSR"
        },
        {
            id: "HGR",
            name: "Green HSR",
            colour: "#30a442",
            type: "HSR"
        },
        {
            id: "HPU",
            name: "Purple HSR",
            colour: "#662c91",
            type: "HSR"
        },
        {
            id: "N01",
            name: "N01",
            colour: "#00b397",
            type: "LSR"
        },
        {
            id: "N02",
            name: "N02",
            colour: "#cec92a",
            type: "LSR"
        },
        {
            id: "N03",
            name: "N03",
            colour: "#662c91",
            type: "LSR"
        },
        {
            id: "N04",
            name: "N04",
            colour: "#ffcd02",
            type: "LSR"
        },
        {
            id: "N10",
            name: "Horizon Line",
            colour: "#8d6539",
            type: "LSR"
        },
        {
            id: "N11",
            name: "The Canadian",
            colour: "#f59fb3",
            type: "LSR"
        },
        {
            id: "N12",
            name: "Saint-Laurent Monorail",
            colour: "#45818e",
            type: "LSR"
        },
        {
            id: "N13",
            name: "Nova Scotia Express",
            colour: "#cccccc",
            type: "LSR"
        },
        {
            id: "N14",
            name: "Northeast Star Line",
            colour: "#ed1c2a",
            type: "LSR"
        },
        {
            id: "N15",
            name: "Coastliner",
            colour: "#006db8",
            type: "LSR"
        },
        {
            id: "N16",
            name: "Maple Liberty Line",
            colour: "#008c5a",
            type: "LSR"
        },
        {
            id: "N17",
            name: "Trans-Appalachian Line",
            colour: "#273c7b",
            type: "LSR"
        },
        {
            id: "N19",
            name: "Manicouagan Line",
            colour: "#522921",
            type: "LSR"
        },
        {
            id: "N21",
            name: "Adirondack Line",
            colour: "#3c6fb3",
            type: "LSR"
        },
        {
            id: "N22",
            name: "Cathedral Line",
            colour: "#666666",
            type: "LSR"
        },
        {
            id: "N23",
            name: "Koash Line",
            colour: "#71368a",
            type: "LSR"
        },
        {
            id: "N24",
            name: "End Portal Express",
            colour: "#38664b",
            type: "LSR"
        },
        {
            id: "O02",
            name: "Victorian Line",
            colour: "#b80b4b",
            type: "LSR"
        },
        {
            id: "O03",
            name: "Okaihau Express",
            colour: "#cd4600",
            type: "LSR"
        },
        {
            id: "O04",
            name: "Southerner",
            colour: "#1925ff",
            type: "LSR"
        },
        {
            id: "O05",
            name: "Transalpine",
            colour: "#a1d2cf",
            type: "LSR"
        },
        {
            id: "O06",
            name: "Coastal Pacific",
            colour: "#01a3b7",
            type: "LSR"
        },
        {
            id: "O07",
            name: "Northern Explorer",
            colour: "#40a85f",
            type: "LSR"
        },
        {
            id: "O08",
            name: "Queensland Line",
            colour: "#ffcd02",
            type: "LSR"
        },
        {
            id: "O09",
            name: "Adelaide Line",
            colour: "#87d3df",
            type: "LSR"
        },
        {
            id: "O10",
            name: "Nullarbor Line",
            colour: "#008c5a",
            type: "LSR"
        },
        {
            id: "S01",
            name: "Apple Line",
            colour: "#ff0802",
            type: "LSR"
        },
        {
            id: "S02",
            name: "World Cup Line",
            colour: "#68ab33",
            type: "LSR"
        },
        {
            id: "T01",
            name: "Big Bridge",
            colour: "#f59fb3",
            type: "LSR"
        },
        {
            id: "T02",
            name: "Big Bridge Istanbul Branch",
            colour: "#c5a3cd",
            type: "LSR"
        },
        {
            id: "T03",
            name: "Atlantic Line",
            colour: "#87d3df",
            type: "LSR"
        },
        {
            id: "T04",
            name: "Big Bridge 2",
            colour: "#77c696",
            type: "LSR"
        },
        {
            id: "T05",
            name: "Big Bridge 3",
            colour: "#ca84ff",
            type: "LSR"
        },
        {
            id: "T07",
            name: "Ross Line",
            colour: "#cccccc",
            type: "LSR"
        }
    ],
    stations: [
        {
            name: "Aabenraa"
        },
        {
            name: "Aarhus"
        },
        {
            name: "Accra"
        },
        {
            name: "Adelaide"
        },
        {
            name: "Aizkraukle"
        },
        {
            name: "Albany"
        },
        {
            name: "Alexandria"
        },
        {
            name: "Algiers"
        },
        {
            name: "Alūksne"
        },
        {
            name: "Amol"
        },
        {
            name: "Amsterdam Central"
        },
        {
            name: "Anshan"
        },
        {
            name: "Antalya"
        },
        {
            name: "Aomori"
        },
        {
            name: "Apennines"
        },
        {
            name: "Arthur's Pass"
        },
        {
            name: "Asunción"
        },
        {
            name: "Atlanta"
        },
        {
            name: "Atyrau"
        },
        {
            name: "Auckland"
        },
        {
            name: "Auckland Island"
        },
        {
            name: "Baikonur"
        },
        {
            name: "Bari"
        },
        {
            name: "Basra"
        },
        {
            name: "Belgrade"
        },
        {
            name: "Benghazi"
        },
        {
            name: "Bergen"
        },
        {
            name: "Birmingham"
        },
        {
            name: "Bloomington"
        },
        {
            name: "Bornholm"
        },
        {
            name: "Boston"
        },
        {
            name: "Brest (BY)"
        },
        {
            name: "Brest (FR)"
        },
        {
            name: "Brighton"
        },
        {
            name: "Brisbane"
        },
        {
            name: "Brno"
        },
        {
            name: "Buenos Aires"
        },
        {
            name: "Burlington"
        },
        {
            name: "Busan"
        },
        {
            name: "Bydgoszcz"
        },
        {
            name: "Calgary"
        },
        {
            name: "Carpathia"
        },
        {
            name: "Casablanca"
        },
        {
            name: "Catania"
        },
        {
            name: "Central Mediterranean"
        },
        {
            name: "Charleville-Mézières"
        },
        {
            name: "Chicago"
        },
        {
            name: "Cholsan"
        },
        {
            name: "Christchurch"
        },
        {
            name: "Copenhagen"
        },
        {
            name: "Çorlu"
        },
        {
            name: "Corsica"
        },
        {
            name: "Daegu"
        },
        {
            name: "Daugavpils"
        },
        {
            name: "Delhi"
        },
        {
            name: "Del Norte"
        },
        {
            name: "Den Oever"
        },
        {
            name: "Doctor Cecilio Báez"
        },
        {
            name: "Doctor Juan León Mallorquín"
        },
        {
            name: "Doctor Juan Manuel Frutos"
        },
        {
            name: "Dunedin"
        },
        {
            name: "Frankfurt"
        },
        {
            name: "Fuji"
        },
        {
            name: "Fukuoka"
        },
        {
            name: "Gay"
        },
        {
            name: "Gdańsk"
        },
        {
            name: "Gesalibar"
        },
        {
            name: "Graz"
        },
        {
            name: "Greymouth"
        },
        {
            name: "Hakodate"
        },
        {
            name: "Halifax"
        },
        {
            name: "Hamilton"
        },
        {
            name: "Helsinki"
        },
        {
            name: "Hiroshima"
        },
        {
            name: "Jane Peak"
        },
        {
            name: "Iksan"
        },
        {
            name: "Iqaluit"
        },
        {
            name: "Isle of Man"
        },
        {
            name: "Istanbul"
        },
        {
            name: "Ittoqoorttomit"
        },
        {
            name: "Jacksonville"
        },
        {
            name: "Kaikōura"
        },
        {
            name: "Kaliningrad"
        },
        {
            name: "Katowice"
        },
        {
            name: "Kawartha Lakes"
        },
        {
            name: "Kiel"
        },
        {
            name: "Kolkasrags"
        },
        {
            name: "Kotka"
        },
        {
            name: "Košice"
        },
        {
            name: "Kuressaare"
        },
        {
            name: "Kyiv"
        },
        {
            name: "Lampedusa"
        },
        {
            name: "Lappeenranta"
        },
        {
            name: "Larissa"
        },
        {
            name: "Liepāja"
        },
        {
            name: "Ljubljana"
        },
        {
            name: "Lublin"
        },
        {
            name: "Mallorca"
        },
        {
            name: "Manicouagan"
        },
        {
            name: "Marrakesh"
        },
        {
            name: "Marseille"
        },
        {
            name: "McMurdo Station"
        },
        {
            name: "Melbourne"
        },
        {
            name: "Mequinenza"
        },
        {
            name: "Merlischachen"
        },
        {
            name: "Miami"
        },
        {
            name: "Milan"
        },
        {
            name: "Montevideo"
        },
        {
            name: "Montréal"
        },
        {
            name: "Mt. Damavand"
        },
        {
            name: "National Park"
        },
        {
            name: "Newcastle"
        },
        {
            name: "New York Central"
        },
        {
            name: "Nicosia"
        },
        {
            name: "North Mediterranean"
        },
        {
            name: "Nuuk"
        },
        {
            name: "Oates Land"
        },
        {
            name: "Odda"
        },
        {
            name: "Odessa"
        },
        {
            name: "Ogre"
        },
        {
            name: "Ōkaihau"
        },
        {
            name: "Old Perlican"
        },
        {
            name: "Oran"
        },
        {
            name: "Orenburg"
        },
        {
            name: "Ōsaka"
        },
        {
            name: "Oslo"
        },
        {
            name: "Otiria"
        },
        {
            name: "Ottawa"
        },
        {
            name: "Pardubice"
        },
        {
            name: "Paris"
        },
        {
            name: "Paderborn"
        },
        {
            name: "Perth"
        },
        {
            name: "Philadelphia"
        },
        {
            name: "Phuket"
        },
        {
            name: "Plymouth"
        },
        {
            name: "Podgorica"
        },
        {
            name: "Poronaysk"
        },
        {
            name: "Porto"
        },
        {
            name: "Porvoo"
        },
        {
            name: "Prague"
        },
        {
            name: "Pristina"
        },
        {
            name: "Pyongyang"
        },
        {
            name: "Pyrenees"
        },
        {
            name: "Płock"
        },
        {
            name: "Québec"
        },
        {
            name: "Queen's Cross"
        },
        {
            name: "Rasht"
        },
        {
            name: "Regina"
        },
        {
            name: "Rennes"
        },
        {
            name: "Reykjavík"
        },
        {
            name: "Rēzekne"
        },
        {
            name: "Riga"
        },
        {
            name: "Rimouski"
        },
        {
            name: "Romanian Slime Farm"
        },
        {
            name: "Ruhnu Island"
        },
        {
            name: "Sandefjord"
        },
        {
            name: "San Diego"
        },
        {
            name: "San Francisco"
        },
        {
            name: "San Jose"
        },
        {
            name: "Sapporo"
        },
        {
            name: "Sarajevo"
        },
        {
            name: "Sardinia"
        },
        {
            name: "Sault Ste. Marie"
        },
        {
            name: "Savannah"
        },
        {
            name: "Scranton"
        },
        {
            name: "Sendai"
        },
        {
            name: "Seoul-Incheon"
        },
        {
            name: "Sfax"
        },
        {
            name: "Singapore"
        },
        {
            name: "Skrunda"
        },
        {
            name: "Southampton"
        },
        {
            name: "Sparta"
        },
        {
            name: "Starodubskoe"
        },
        {
            name: "Stewart Island"
        },
        {
            name: "Stockholm"
        },
        {
            name: "Sudbury"
        },
        {
            name: "Sydney"
        },
        {
            name: "Syracuse"
        },
        {
            name: "Szczecin"
        },
        {
            name: "Tallinn"
        },
        {
            name: "Tamanrasset"
        },
        {
            name: "Tasiujaq"
        },
        {
            name: "Tehran"
        },
        {
            name: "Tel Aviv"
        },
        {
            name: "Thessaloniki"
        },
        {
            name: "Thun"
        },
        {
            name: "Timaru"
        },
        {
            name: "Timbuktu"
        },
        {
            name: "Timișoara"
        },
        {
            name: "Tirana"
        },
        {
            name: "Tōkyō"
        },
        {
            name: "Toronto Union"
        },
        {
            name: "Tracy Industrial Area"
        },
        {
            name: "Tunis"
        },
        {
            name: "Turku"
        },
        {
            name: "Ulanhot"
        },
        {
            name: "Valencia"
        },
        {
            name: "Valka"
        },
        {
            name: "Vancouver"
        },
        {
            name: "Venice"
        },
        {
            name: "Ventspils"
        },
        {
            name: "Vienna"
        },
        {
            name: "Wakkanai"
        },
        {
            name: "Wallops Island"
        },
        {
            name: "Warsaw Central"
        },
        {
            name: "Washington D.C."
        },
        {
            name: "Wellington"
        },
        {
            name: "West Mediterranean"
        },
        {
            name: "Whanganui"
        },
        {
            name: "Wilmington"
        },
        {
            name: "Winnipeg"
        },
        {
            name: "Yuzhno-Sakhalinsk"
        },
        {
            name: "Zagreb"
        },
        {
            name: "Zakynthos"
        },
        {
            name: "Zugdidi"
        }
    ],
    connections: [
        {
            from: "Rasht",
            to: "Zugdidi",
            lineID: "A01",
            time: 185
        },
        {
            from: "Antalya",
            to: "Nicosia",
            lineID: "A02",
            time: 60
        },
        {
            from: "Nicosia",
            to: "Tel Aviv",
            lineID: "A02",
            time: 60
        },
        {
            from: "Rasht",
            to: "Tel Aviv",
            lineID: "A03",
            time: 255
        },
        {
            from: "Rasht",
            to: "Gay",
            lineID: "A05",
            time: 125
        },
        {
            from: "Rasht",
            to: "Amol",
            lineID: "A06",
            time: 65
        },
        {
            from: "Amol",
            to: "Atyrau",
            lineID: "A06",
            time: 215
        },
        {
            from: "Atyrau",
            to: "Orenburg",
            lineID: "A06",
            time: 120
        },
        {
            from: "Amol",
            to: "Mt. Damavand",
            lineID: "A07",
            time: 20
        },
        {
            from: "Mt. Damavand",
            to: "Tehran",
            lineID: "A07",
            time: 20
        },
        {
            from: "Poronaysk",
            to: "Starodubskoe",
            lineID: "A08",
            time: 25
        },
        {
            from: "Starodubskoe",
            to: "Sapporo",
            lineID: "A08",
            time: 80
        },
        {
            from: "Starodubskoe",
            to: "Yuzhno-Sakhalinsk",
            lineID: "A08",
            time: 10
        },
        {
            from: "Yuzhno-Sakhalinsk",
            to: "Wakkanai",
            lineID: "A08",
            time: 40
        },
        {
            from: "Wakkanai",
            to: "Sapporo",
            lineID: "A08",
            time: 40
        },
        {
            from: "Sapporo",
            to: "Hakodate",
            lineID: "A08",
            time: 40
        },
        {
            from: "Hakodate",
            to: "Aomori",
            lineID: "A08",
            time: 20
        },
        {
            from: "Aomori",
            to: "Sendai",
            lineID: "A08",
            time: 50
        },
        {
            from: "Sendai",
            to: "Tōkyō",
            lineID: "A08",
            time: 45
        },
        {
            from: "Tōkyō",
            to: "Fuji",
            lineID: "A08",
            time: 25
        },
        {
            from: "Fuji",
            to: "Ōsaka",
            lineID: "A08",
            time: 50
        },
        {
            from: "Ōsaka",
            to: "Hiroshima",
            lineID: "A08",
            time: 50
        },
        {
            from: "Hiroshima",
            to: "Fukuoka",
            lineID: "A08",
            time: 40
        },
        {
            from: "Ulanhot",
            to: "Anshan",
            lineID: "A09",
            time: 75
        },
        {
            from: "Anshan",
            to: "Cholsan",
            lineID: "A09",
            time: 45
        },
        {
            from: "Cholsan",
            to: "Pyongyang",
            lineID: "A09",
            time: 25
        },
        {
            from: "Pyongyang",
            to: "Seoul-Incheon",
            lineID: "A09",
            time: 35
        },
        {
            from: "Seoul-Incheon",
            to: "Iksan",
            lineID: "A09",
            time: 30
        },
        {
            from: "Iksan",
            to: "Daegu",
            lineID: "A09",
            time: 30
        },
        {
            from: "Daegu",
            to: "Busan",
            lineID: "A09",
            time: 25
        },
        {
            from: "Busan",
            to: "Fukuoka",
            lineID: "A09",
            time: 55
        },
        {
            from: "Queen's Cross",
            to: "Brighton",
            lineID: "E01",
            time: 40
        },
        {
            from: "Brighton",
            to: "Southampton",
            lineID: "E01",
            time: 20
        },
        {
            from: "Southampton",
            to: "Plymouth",
            lineID: "E01",
            time: 70
        },
        {
            from: "Queen's Cross",
            to: "Birmingham",
            lineID: "E02",
            time: 45
        },
        {
            from: "Birmingham",
            to: "Isle of Man",
            lineID: "E02",
            time: 70
        },
        {
            from: "Southampton",
            to: "Birmingham",
            lineID: "E03",
            time: 20
        },
        {
            from: "Birmingham",
            to: "Newcastle",
            lineID: "E03",
            time: 30
        },
        {
            from: "Gdańsk",
            to: "Warsaw Central",
            lineID: "E04",
            time: 65
        },
        {
            from: "Warsaw Central",
            to: "Katowice",
            lineID: "E05",
            time: 30
        },
        {
            from: "Katowice",
            to: "Košice",
            lineID: "E05",
            time: 40
        },
        {
            from: "Košice",
            to: "Timișoara",
            lineID: "E05",
            time: 40
        },
        {
            from: "Timișoara",
            to: "Belgrade",
            lineID: "E05",
            time: 15
        },
        {
            from: "Belgrade",
            to: "Thessaloniki",
            lineID: "E05",
            time: 85
        },
        {
            from: "Kiel",
            to: "Szczecin",
            lineID: "E06",
            time: 70
        },
        {
            from: "Szczecin",
            to: "Gdańsk",
            lineID: "E06",
            time: 65
        },
        {
            from: "Gdańsk",
            to: "Kaliningrad",
            lineID: "E06",
            time: 35
        },
        {
            from: "Kaliningrad",
            to: "Riga",
            lineID: "E06",
            time: 90
        },
        {
            from: "Riga",
            to: "Tallinn",
            lineID: "E06",
            time: 30
        },
        {
            from: "Tallinn",
            to: "Turku",
            lineID: "E06",
            time: 50
        },
        {
            from: "Turku",
            to: "Stockholm",
            lineID: "E06",
            time: null
        },
        {
            from: "Stockholm",
            to: "Copenhagen",
            lineID: "E06",
            time: null
        },
        {
            from: "Copenhagen",
            to: "Kiel",
            lineID: "E06",
            time: 50
        },
        {
            from: "Warsaw Central",
            to: "Brest (BY)",
            lineID: "E07",
            time: 40
        },
        {
            from: "Brest (BY)",
            to: "Riga",
            lineID: "E07",
            time: 85
        },
        {
            from: "Riga",
            to: "Tallinn",
            lineID: "E07",
            time: 30
        },
        {
            from: "Tallinn",
            to: "Helsinki",
            lineID: "E07",
            time: 20
        },
        {
            from: "Gdańsk",
            to: "Bydgoszcz",
            lineID: "E08",
            time: null
        },
        {
            from: "Bydgoszcz",
            to: "Płock",
            lineID: "E08",
            time: 35
        },
        {
            from: "Płock",
            to: "Warsaw Central",
            lineID: "E08",
            time: 25
        },
        {
            from: "Warsaw Central",
            to: "Lublin",
            lineID: "E08",
            time: null
        },
        {
            from: "Lublin",
            to: "Katowice",
            lineID: "E08",
            time: null
        },
        {
            from: "Warsaw Central",
            to: "Carpathia",
            lineID: "E09",
            time: null
        },
        {
            from: "Carpathia",
            to: "Romanian Slime Farm",
            lineID: "E09",
            time: null
        },
        {
            from: "Warsaw Central",
            to: "Brest (BY)",
            lineID: "E10",
            time: 40
        },
        {
            from: "Brest (BY)",
            to: "Kyiv",
            lineID: "E10",
            time: 105
        },
        {
            from: "Kyiv",
            to: "Odessa",
            lineID: "E10",
            time: 50
        },
        {
            from: "Belgrade",
            to: "Zagreb",
            lineID: "E11",
            time: 145
        },
        {
            from: "Zagreb",
            to: "Ljubljana",
            lineID: "E11",
            time: 45
        },
        {
            from: "Ljubljana",
            to: "Venice",
            lineID: "E11",
            time: 65
        },
        {
            from: "Belgrade",
            to: "Sarajevo",
            lineID: "E12",
            time: 100
        },
        {
            from: "Sarajevo",
            to: "Podgorica",
            lineID: "E12",
            time: 65
        },
        {
            from: "Podgorica",
            to: "Pristina",
            lineID: "E12",
            time: 30
        },
        {
            from: "Pristina",
            to: "Tirana",
            lineID: "E12",
            time: 65
        },
        {
            from: "Timișoara",
            to: "Carpathia",
            lineID: "E13",
            time: 60
        },
        {
            from: "Catania",
            to: "Zakynthos",
            lineID: "E14",
            time: 90
        },
        {
            from: "Thessaloniki",
            to: "Tirana",
            lineID: "E15",
            time: 45
        },
        {
            from: "Tirana",
            to: "Bari",
            lineID: "E16",
            time: 50
        },
        {
            from: "Bari",
            to: "Catania",
            lineID: "E16",
            time: 80
        },
        {
            from: "Helsinki",
            to: "Porvoo",
            lineID: "E17",
            time: 10
        },
        {
            from: "Porvoo",
            to: "Kotka",
            lineID: "E17",
            time: null
        },
        {
            from: "Kotka",
            to: "Lappeenranta",
            lineID: "E17",
            time: null
        },
        {
            from: "Copenhagen",
            to: "Bornholm",
            lineID: "E19",
            time: 80
        },
        {
            from: "West Mediterranean",
            to: "Mallorca",
            lineID: "E20",
            time: 45
        },
        {
            from: "Mequinenza",
            to: "Gesalibar",
            lineID: "E21",
            time: 110
        },
        {
            from: "Katowice",
            to: "Pardubice",
            lineID: "E22",
            time: 60
        },
        {
            from: "Pardubice",
            to: "Prague",
            lineID: "E22",
            time: 25
        },
        {
            from: "Prague",
            to: "Frankfurt",
            lineID: "E22",
            time: 80
        },
        {
            from: "Frankfurt",
            to: "Charleville-Mézières",
            lineID: "E22",
            time: 55
        },
        {
            from: "Pardubice",
            to: "Brno",
            lineID: "E23",
            time: 25
        },
        {
            from: "Brno",
            to: "Vienna",
            lineID: "E23",
            time: 10
        },
        {
            from: "Vienna",
            to: "Graz",
            lineID: "E23",
            time: 25
        },
        {
            from: "Graz",
            to: "Zagreb",
            lineID: "E23",
            time: 20
        },
        {
            from: "Zagreb",
            to: "Sarajevo",
            lineID: "E23",
            time: 55
        },
        {
            from: "Kiel",
            to: "Paderborn",
            lineID: "E27",
            time: 50
        },
        {
            from: "Paderborn",
            to: "Frankfurt",
            lineID: "E27",
            time: 25
        },
        {
            from: "Frankfurt",
            to: "Thun",
            lineID: "E27",
            time: 60
        },
        {
            from: "Porto",
            to: "Gesalibar",
            lineID: "E28",
            time: null
        },
        {
            from: "Gesalibar",
            to: "Pyrenees",
            lineID: "E28",
            time: null
        },
        {
            from: "Pyrenees",
            to: "Marseille",
            lineID: "E28",
            time: 75
        },
        {
            from: "Marseille",
            to: "North Mediterranean",
            lineID: "E28",
            time: 50
        },
        {
            from: "North Mediterranean",
            to: "Milan",
            lineID: "E28",
            time: 30
        },
        {
            from: "Milan",
            to: "Venice",
            lineID: "E28",
            time: 45
        },
        {
            from: "Venice",
            to: "Graz",
            lineID: "E28",
            time: null
        },
        {
            from: "Graz",
            to: "Košice",
            lineID: "E28",
            time: null
        },
        {
            from: "Košice",
            to: "Brest (BY)",
            lineID: "E28",
            time: null
        },
        {
            from: "Thun",
            to: "Merlischachen",
            lineID: "E29",
            time: 15
        },
        {
            from: "Merlischachen",
            to: "Milan",
            lineID: "E29",
            time: 40
        },
        {
            from: "Thessaloniki",
            to: "Larissa",
            lineID: "E30",
            time: 20
        },
        {
            from: "Larissa",
            to: "Sparta",
            lineID: "E30",
            time: 30
        },
        {
            from: "West Mediterranean",
            to: "Mequinenza",
            lineID: "E31",
            time: 65
        },
        {
            from: "Mequinenza",
            to: "Porto",
            lineID: "E32",
            time: 120
        },
        {
            from: "Kiel",
            to: "Aabenraa",
            lineID: "E33",
            time: 25
        },
        {
            from: "Aabenraa",
            to: "Aarhus",
            lineID: "E33",
            time: 30
        },
        {
            from: "Aarhus",
            to: "Sandefjord",
            lineID: "E33",
            time: 35
        },
        {
            from: "Sandefjord",
            to: "Oslo",
            lineID: "E33",
            time: 25
        },
        {
            from: "Oslo",
            to: "Odda",
            lineID: "E33",
            time: 65
        },
        {
            from: "Odda",
            to: "Bergen",
            lineID: "E33",
            time: 25
        },
        {
            from: "Thessaloniki",
            to: "Çorlu",
            lineID: "E35",
            time: 75
        },
        {
            from: "West Mediterranean",
            to: "Sardinia",
            lineID: "E37",
            time: 60
        },
        {
            from: "Sardinia",
            to: "Bari",
            lineID: "E37",
            time: null
        },
        {
            from: "North Mediterranean",
            to: "Corsica",
            lineID: "E38",
            time: 25
        },
        {
            from: "Corsica",
            to: "Sardinia",
            lineID: "E38",
            time: 15
        },
        {
            from: "Sardinia",
            to: "Central Mediterranean",
            lineID: "E38",
            time: null
        },
        {
            from: "Riga",
            to: "Ogre",
            lineID: "E39",
            time: null
        },
        {
            from: "Ogre",
            to: "Aizkraukle",
            lineID: "E39",
            time: null
        },
        {
            from: "Aizkraukle",
            to: "Daugavpils",
            lineID: "E39",
            time: null
        },
        {
            from: "Daugavpils",
            to: "Rēzekne",
            lineID: "E39",
            time: null
        },
        {
            from: "Rēzekne",
            to: "Alūksne",
            lineID: "E39",
            time: null
        },
        {
            from: "Alūksne",
            to: "Valka",
            lineID: "E39",
            time: null
        },
        {
            from: "Valka",
            to: "Ruhnu Island",
            lineID: "E39",
            time: null
        },
        {
            from: "Ruhnu Island",
            to: "Kuressaare",
            lineID: "E39",
            time: null
        },
        {
            from: "Kuressaare",
            to: "Kolkasrags",
            lineID: "E39",
            time: null
        },
        {
            from: "Kolkasrags",
            to: "Ventspils",
            lineID: "E39",
            time: 20
        },
        {
            from: "Ventspils",
            to: "Liepāja",
            lineID: "E39",
            time: 20
        },
        {
            from: "Liepāja",
            to: "Skrunda",
            lineID: "E39",
            time: 20
        },
        {
            from: "Skrunda",
            to: "Riga",
            lineID: "E39",
            time: 40
        },
        {
            from: "Amsterdam Central",
            to: "Den Oever",
            lineID: "E40",
            time: 10
        },
        {
            from: "Den Oever",
            to: "Aabenraa",
            lineID: "E40",
            time: 85
        },
        {
            from: "Central Mediterranean",
            to: "Lampedusa",
            lineID: "F01",
            time: 30
        },
        {
            from: "Lampedusa",
            to: "Sfax",
            lineID: "F01",
            time: 40
        },
        {
            from: "Marrakesh",
            to: "Casablanca",
            lineID: "F02",
            time: null
        },
        {
            from: "Casablanca",
            to: "Oran",
            lineID: "F02",
            time: null
        },
        {
            from: "Oran",
            to: "Algiers",
            lineID: "F02",
            time: null
        },
        {
            from: "Algiers",
            to: "Tunis",
            lineID: "F02",
            time: 125
        },
        {
            from: "Tunis",
            to: "Sfax",
            lineID: "F02",
            time: 50
        },
        {
            from: "Sfax",
            to: "Benghazi",
            lineID: "F02",
            time: null
        },
        {
            from: "Benghazi",
            to: "Alexandria",
            lineID: "F02",
            time: null
        },
        {
            from: "Algiers",
            to: "Tamanrasset",
            lineID: "F03",
            time: 300
        },
        {
            from: "Tamanrasset",
            to: "Timbuktu",
            lineID: "F03",
            time: null
        },
        {
            from: "San Francisco",
            to: "San Jose",
            lineID: "N01",
            time: 20
        },
        {
            from: "San Francisco",
            to: "Tracy Industrial Area",
            lineID: "N02",
            time: 25
        },
        {
            from: "Tracy Industrial Area",
            to: "Del Norte",
            lineID: "N03",
            time: null
        },
        {
            from: "San Jose",
            to: "San Diego",
            lineID: "N04",
            time: null
        },
        {
            from: "Montréal",
            to: "Ottawa",
            lineID: "N10",
            time: 35
        },
        {
            from: "Ottawa",
            to: "Toronto Union",
            lineID: "N10",
            time: 75
        },
        {
            from: "Ottawa",
            to: "Sudbury",
            lineID: "N11",
            time: null
        },
        {
            from: "Sudbury",
            to: "Sault Ste. Marie",
            lineID: "N11",
            time: null
        },
        {
            from: "Sault Ste. Marie",
            to: "Winnipeg",
            lineID: "N11",
            time: null
        },
        {
            from: "Winnipeg",
            to: "Regina",
            lineID: "N11",
            time: null
        },
        {
            from: "Regina",
            to: "Calgary",
            lineID: "N11",
            time: null
        },
        {
            from: "Calgary",
            to: "Vancouver",
            lineID: "N11",
            time: null
        },
        {
            from: "Montréal",
            to: "Tasiujaq",
            lineID: "N12",
            time: null
        },
        {
            from: "Tasiujaq",
            to: "Iqaluit",
            lineID: "N12",
            time: null
        },
        {
            from: "Iqaluit",
            to: "Nuuk",
            lineID: "N12",
            time: null
        },
        {
            from: "Nuuk",
            to: "Ittoqoorttomit",
            lineID: "N12",
            time: null
        },
        {
            from: "Ittoqoorttomit",
            to: "Reykjavík",
            lineID: "N12",
            time: null
        },
        {
            from: "Montréal",
            to: "Québec",
            lineID: "N13",
            time: null
        },
        {
            from: "Québec",
            to: "Halifax",
            lineID: "N13",
            time: null
        },
        {
            from: "Montréal",
            to: "Boston",
            lineID: "N14",
            time: 95
        },
        {
            from: "Boston",
            to: "New York Central",
            lineID: "N14",
            time: null
        },
        {
            from: "New York Central",
            to: "Philadelphia",
            lineID: "N15",
            time: 30
        },
        {
            from: "Philadelphia",
            to: "Wallops Island",
            lineID: "N15",
            time: 35
        },
        {
            from: "Wallops Island",
            to: "Wilmington",
            lineID: "N15",
            time: null
        },
        {
            from: "Montréal",
            to: "New York Central",
            lineID: "N16",
            time: 65
        },
        {
            from: "New York Central",
            to: "Washington D.C.",
            lineID: "N16",
            time: null
        },
        {
            from: "Ottawa",
            to: "Syracuse",
            lineID: "N17",
            time: null
        },
        {
            from: "Syracuse",
            to: "Scranton",
            lineID: "N17",
            time: null
        },
        {
            from: "Scranton",
            to: "Philadelphia",
            lineID: "N17",
            time: null
        },
        {
            from: "Manicouagan",
            to: "Rimouski",
            lineID: "N19",
            time: 80
        },
        {
            from: "Montréal",
            to: "Burlington",
            lineID: "N21",
            time: 30
        },
        {
            from: "Burlington",
            to: "Albany",
            lineID: "N21",
            time: 40
        },
        {
            from: "Toronto Union",
            to: "Kawartha Lakes",
            lineID: "N22",
            time: null
        },
        {
            from: "Savannah",
            to: "Atlanta",
            lineID: "N23",
            time: null
        },
        {
            from: "Atlanta",
            to: "Bloomington",
            lineID: "N23",
            time: null
        },
        {
            from: "Bloomington",
            to: "Chicago",
            lineID: "N23",
            time: null
        },
        {
            from: "Atlanta",
            to: "Wallops Island",
            lineID: "N24",
            time: null
        },
        {
            from: "Melbourne",
            to: "Sydney",
            lineID: "O02",
            time: 130
        },
        {
            from: "Ōkaihau",
            to: "Otiria",
            lineID: "O03",
            time: 10
        },
        {
            from: "Christchurch",
            to: "Timaru",
            lineID: "O04",
            time: 35
        },
        {
            from: "Timaru",
            to: "Dunedin",
            lineID: "O04",
            time: 30
        },
        {
            from: "Dunedin",
            to: "Jane Peak",
            lineID: "O04",
            time: 40
        },
        {
            from: "Christchurch",
            to: "Arthur's Pass",
            lineID: "O05",
            time: 30
        },
        {
            from: "Arthur's Pass",
            to: "Greymouth",
            lineID: "O05",
            time: 15
        },
        {
            from: "Wellington",
            to: "Kaikōura",
            lineID: "O06",
            time: 35
        },
        {
            from: "Kaikōura",
            to: "Christchurch",
            lineID: "O06",
            time: 40
        },
        {
            from: "Auckland",
            to: "Hamilton",
            lineID: "O07",
            time: 20
        },
        {
            from: "Hamilton",
            to: "National Park",
            lineID: "O07",
            time: 25
        },
        {
            from: "National Park",
            to: "Whanganui",
            lineID: "O07",
            time: 25
        },
        {
            from: "Whanganui",
            to: "Wellington",
            lineID: "O07",
            time: 25
        },
        {
            from: "Sydney",
            to: "Brisbane",
            lineID: "O08",
            time: 115
        },
        {
            from: "Melbourne",
            to: "Adelaide",
            lineID: "O09",
            time: 115
        },
        {
            from: "Adelaide",
            to: "Perth",
            lineID: "O10",
            time: 340
        },
        {
            from: "Asunción",
            to: "Doctor Cecilio Báez",
            lineID: "S01",
            time: null
        },
        {
            from: "Doctor Cecilio Báez",
            to: "Doctor Juan Manuel Frutos",
            lineID: "S01",
            time: null
        },
        {
            from: "Doctor Juan Manuel Frutos",
            to: "Doctor Juan León Mallorquín",
            lineID: "S01",
            time: null
        },
        {
            from: "Asunción",
            to: "Buenos Aires",
            lineID: "S02",
            time: null
        },
        {
            from: "Buenos Aires",
            to: "Montevideo",
            lineID: "S02",
            time: null
        },
        {
            from: "Montréal",
            to: "Rimouski",
            lineID: "T01",
            time: 95
        },
        {
            from: "Rimouski",
            to: "Old Perlican",
            lineID: "T01",
            time: 205
        },
        {
            from: "Old Perlican",
            to: "Rennes",
            lineID: "T01",
            time: 660
        },
        {
            from: "Rennes",
            to: "Paris",
            lineID: "T01",
            time: 65
        },
        {
            from: "Paris",
            to: "Charleville-Mézières",
            lineID: "T01",
            time: 45
        },
        {
            from: "Charleville-Mézières",
            to: "Marseille",
            lineID: "T01",
            time: 85
        },
        {
            from: "Marseille",
            to: "West Mediterranean",
            lineID: "T01",
            time: 35
        },
        {
            from: "West Mediterranean",
            to: "Central Mediterranean",
            lineID: "T01",
            time: 155
        },
        {
            from: "Central Mediterranean",
            to: "Catania",
            lineID: "T01",
            time: 30
        },
        {
            from: "Catania",
            to: "Sparta",
            lineID: "T01",
            time: 100
        },
        {
            from: "Sparta",
            to: "Antalya",
            lineID: "T01",
            time: 105
        },
        {
            from: "Antalya",
            to: "Rasht",
            lineID: "T01",
            time: 245
        },
        {
            from: "Rasht",
            to: "Baikonur",
            lineID: "T01",
            time: 300
        },
        {
            from: "Baikonur",
            to: "Ulanhot",
            lineID: "T01",
            time: 750
        },
        {
            from: "Ulanhot",
            to: "Poronaysk",
            lineID: "T01",
            time: 325
        },
        {
            from: "Antalya",
            to: "Istanbul",
            lineID: "T02",
            time: 70
        },
        {
            from: "Istanbul",
            to: "Çorlu",
            lineID: "T02",
            time: 25
        },
        {
            from: "Çorlu",
            to: "Romanian Slime Farm",
            lineID: "T02",
            time: 70
        },
        {
            from: "Romanian Slime Farm",
            to: "Odessa",
            lineID: "T02",
            time: 35
        },
        {
            from: "Isle of Man",
            to: "Southampton",
            lineID: "T03",
            time: 85
        },
        {
            from: "Southampton",
            to: "Rennes",
            lineID: "T03",
            time: 45
        },
        {
            from: "Rennes",
            to: "Pyrenees",
            lineID: "T03",
            time: 75
        },
        {
            from: "Pyrenees",
            to: "Mequinenza",
            lineID: "T03",
            time: 50
        },
        {
            from: "Mequinenza",
            to: "Valencia",
            lineID: "T03",
            time: null
        },
        {
            from: "Valencia",
            to: "Oran",
            lineID: "T03",
            time: null
        },
        {
            from: "Oran",
            to: "Accra",
            lineID: "T03",
            time: null
        },
        {
            from: "Rasht",
            to: "Basra",
            lineID: "T04",
            time: 115
        },
        {
            from: "Rasht",
            to: "Basra",
            lineID: "T05",
            time: 115
        },
        {
            from: "Basra",
            to: "Delhi",
            lineID: "T05",
            time: 410
        },
        {
            from: "Delhi",
            to: "Phuket",
            lineID: "T05",
            time: 545
        },
        {
            from: "Phuket",
            to: "Singapore",
            lineID: "T05",
            time: 155
        },
        {
            from: "Singapore",
            to: "Melbourne",
            lineID: "T05",
            time: 1030
        },
        {
            from: "Melbourne",
            to: "Christchurch",
            lineID: "T05",
            time: 445
        },
        {
            from: "Jane Peak",
            to: "Stewart Island",
            lineID: "T07",
            time: 35
        },
        {
            from: "Stewart Island",
            to: "Auckland Island",
            lineID: "T07",
            time: 60
        },
        {
            from: "Auckland Island",
            to: "Oates Land",
            lineID: "T07",
            time: 260
        },
        {
            from: "Oates Land",
            to: "McMurdo Station",
            lineID: "T07",
            time: 95
        },
        {
            from: "Charleville-Mézières",
            to: "Amsterdam Central",
            lineID: "HBL",
            time: 40
        },
        {
            from: "Charleville-Mézières",
            to: "Rennes",
            lineID: "HBL",
            time: 85
        },
        {
            from: "Charleville-Mézières",
            to: "Queen's Cross",
            lineID: "HBL",
            time: 65
        },
        {
            from: "Amsterdam Central",
            to: "Rennes",
            lineID: "HBL",
            time: 85
        },
        {
            from: "Amsterdam Central",
            to: "Queen's Cross",
            lineID: "HBL",
            time: 65
        },
        {
            from: "Rennes",
            to: "Queen's Cross",
            lineID: "HBL",
            time: 60
        },
        {
            from: "Apennines",
            to: "Bari",
            lineID: "HCY",
            time: null
        },
        {
            from: "Apennines",
            to: "Corsica",
            lineID: "HCY",
            time: 65
        },
        {
            from: "Apennines",
            to: "Milan",
            lineID: "HCY",
            time: 100
        },
        {
            from: "Apennines",
            to: "Sardinia",
            lineID: "HCY",
            time: 60
        },
        {
            from: "Bari",
            to: "Corsica",
            lineID: "HCY",
            time: null
        },
        {
            from: "Bari",
            to: "Milan",
            lineID: "HCY",
            time: null
        },
        {
            from: "Bari",
            to: "Sardinia",
            lineID: "HCY",
            time: null
        },
        {
            from: "Corsica",
            to: "Sardinia",
            lineID: "HCY",
            time: 15
        },
        {
            from: "Corsica",
            to: "Milan",
            lineID: "HCY",
            time: 35
        },
        {
            from: "Milan",
            to: "Sardinia",
            lineID: "HCY",
            time: 50
        },
        {
            from: "Amsterdam Central",
            to: "Warsaw Central",
            lineID: "HGR",
            time: 165
        },
        {
            from: "San Jose",
            to: "Vancouver",
            lineID: "HPU",
            time: 135
        }
    ]
} as NetworkData;

export default networkData;

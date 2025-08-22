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
            id: "A03",
            name: "Warzone Express",
            colour: "#662c91",
            type: "LSR"
        },
        {
            id: "A04",
            name: "A04",
            colour: "#fca3d6",
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
            id: "A10",
            name: "Stella Loop",
            colour: "#662c91",
            type: "LSR"
        },
        {
            id: "A13",
            name: "Hokkaido Line",
            colour: "#228b22",
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
            name: "Good Line",
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
            name: "Greek Line",
            colour: "#bb4a9b",
            type: "LSR"
        },
        {
            id: "E33",
            name: "Fjord Connection",
            colour: "#b9e8ea",
            type: "LSR"
        },
        {
            id: "E34",
            name: "Lapland Line ",
            colour: "#e99d06",
            type: "LSR"
        },
        {
            id: "E35",
            name: "Thrace Line",
            colour: "#521bfd",
            type: "LSR"
        },
        {
            id: "E36",
            name: "East Italy Line",
            colour: "#f78f4b",
            type: "LSR"
        },
        {
            id: "E37",
            name: "Corsica Line",
            colour: "#a1dbe6",
            type: "LSR"
        },
        {
            id: "E38",
            name: "Macedonia Line",
            colour: "#ffcd02",
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
            id: "E43",
            name: "E43",
            colour: "#5e53a1",
            type: "LSR"
        },
        {
            id: "E44",
            name: "Liechtenstein Line",
            colour: "#0b5394",
            type: "LSR"
        },
        {
            id: "E46",
            name: "Ore Mountains Line",
            colour: "#ffff00",
            type: "LSR"
        },
        {
            id: "E48",
            name: "Monaco Line",
            colour: "#e06666",
            type: "LSR"
        },
        {
            id: "E47",
            name: "Royal Bavarian Rail",
            colour: "#f0fcff",
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
            id: "HBA",
            name: "Black HSR",
            colour: "#000000",
            type: "HSR"
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
            id: "HMA",
            name: "Magenta HSR",
            colour: "#e320b2",
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
            colour: "#ffcd02",
            type: "LSR"
        },
        {
            id: "N16",
            name: "USA Main Line",
            colour: "#ffffff",
            type: "LSR"
        },
        {
            id: "N17",
            name: "Trans-Appalachian Line",
            colour: "#273c7b",
            type: "LSR"
        },
        {
            id: "N18",
            name: "who cares Line",
            colour: "#78caf1",
            type: "LSR"
        },
        {
            id: "N19",
            name: "Manicouagan Line",
            colour: "#522921",
            type: "LSR"
        },
        {
            id: "N20",
            name: "DC Line",
            colour: "#4c1130",
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
            id: "N29",
            name: "Florida Georgia Line",
            colour: "#b00828",
            type: "LSR"
        },
        {
            id: "N31",
            name: "Mid-Atlantic Beltway",
            colour: "#ffb270",
            type: "LSR"
        },
        {
            id: "N33",
            name: "Yellowhead Line",
            colour: "#ffed8d",
            type: "LSR"
        },
        {
            id: "N37",
            name: "Fort St. James Extension",
            colour: "#ffacee",
            type: "LSR"
        },
        {
            id: "N38",
            name: "Kitimat Extension",
            colour: "#c9c0c0",
            type: "LSR"
        },
        {
            id: "N41",
            name: "Gwillim Line",
            colour: "#793c1d",
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
            id: "S03",
            name: "West Line",
            colour: "#c8102e",
            type: "LSR"
        },
        {
            id: "S04",
            name: "East Line",
            colour: "#00674f",
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
        },
        {
            id: "T08",
            name: "Great Northern Railway",
            colour: "#bb4a9b",
            type: "LSR"
        },
        {
            id: "T09",
            name: "Indies Railway",
            colour: "#01fe03",
            type: "LSR"
        },
        {
            id: "T10",
            name: "North Darien Line",
            colour: "#d9008d",
            type: "LSR"
        },
        {
            id: "T11",
            name: "Denmark Line",
            colour: "#fcba03",
            type: "LSR"
        },
        {
            id: "T12",
            name: "Medium Bridge",
            colour: "#b80b4b",
            type: "LSR"
        },
        {
            id: "T13",
            name: "Steppe Line",
            colour: "#b6d7a8",
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
            name: "Abbotsford"
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
            name: "Amapá"
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
            name: "Antigua"
        },
        {
            name: "Aomori"
        },
        {
            name: "Apennines"
        },
        {
            name: "Arriaga"
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
            name: "Barranquilla"
        },
        {
            name: "Basra"
        },
        {
            name: "Beijing"
        },
        {
            name: "Belgrade"
        },
        {
            name: "Bellingham"
        },
        {
            name: "Belém"
        },
        {
            name: "Benghazi"
        },
        {
            name: "Bergen"
        },
        {
            name: "Berlin"
        },
        {
            name: "Birmingham"
        },
        {
            name: "Bitola"
        },
        {
            name: "Bloomington"
        },
        {
            name: "Bogotá"
        },
        {
            name: "Bologna"
        },
        {
            name: "Bornholm"
        },
        {
            name: "Boston"
        },
        {
            name: "Brest"
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
            name: "Burns Lake"
        },
        {
            name: "Busan"
        },
        {
            name: "Bydgoszcz"
        },
        {
            name: "Cabo San Lucas"
        },
        {
            name: "Cache Creek"
        },
        {
            name: "Calgary"
        },
        {
            name: "Cali"
        },
        {
            name: "Caracas"
        },
        {
            name: "Carpathia"
        },
        {
            name: "Cartagena"
        },
        {
            name: "Casablanca"
        },
        {
            name: "Catania"
        },
        {
            name: "Cayenne"
        },
        {
            name: "Central Mediterranean"
        },
        {
            name: "Changhua"
        },
        {
            name: "Charleville-Mézières"
        },
        {
            name: "Cheonan"
        },
        {
            name: "Chetwynd"
        },
        {
            name: "Chiclayo"
        },
        {
            name: "Chimbote"
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
            name: "Corsica"
        },
        {
            name: "Crete"
        },
        {
            name: "Cuenca"
        },
        {
            name: "Cusco"
        },
        {
            name: "Daegu"
        },
        {
            name: "Dalian"
        },
        {
            name: "Danube Delta"
        },
        {
            name: "Daugavpils"
        },
        {
            name: "David"
        },
        {
            name: "Dawson Creek"
        },
        {
            name: "Del Norte"
        },
        {
            name: "Delhi"
        },
        {
            name: "Den Oever"
        },
        {
            name: "Denmark (AR)"
        },
        {
            name: "Denmark (IA)"
        },
        {
            name: "Denmark (IL)"
        },
        {
            name: "Denmark (KS)"
        },
        {
            name: "Denmark (ME)"
        },
        {
            name: "Denmark (MI)"
        },
        {
            name: "Denmark (MS)"
        },
        {
            name: "Denmark (NS)"
        },
        {
            name: "Denmark (NY)"
        },
        {
            name: "Denmark (TN)"
        },
        {
            name: "Denmark (WI)"
        },
        {
            name: "Denver"
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
            name: "Dominica"
        },
        {
            name: "Doğanyurt"
        },
        {
            name: "Dresden"
        },
        {
            name: "Dunedin"
        },
        {
            name: "Ensenada"
        },
        {
            name: "Fort St. James"
        },
        {
            name: "Frankfurt"
        },
        {
            name: "Fraser Lake"
        },
        {
            name: "Fuji"
        },
        {
            name: "Fukuoka"
        },
        {
            name: "Gary"
        },
        {
            name: "Gay"
        },
        {
            name: "Gdańsk"
        },
        {
            name: "General Eugenio A. Garay"
        },
        {
            name: "Geneva"
        },
        {
            name: "Genoa"
        },
        {
            name: "Georgetown"
        },
        {
            name: "Gesalibar"
        },
        {
            name: "Grand Bahama"
        },
        {
            name: "Grande Prairie"
        },
        {
            name: "Graz"
        },
        {
            name: "Grenada"
        },
        {
            name: "Greymouth"
        },
        {
            name: "Guadalajara"
        },
        {
            name: "Guadeloupe"
        },
        {
            name: "Guatemala City"
        },
        {
            name: "Guerrero Negro"
        },
        {
            name: "Gwangju"
        },
        {
            name: "Hakodate"
        },
        {
            name: "Haida Gwaii"
        },
        {
            name: "Halifax"
        },
        {
            name: "Hamilton"
        },
        {
            name: "Harrisburg"
        },
        {
            name: "Helsinki"
        },
        {
            name: "Hiroshima"
        },
        {
            name: "Holguín"
        },
        {
            name: "Hong Kong"
        },
        {
            name: "Honolulu"
        },
        {
            name: "Hope"
        },
        {
            name: "Houston"
        },
        {
            name: "Ibagué"
        },
        {
            name: "Ica"
        },
        {
            name: "Iksan"
        },
        {
            name: "Innsbruck"
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
            name: "Ittoqqortoormiit"
        },
        {
            name: "Jacksonville"
        },
        {
            name: "Jane Peak"
        },
        {
            name: "Jinan"
        },
        {
            name: "Kagoshima"
        },
        {
            name: "Kaikōura"
        },
        {
            name: "Kaliningrad"
        },
        {
            name: "Kraków"
        },
        {
            name: "Kawartha Lakes"
        },
        {
            name: "Kiel"
        },
        {
            name: "Kitimat"
        },
        {
            name: "Knoxville"
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
            name: "La Paz"
        },
        {
            name: "Lampedusa"
        },
        {
            name: "Lào Cai"
        },
        {
            name: "Lappeenranta"
        },
        {
            name: "Larissa"
        },
        {
            name: "Lashio"
        },
        {
            name: "Lausanne"
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
            name: "Lviv"
        },
        {
            name: "Macapá"
        },
        {
            name: "Mackenzie"
        },
        {
            name: "Mallorca"
        },
        {
            name: "Managua"
        },
        {
            name: "Manicouagan"
        },
        {
            name: "Maracaibo"
        },
        {
            name: "Marrakesh"
        },
        {
            name: "Marseille"
        },
        {
            name: "Martinique"
        },
        {
            name: "Mazatlán"
        },
        {
            name: "McMurdo Station"
        },
        {
            name: "Medellín"
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
            name: "Monaco"
        },
        {
            name: "Montclair"
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
            name: "Munich"
        },
        {
            name: "Naha"
        },
        {
            name: "National Park"
        },
        {
            name: "New Haven"
        },
        {
            name: "Newcastle"
        },
        {
            name: "Nieuw Nickerie"
        },
        {
            name: "North Mediterranean"
        },
        {
            name: "Nuremberg"
        },
        {
            name: "Nuuk"
        },
        {
            name: "Oates Land"
        },
        {
            name: "Oaxaca"
        },
        {
            name: "Odda"
        },
        {
            name: "Odesa"
        },
        {
            name: "Ohrid"
        },
        {
            name: "Oran"
        },
        {
            name: "Orenburg"
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
            name: "Oulu"
        },
        {
            name: "Paderborn"
        },
        {
            name: "Panama City"
        },
        {
            name: "Paramaribo"
        },
        {
            name: "Pardubice"
        },
        {
            name: "Paris (DK)"
        },
        {
            name: "Paris (FR)"
        },
        {
            name: "Pasto"
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
            name: "Plzeň"
        },
        {
            name: "Podgorica"
        },
        {
            name: "Ponta Delgada"
        },
        {
            name: "Poronaysk"
        },
        {
            name: "Port-au-Prince"
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
            name: "Prilep"
        },
        {
            name: "Prince George"
        },
        {
            name: "Prince Rupert"
        },
        {
            name: "Pristina"
        },
        {
            name: "Puebla"
        },
        {
            name: "Puerto La Cruz"
        },
        {
            name: "Puno"
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
            name: "Queen's Cross"
        },
        {
            name: "Quetzaltenango"
        },
        {
            name: "Quito"
        },
        {
            name: "Québec"
        },
        {
            name: "Quesnel"
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
            name: "Riga"
        },
        {
            name: "Rimouski"
        },
        {
            name: "Rio Verde"
        },
        {
            name: "Rovaniemi"
        },
        {
            name: "Ruhnu Island"
        },
        {
            name: "Rēzekne"
        },
        {
            name: "Saint-Laurent-du-Maroni"
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
            name: "San José"
        },
        {
            name: "San Juan"
        },
        {
            name: "San Salvador"
        },
        {
            name: "Sanaa"
        },
        {
            name: "Sandefjord"
        },
        {
            name: "Santo Domingo"
        },
        {
            name: "Sapporo"
        },
        {
            name: "Sarajevo"
        },
        {
            name: "Saratov"
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
            name: "Shanghai"
        },
        {
            name: "Shantou"
        },
        {
            name: "Singapore"
        },
        {
            name: "Skrunda"
        },
        {
            name: "Smithers"
        },
        {
            name: "Southampton"
        },
        {
            name: "Sparta"
        },
        {
            name: "St. Kitts"
        },
        {
            name: "St. Lucia"
        },
        {
            name: "St. Vincent"
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
            name: "Sucre"
        },
        {
            name: "Sudbury"
        },
        {
            name: "Sullana"
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
            name: "Taipei"
        },
        {
            name: "Tallahassee"
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
            name: "Tegucigalpa"
        },
        {
            name: "Tehran"
        },
        {
            name: "Tehuacán"
        },
        {
            name: "Tel Aviv"
        },
        {
            name: "Terrace"
        },
        {
            name: "Tetovo"
        },
        {
            name: "Thessaloniki"
        },
        {
            name: "Thun"
        },
        {
            name: "Tianjin"
        },
        {
            name: "Tijuana"
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
            name: "Toronto Union"
        },
        {
            name: "Tracy Industrial Area"
        },
        {
            name: "Trinidad"
        },
        {
            name: "Tumbler Ridge"
        },
        {
            name: "Tunis"
        },
        {
            name: "Turin"
        },
        {
            name: "Turku"
        },
        {
            name: "Tōkyō"
        },
        {
            name: "Udine"
        },
        {
            name: "Ulanhot"
        },
        {
            name: "Urahoro"
        },
        {
            name: "Ureki"
        },
        {
            name: "Vaduz"
        },
        {
            name: "Valka"
        },
        {
            name: "Vancouver"
        },
        {
            name: "Vanderhoof"
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
            name: "Virgin Islands"
        },
        {
            name: "Vladivostok"
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
            name: "Williams Lake"
        },
        {
            name: "Wilmington"
        },
        {
            name: "Winnipeg"
        },
        {
            name: "Yantai"
        },
        {
            name: "Yellel"
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
        },
        {
            name: "Çorlu"
        },
        {
            name: "Ōkaihau"
        },
        {
            name: "Ōsaka"
        }
    ],
    connections: [
        {
            from: "Rasht",
            to: "Ureki",
            lineID: "A01",
            time: 185
        },
        {
            from: "Ureki",
            to: "Zugdidi",
            lineID: "A01",
            time: 10
        },
        {
            from: "Rasht",
            to: "Tel Aviv",
            lineID: "A03",
            time: 255
        },
        {
            from: "Tel Aviv",
            to: "Sanaa",
            lineID: "A03",
            time: null
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
            from: "Fukuoka",
            to: "Kagoshima",
            lineID: "A08",
            time: 30
        },
        {
            from: "Kagoshima",
            to: "Naha",
            lineID: "A08",
            time: 110
        },
        {
            from: "Naha",
            to: "Taipei",
            lineID: "A08",
            time: 100
        },
        {
            from: "Taipei",
            to: "Changhua",
            lineID: "A08",
            time: 35
        },
        {
            from: "Changhua",
            to: "Shantou",
            lineID: "A08",
            time: 55
        },
        {
            from: "Shantou",
            to: "Hong Kong",
            lineID: "A08",
            time: 45
        },
        {
            from: "Hong Kong",
            to: "Lào Cai",
            lineID: "A08",
            time: 135
        },
        {
            from: "Lào Cai",
            to: "Lashio",
            lineID: "A08",
            time: 80
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
            from: "Beijing",
            to: "Tianjin",
            lineID: "A10",
            time: null
        },
        {
            from: "Tianjin",
            to: "Dalian",
            lineID: "A10",
            time: null
        },
        {
            from: "Dalian",
            to: "Pyongyang",
            lineID: "A10",
            time: 55
        },
        {
            from: "Pyongyang",
            to: "Seoul-Incheon",
            lineID: "A10",
            time: 35
        },
        {
            from: "Seoul-Incheon",
            to: "Cheonan",
            lineID: "A10",
            time: 15
        },
        {
            from: "Cheonan",
            to: "Iksan",
            lineID: "A10",
            time: 20
        },
        {
            from: "Iksan",
            to: "Gwangju",
            lineID: "A10",
            time: 15
        },
        {
            from: "Gwangju",
            to: "Shanghai",
            lineID: "A10",
            time: null
        },
        {
            from: "Shanghai",
            to: "Jinan",
            lineID: "A10",
            time: null
        },
        {
            from: "Jinan",
            to: "Tianjin",
            lineID: "A10",
            time: null
        },
        {
            from: "Urahoro",
            to: "Sapporo",
            lineID: "A13",
            time: 40
        },
        {
            from: "Sapporo",
            to: "Vladivostok",
            lineID: "A13",
            time: 125
        },
        {
            from: "Vladivostok",
            to: "Cholsan",
            lineID: "A13",
            time: null
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
            to: "Kraków",
            lineID: "E05",
            time: 30
        },
        {
            from: "Kraków",
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
            to: "Brest",
            lineID: "E07",
            time: 45
        },
        {
            from: "Brest",
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
            to: "Kraków",
            lineID: "E08",
            time: null
        },
        {
            from: "Warsaw Central",
            to: "Brest",
            lineID: "E09",
            time: 45
        },
        {
            from: "Brest",
            to: "Lviv",
            lineID: "E09",
            time: 30
        },
        {
            from: "Lviv",
            to: "Carpathia",
            lineID: "E09",
            time: null
        },
        {
            from: "Carpathia",
            to: "Danube Delta",
            lineID: "E09",
            time: null
        },
        {
            from: "Warsaw Central",
            to: "Brest",
            lineID: "E10",
            time: 45
        },
        {
            from: "Brest",
            to: "Kyiv",
            lineID: "E10",
            time: 105
        },
        {
            from: "Kyiv",
            to: "Odesa",
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
            time: 25
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
            from: "Kraków",
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
            time: 65
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
            from: "Thun",
            to: "Lausanne",
            lineID: "E27",
            time: 20
        },
        {
            from: "Lausanne",
            to: "Geneva",
            lineID: "E27",
            time: 20
        },
        {
            from: "Geneva",
            to: "Marseille",
            lineID: "E27",
            time: 55
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
            time: 20
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
            to: "Genoa",
            lineID: "E28",
            time: 15
        },
        {
            from: "Genoa",
            to: "Milan",
            lineID: "E28",
            time: 15
        },
        {
            from: "Milan",
            to: "Venice",
            lineID: "E28",
            time: 45
        },
        {
            from: "Venice",
            to: "Zagreb",
            lineID: "E28",
            time: null
        },
        {
            from: "Zagreb",
            to: "Košice",
            lineID: "E28",
            time: null
        },
        {
            from: "Košice",
            to: "Brest",
            lineID: "E28",
            time: null
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
            from: "Sparta",
            to: "Crete",
            lineID: "E30",
            time: null
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
            from: "Helsinki",
            to: "Oulu",
            lineID: "E34",
            time: 65
        },
        {
            from: "Oulu",
            to: "Rovaniemi",
            lineID: "E34",
            time: 10
        },
        {
            from: "Thessaloniki",
            to: "Çorlu",
            lineID: "E35",
            time: 75
        },
        {
            from: "Çorlu",
            to: "Danube Delta",
            lineID: "E35",
            time: 70
        },
        {
            from: "Udine",
            to: "Venice",
            lineID: "E36",
            time: 25
        },
        {
            from: "Venice",
            to: "Bologna",
            lineID: "E36",
            time: 25
        },
        {
            from: "Bologna",
            to: "Apennines",
            lineID: "E36",
            time: 95
        },
        {
            from: "Apennines",
            to: "Bari",
            lineID: "E36",
            time: 60
        },
        {
            from: "West Mediterranean",
            to: "Sardinia",
            lineID: "E37",
            time: 60
        },
        {
            from: "Sardinia",
            to: "Corsica",
            lineID: "E37",
            time: 15
        },
        {
            from: "Corsica",
            to: "North Mediterranean",
            lineID: "E37",
            time: 25
        },
        {
            from: "Pristina",
            to: "Ohrid",
            lineID: "E38",
            time: 30
        },
        {
            from: "Ohrid",
            to: "Bitola",
            lineID: "E38",
            time: 15
        },
        {
            from: "Bitola",
            to: "Prilep",
            lineID: "E38",
            time: 10
        },
        {
            from: "Prilep",
            to: "Tetovo",
            lineID: "E38",
            time: 35
        },
        {
            from: "Riga",
            to: "Aizkraukle",
            lineID: "E39",
            time: 20
        },
        {
            from: "Aizkraukle",
            to: "Daugavpils",
            lineID: "E39",
            time: 25
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
            from: "Çorlu",
            to: "Istanbul",
            lineID: "E43",
            time: 25
        },
        {
            from: "Istanbul",
            to: "Doğanyurt",
            lineID: "E43",
            time: 25
        },
        {
            from: "Thun",
            to: "Merlischachen",
            lineID: "E44",
            time: 15
        },
        {
            from: "Merlischachen",
            to: "Vaduz",
            lineID: "E44",
            time: 25
        },
        {
            from: "Vaduz",
            to: "Innsbruck",
            lineID: "E44",
            time: 25
        },
        {
            from: "Innsbruck",
            to: "Munich",
            lineID: "E44",
            time: 20
        },
        {
            from: "Nuremberg",
            to: "Plzeň",
            lineID: "E46",
            time: 35
        },
        {
            from: "Plzeň",
            to: "Prague",
            lineID: "E46",
            time: 35
        },
        {
            from: "Prague",
            to: "Dresden",
            lineID: "E46",
            time: 35
        },
        {
            from: "Dresden",
            to: "Berlin",
            lineID: "E46",
            time: null
        },
        {
            from: "Berlin",
            to: "Kiel",
            lineID: "E46",
            time: null
        },
        {
            from: "Frankfurt",
            to: "Nuremberg",
            lineID: "E47",
            time: 40
        },
        {
            from: "Nuremberg",
            to: "Munich",
            lineID: "E47",
            time: 30
        },
        {
            from: "Milan",
            to: "Turin",
            lineID: "E48",
            time: 20
        },
        {
            from: "Turin",
            to: "Monaco",
            lineID: "E48",
            time: 30
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
            time: 140
        },
        {
            from: "Oran",
            to: "Yellel",
            lineID: "F02",
            time: 15
        },
        {
            from: "Yellel",
            to: "Algiers",
            lineID: "F02",
            time: 60
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
            to: "New Haven",
            lineID: "N14",
            time: 40
        },
        {
            from: "New Haven",
            to: "Montclair",
            lineID: "N14",
            time: 20
        },
        {
            from: "Montréal",
            to: "Montclair",
            lineID: "N15",
            time: 75
        },
        {
            from: "Montclair",
            to: "Philadelphia",
            lineID: "N15",
            time: 25
        },
        {
            from: "Philadelphia",
            to: "Wallops Island",
            lineID: "N15",
            time: 30
        },
        {
            from: "Wallops Island",
            to: "Wilmington",
            lineID: "N15",
            time: null
        },
        {
            from: "Montclair",
            to: "Bloomington",
            lineID: "N16",
            time: 210
        },
        {
            from: "Bloomington",
            to: "Denver",
            lineID: "N16",
            time: null
        },
        {
            from: "Denver",
            to: "San Diego",
            lineID: "N16",
            time: null
        },
        {
            from: "San Diego",
            to: "Honolulu",
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
            from: "Grande Prairie",
            to: "Dawson Creek",
            lineID: "N18",
            time: 35
        },
        {
            from: "Dawson Creek",
            to: "Chetwynd",
            lineID: "N18",
            time: 25
        },
        {
            from: "Chetwynd",
            to: "Mackenzie",
            lineID: "N18",
            time: 40
        },
        {
            from: "Mackenzie",
            to: "Prince George",
            lineID: "N18",
            time: 30
        },
        {
            from: "Prince George",
            to: "Quesnel",
            lineID: "N18",
            time: 20
        },
        {
            from: "Quesnel",
            to: "Williams Lake",
            lineID: "N18",
            time: 30
        },
        {
            from: "Williams Lake",
            to: "Cache Creek",
            lineID: "N18",
            time: 45
        },
        {
            from: "Cache Creek",
            to: "Hope",
            lineID: "N18",
            time: 30
        },
        {
            from: "Hope",
            to: "Abbotsford",
            lineID: "N18",
            time: 25
        },
        {
            from: "Abbotsford",
            to: "Vancouver",
            lineID: "N18",
            time: 20
        },
        {
            from: "Manicouagan",
            to: "Rimouski",
            lineID: "N19",
            time: 80
        },
        {
            from: "Washington D.C.",
            to: "Philadelphia",
            lineID: "N20",
            time: 40
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
            from: "Atlanta",
            to: "Bloomington",
            lineID: "N23",
            time: 100
        },
        {
            from: "Bloomington",
            to: "Gary",
            lineID: "N23",
            time: 45
        },
        {
            from: "Atlanta",
            to: "Knoxville",
            lineID: "N24",
            time: 35
        },
        {
            from: "Knoxville",
            to: "Wallops Island",
            lineID: "N24",
            time: 145
        },
        {
            from: "Atlanta",
            to: "Savannah",
            lineID: "N29",
            time: 75
        },
        {
            from: "Savannah",
            to: "Jacksonville",
            lineID: "N29",
            time: 30
        },
        {
            from: "Jacksonville",
            to: "Tallahassee",
            lineID: "N29",
            time: 35
        },
        {
            from: "Tallahassee",
            to: "Atlanta",
            lineID: "N29",
            time: 50
        },
        {
            from: "Montclair",
            to: "Scranton",
            lineID: "N31",
            time: 30
        },
        {
            from: "Scranton",
            to: "Harrisburg",
            lineID: "N31",
            time: 30
        },
        {
            from: "Harrisburg",
            to: "Washington D.C.",
            lineID: "N31",
            time: 25
        },
        {
            from: "Prince George",
            to: "Vanderhoof",
            lineID: "N33",
            time: 25
        },
        {
            from: "Vanderhoof",
            to: "Fraser Lake",
            lineID: "N33",
            time: 15
        },
        {
            from: "Fraser Lake",
            to: "Burns Lake",
            lineID: "N33",
            time: 20
        },
        {
            from: "Burns Lake",
            to: "Houston",
            lineID: "N33",
            time: 30
        },
        {
            from: "Houston",
            to: "Smithers",
            lineID: "N33",
            time: 15
        },
        {
            from: "Smithers",
            to: "Terrace",
            lineID: "N33",
            time: 30
        },
        {
            from: "Terrace",
            to: "Prince Rupert",
            lineID: "N33",
            time: 25
        },
        {
            from: "Prince Rupert",
            to: "Haida Gwaii",
            lineID: "N33",
            time: null
        },
        {
            from: "Vanderhoof",
            to: "Fort St. James",
            lineID: "N37",
            time: 10
        },
        {
            from: "Terrace",
            to: "Kitimat",
            lineID: "N38",
            time: 10
        },
        {
            from: "Dawson Creek",
            to: "Tumbler Ridge",
            lineID: "N41",
            time: 25
        },
        {
            from: "Tumbler Ridge",
            to: "Chetwynd",
            lineID: "N41",
            time: 25
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
            from: "Maracaibo",
            to: "Barranquilla",
            lineID: "S03",
            time: null
        },
        {
            from: "Barranquilla",
            to: "Cartagena",
            lineID: "S03",
            time: null
        },
        {
            from: "Cartagena",
            to: "Medellín",
            lineID: "S03",
            time: null
        },
        {
            from: "Medellín",
            to: "Bogotá",
            lineID: "S03",
            time: null
        },
        {
            from: "Bogotá",
            to: "Ibagué",
            lineID: "S03",
            time: null
        },
        {
            from: "Ibagué",
            to: "Cali",
            lineID: "S03",
            time: null
        },
        {
            from: "Cali",
            to: "Pasto",
            lineID: "S03",
            time: null
        },
        {
            from: "Pasto",
            to: "Quito",
            lineID: "S03",
            time: null
        },
        {
            from: "Quito",
            to: "Cuenca",
            lineID: "S03",
            time: null
        },
        {
            from: "Cuenca",
            to: "Sullana",
            lineID: "S03",
            time: null
        },
        {
            from: "Sullana",
            to: "Chiclayo",
            lineID: "S03",
            time: null
        },
        {
            from: "Chiclayo",
            to: "Chimbote",
            lineID: "S03",
            time: null
        },
        {
            from: "Chimbote",
            to: "Ica",
            lineID: "S03",
            time: null
        },
        {
            from: "Ica",
            to: "Cusco",
            lineID: "S03",
            time: null
        },
        {
            from: "Cusco",
            to: "Puno",
            lineID: "S03",
            time: null
        },
        {
            from: "Puno",
            to: "La Paz",
            lineID: "S03",
            time: null
        },
        {
            from: "La Paz",
            to: "Sucre",
            lineID: "S03",
            time: null
        },
        {
            from: "Sucre",
            to: "General Eugenio A. Garay",
            lineID: "S03",
            time: null
        },
        {
            from: "General Eugenio A. Garay",
            to: "Rio Verde",
            lineID: "S03",
            time: null
        },
        {
            from: "Rio Verde",
            to: "Asunción",
            lineID: "S03",
            time: null
        },
        {
            from: "Trinidad",
            to: "Georgetown",
            lineID: "S04",
            time: null
        },
        {
            from: "Georgetown",
            to: "Nieuw Nickerie",
            lineID: "S04",
            time: null
        },
        {
            from: "Nieuw Nickerie",
            to: "Paramaribo",
            lineID: "S04",
            time: null
        },
        {
            from: "Paramaribo",
            to: "Saint-Laurent-du-Maroni",
            lineID: "S04",
            time: null
        },
        {
            from: "Saint-Laurent-du-Maroni",
            to: "Cayenne",
            lineID: "S04",
            time: null
        },
        {
            from: "Cayenne",
            to: "Amapá",
            lineID: "S04",
            time: null
        },
        {
            from: "Amapá",
            to: "Macapá",
            lineID: "S04",
            time: null
        },
        {
            from: "Macapá",
            to: "Belém",
            lineID: "S04",
            time: null
        },
        {
            from: "San Jose",
            to: "Denver",
            lineID: "T01",
            time: 260
        },
        {
            from: "Denver",
            to: "Montréal",
            lineID: "T01",
            time: 490
        },
        {
            from: "Montréal",
            to: "Rimouski",
            lineID: "T01",
            time: 95
        },
        {
            from: "Rimouski",
            to: "Rennes",
            lineID: "T01",
            time: 865
        },
        {
            from: "Rennes",
            to: "Paris (FR)",
            lineID: "T01",
            time: 65
        },
        {
            from: "Paris (FR)",
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
            from: "Basra",
            to: "Tel Aviv",
            lineID: "T02",
            time: null
        },
        {
            from: "Tel Aviv",
            to: "Antalya",
            lineID: "T02",
            time: 120
        },
        {
            from: "Antalya",
            to: "Istanbul",
            lineID: "T02",
            time: 70
        },
        {
            from: "Istanbul",
            to: "Danube Delta",
            lineID: "T02",
            time: 60
        },
        {
            from: "Danube Delta",
            to: "Odesa",
            lineID: "T02",
            time: 35
        },
        {
            from: "Reykjavík",
            to: "Isle of Man",
            lineID: "T03",
            time: null
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
            time: 70
        },
        {
            from: "Pyrenees",
            to: "Mequinenza",
            lineID: "T03",
            time: 50
        },
        {
            from: "Mequinenza",
            to: "Yellel",
            lineID: "T03",
            time: 75
        },
        {
            from: "Yellel",
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
            from: "Danube Delta",
            to: "Doğanyurt",
            lineID: "T04",
            time: 100
        },
        {
            from: "Doğanyurt",
            to: "Ureki",
            lineID: "T04",
            time: 110
        },
        {
            from: "Ureki",
            to: "Rasht",
            lineID: "T04",
            time: 165
        },
        {
            from: "Rasht",
            to: "Basra",
            lineID: "T04",
            time: 115
        },
        {
            from: "Basra",
            to: "Sanaa",
            lineID: "T04",
            time: null
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
            to: "Lashio",
            lineID: "T05",
            time: 360
        },
        {
            from: "Lashio",
            to: "Phuket",
            lineID: "T05",
            time: 185
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
            from: "Montréal",
            to: "Tasiujaq",
            lineID: "T08",
            time: null
        },
        {
            from: "Tasiujaq",
            to: "Iqaluit",
            lineID: "T08",
            time: null
        },
        {
            from: "Iqaluit",
            to: "Nuuk",
            lineID: "T08",
            time: null
        },
        {
            from: "Nuuk",
            to: "Ittoqqortoormiit",
            lineID: "T08",
            time: null
        },
        {
            from: "Ittoqqortoormiit",
            to: "Reykjavík",
            lineID: "T08",
            time: null
        },
        {
            from: "Miami",
            to: "Grand Bahama",
            lineID: "T09",
            time: null
        },
        {
            from: "Grand Bahama",
            to: "Holguín",
            lineID: "T09",
            time: null
        },
        {
            from: "Holguín",
            to: "Port-au-Prince",
            lineID: "T09",
            time: null
        },
        {
            from: "Port-au-Prince",
            to: "Santo Domingo",
            lineID: "T09",
            time: null
        },
        {
            from: "Port-au-Prince",
            to: "Maracaibo",
            lineID: "T09",
            time: null
        },
        {
            from: "Santo Domingo",
            to: "San Juan",
            lineID: "T09",
            time: null
        },
        {
            from: "San Juan",
            to: "Virgin Islands",
            lineID: "T09",
            time: null
        },
        {
            from: "Virgin Islands",
            to: "St. Kitts",
            lineID: "T09",
            time: null
        },
        {
            from: "St. Kitts",
            to: "Antigua",
            lineID: "T09",
            time: null
        },
        {
            from: "Antigua",
            to: "Guadeloupe",
            lineID: "T09",
            time: null
        },
        {
            from: "Guadeloupe",
            to: "Dominica",
            lineID: "T09",
            time: null
        },
        {
            from: "Dominica",
            to: "Martinique",
            lineID: "T09",
            time: null
        },
        {
            from: "Martinique",
            to: "St. Lucia",
            lineID: "T09",
            time: null
        },
        {
            from: "St. Lucia",
            to: "St. Vincent",
            lineID: "T09",
            time: null
        },
        {
            from: "St. Vincent",
            to: "Grenada",
            lineID: "T09",
            time: null
        },
        {
            from: "Grenada",
            to: "Trinidad",
            lineID: "T09",
            time: null
        },
        {
            from: "Trinidad",
            to: "Puerto La Cruz",
            lineID: "T09",
            time: null
        },
        {
            from: "Puerto La Cruz",
            to: "Caracas",
            lineID: "T09",
            time: null
        },
        {
            from: "Caracas",
            to: "Maracaibo",
            lineID: "T09",
            time: null
        },
        {
            from: "Medellín",
            to: "Panama City",
            lineID: "T10",
            time: null
        },
        {
            from: "Panama City",
            to: "David",
            lineID: "T10",
            time: null
        },
        {
            from: "David",
            to: "San José",
            lineID: "T10",
            time: null
        },
        {
            from: "San José",
            to: "Managua",
            lineID: "T10",
            time: null
        },
        {
            from: "Managua",
            to: "Tegucigalpa",
            lineID: "T10",
            time: null
        },
        {
            from: "Tegucigalpa",
            to: "San Salvador",
            lineID: "T10",
            time: null
        },
        {
            from: "San Salvador",
            to: "Guatemala City",
            lineID: "T10",
            time: null
        },
        {
            from: "Guatemala City",
            to: "Quetzaltenango",
            lineID: "T10",
            time: null
        },
        {
            from: "Quetzaltenango",
            to: "Arriaga",
            lineID: "T10",
            time: null
        },
        {
            from: "Arriaga",
            to: "Oaxaca",
            lineID: "T10",
            time: null
        },
        {
            from: "Oaxaca",
            to: "Tehuacán",
            lineID: "T10",
            time: null
        },
        {
            from: "Tehuacán",
            to: "Puebla",
            lineID: "T10",
            time: null
        },
        {
            from: "Puebla",
            to: "Guadalajara",
            lineID: "T10",
            time: null
        },
        {
            from: "Guadalajara",
            to: "Mazatlán",
            lineID: "T10",
            time: null
        },
        {
            from: "Mazatlán",
            to: "Cabo San Lucas",
            lineID: "T10",
            time: null
        },
        {
            from: "Cabo San Lucas",
            to: "Guerrero Negro",
            lineID: "T10",
            time: null
        },
        {
            from: "Guerrero Negro",
            to: "Ensenada",
            lineID: "T10",
            time: null
        },
        {
            from: "Ensenada",
            to: "Tijuana",
            lineID: "T10",
            time: null
        },
        {
            from: "Tijuana",
            to: "San Diego",
            lineID: "T10",
            time: null
        },
        {
            from: "Paris (DK)",
            to: "Denmark (NS)",
            lineID: "T11",
            time: 1075
        },
        {
            from: "Denmark (NS)",
            to: "Denmark (ME)",
            lineID: "T11",
            time: 125
        },
        {
            from: "Denmark (ME)",
            to: "Denmark (NY)",
            lineID: "T11",
            time: 70
        },
        {
            from: "Denmark (NY)",
            to: "Denmark (MI)",
            lineID: "T11",
            time: 120
        },
        {
            from: "Denmark (MI)",
            to: "Denmark (WI)",
            lineID: "T11",
            time: null
        },
        {
            from: "Denmark (WI)",
            to: "Denmark (IA)",
            lineID: "T11",
            time: null
        },
        {
            from: "Denmark (IA)",
            to: "Denmark (IL)",
            lineID: "T11",
            time: null
        },
        {
            from: "Denmark (IL)",
            to: "Denmark (TN)",
            lineID: "T11",
            time: null
        },
        {
            from: "Denmark (TN)",
            to: "Denmark (MS)",
            lineID: "T11",
            time: null
        },
        {
            from: "Denmark (MS)",
            to: "Denmark (AR)",
            lineID: "T11",
            time: null
        },
        {
            from: "Denmark (AR)",
            to: "Denmark (KS)",
            lineID: "T11",
            time: null
        },
        {
            from: "West Mediterranean",
            to: "Mequinenza",
            lineID: "T12",
            time: 65
        },
        {
            from: "Mequinenza",
            to: "Porto",
            lineID: "T12",
            time: 120
        },
        {
            from: "Porto",
            to: "Ponta Delgada",
            lineID: "T12",
            time: 265
        },
        {
            from: "Ponta Delgada",
            to: "Wallops Island",
            lineID: "T12",
            time: 650
        },
        {
            from: "Kyiv",
            to: "Saratov",
            lineID: "T13",
            time: 220
        },
        {
            from: "Saratov",
            to: "Orenburg",
            lineID: "T13",
            time: 130
        },
        {
            from: "Orenburg",
            to: "Baikonur",
            lineID: "T13",
            time: 195
        },
        {
            from: "Amsterdam Central",
            to: "Charleville-Mézières",
            lineID: "HBL",
            time: 40
        },
        {
            from: "Amsterdam Central",
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
            from: "Charleville-Mézières",
            to: "Queen's Cross",
            lineID: "HBL",
            time: 65
        },
        {
            from: "Charleville-Mézières",
            to: "Rennes",
            lineID: "HBL",
            time: 85
        },
        {
            from: "Queen's Cross",
            to: "Rennes",
            lineID: "HBL",
            time: 60
        },

        {
            from: "Apennines",
            to: "Central Mediterranean",
            lineID: "HCY",
            time: null
        },
        {
            from: "Apennines",
            to: "Charleville-Mézières",
            lineID: "HCY",
            time: 145
        },
        {
            from: "Apennines",
            to: "Corsica",
            lineID: "HCY",
            time: 65
        },
        {
            from: "Apennines",
            to: "Lausanne",
            lineID: "HCY",
            time: 120
        },
        {
            from: "Apennines",
            to: "Mallorca",
            lineID: "HCY",
            time: null
        },
        {
            from: "Apennines",
            to: "Mequinenza",
            lineID: "HCY",
            time: null
        },
        {
            from: "Apennines",
            to: "Milan",
            lineID: "HCY",
            time: 100
        },
        {
            from: "Apennines",
            to: "Rennes",
            lineID: "HCY",
            time: null
        },
        {
            from: "Apennines",
            to: "Sardinia",
            lineID: "HCY",
            time: 60
        },
        {
            from: "Apennines",
            to: "Sparta",
            lineID: "HCY",
            time: null
        },
        {
            from: "Apennines",
            to: "Thessaloniki",
            lineID: "HCY",
            time: null
        },
        {
            from: "Apennines",
            to: "Tirana",
            lineID: "HCY",
            time: null
        },
        {
            from: "Central Mediterranean",
            to: "Charleville-Mézières",
            lineID: "HCY",
            time: null
        },
        {
            from: "Central Mediterranean",
            to: "Corsica",
            lineID: "HCY",
            time: null
        },
        {
            from: "Central Mediterranean",
            to: "Lausanne",
            lineID: "HCY",
            time: null
        },
        {
            from: "Central Mediterranean",
            to: "Mallorca",
            lineID: "HCY",
            time: null
        },
        {
            from: "Central Mediterranean",
            to: "Mequinenza",
            lineID: "HCY",
            time: null
        },
        {
            from: "Central Mediterranean",
            to: "Milan",
            lineID: "HCY",
            time: null
        },
        {
            from: "Central Mediterranean",
            to: "Rennes",
            lineID: "HCY",
            time: null
        },
        {
            from: "Central Mediterranean",
            to: "Sardinia",
            lineID: "HCY",
            time: null
        },
        {
            from: "Central Mediterranean",
            to: "Sparta",
            lineID: "HCY",
            time: null
        },
        {
            from: "Central Mediterranean",
            to: "Thessaloniki",
            lineID: "HCY",
            time: null
        },
        {
            from: "Central Mediterranean",
            to: "Tirana",
            lineID: "HCY",
            time: null
        },
        {
            from: "Charleville-Mézières",
            to: "Corsica",
            lineID: "HCY",
            time: 85
        },
        {
            from: "Charleville-Mézières",
            to: "Lausanne",
            lineID: "HCY",
            time: 35
        },
        {
            from: "Charleville-Mézières",
            to: "Mallorca",
            lineID: "HCY",
            time: null
        },
        {
            from: "Charleville-Mézières",
            to: "Mequinenza",
            lineID: "HCY",
            time: null
        },
        {
            from: "Charleville-Mézières",
            to: "Milan",
            lineID: "HCY",
            time: 50
        },
        {
            from: "Charleville-Mézières",
            to: "Rennes",
            lineID: "HCY",
            time: null
        },
        {
            from: "Charleville-Mézières",
            to: "Sardinia",
            lineID: "HCY",
            time: 95
        },
        {
            from: "Charleville-Mézières",
            to: "Sparta",
            lineID: "HCY",
            time: null
        },
        {
            from: "Charleville-Mézières",
            to: "Thessaloniki",
            lineID: "HCY",
            time: null
        },
        {
            from: "Charleville-Mézières",
            to: "Tirana",
            lineID: "HCY",
            time: null
        },
        {
            from: "Corsica",
            to: "Lausanne",
            lineID: "HCY",
            time: 60
        },
        {
            from: "Corsica",
            to: "Mallorca",
            lineID: "HCY",
            time: null
        },
        {
            from: "Corsica",
            to: "Mequinenza",
            lineID: "HCY",
            time: null
        },
        {
            from: "Corsica",
            to: "Milan",
            lineID: "HCY",
            time: 35
        },
        {
            from: "Corsica",
            to: "Rennes",
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
            to: "Sparta",
            lineID: "HCY",
            time: null
        },
        {
            from: "Corsica",
            to: "Thessaloniki",
            lineID: "HCY",
            time: null
        },
        {
            from: "Corsica",
            to: "Tirana",
            lineID: "HCY",
            time: null
        },
        {
            from: "Lausanne",
            to: "Mallorca",
            lineID: "HCY",
            time: null
        },
        {
            from: "Lausanne",
            to: "Mequinenza",
            lineID: "HCY",
            time: null
        },
        {
            from: "Lausanne",
            to: "Milan",
            lineID: "HCY",
            time: 25
        },
        {
            from: "Lausanne",
            to: "Rennes",
            lineID: "HCY",
            time: null
        },
        {
            from: "Lausanne",
            to: "Sardinia",
            lineID: "HCY",
            time: 70
        },
        {
            from: "Lausanne",
            to: "Sparta",
            lineID: "HCY",
            time: null
        },
        {
            from: "Lausanne",
            to: "Thessaloniki",
            lineID: "HCY",
            time: null
        },
        {
            from: "Lausanne",
            to: "Tirana",
            lineID: "HCY",
            time: null
        },
        {
            from: "Mallorca",
            to: "Mequinenza",
            lineID: "HCY",
            time: null
        },
        {
            from: "Mallorca",
            to: "Milan",
            lineID: "HCY",
            time: null
        },
        {
            from: "Mallorca",
            to: "Rennes",
            lineID: "HCY",
            time: null
        },
        {
            from: "Mallorca",
            to: "Sardinia",
            lineID: "HCY",
            time: null
        },
        {
            from: "Mallorca",
            to: "Sparta",
            lineID: "HCY",
            time: null
        },
        {
            from: "Mallorca",
            to: "Thessaloniki",
            lineID: "HCY",
            time: null
        },
        {
            from: "Mallorca",
            to: "Tirana",
            lineID: "HCY",
            time: null
        },
        {
            from: "Mequinenza",
            to: "Milan",
            lineID: "HCY",
            time: null
        },
        {
            from: "Mequinenza",
            to: "Rennes",
            lineID: "HCY",
            time: null
        },
        {
            from: "Mequinenza",
            to: "Sardinia",
            lineID: "HCY",
            time: null
        },
        {
            from: "Mequinenza",
            to: "Sparta",
            lineID: "HCY",
            time: null
        },
        {
            from: "Mequinenza",
            to: "Thessaloniki",
            lineID: "HCY",
            time: null
        },
        {
            from: "Mequinenza",
            to: "Tirana",
            lineID: "HCY",
            time: null
        },
        {
            from: "Milan",
            to: "Rennes",
            lineID: "HCY",
            time: null
        },
        {
            from: "Milan",
            to: "Sardinia",
            lineID: "HCY",
            time: 50
        },
        {
            from: "Milan",
            to: "Sparta",
            lineID: "HCY",
            time: null
        },
        {
            from: "Milan",
            to: "Thessaloniki",
            lineID: "HCY",
            time: null
        },
        {
            from: "Milan",
            to: "Tirana",
            lineID: "HCY",
            time: null
        },
        {
            from: "Rennes",
            to: "Sardinia",
            lineID: "HCY",
            time: null
        },
        {
            from: "Rennes",
            to: "Sparta",
            lineID: "HCY",
            time: null
        },
        {
            from: "Rennes",
            to: "Thessaloniki",
            lineID: "HCY",
            time: null
        },
        {
            from: "Rennes",
            to: "Tirana",
            lineID: "HCY",
            time: null
        },
        {
            from: "Sardinia",
            to: "Sparta",
            lineID: "HCY",
            time: null
        },
        {
            from: "Sardinia",
            to: "Thessaloniki",
            lineID: "HCY",
            time: null
        },
        {
            from: "Sardinia",
            to: "Tirana",
            lineID: "HCY",
            time: null
        },
        {
            from: "Sparta",
            to: "Thessaloniki",
            lineID: "HCY",
            time: null
        },
        {
            from: "Sparta",
            to: "Tirana",
            lineID: "HCY",
            time: null
        },
        {
            from: "Thessaloniki",
            to: "Tirana",
            lineID: "HCY",
            time: null
        },
        {
            from: "Amsterdam Central",
            to: "Charleville-Mézières",
            lineID: "HGR",
            time: 60
        },
        {
            from: "Amsterdam Central",
            to: "Kiel",
            lineID: "HGR",
            time: 75
        },
        {
            from: "Amsterdam Central",
            to: "Pardubice",
            lineID: "HGR",
            time: 140
        },
        {
            from: "Amsterdam Central",
            to: "Warsaw Central",
            lineID: "HGR",
            time: 165
        },
        {
            from: "Charleville-Mézières",
            to: "Kiel",
            lineID: "HGR",
            time: 80
        },
        {
            from: "Charleville-Mézières",
            to: "Pardubice",
            lineID: "HGR",
            time: 145
        },
        {
            from: "Charleville-Mézières",
            to: "Warsaw Central",
            lineID: "HGR",
            time: 170
        },
        {
            from: "Kiel",
            to: "Warsaw Central",
            lineID: "HGR",
            time: 135
        },
        {
            from: "Kiel",
            to: "Pardubice",
            lineID: "HGR",
            time: 110
        },
        {
            from: "Pardubice",
            to: "Warsaw Central",
            lineID: "HGR",
            time: 70
        },
        {
            from: "Beijing",
            to: "Cholsan",
            lineID: "HMA",
            time: null
        },
        {
            from: "Beijing",
            to: "Dalian",
            lineID: "HMA",
            time: null
        },
        {
            from: "Beijing",
            to: "Fukuoka",
            lineID: "HMA",
            time: null
        },
        {
            from: "Beijing",
            to: "Jinan",
            lineID: "HMA",
            time: null
        },
        {
            from: "Beijing",
            to: "Osaka",
            lineID: "HMA",
            time: null
        },
        {
            from: "Beijing",
            to: "Seoul-Incheon",
            lineID: "HMA",
            time: null
        },
        {
            from: "Beijing",
            to: "Shanghai",
            lineID: "HMA",
            time: null
        },
        {
            from: "Beijing",
            to: "Tokyo",
            lineID: "HMA",
            time: null
        },
        {
            from: "Beijing",
            to: "Yantai",
            lineID: "HMA",
            time: null
        },
        {
            from: "Cholsan",
            to: "Dalian",
            lineID: "HMA",
            time: null
        },
        {
            from: "Cholsan",
            to: "Fukuoka",
            lineID: "HMA",
            time: null
        },
        {
            from: "Cholsan",
            to: "Jinan",
            lineID: "HMA",
            time: null
        },
        {
            from: "Cholsan",
            to: "Osaka",
            lineID: "HMA",
            time: null
        },
        {
            from: "Cholsan",
            to: "Seoul-Incheon",
            lineID: "HMA",
            time: 40
        },
        {
            from: "Cholsan",
            to: "Shanghai",
            lineID: "HMA",
            time: null
        },
        {
            from: "Cholsan",
            to: "Tokyo",
            lineID: "HMA",
            time: null
        },
        {
            from: "Cholsan",
            to: "Yantai",
            lineID: "HMA",
            time: null
        },
        {
            from: "Dalian",
            to: "Fukuoka",
            lineID: "HMA",
            time: null
        },
        {
            from: "Dalian",
            to: "Jinan",
            lineID: "HMA",
            time: null
        },
        {
            from: "Dalian",
            to: "Osaka",
            lineID: "HMA",
            time: null
        },
        {
            from: "Dalian",
            to: "Seoul-Incheon",
            lineID: "HMA",
            time: null
        },
        {
            from: "Dalian",
            to: "Shanghai",
            lineID: "HMA",
            time: null
        },
        {
            from: "Dalian",
            to: "Tokyo",
            lineID: "HMA",
            time: null
        },
        {
            from: "Dalian",
            to: "Yantai",
            lineID: "HMA",
            time: null
        },
        {
            from: "Fukuoka",
            to: "Jinan",
            lineID: "HMA",
            time: null
        },
        {
            from: "Fukuoka",
            to: "Osaka",
            lineID: "HMA",
            time: null
        },
        {
            from: "Fukuoka",
            to: "Seoul-Incheon",
            lineID: "HMA",
            time: null
        },
        {
            from: "Fukuoka",
            to: "Shanghai",
            lineID: "HMA",
            time: null
        },
        {
            from: "Fukuoka",
            to: "Tokyo",
            lineID: "HMA",
            time: null
        },
        {
            from: "Fukuoka",
            to: "Yantai",
            lineID: "HMA",
            time: null
        },
        {
            from: "Jinan",
            to: "Osaka",
            lineID: "HMA",
            time: null
        },
        {
            from: "Jinan",
            to: "Seoul-Incheon",
            lineID: "HMA",
            time: null
        },
        {
            from: "Jinan",
            to: "Shanghai",
            lineID: "HMA",
            time: null
        },
        {
            from: "Jinan",
            to: "Tokyo",
            lineID: "HMA",
            time: null
        },
        {
            from: "Jinan",
            to: "Yantai",
            lineID: "HMA",
            time: null
        },
        {
            from: "Osaka",
            to: "Seoul-Incheon",
            lineID: "HMA",
            time: null
        },
        {
            from: "Osaka",
            to: "Shanghai",
            lineID: "HMA",
            time: null
        },
        {
            from: "Osaka",
            to: "Tokyo",
            lineID: "HMA",
            time: null
        },
        {
            from: "Osaka",
            to: "Yantai",
            lineID: "HMA",
            time: null
        },
        {
            from: "Seoul-Incheon",
            to: "Shanghai",
            lineID: "HMA",
            time: null
        },
        {
            from: "Seoul-Incheon",
            to: "Tokyo",
            lineID: "HMA",
            time: null
        },
        {
            from: "Seoul-Incheon",
            to: "Yantai",
            lineID: "HMA",
            time: null
        },
        {
            from: "Shanghai",
            to: "Tokyo",
            lineID: "HMA",
            time: null
        },
        {
            from: "Shanghai",
            to: "Yantai",
            lineID: "HMA",
            time: null
        },
        {
            from: "Tokyo",
            to: "Yantai",
            lineID: "HMA",
            time: null
        },
        {
            from: "San Jose",
            to: "Bellingham",
            lineID: "HPU",
            time: 135
        }
    ]
} as NetworkData;

export default networkData;

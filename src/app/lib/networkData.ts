import { LineType, NetworkData } from "@/app/lib/interfaces";

const networkData = {
    lines: [
        {
            id: "A01",
            name: "Big Bridge Line Georgian Branch",
            colour: "#b80b4b",
            type: LineType.LSR
        },
        {
            id: "A02",
            name: "Cypriot Line",
            colour: "#cec92a",
            type: LineType.LSR
        },
        {
            id: "E01",
            name: "Brighton Red Line",
            colour: "#ed1c2a",
            type: LineType.LSR
        },
        {
            id: "E02",
            name: "Birmingham Yellow Line",
            colour: "#ffcd02",
            type: LineType.LSR
        },
        {
            id: "E03",
            name: "Newcastle Green Line",
            colour: "#77c696",
            type: LineType.LSR
        },
        {
            id: "E04",
            name: "Vistula Express Line",
            colour: "#080e5c",
            type: LineType.LSR
        },
        {
            id: "E05",
            name: "Tatra Line",
            colour: "#f78f4b",
            type: LineType.LSR
        },
        {
            id: "E06",
            name: "Baltic Line",
            colour: "#ed1c2a",
            type: LineType.LSR
        },
        {
            id: "E07",
            name: "Dźwina Line",
            colour: "#4c90cd",
            type: LineType.LSR
        },
        {
            id: "E08",
            name: "Vistula Line",
            colour: "#008c5a",
            type: LineType.LSR
        },
        {
            id: "E09",
            name: "Carpathia Line",
            colour: "#e0b03b",
            type: LineType.LSR
        },
        {
            id: "E10",
            name: "Dnieper Line",
            colour: "#ffcd02",
            type: LineType.LSR
        },
        {
            id: "E11",
            name: "E11",
            colour: "#ed1c2a",
            type: LineType.LSR
        },
        {
            id: "E12",
            name: "E12",
            colour: "#080e5c",
            type: LineType.LSR
        },
        {
            id: "E13",
            name: "Transylvania Line",
            colour: "#662c91",
            type: LineType.LSR
        },
        {
            id: "E14",
            name: "Zakynthos Line",
            colour: "#cccccc",
            type: LineType.LSR
        },
        {
            id: "E15",
            name: "Prespa Line",
            colour: "#b80b4b",
            type: LineType.LSR
        },
        {
            id: "E16",
            name: "Transadriatic Line",
            colour: "#c5a3cd",
            type: LineType.LSR
        },
        {
            id: "E17",
            name: "Finnish Regional Line",
            colour: "#006db8",
            type: LineType.LSR
        },
        {
            id: "E18",
            name: "E18",
            colour: "#662c91",
            type: LineType.LSR
        },
        {
            id: "E19",
            name: "Danish Line",
            colour: "#00b397",
            type: LineType.LSR
        },
        {
            id: "E20",
            name: "E20",
            colour: "#ffcd02",
            type: LineType.LSR
        },
        {
            id: "E21",
            name: "E21",
            colour: "#cccccc",
            type: LineType.LSR
        },
        {
            id: "E22",
            name: "Silesia Line",
            colour: "#00665c",
            type: LineType.LSR
        },
        {
            id: "E23",
            name: "Moravia Line",
            colour: "#77c696",
            type: LineType.LSR
        },
        {
            id: "E30",
            name: "Big Bridge Line Thessaloniki Branch",
            colour: "#bb4a9b",
            type: LineType.LSR
        },
        {
            id: "E31",
            name: "Big Bridge Line Mequinenza Branch",
            colour: "#b80b4b",
            type: LineType.LSR
        },
        {
            id: "F01",
            name: "Lampedusa Line",
            colour: "#ffcd02",
            type: LineType.LSR
        },
        {
            id: "F02",
            name: "North Africa Line",
            colour: "#f78f4b",
            type: LineType.LSR
        },
        {
            id: "F03",
            name: "Sahara Line",
            colour: "#a8842d",
            type: LineType.LSR
        },
        {
            id: "HBL",
            name: "Blue HSR",
            colour: "#4c90cd",
            type: LineType.HSR
        },
        {
            id: "HGR",
            name: "Green HSR",
            colour: "#30a442",
            type: LineType.HSR
        },
        {
            id: "T01",
            name: "Big Bridge Line",
            colour: "#f59fb3",
            type: LineType.LSR
        },
        {
            id: "T02",
            name: "Big Bridge Line Istanbul Branch",
            colour: "#c5a3cd",
            type: LineType.LSR
        },
        {
            id: "T03",
            name: "Atlantic Line",
            colour: "#87d3df",
            type: LineType.LSR
        }
    ],
    stations: [
        {
            name: "Accra"
        },
        {
            name: "Alexandria"
        },
        {
            name: "Algiers"
        },
        {
            name: "Amsterdam Centraal"
        },
        {
            name: "Antalya"
        },
        {
            name: "Baikonur"
        },
        {
            name: "Bari"
        },
        {
            name: "Bayreuth"
        },
        {
            name: "Belgrade"
        },
        {
            name: "Benghazi"
        },
        {
            name: "Birmingham"
        },
        {
            name: "Bornholm"
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
            name: "Brno"
        },
        {
            name: "Bydgoszcz"
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
            name: "Compiègne"
        },
        {
            name: "Copenhagen"
        },
        {
            name: "Düsseldorf"
        },
        {
            name: "Frankfurt"
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
            name: "Helsinki"
        },
        {
            name: "Isle of Man"
        },
        {
            name: "Istanbul"
        },
        {
            name: "Kaliningrad"
        },
        {
            name: "Karlsruhe"
        },
        {
            name: "Kaunas"
        },
        {
            name: "Kiel"
        },
        {
            name: "Kotka"
        },
        {
            name: "Košice"
        },
        {
            name: "Katowice"
        },
        {
            name: "Kyiv"
        },
        {
            name: "La Rochelle"
        },
        {
            name: "Lampedusa"
        },
        {
            name: "Lappeenranta"
        },
        {
            name: "Ljubljana"
        },
        {
            name: "Lublin"
        },
        {
            name: "Marrakesh"
        },
        {
            name: "Mequinenza"
        },
        {
            name: "Newcastle"
        },
        {
            name: "Nicosia"
        },
        {
            name: "Odessa"
        },
        {
            name: "Oran"
        },
        {
            name: "Orléans"
        },
        {
            name: "Pardubice"
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
            name: "Porvoo"
        },
        {
            name: "Prague"
        },
        {
            name: "Pristina"
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
            name: "Rasht"
        },
        {
            name: "Rennes"
        },
        {
            name: "Riga"
        },
        {
            name: "Romanian Slime Farm"
        },
        {
            name: "Sarajevo"
        },
        {
            name: "Sfax"
        },
        {
            name: "Southampton"
        },
        {
            name: "Sparta"
        },
        {
            name: "Sweden"
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
            name: "Tel Aviv"
        },
        {
            name: "Thessaloniki"
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
            name: "Tunis"
        },
        {
            name: "Turku"
        },
        {
            name: "Valencia"
        },
        {
            name: "Venice"
        },
        {
            name: "Vienna"
        },
        {
            name: "Warsaw Central"
        },
        {
            name: "West Mediterranean"
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
            line_id: "A01",
            time: 185
        },
        {
            from: "Antalya",
            to: "Nicosia",
            line_id: "A02",
            time: 60
        },
        {
            from: "Nicosia",
            to: "Tel Aviv",
            line_id: "A02",
            time: 60
        },
        {
            from: "Queen's Cross",
            to: "Brighton",
            line_id: "E01",
            time: 40
        },
        {
            from: "Brighton",
            to: "Southampton",
            line_id: "E01",
            time: 20
        },
        {
            from: "Southampton",
            to: "Plymouth",
            line_id: "E01",
            time: 70
        },
        {
            from: "Queen's Cross",
            to: "Birmingham",
            line_id: "E02",
            time: 45
        },
        {
            from: "Birmingham",
            to: "Isle of Man",
            line_id: "E02",
            time: 70
        },
        {
            from: "Southampton",
            to: "Birmingham",
            line_id: "E03",
            time: 20
        },
        {
            from: "Birmingham",
            to: "Newcastle",
            line_id: "E03",
            time: 30
        },
        {
            from: "Gdańsk",
            to: "Warsaw Central",
            line_id: "E04",
            time: 65
        },
        {
            from: "Warsaw Central",
            to: "Katowice",
            line_id: "E05",
            time: 30
        },
        {
            from: "Katowice",
            to: "Košice",
            line_id: "E05",
            time: 40
        },
        {
            from: "Košice",
            to: "Timișoara",
            line_id: "E05",
            time: 40
        },
        {
            from: "Timișoara",
            to: "Belgrade",
            line_id: "E05",
            time: 15
        },
        {
            from: "Belgrade",
            to: "Thessaloniki",
            line_id: "E05",
            time: 85
        },
        {
            from: "Kiel",
            to: "Szczecin",
            line_id: "E06",
            time: 70
        },
        {
            from: "Szczecin",
            to: "Gdańsk",
            line_id: "E06",
            time: 65
        },
        {
            from: "Gdańsk",
            to: "Kaliningrad",
            line_id: "E06",
            time: 35
        },
        {
            from: "Kaliningrad",
            to: "Kaunas",
            line_id: "E06",
            time: 55
        },
        {
            from: "Kaunas",
            to: "Riga",
            line_id: "E06",
            time: 30
        },
        {
            from: "Riga",
            to: "Tallinn",
            line_id: "E06",
            time: 30
        },
        {
            from: "Tallinn",
            to: "Turku",
            line_id: "E06",
            time: null
        },
        {
            from: "Turku",
            to: "Sweden",
            line_id: "E06",
            time: null
        },
        {
            from: "Warsaw Central",
            to: "Brest (BY)",
            line_id: "E07",
            time: 40
        },
        {
            from: "Brest (BY)",
            to: "Kaunas",
            line_id: "E07",
            time: 55
        },
        {
            from: "Kaunas",
            to: "Riga",
            line_id: "E07",
            time: 30
        },
        {
            from: "Riga",
            to: "Tallinn",
            line_id: "E07",
            time: 30
        },
        {
            from: "Tallinn",
            to: "Helsinki",
            line_id: "E07",
            time: 20
        },
        {
            from: "Gdańsk",
            to: "Bydgoszcz",
            line_id: "E08",
            time: null
        },
        {
            from: "Bydgoszcz",
            to: "Płock",
            line_id: "E08",
            time: null
        },
        {
            from: "Płock",
            to: "Warsaw Central",
            line_id: "E08",
            time: null
        },
        {
            from: "Warsaw Central",
            to: "Lublin",
            line_id: "E08",
            time: null
        },
        {
            from: "Lublin",
            to: "Katowice",
            line_id: "E08",
            time: null
        },
        {
            from: "Warsaw Central",
            to: "Carpathia",
            line_id: "E09",
            time: null
        },
        {
            from: "Carpathia",
            to: "Romanian Slime Farm",
            line_id: "E09",
            time: null
        },
        {
            from: "Warsaw Central",
            to: "Brest (BY)",
            line_id: "E10",
            time: 40
        },
        {
            from: "Brest (BY)",
            to: "Kyiv",
            line_id: "E10",
            time: 105
        },
        {
            from: "Kyiv",
            to: "Odessa",
            line_id: "E10",
            time: 50
        },
        {
            from: "Belgrade",
            to: "Zagreb",
            line_id: "E11",
            time: 145
        },
        {
            from: "Zagreb",
            to: "Ljubljana",
            line_id: "E11",
            time: 45
        },
        {
            from: "Ljubljana",
            to: "Venice",
            line_id: "E11",
            time: 65
        },
        {
            from: "Belgrade",
            to: "Sarajevo",
            line_id: "E12",
            time: 100
        },
        {
            from: "Sarajevo",
            to: "Podgorica",
            line_id: "E12",
            time: 65
        },
        {
            from: "Podgorica",
            to: "Pristina",
            line_id: "E12",
            time: 30
        },
        {
            from: "Pristina",
            to: "Tirana",
            line_id: "E12",
            time: 65
        },
        {
            from: "Timișoara",
            to: "Carpathia",
            line_id: "E13",
            time: 95
        },
        {
            from: "Catania",
            to: "Zakynthos",
            line_id: "E14",
            time: 90
        },
        {
            from: "Thessaloniki",
            to: "Tirana",
            line_id: "E15",
            time: 45
        },
        {
            from: "Tirana",
            to: "Bari",
            line_id: "E16",
            time: 50
        },
        {
            from: "Bari",
            to: "Catania",
            line_id: "E16",
            time: 80
        },
        {
            from: "Helsinki",
            to: "Porvoo",
            line_id: "E17",
            time: 10
        },
        {
            from: "Porvoo",
            to: "Kotka",
            line_id: "E17",
            time: null
        },
        {
            from: "Kotka",
            to: "Lappeenranta",
            line_id: "E17",
            time: null
        },
        {
            from: "Brest (FR)",
            to: "Rennes",
            line_id: "E18",
            time: null
        },
        {
            from: "Rennes",
            to: "Orléans",
            line_id: "E18",
            time: null
        },
        {
            from: "Orléans",
            to: "Compiègne",
            line_id: "E18",
            time: null
        },
        {
            from: "Compiègne",
            to: "Charleville-Mézières",
            line_id: "E18",
            time: null
        },
        {
            from: "Charleville-Mézières",
            to: "Düsseldorf",
            line_id: "E18",
            time: null
        },
        {
            from: "Düsseldorf",
            to: "Kiel",
            line_id: "E18",
            time: null
        },
        {
            from: "Copenhagen",
            to: "Bornholm",
            line_id: "E19",
            time: 80
        },
        {
            from: "Charleville-Mézières",
            to: "Karlsruhe",
            line_id: "E20",
            time: 110
        },
        {
            from: "Mequinenza",
            to: "Gesalibar",
            line_id: "E21",
            time: 110
        },
        {
            from: "Katowice",
            to: "Pardubice",
            line_id: "E22",
            time: 60
        },
        {
            from: "Pardubice",
            to: "Prague",
            line_id: "E22",
            time: 25
        },
        {
            from: "Prague",
            to: "Bayreuth",
            line_id: "E22",
            time: 40
        },
        {
            from: "Bayreuth",
            to: "Frankfurt",
            line_id: "E22",
            time: 40
        },
        {
            from: "Pardubice",
            to: "Brno",
            line_id: "E23",
            time: 25
        },
        {
            from: "Brno",
            to: "Vienna",
            line_id: "E23",
            time: 10
        },
        {
            from: "Vienna",
            to: "Graz",
            line_id: "E23",
            time: 25
        },
        {
            from: "West Mediterranean",
            to: "Mequinenza",
            line_id: "E31",
            time: 65
        },
        {
            from: "Central Mediterranean",
            to: "Lampedusa",
            line_id: "F01",
            time: 30
        },
        {
            from: "Lampedusa",
            to: "Sfax",
            line_id: "F01",
            time: 40
        },
        {
            from: "Marrakesh",
            to: "Casablanca",
            line_id: "F02",
            time: null
        },
        {
            from: "Casablanca",
            to: "Oran",
            line_id: "F02",
            time: null
        },
        {
            from: "Oran",
            to: "Algiers",
            line_id: "F02",
            time: null
        },
        {
            from: "Algiers",
            to: "Tunis",
            line_id: "F02",
            time: 125
        },
        {
            from: "Tunis",
            to: "Sfax",
            line_id: "F02",
            time: 50
        },
        {
            from: "Sfax",
            to: "Benghazi",
            line_id: "F02",
            time: null
        },
        {
            from: "Benghazi",
            to: "Alexandria",
            line_id: "F02",
            time: null
        },
        {
            from: "Algiers",
            to: "Tamanrasset",
            line_id: "F03",
            time: null
        },
        {
            from: "Tamanrasset",
            to: "Timbuktu",
            line_id: "F03",
            time: null
        },
        {
            from: "Charleville-Mézières",
            to: "West Mediterranean",
            line_id: "T01",
            time: 115
        },
        {
            from: "West Mediterranean",
            to: "Central Mediterranean",
            line_id: "T01",
            time: 155
        },
        {
            from: "Central Mediterranean",
            to: "Catania",
            line_id: "T01",
            time: 30
        },
        {
            from: "Catania",
            to: "Sparta",
            line_id: "T01",
            time: 100
        },
        {
            from: "Sparta",
            to: "Antalya",
            line_id: "T01",
            time: 105
        },
        {
            from: "Antalya",
            to: "Rasht",
            line_id: "T01",
            time: 245
        },
        {
            from: "Rasht",
            to: "Baikonur",
            line_id: "T01",
            time: 300
        },
        {
            from: "Baikonur",
            to: "Poronaysk",
            line_id: "T01",
            time: 1075
        },
        {
            from: "Antalya",
            to: "Istanbul",
            line_id: "T02",
            time: 70
        },
        {
            from: "Istanbul",
            to: "Romanian Slime Farm",
            line_id: "T02",
            time: 95
        },
        {
            from: "Romanian Slime Farm",
            to: "Odessa",
            line_id: "T02",
            time: 35
        },
        {
            from: "Southampton",
            to: "Rennes",
            line_id: "T03",
            time: 45
        },
        {
            from: "Rennes",
            to: "La Rochelle",
            line_id: "T03",
            time: null
        },
        {
            from: "La Rochelle",
            to: "Pyrenees",
            line_id: "T03",
            time: null
        },
        {
            from: "Pyrenees",
            to: "Mequinenza",
            line_id: "T03",
            time: null
        },
        {
            from: "Mequinenza",
            to: "Valencia",
            line_id: "T03",
            time: null
        },
        {
            from: "Valencia",
            to: "Oran",
            line_id: "T03",
            time: null
        },
        {
            from: "Oran",
            to: "Accra",
            line_id: "T03",
            time: null
        },
        {
            from: "Charleville-Mézières",
            to: "Amsterdam Centraal",
            line_id: "HBL",
            time: 40
        },
        {
            from: "Charleville-Mézières",
            to: "Rennes",
            line_id: "HBL",
            time: 85
        },
        {
            from: "Charleville-Mézières",
            to: "Queen's Cross",
            line_id: "HBL",
            time: 65
        },
        {
            from: "Amsterdam Centraal",
            to: "Rennes",
            line_id: "HBL",
            time: 85
        },
        {
            from: "Amsterdam Centraal",
            to: "Queen's Cross",
            line_id: "HBL",
            time: 65
        },
        {
            from: "Rennes",
            to: "Queen's Cross",
            line_id: "HBL",
            time: 60
        },
        {
            from: "Amsterdam Centraal",
            to: "Warsaw Central",
            line_id: "HGR",
            time: 165
        }
    ]
} as NetworkData;

export default networkData;

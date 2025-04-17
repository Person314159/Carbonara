import { NetworkData } from "@/app/lib/interfaces";

const networkData = {
    lines: [
        {
            id: "A01",
            name: "Big Bridge Line Georgian Branch",
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
            name: "Warzone Express Line",
            colour: "#662c91",
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
            name: "Vistula Express Line",
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
            name: "Vistula Line",
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
            id: "E18",
            name: "E18",
            colour: "#662c91",
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
            name: "E20",
            colour: "#ffcd02",
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
            id: "E30",
            name: "Big Bridge Line Thessaloniki Branch",
            colour: "#bb4a9b",
            type: "LSR"
        },
        {
            id: "E31",
            name: "Big Bridge Line Mequinenza Branch",
            colour: "#b80b4b",
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
            id: "HGR",
            name: "Green HSR",
            colour: "#30a442",
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
            name: "N11",
            colour: "#f59fb3",
            type: "LSR"
        },
        {
            id: "N12",
            name: "N12",
            colour: "#bb4a9b",
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
            name: "N14",
            colour: "#ed1c2a",
            type: "LSR"
        },
        {
            id: "N15",
            name: "N15",
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
            id: "T01",
            name: "Big Bridge Line",
            colour: "#f59fb3",
            type: "LSR"
        },
        {
            id: "T02",
            name: "Big Bridge Line Istanbul Branch",
            colour: "#c5a3cd",
            type: "LSR"
        },
        {
            id: "T03",
            name: "Atlantic Line",
            colour: "#87d3df",
            type: "LSR"
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
            name: "Baikonur End Portal"
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
            name: "Cratère-sur-Mer"
        },
        {
            name: "Del Norte End Portal"
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
            name: "Halifax"
        },
        {
            name: "Helsinki"
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
            name: "Kaliningrad"
        },
        {
            name: "Karlsruhe"
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
            name: "Montréal Central"
        },
        {
            name: "Newcastle"
        },
        {
            name: "New Orleans"
        },
        {
            name: "New York Central"
        },
        {
            name: "Nicosia"
        },
        {
            name: "Norfolk"
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
            name: "Ottawa"
        },
        {
            name: "Pardubice"
        },
        {
            name: "Paterborn"
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
            name: "Québec"
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
            name: "San Diego"
        },
        {
            name: "San Francisco"
        },
        {
            name: "San Jose"
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
            name: "Stockholm"
        },
        {
            name: "Sudbury"
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
            name: "Thun"
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
            name: "Washington D.C."
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
            time: null
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
            time: null
        },
        {
            from: "Płock",
            to: "Warsaw Central",
            lineID: "E08",
            time: null
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
            from: "Cratère-sur-Mer",
            to: "Brest (FR)",
            lineID: "E18",
            time: null
        },
        {
            from: "Brest (FR)",
            to: "Rennes",
            lineID: "E18",
            time: null
        },
        {
            from: "Rennes",
            to: "Orléans",
            lineID: "E18",
            time: 50
        },
        {
            from: "Orléans",
            to: "Charleville-Mézières",
            lineID: "E18",
            time: 55
        },
        {
            from: "Copenhagen",
            to: "Bornholm",
            lineID: "E19",
            time: 80
        },
        {
            from: "Charleville-Mézières",
            to: "Karlsruhe",
            lineID: "E20",
            time: 110
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
            to: "Bayreuth",
            lineID: "E22",
            time: 40
        },
        {
            from: "Bayreuth",
            to: "Frankfurt",
            lineID: "E22",
            time: 40
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
            from: "Kiel",
            to: "Paterborn",
            lineID: "E27",
            time: 50
        },
        {
            from: "Paterborn",
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
            from: "West Mediterranean",
            to: "Mequinenza",
            lineID: "E31",
            time: 65
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
            to: "Del Norte End Portal",
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
            from: "Montréal Central",
            to: "Ottawa",
            lineID: "N10",
            time: 70
        },
        {
            from: "Ottawa",
            to: "Toronto Union",
            lineID: "N10",
            time: null
        },
        {
            from: "Toronto Union",
            to: "Sudbury",
            lineID: "N11",
            time: null
        },
        {
            from: "Montréal Central",
            to: "Iqaluit",
            lineID: "N12",
            time: null
        },
        {
            from: "Montréal Central",
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
            from: "Montréal Central",
            to: "Boston",
            lineID: "N14",
            time: null
        },
        {
            from: "Boston",
            to: "New York Central",
            lineID: "N14",
            time: null
        },
        {
            from: "New York Central",
            to: "Norfolk",
            lineID: "N15",
            time: null
        },
        {
            from: "Norfolk",
            to: "New Orleans",
            lineID: "N15",
            time: null
        },
        {
            from: "Montréal Central",
            to: "New York Central",
            lineID: "N16",
            time: 120
        },
        {
            from: "New York Central",
            to: "Washington D.C.",
            lineID: "N16",
            time: null
        },
        {
            from: "Charleville-Mézières",
            to: "West Mediterranean",
            lineID: "T01",
            time: 115
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
            to: "Baikonur End Portal",
            lineID: "T01",
            time: 300
        },
        {
            from: "Baikonur End Portal",
            to: "Poronaysk",
            lineID: "T01",
            time: 1075
        },
        {
            from: "Antalya",
            to: "Istanbul",
            lineID: "T02",
            time: 70
        },
        {
            from: "Istanbul",
            to: "Romanian Slime Farm",
            lineID: "T02",
            time: 95
        },
        {
            from: "Romanian Slime Farm",
            to: "Odessa",
            lineID: "T02",
            time: 35
        },
        {
            from: "Southampton",
            to: "Rennes",
            lineID: "T03",
            time: 45
        },
        {
            from: "Rennes",
            to: "La Rochelle",
            lineID: "T03",
            time: 40
        },
        {
            from: "La Rochelle",
            to: "Pyrenees",
            lineID: "T03",
            time: 35
        },
        {
            from: "Pyrenees",
            to: "Mequinenza",
            lineID: "T03",
            time: null
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
            from: "Charleville-Mézières",
            to: "Amsterdam Centraal",
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
            from: "Amsterdam Centraal",
            to: "Rennes",
            lineID: "HBL",
            time: 85
        },
        {
            from: "Amsterdam Centraal",
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
            from: "Amsterdam Centraal",
            to: "Warsaw Central",
            lineID: "HGR",
            time: 165
        }
    ]
} as NetworkData;

export default networkData;

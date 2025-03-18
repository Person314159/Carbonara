import {LineType, NetworkData} from "@/app/lib/interfaces";

const networkData = {
    lines: [
        {
            id: "lsr1",
            name: "Brighton Red Line",
            colour: "#ed1c2a",
            type: LineType.LSR
        },
        {
            id: "lsr3",
            name: "Big Bridge",
            colour: "#f59fb3",
            type: LineType.LSR
        },
        {
            id: "lsr4",
            name: "Vistula Express Line",
            colour: "#080e5c",
            type: LineType.LSR
        },
        {
            id: "lsr5",
            name: "Tatra Line",
            colour: "#f78f4b",
            type: LineType.LSR
        },
        {
            id: "lsr6",
            name: "Baltic Line",
            colour: "#ed1c2a",
            type: LineType.LSR
        },
        {
            id: "lsr7",
            name: "Birmingham Yellow Line",
            colour: "#ffcd02",
            type: LineType.LSR
        },
        {
            id: "lsr8",
            name: "Newcastle Green Line",
            colour: "#77c696",
            type: LineType.LSR
        },
        {
            id: "lsr9",
            name: "Atlantic Line",
            colour: "#87d3df",
            type: LineType.LSR
        },
        {
            id: "lsr10",
            name: "LSR 10",
            colour: "#662c91",
            type: LineType.LSR
        },
        {
            id: "lsr11",
            name: "Dźwina Line",
            colour: "#4c90cd",
            type: LineType.LSR
        },
        {
            id: "lsr12",
            name: "Vistula Line",
            colour: "#008c5a",
            type: LineType.LSR
        },
        {
            id: "lsr13",
            name: "Carpathia Line",
            colour: "#e0b03b",
            type: LineType.LSR
        },
        {
            id: "lsr14",
            name: "Dnieper Line",
            colour: "#ffcd02",
            type: LineType.LSR
        },
        {
            id: "lsr15",
            name: "LSR 15",
            colour: "#b80b4b",
            type: LineType.LSR
        },
        {
            id: "lsr16",
            name: "LSR 16",
            colour: "#c5a3cd",
            type: LineType.LSR
        },
        {
            id: "lsr30",
            name: "Big Bridge Zugdidi Branch",
            colour: "#b80b4b",
            type: LineType.LSR
        },
        {
            id: "lsr31",
            name: "Big Bridge Thessaloniki Branch",
            colour: "#bb4a9b",
            type: LineType.LSR
        },
        {
            id: "lsr32",
            name: "Big Bridge Istanbul Branch",
            colour: "#c5a3cd",
            type: LineType.LSR
        },
        {
            id: "lsr33",
            name: "Big Bridge Mequinenza Branch",
            colour: "#b80b4b",
            type: LineType.LSR
        },
        {
            id: "lsr50",
            name: "LSR 50",
            colour: "#ed1c2a",
            type: LineType.LSR
        },
        {
            id: "lsr51",
            name: "LSR 51",
            colour: "#080e5c",
            type: LineType.LSR
        },
        {
            id: "lsr999",
            name: "Miscellaneous Connections",
            colour: "#79edba",
            type: LineType.LSR
        },
        {
            id: "hsr1",
            name: "Blue HSR",
            colour: "#4c90cd",
            type: LineType.HSR
        },
        {
            id: "hsr2",
            name: "Green HSR",
            colour: "#30a442",
            type: LineType.HSR
        }
    ],
    stations: [
        {
            name: "Queen's Cross"
        },
        {
            name: "Brighton"
        },
        {
            name: "Southampton"
        },
        {
            name: "Plymouth"
        },
        {
            name: "Charleville-Mézières"
        },
        {
            name: "West Mediterranean"
        },
        {
            name: "Catania"
        },
        {
            name: "Antalya"
        },
        {
            name: "Rasht"
        },
        {
            name: "Baikonur End Portal"
        },
        {
            name: "Gdańsk"
        },
        {
            name: "Warsaw Central"
        },
        {
            name: "Katowice"
        },
        {
            name: "Košice"
        },
        {
            name: "Belgrade"
        },
        {
            name: "Thessaloniki"
        },
        {
            name: "Kiel"
        },
        {
            name: "Szczecin"
        },
        {
            name: "Królewiec"
        },
        {
            name: "Kaunas"
        },
        {
            name: "Riga"
        },
        {
            name: "Tallinn"
        },
        {
            name: "Birmingham"
        },
        {
            name: "Liverpool"
        },
        {
            name: "Isle of Man"
        },
        {
            name: "Newcastle"
        },
        {
            name: "Rennes"
        },
        {
            name: "La Rochelle"
        },
        {
            name: "Bordeaux"
        },
        {
            name: "Pyrenees"
        },
        {
            name: "Mequinenza"
        },
        {
            name: "Gesalibar"
        },
        {
            name: "Brest (FR)"
        },
        {
            name: "Étampes"
        },
        {
            name: "Reims"
        },
        {
            name: "Düsseldorf"
        },
        {
            name: "Brest (BY)"
        },
        {
            name: "Helsinki"
        },
        {
            name: "Bydgoszcz"
        },
        {
            name: "Płock"
        },
        {
            name: "Lublin"
        },
        {
            name: "Carpathia"
        },
        {
            name: "Kyiv"
        },
        {
            name: "Odessa"
        },
        {
            name: "Romanian Slime Farm"
        },
        {
            name: "Istanbul"
        },
        {
            name: "Tirana"
        },
        {
            name: "Bari"
        },
        {
            name: "Zugdidi"
        },
        {
            name: "Zagreb"
        },
        {
            name: "Ljubljana"
        },
        {
            name: "Venice"
        },
        {
            name: "Sarajevo"
        },
        {
            name: "Podgorica"
        },
        {
            name: "Pristina"
        },
        {
            name: "Amsterdam Centraal"
        },
        {
            name: "Karlsruhe"
        },
    ],
    connections: [
        {
            from: "Queen's Cross",
            to: "Brighton",
            line_id: "lsr1",
            time: 40
        },
        {
            from: "Brighton",
            to: "Southampton",
            line_id: "lsr1",
            time: 20
        },
        {
            from: "Southampton",
            to: "Plymouth",
            line_id: "lsr1",
            time: 70
        },
        {
            from: "Charleville-Mézières",
            to: "West Mediterranean",
            line_id: "lsr3",
            time: 115
        },
        {
            from: "West Mediterranean",
            to: "Catania",
            line_id: "lsr3",
            time: 185
        },
        {
            from: "Catania",
            to: "Antalya",
            line_id: "lsr3",
            time: 205
        },
        {
            from: "Antalya",
            to: "Rasht",
            line_id: "lsr3",
            time: 245
        },
        {
            from: "Rasht",
            to: "Baikonur End Portal",
            line_id: "lsr3",
            time: 300
        },
        {
            from: "Gdańsk",
            to: "Warsaw Central",
            line_id: "lsr4",
            time: 65
        },
        {
            from: "Warsaw Central",
            to: "Katowice",
            line_id: "lsr5",
            time: 30
        },
        {
            from: "Katowice",
            to: "Košice",
            line_id: "lsr5",
            time: 40
        },
        {
            from: "Košice",
            to: "Belgrade",
            line_id: "lsr5",
            time: 55
        },
        {
            from: "Belgrade",
            to: "Thessaloniki",
            line_id: "lsr5",
            time: 85
        },
        {
            from: "Kiel",
            to: "Szczecin",
            line_id: "lsr6",
            time: 70
        },
        {
            from: "Szczecin",
            to: "Gdańsk",
            line_id: "lsr6",
            time: 65
        },
        {
            from: "Gdańsk",
            to: "Królewiec",
            line_id: "lsr6",
            time: null
        },
        {
            from: "Królewiec",
            to: "Kaunas",
            line_id: "lsr6",
            time: null
        },
        {
            from: "Kaunas",
            to: "Riga",
            line_id: "lsr6",
            time: null
        },
        {
            from: "Riga",
            to: "Tallinn",
            line_id: "lsr6",
            time: null
        },
        {
            from: "Queen's Cross",
            to: "Birmingham",
            line_id: "lsr7",
            time: 45
        },
        {
            from: "Birmingham",
            to: "Liverpool",
            line_id: "lsr7",
            time: 30
        },
        {
            from: "Liverpool",
            to: "Isle of Man",
            line_id: "lsr7",
            time: 40
        },
        {
            from: "Southampton",
            to: "Birmingham",
            line_id: "lsr8",
            time: 20
        },
        {
            from: "Birmingham",
            to: "Newcastle",
            line_id: "lsr8",
            time: 30
        },
        {
            from: "Southampton",
            to: "Rennes",
            line_id: "lsr9",
            time: 45
        },
        {
            from: "Rennes",
            to: "La Rochelle",
            line_id: "lsr9",
            time: null
        },
        {
            from: "La Rochelle",
            to: "Bordeaux",
            line_id: "lsr9",
            time: null
        },
        {
            from: "Bordeaux",
            to: "Pyrenees",
            line_id: "lsr9",
            time: null
        },
        {
            from: "Pyrenees",
            to: "Mequinenza",
            line_id: "lsr9",
            time: null
        },
        {
            from: "Brest (FR)",
            to: "Rennes",
            line_id: "lsr10",
            time: null
        },
        {
            from: "Rennes",
            to: "Étampes",
            line_id: "lsr10",
            time: null
        },
        {
            from: "Étampes",
            to: "Reims",
            line_id: "lsr10",
            time: null
        },
        {
            from: "Reims",
            to: "Charleville-Mézières",
            line_id: "lsr10",
            time: null
        },
        {
            from: "Charleville-Mézières",
            to: "Düsseldorf",
            line_id: "lsr10",
            time: null
        },
        {
            from: "Düsseldorf",
            to: "Kiel",
            line_id: "lsr10",
            time: null
        },
        {
            from: "Warsaw Central",
            to: "Brest (BY)",
            line_id: "lsr11",
            time: 40
        },
        {
            from: "Brest (BY)",
            to: "Riga",
            line_id: "lsr11",
            time: 85
        },
        {
            from: "Riga",
            to: "Tallinn",
            line_id: "lsr11",
            time: 30
        },
        {
            from: "Tallinn",
            to: "Helsinki",
            line_id: "lsr11",
            time: 20
        },
        {
            from: "Gdańsk",
            to: "Bydgoszcz",
            line_id: "lsr12",
            time: null
        },
        {
            from: "Bydgoszcz",
            to: "Płock",
            line_id: "lsr12",
            time: null
        },
        {
            from: "Płock",
            to: "Warsaw Central",
            line_id: "lsr12",
            time: null
        },
        {
            from: "Warsaw Central",
            to: "Lublin",
            line_id: "lsr12",
            time: null
        },
        {
            from: "Lublin",
            to: "Katowice",
            line_id: "lsr12",
            time: null
        },
        {
            from: "Warsaw Central",
            to: "Carpathia",
            line_id: "lsr13",
            time: null
        },
        {
            from: "Warsaw Central",
            to: "Brest (BY)",
            line_id: "lsr14",
            time: 40
        },
        {
            from: "Brest (BY)",
            to: "Kyiv",
            line_id: "lsr14",
            time: 105
        },
        {
            from: "Kyiv",
            to: "Odessa",
            line_id: "lsr14",
            time: 50
        },
        {
            from: "Thessaloniki",
            to: "Tirana",
            line_id: "lsr15",
            time: 45
        },
        {
            from: "Tirana",
            to: "Bari",
            line_id: "lsr16",
            time: 50
        },
        {
            from: "Bari",
            to: "Catania",
            line_id: "lsr16",
            time: 80
        },
        {
            from: "Rasht",
            to: "Zugdidi",
            line_id: "lsr30",
            time: 185
        },
        {
            from: "Antalya",
            to: "Istanbul",
            line_id: "lsr32",
            time: 70
        },
        {
            from: "West Mediterranean",
            to: "Mequinenza",
            line_id: "lsr33",
            time: 65
        },
        {
            from: "Belgrade",
            to: "Zagreb",
            line_id: "lsr50",
            time: 145
        },
        {
            from: "Zagreb",
            to: "Ljubljana",
            line_id: "lsr50",
            time: 45
        },
        {
            from: "Ljubljana",
            to: "Venice",
            line_id: "lsr50",
            time: 65
        },
        {
            from: "Belgrade",
            to: "Sarajevo",
            line_id: "lsr51",
            time: 100
        },
        {
            from: "Sarajevo",
            to: "Podgorica",
            line_id: "lsr51",
            time: 65
        },
        {
            from: "Podgorica",
            to: "Pristina",
            line_id: "lsr51",
            time: 30
        },
        {
            from: "Pristina",
            to: "Tirana",
            line_id: "lsr51",
            time: 65
        },
        {
            from: "Odessa",
            to: "Romanian Slime Farm",
            line_id: "lsr32",
            time: 35
        },
        {
            from: "Romanian Slime Farm",
            to: "Istanbul",
            line_id: "lsr32",
            time: 95
        },
        {
            from: "Charleville-Mézières",
            to: "Karlsruhe",
            line_id: "lsr999",
            time: 110
        },
        {
            from: "Mequinenza",
            to: "Gesalibar",
            line_id: "lsr999",
            time: 110
        },
        {
            from: "Charleville-Mézières",
            to: "Amsterdam Centraal",
            line_id: "hsr1",
            time: 40
        },
        {
            from: "Charleville-Mézières",
            to: "Rennes",
            line_id: "hsr1",
            time: 85
        },
        {
            from: "Charleville-Mézières",
            to: "Queen's Cross",
            line_id: "hsr1",
            time: 65
        },
        {
            from: "Amsterdam Centraal",
            to: "Rennes",
            line_id: "hsr1",
            time: 85
        },
        {
            from: "Amsterdam Centraal",
            to: "Queen's Cross",
            line_id: "hsr1",
            time: 65
        },
        {
            from: "Rennes",
            to: "Queen's Cross",
            line_id: "hsr1",
            time: 60
        },
        {
            from: "Amsterdam Centraal",
            to: "Warsaw Central",
            line_id: "hsr2",
            time: 165
        }
    ]
} as NetworkData;

export default networkData;

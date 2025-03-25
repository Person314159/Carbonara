import { StationType } from "@/app/constants/stations";
import tokyoMetroBasicStation from "./tokyo-metro-basic";
import tokyoMetroIntStation from "./tokyo-metro-int";

const stations = {
    [StationType.TokyoMetroBasic]: tokyoMetroBasicStation,
    [StationType.TokyoMetroInt]: tokyoMetroIntStation
};

export default stations;

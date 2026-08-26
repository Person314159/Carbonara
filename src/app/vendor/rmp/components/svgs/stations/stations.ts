import { StationType } from "@/app/vendor/rmp/constants/stations";
import shmetroBasicStation from "@/app/vendor/rmp/components/svgs/stations/shmetro-basic";
import shmetroBasic2020Station from "@/app/vendor/rmp/components/svgs/stations/shmetro-basic-2020";
import shmetroIntStation from "@/app/vendor/rmp/components/svgs/stations/shmetro-int";
import shmetroOsysiStation from "@/app/vendor/rmp/components/svgs/stations/shmetro-osysi";
import shanghaiSuburbanRailwayStation from "@/app/vendor/rmp/components/svgs/stations/shanghai-suburban-railway";
import gzmtrBasicStation from "@/app/vendor/rmp/components/svgs/stations/gzmtr-basic";
import gzmtrIntStation from "@/app/vendor/rmp/components/svgs/stations/gzmtr-int";
import gzmtrInt2024Station from "@/app/vendor/rmp/components/svgs/stations/gzmtr-int-2024";
import bjsubwayBasicStation from "@/app/vendor/rmp/components/svgs/stations/bjsubway-basic";
import bjsubwayIntStation from "@/app/vendor/rmp/components/svgs/stations/bjsubway-int";
import mtrStation from "@/app/vendor/rmp/components/svgs/stations/mtr";
import suzhouRTBasicStation from "@/app/vendor/rmp/components/svgs/stations/suzhourt-basic";
import suzhouRTIntStation from "@/app/vendor/rmp/components/svgs/stations/suzhourt-int";
import kunmingRTBasicStation from "@/app/vendor/rmp/components/svgs/stations/kunmingrt-basic";
import kunmingRTIntStation from "@/app/vendor/rmp/components/svgs/stations/kunmingrt-int";
import mrtBasicStation from "@/app/vendor/rmp/components/svgs/stations/mrt-basic";
import mrtIntStation from "@/app/vendor/rmp/components/svgs/stations/mrt-int";
import jrEastBasicStation from "@/app/vendor/rmp/components/svgs/stations/jr-east-basic";
import jrEastImportantStation from "@/app/vendor/rmp/components/svgs/stations/jr-east-important";
import foshanMetroBasicStation from "@/app/vendor/rmp/components/svgs/stations/foshan-metro-basic";
import qingdaoMetroStation from "@/app/vendor/rmp/components/svgs/stations/qingdao-metro-station";
import tokyoMetroBasicStation from "@/app/vendor/rmp/components/svgs/stations/tokyo-metro-basic";
import tokyoMetroIntStation from "@/app/vendor/rmp/components/svgs/stations/tokyo-metro-int";
import londonTubeBasicStation from "@/app/vendor/rmp/components/svgs/stations/london-tube-basic";
import londonTubeIntStation from "@/app/vendor/rmp/components/svgs/stations/london-tube-int";
import londonRiverServicesIntStation from "@/app/vendor/rmp/components/svgs/stations/london-river-services-interchange";
import guangdongIntercityRailwayStation from "@/app/vendor/rmp/components/svgs/stations/guangdong-intercity-railway";
import chongqingRTBasicStation from "@/app/vendor/rmp/components/svgs/stations/chongqingrt-basic";
import chongqingRTIntStation from "@/app/vendor/rmp/components/svgs/stations/chongqingrt-int";
import chongqingRTBasicStation2021 from "@/app/vendor/rmp/components/svgs/stations/chongqingrt-basic-2021";
import chongqingRTIntStation2021 from "@/app/vendor/rmp/components/svgs/stations/chongqingrt-int-2021";
import chengduRTBasicStation from "@/app/vendor/rmp/components/svgs/stations/chengdurt-basic";
import chengduRTIntStation from "@/app/vendor/rmp/components/svgs/stations/chengdurt-int";
import osakaMetroStation from "@/app/vendor/rmp/components/svgs/stations/osaka-metro";
import wuhanRTBasicStation from "@/app/vendor/rmp/components/svgs/stations/wuhanrt-basic";
import wuhanRTIntStation from "@/app/vendor/rmp/components/svgs/stations/wuhanrt-int";
import csmetroBasicStation from "@/app/vendor/rmp/components/svgs/stations/csmetro-basic";
import csmetroIntStation from "@/app/vendor/rmp/components/svgs/stations/csmetro-int";
import hzmetroBasicStation from "@/app/vendor/rmp/components/svgs/stations/hzmetro-basic";
import hzmetroIntStation from "@/app/vendor/rmp/components/svgs/stations/hzmetro-int";

const stations = {
    [StationType.ShmetroBasic]: shmetroBasicStation,
    [StationType.ShmetroBasic2020]: shmetroBasic2020Station,
    [StationType.ShmetroInt]: shmetroIntStation,
    [StationType.ShmetroOutOfSystemInt]: shmetroOsysiStation,
    [StationType.ShanghaiSuburbanRailway]: shanghaiSuburbanRailwayStation,
    [StationType.GzmtrBasic]: gzmtrBasicStation,
    [StationType.GzmtrInt]: gzmtrIntStation,
    [StationType.GzmtrInt2024]: gzmtrInt2024Station,
    [StationType.BjsubwayBasic]: bjsubwayBasicStation,
    [StationType.BjsubwayInt]: bjsubwayIntStation,
    [StationType.MTR]: mtrStation,
    [StationType.SuzhouRTBasic]: suzhouRTBasicStation,
    [StationType.SuzhouRTInt]: suzhouRTIntStation,
    [StationType.KunmingRTBasic]: kunmingRTBasicStation,
    [StationType.KunmingRTInt]: kunmingRTIntStation,
    [StationType.MRTBasic]: mrtBasicStation,
    [StationType.MRTInt]: mrtIntStation,
    [StationType.JREastBasic]: jrEastBasicStation,
    [StationType.JREastImportant]: jrEastImportantStation,
    [StationType.FoshanMetroBasic]: foshanMetroBasicStation,
    [StationType.QingdaoMetroStation]: qingdaoMetroStation,
    [StationType.TokyoMetroBasic]: tokyoMetroBasicStation,
    [StationType.TokyoMetroInt]: tokyoMetroIntStation,
    [StationType.LondonTubeBasic]: londonTubeBasicStation,
    [StationType.LondonTubeInt]: londonTubeIntStation,
    [StationType.LondonRiverServicesInt]: londonRiverServicesIntStation,
    [StationType.GuangdongIntercityRailway]: guangdongIntercityRailwayStation,
    [StationType.ChongqingRTBasic]: chongqingRTBasicStation,
    [StationType.ChongqingRTInt]: chongqingRTIntStation,
    [StationType.ChongqingRTBasic2021]: chongqingRTBasicStation2021,
    [StationType.ChongqingRTInt2021]: chongqingRTIntStation2021,
    [StationType.ChengduRTBasic]: chengduRTBasicStation,
    [StationType.ChengduRTInt]: chengduRTIntStation,
    [StationType.OsakaMetro]: osakaMetroStation,
    [StationType.WuhanRTBasic]: wuhanRTBasicStation,
    [StationType.WuhanRTInt]: wuhanRTIntStation,
    [StationType.CsmetroBasic]: csmetroBasicStation,
    [StationType.CsmetroInt]: csmetroIntStation,
    [StationType.HzmetroBasic]: hzmetroBasicStation,
    [StationType.HzmetroInt]: hzmetroIntStation,
};

export default stations;

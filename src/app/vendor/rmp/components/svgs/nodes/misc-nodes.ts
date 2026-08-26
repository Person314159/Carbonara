import { MiscNodeType } from "@/app/vendor/rmp/constants/nodes";
import virtual from "@/app/vendor/rmp/components/svgs/nodes/virtual";
import facilities from "@/app/vendor/rmp/components/svgs/nodes/facilities";
import text from "@/app/vendor/rmp/components/svgs/nodes/text";
import fill from "@/app/vendor/rmp/components/svgs/nodes/fill";
import shmetroNumLineBadge from "@/app/vendor/rmp/components/svgs/nodes/shmetro-num-line-badge";
import shmetroTextLineBadge from "@/app/vendor/rmp/components/svgs/nodes/shmetro-text-line-badge";
import gzmtrLineBadge from "@/app/vendor/rmp/components/svgs/nodes/gzmtr-line-badge";
import bjsubwayNumLineBadge from "@/app/vendor/rmp/components/svgs/nodes/bjsubway-num-line-badge";
import bjsubwayTextLineBadge from "@/app/vendor/rmp/components/svgs/nodes/bjsubway-text-line-badge";
import suzhouRTNumLineBadge from "@/app/vendor/rmp/components/svgs/nodes/suzhourt-num-line-badge";
import berlinUBahnLineBadge from "@/app/vendor/rmp/components/svgs/nodes/berlin-u-bahn-line-badge";
import berlinSBahnLineBadge from "@/app/vendor/rmp/components/svgs/nodes/berlin-s-bahn-line-badge";
import chongqingRTNumLineBadge from "@/app/vendor/rmp/components/svgs/nodes/chongqingrt-num-line-badge";
import chongqingRTTextLineBadge from "@/app/vendor/rmp/components/svgs/nodes/chongqingrt-text-line-badge";
import chongqingRTNumLineBadge2021 from "@/app/vendor/rmp/components/svgs/nodes/chongqingrt-num-line-badge-2021";
import chongqingRTTextLineBadge2021 from "@/app/vendor/rmp/components/svgs/nodes/chongqingrt-text-line-badge-2021";
import shenzhenMetroNumLineBadge from "@/app/vendor/rmp/components/svgs/nodes/shenzhenmetro-num-line-badge";
import mrtDestinationNumbers from "@/app/vendor/rmp/components/svgs/nodes/mrt-dest-num";
import mrtLineBadge from "@/app/vendor/rmp/components/svgs/nodes/mrt-line-badge";
import jrEastLineBadge from "@/app/vendor/rmp/components/svgs/nodes/jr-east-line-badge";
import qingdaoMetroNumLineBadge from "@/app/vendor/rmp/components/svgs/nodes/qingdao-metro-num-line-badge";
import guangdongIntercityRailwayLineBadge from "@/app/vendor/rmp/components/svgs/nodes/guangdong-intercity-railway-line-badge";
import londonArrow from "@/app/vendor/rmp/components/svgs/nodes/london-arrow";
import londonTubeLineBadge from "@/app/vendor/rmp/components/svgs/nodes/london-tube-line-badge/london-tube-line-badge";
import chengduRTLineBadge from "@/app/vendor/rmp/components/svgs/nodes/chengdurt-line-badge";
import taipeiMetroLineBadge from "@/app/vendor/rmp/components/svgs/nodes/taipei-metro-line-badge";
import wuhanRTLineBadge from "@/app/vendor/rmp/components/svgs/nodes/wuhanrt-line-badge";

const miscNodes = {
    [MiscNodeType.Virtual]: virtual,
    [MiscNodeType.Facilities]: facilities,
    [MiscNodeType.Text]: text,
    [MiscNodeType.Fill]: fill,
    [MiscNodeType.ShmetroNumLineBadge]: shmetroNumLineBadge,
    [MiscNodeType.ShmetroTextLineBadge]: shmetroTextLineBadge,
    [MiscNodeType.GzmtrLineBadge]: gzmtrLineBadge,
    [MiscNodeType.BjsubwayNumLineBadge]: bjsubwayNumLineBadge,
    [MiscNodeType.BjsubwayTextLineBadge]: bjsubwayTextLineBadge,
    [MiscNodeType.SuzhouRTNumLineBadge]: suzhouRTNumLineBadge,
    [MiscNodeType.BerlinSBahnLineBadge]: berlinSBahnLineBadge,
    [MiscNodeType.BerlinUBahnLineBadge]: berlinUBahnLineBadge,
    [MiscNodeType.ChongqingRTNumLineBadge]: chongqingRTNumLineBadge,
    [MiscNodeType.ChongqingRTTextLineBadge]: chongqingRTTextLineBadge,
    [MiscNodeType.ChongqingRTNumLineBadge2021]: chongqingRTNumLineBadge2021,
    [MiscNodeType.ChongqingRTTextLineBadge2021]: chongqingRTTextLineBadge2021,
    [MiscNodeType.ShenzhenMetroNumLineBadge]: shenzhenMetroNumLineBadge,
    [MiscNodeType.MRTDestinationNumbers]: mrtDestinationNumbers,
    [MiscNodeType.MRTLineBadge]: mrtLineBadge,
    [MiscNodeType.JREastLineBadge]: jrEastLineBadge,
    [MiscNodeType.QingdaoMetroNumLineBadge]: qingdaoMetroNumLineBadge,
    [MiscNodeType.GuangdongIntercityRailwayLineBadge]: guangdongIntercityRailwayLineBadge,
    [MiscNodeType.LondonArrow]: londonArrow,
    [MiscNodeType.LondonTubeLineBadge]: londonTubeLineBadge,
    [MiscNodeType.ChengduRTLineBadge]: chengduRTLineBadge,
    [MiscNodeType.TaiPeiMetroLineBadege]: taipeiMetroLineBadge,
    [MiscNodeType.WuhanRTLineBadge]: wuhanRTLineBadge,
};

export default miscNodes;

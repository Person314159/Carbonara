import { MiscNodeType } from "@/app/vendor/rmp/constants/nodes";

import virtual from "./virtual";
import facilities from "@/app/vendor/rmp/components/svgs/nodes/facilities";

const miscNodes = {
    [MiscNodeType.Virtual]: virtual,
    [MiscNodeType.Facilities]: facilities,
};

export default miscNodes;

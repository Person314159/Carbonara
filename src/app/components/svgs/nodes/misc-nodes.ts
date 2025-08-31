import { MiscNodeType } from "@/app/constants/nodes";

import virtual from "./virtual";
import facilities from "@/app/components/svgs/nodes/facilities";

const miscNodes = {
    [MiscNodeType.Virtual]: virtual,
    [MiscNodeType.Facilities]: facilities
};

export default miscNodes;

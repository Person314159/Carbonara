import React from "react";
import { Node, NodeComponentProps } from "@/app/constants/nodes";

/**
 * Facilities type
 *
 * Note that the value should match the filename without the extension under public/images/facilities.
 *
 * Note changing the value needs both filename update and save version (type) update.
 * See change of Qingdao in #809 and fix in #862.
 */
export enum FacilitiesType {
    Airport = "airport",
    Endportal = "ender_eye",
    Airport2024 = "airport_2024",
    Maglev = "maglev",
    Disney = "disney",
    Railway = "railway",
    Railway2024 = "railway_2024",
    HSR = "hsr",
    AirportHK = "airport_hk",
    DisneyHK = "disney_hk",
    NgongPing360 = "ngong_ping_360",
    Tiananmen = "tiananmen",
    AirportBJ = "airport_bj",
    BusTerminalSuzhou = "bus_terminal_suzhou",
    RailwaySuzhou = "railway_suzhou",
    BusInterchange = "bus_interchange",
    AirportSG = "airport_sg",
    CruiseCentre = "cruise_centre",
    SentosaExpress = "sentosa_express",
    CableCar = "cable_car",
    Merlion = "merlion",
    MarinaBaySands = "marina_bay_sands",
    GardensByTheBay = "gardens_by_the_bay",
    SingaporeFlyer = "singapore_flyer",
    Esplanade = "esplanade",
    AirportQingdao = "airport_qingdao",
    CoachStationQingdao = "coach_station_qingdao",
    CruiseTerminalQingdao = "cruise_terminal_qingdao",
    RailwayQingdao = "railway_qingdao",
    TramQingdao = "tram_qingdao",
    AirportGuangzhou = "airport_guangzhou",
    RailwayGuangzhou = "railway_guangzhou",
    IntercityGuangzhou = "intercity_guangzhou",
    RiverCraftLondon = "river_craft",
    AirportLondon = "airport_london",
    CoachStationLondon = "coach_station_london",
    AirportChongqing = "airport_chongqing",
    RailwayChongqing = "railway_chongqing",
    CoachStationChongqing = "coach_station_chongqing",
    BusStationChongqing = "bus_station_chongqing",
    ShippingStationChongqing = "shipping_station_chongqing",
    AirportChengdu = "airport_chengdu",
    RailwayChengdu = "railway_chengdu",
    RailwayTaiwan = "railway_taiwan",
    HSRTaiwan = "hsr_taiwan"
}

const Facilities = (props: NodeComponentProps<FacilitiesAttributes>) => {
    const { id, x, y, attrs } = props;
    const { type = defaultFacilitiesAttributes.type } = attrs ?? defaultFacilitiesAttributes;
    const imgEl = React.useRef<SVGImageElement | null>(null);
    const [bBox, setBBox] = React.useState({ width: 25, height: 25 } as DOMRect);

    React.useEffect(() => setBBox(imgEl.current!.getBBox()), [type, setBBox, imgEl]);

    return (
        <g id={id} transform={`translate(${x - bBox.width / 2}, ${y - bBox.height / 2})`}>
            <image
                ref={imgEl}
                href={`/Carbonara/images/facilities/${type}.svg`}
                /* eslint-disable-next-line react/no-unknown-property */
                onLoad={() => setBBox(imgEl.current!.getBBox())}
            />
        </g>
    );
};

/**
 * Facilities specific props.
 */
export interface FacilitiesAttributes {
    type: FacilitiesType;
}

const defaultFacilitiesAttributes: FacilitiesAttributes = {
    type: FacilitiesType.Airport
};
const facilities: Node<FacilitiesAttributes> = {
    component: Facilities,
    defaultAttrs: defaultFacilitiesAttributes
};

export default facilities;

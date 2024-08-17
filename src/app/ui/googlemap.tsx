"use client"

import { 
    AdvancedMarker, 
    APIProvider, 
    InfoWindow, 
    Map,
    useAdvancedMarkerRef
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import { LiaBicycleSolid } from "react-icons/lia";


export default function StonyMap(){

    const centerPosition = {lat: 40.914088, lng: -73.124957}; // Coordinates of the Student Activity Centers

    class BasicStation {
        name: string;
        lat: number;
        lng: number;
        constructor(name:string, lat:number, lng:number) {
            this.name = name;
            this.lat = lat;
            this.lng = lng;
        }
    }

    const stationList = [
        new BasicStation("LIRR", 40.920029, -73.128253),
        new BasicStation("Library", 40.916063, -73.123487),
        new BasicStation("West Side Dining Station", 40.912488, -73.130267),
        new BasicStation("Javits", 40.913415, -73.12142),
        new BasicStation("West Apartments I", 40.913337, -73.134329),
        new BasicStation("Life Sciences", 40.911341, -73.120833),
        new BasicStation("South Campus", 40.9045, -73.1212),
        new BasicStation("James College", 40.919144, -73.120874),
        new BasicStation("South P Lot", 40.896691, -73.126439),
        new BasicStation("Tabler Quad", 40.910046, -73.124813),
        new BasicStation("SAC", 40.91441, -73.124648),
        new BasicStation("Wang Center", 40.916383, -73.118282),
        new BasicStation("West Apartments C", 40.911724, -73.132897),
        new BasicStation("Athletic Fields", 40.92148, -73.126721),
    ]

    function StationMarker(station : BasicStation) {
        const [infoWindowVisible, setInfoWindowVisible] = useState(false);
        const [markerRef, marker] = useAdvancedMarkerRef();
        function handleClick() {
            setInfoWindowVisible(!infoWindowVisible);
        }
        return(
            <>
            <AdvancedMarker ref={markerRef} position={{lat:station.lat, lng:station.lng}} title={station.name} onClick={handleClick}>
                <div className="text-3xl hover:text-4xl p-1 bg-[#ffffffd3] hover:bg-[#ffffff] border-[#991b1bb4] hover:border-[#991b1b] transition-colors duration-100 border-[2px] rounded-full drop-shadow-2xl">
                    <LiaBicycleSolid />    
                </div>
            </AdvancedMarker>
            {infoWindowVisible && (
                <InfoWindow anchor={marker} onClose={handleClick}>
                    <h1 className="text-xl">{station.name}</h1>
                </InfoWindow>
            )}
            </>
        )
    }
    
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <div className="h-[90vh] w-full border-2 drop-shadow-lg">
                <Map 
                    defaultZoom={15}
                        minZoom={14} 
                        maxZoom={19}
                        zoomControl={true}
                    defaultCenter={centerPosition}
                    mapId={process.env.NEXT_PUBLIC_MAP_ID}
                    streetViewControl={false}
                    gestureHandling={"cooperative"}
                >  
                {stationList.map(station => (
                     <StationMarker key={station.name} name={station.name} lat={station.lat} lng={station.lng} />
                ))}  
                </Map>
            </div>
            
        </APIProvider>
    );
}
"use client"

import { 
    AdvancedMarker, 
    APIProvider, 
    InfoWindow, 
    Map,
    useAdvancedMarkerRef,
    useMap
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { LiaBicycleSolid } from "react-icons/lia";
import GetStationsData from "../lib/bikedata";


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

    // StationMarkers: Populates Map with markers for every station asynchronously.
    const StationMarkers = () => {
        const map = useMap();
        const [markers, setMarkers] = useState(<></>)
        
        useEffect(() => {
            if (!map) return;
            const fetchStationMarkers = async() => {
                const stations = await GetStationsData();
                setMarkers(
                    <>
                        {stations.map((station: any) => (
                            <StationMarker name={station.name} lat={station.latitude} lng={station.longitude} />
                        ))}
                    </>
                )
            }
            fetchStationMarkers();
        }, [map])

        return markers;
    }

    // StationMarker: AdvancedMarker component with the UI and functionaly markers representing a station.
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
                </Map>
                <StationMarkers />
            </div>
            
        </APIProvider>
    );
}
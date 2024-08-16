"use client";

import { AdvancedMarker, APIProvider, Map, Pin } from "@vis.gl/react-google-maps";

export default function StonyMap(){

    const position = {lat: 40.914088, lng: -73.124957}; // Coordinates of the Student Activity Center
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <div className="h-[100vh] w-full">
                <Map 
                    zoom={16} 
                    center={position} 
                    mapId={process.env.NEXT_PUBLIC_MAP_ID}
                    streetViewControl={false}
                >    
                <AdvancedMarker position={position}>
                    <Pin background={"white"}/>
                </AdvancedMarker>

                </Map>
            </div>
        </APIProvider>
    );
}
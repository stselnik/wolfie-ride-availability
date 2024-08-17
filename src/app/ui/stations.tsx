import GetStationsData from "../lib/bikedata"
import { LiaBicycleSolid } from "react-icons/lia";

export default async function StationList() {
    const stationlist = await GetStationsData();
    
    return (
        <ul className="w-full">
            {stationlist.map((station: any) => (
                <div key={station.name} className="flex justify-between border-b-[1px] p-2">
                    <li>{station.name}</li>
                    <div className="flex text-xl items-center gap-2 w-20">
                        <LiaBicycleSolid />
                        <p className="text-xl">{station.free_bikes}</p>    
                    </div>
                    
                </div>
            ))}
        </ul>
    )
}
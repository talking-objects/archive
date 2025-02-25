import EventWrapperForest from "@/app/components/elements/contents/EventWrapperForest";
import { useEffect, useState } from "react";


const ForestEventWrapper = ({allEvents}) => {
    const [getEventData, setEventData] = useState([]);

    useEffect(() => {
        if(allEvents.length > 0){
            setEventData(allEvents.map(v => {
                const data = JSON.parse(JSON.stringify(v.data))
                data.pk = v.pk
                return data
            }));
        }
    }, [allEvents]);

    return (
        <div className="w-full h-full bg-blue-400">
            <EventWrapperForest getVideoData={getEventData} isLoading={!Boolean(getEventData)} changeItemTime={() => {}} clip={true} />
        </div>
    )
}

export default ForestEventWrapper;
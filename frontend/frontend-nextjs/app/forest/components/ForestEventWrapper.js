import EventWrapperForest from "@/app/components/elements/contents/EventWrapperForest";
import { useEffect, useState } from "react";


const ForestEventWrapper = ({allEvents}) => {
    const [getEventData, setEventData] = useState([]);

    useEffect(() => {
        setEventData(allEvents.map(v => {
            const data = v.data
            data.pk = v.pk
            return data
        }));
        console.log(allEvents)
    }, [allEvents]);

    return (
        <div className="w-full h-full bg-blue-400">
            <EventWrapperForest getVideoData={getEventData} isLoading={!Boolean(getEventData)} changeItemTime={() => {}} clip={true} />
        </div>
    )
}

export default ForestEventWrapper;
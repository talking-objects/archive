import { ContentContainer } from "@/app/components/containers/Containers";
import { getAllClips, getAllVideos, getAllVideosCounts } from "@/app/utils/hooks/pandora_api";
import { useEffect } from "react";

const IndexContainer = () => {
    return <div className="w-full">

    </div>
}


const ForestWrapper = () => {
    const {data:dataCount, isLoading:isLoadingCount} = getAllVideosCounts();
    const {data, isLoading} = getAllVideos({rangeToggle:true, range: [0, 6]});
    useEffect(() => {
        if(!isLoading && !isLoadingCount){
            console.log(data)
            console.log(dataCount)
        }
    },[data, dataCount])
    return <>
        <div className="w-full h-full flex flex-col items-center">
            <div className="w-full h-fit py-4 flex justify-center items-center text-7xl font-medium">Our Archive</div>
            <div className="w-full py-4 bg-blue-400">nav</div>
            <ContentContainer>
                
            </ContentContainer>
        </div>
    </>
}


export default ForestWrapper;
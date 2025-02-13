import ContentContainer from "@/app/components/containers/ContentContainer";
import ForestContentsBox from "@/app/components/containers/forest/ForestContentsBox";
import ForestPlayerCon from "@/app/components/containers/players/ForestPlayerCon";
import LoadingCon from "@/app/components/LoadingCon";
import LoadingDataCon from "@/app/components/LoadingDataCon";
import { getClips, getVideos } from "@/app/utils/hooks/eva_api";
import { loadingState } from "@/app/utils/recoillib/state/state";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
import { useRecoilValue } from "recoil";


const ForestWrapper = () => {
    const [isReady, setIsReady] = useState(false)
    const getLoadingState = useRecoilValue(loadingState);
    const [page, setPage] = useState(1);    
    const [forestData, setForestData] = useState([]);  
   

    // Get Videos
    const {data: videos, isLoading: isLoadingVideos} = useQuery({
        queryKey: ["videos", page],
        queryFn: () => {
            return getVideos({page: page, page_limit: 4, random: false})
        },
        keepPreviousData: true 
    })  

    // Get Clips
    const {data: clips, isLoading: isLoadingClips} = useQuery({
        queryKey: ["clips", page],
        queryFn: () => {
            return getClips({page: page, page_limit: 4, random: false})
        },
        keepPreviousData: true 
    })          

    // Get Forest Data
    useEffect(() => {
       console.log(videos)
        if(videos && !isLoadingVideos && clips && !isLoadingClips){
            let newForestDataClips = []
            // Check videos data
            if(videos && !isLoadingVideos && videos.data){
                newForestDataClips = [...videos.data] 
            }
            // Check clips data
            if(clips && !isLoadingClips && clips.data){
                newForestDataClips = [...newForestDataClips, ...clips.data]
            }
            // Only proceed if we have data to add
            if(newForestDataClips.length > 0) {
                // Randomly sort the combined array
                newForestDataClips = newForestDataClips.sort(() => Math.random() - 0.5)
                // Add new data to previous data
                setForestData(prev => [...prev, ...newForestDataClips])
            }
        }
    }, [videos, clips, page])

   

    const onLoadMore = () => {
        setPage(page + 1)
    }


    if((getLoadingState.isLoading && getLoadingState.hasAnimated && !Boolean(isReady))){
        return <div className="w-full h-[100svh]">
          <LoadingDataCon ready={isReady} readyData={Boolean((!isLoadingVideos && !isLoadingClips))} comLoader={() => setIsReady(true)} />
        </div>
    }
    
    return <>
        {(!getLoadingState.isLoading || !getLoadingState.hasAnimated) && (
            <LoadingCon ready={Boolean((!isLoadingVideos && !isLoadingClips))} comLoader={() => setIsReady(true)} />
        )}
        {getLoadingState.hasAnimated && forestData && <div className="w-full h-full  flex flex-col items-center relative pt-[56px]">
            {/* Forest Video Player */}
            {<ForestPlayerCon data={[...forestData].splice(0, 8).filter(item => item.type === "raw")} />}
            <div className="w-full h-[62px] bg-[#8BA5F8] sticky top-[56px] left-0 z-[40]">Filter Nav</div>
            <ContentContainer>
                <ForestContentsBox allData={forestData} />
                <div className="w-full flex justify-center mt-4">
                    <button 
                        onClick={onLoadMore}
                        disabled={videos?.total_pages <= page && clips?.total_pages <= page}
                        className={`px-6 py-2 text-white rounded-md transition-colors duration-200 ${
                            videos?.total_pages <= page && clips?.total_pages <= page 
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#8BA5F8] hover:bg-[#7B97F7]'
                        }`}
                    >
                        Load More
                    </button>
                </div>
                
            </ContentContainer>
        </div>}
    </>
}


export default ForestWrapper;
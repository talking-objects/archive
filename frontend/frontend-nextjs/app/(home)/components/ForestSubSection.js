import ContentContainer from "@/app/components/containers/ContentContainer";
import ForestContentsBox from "@/app/components/containers/forest/ForestContentsBox";
import { useEffect, useState } from "react";
import ExploreBtn from "./elements/ExploreBtn";
import { useQuery } from "@tanstack/react-query";
import { getClips, getVideos } from "@/app/utils/hooks/eva_api";


const ForestSubSection = () => {
  const [forestData, setForestData] = useState([]);
  const [page, setPage] = useState(1);    
    // Get Videos
    const {data: videos, isLoading: isLoadingVideos} = useQuery({
        queryKey: ["home", "videos"],
        queryFn: () => {
            return getVideos({page: 1, page_limit: 4, random: true})
        },
        keepPreviousData: true 
    })  

    // Get Clips
    const {data: clips, isLoading: isLoadingClips} = useQuery({
        queryKey: ["home", "clips"],
        queryFn: () => {
            return getClips({page: 1, page_limit: 4, random: true})
        },
        keepPreviousData: true 
    })     
    
    const getForestData = () => {
        if(videos && !isLoadingVideos && clips && !isLoadingClips){
          
            setForestData([...videos.data, ...clips.data])
            
        }
    }

    useEffect(() => {
    
        getForestData()
    }, [videos, clips, isLoadingVideos, isLoadingClips])
    
  return (
    <div className="w-full h-fit mt-12">
      <div className="-mb-16 px-4 font-ibm_mono_bolditalic text-lg">
        <div>Index</div>
      </div>
        {
            forestData.length > 0 && (
              <ContentContainer full={false}>
                <ForestContentsBox
                  allData={forestData}
                />
              </ContentContainer>
        )}
      <ExploreBtn path={"/forest"} />
    </div>
  );
};

export default ForestSubSection;

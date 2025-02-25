import SectionContainer from "./elements/SectionContainer"
import SectionHeader from "./elements/SectionHeader"
import SectionSubHeader from "./elements/SectionSubHeader"
import ForestSubSection from "./ForestSubSection"
import { useQuery } from "@tanstack/react-query";
import { getClips, getVideos } from "@/app/utils/hooks/eva_api";
import { useEffect, useState } from "react";
import ExploreBtn from "./elements/ExploreBtn";


const ExploreSection = () => {
    const exText = {
      title: `Explore our Archive`,
      subTitle: `Explore Manyfolded Knowlegde and Relations`
    }

    const [forestData, setForestData] = useState([]);  
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
    
    return <SectionContainer big={true}>
      <div className="flex flex-col w-full items-center">
        <SectionHeader text={exText.title} />
        <SectionSubHeader text={exText.subTitle} />
        <ForestSubSection forestData={forestData} />
        <div className="w-full h-fit mt-12">
          <div className="-mb-16 px-4 font-ibm_mono_bolditalic text-lg">
            <div>Place</div>
          </div>
         
          <ExploreBtn path={"/forest"} filter={"place_data"} view={"place_data"} />
        </div>
      </div>
    </SectionContainer>
  }


export default ExploreSection
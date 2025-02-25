import SectionContainer from "./elements/SectionContainer"
import SectionHeader from "./elements/SectionHeader"
import SectionSubHeader from "./elements/SectionSubHeader"
import ForestSubSection from "./ForestSubSection"
import { useQuery } from "@tanstack/react-query";
import { getClips, getVideos } from "@/app/utils/hooks/eva_api";
import { useEffect, useState } from "react";
import ExploreBtn from "./elements/ExploreBtn";
import ContentContainer from "@/app/components/containers/ContentContainer";
import LeafletMap from "@/app/components/map/Map";
import ForestEventWrapper from "@/app/forest/components/ForestEventWrapper";
import { BASE_URL } from "@/app/utils/constant/etc";
import Image from "next/image";


const ExploreSection = () => {
    const exText = {
      title: `Explore our Archive`,
      subTitle: `Explore Manyfolded Knowlegde and Relations`,
      placeTitle: "Place",
      eventTitle: "Event",
      placeText: `A digital archive for decolonial knowledge production. It is a curated archive and has no claim to completeness. Based on selected objects or collections, the Western canon is expanded to include further schools of thought and epistemologies.`
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
            return getClips({page: 1, page_limit: 30, random: true})
        },
        keepPreviousData: true 
    })     
    
    const getForestData = () => {
        if(videos && !isLoadingVideos && clips && !isLoadingClips){
            const data = [...videos.data, ...clips.data]
            console.log(data)
            setForestData(data)
            
        }
    }

    useEffect(() => {
        getForestData()
    }, [videos, clips, isLoadingVideos, isLoadingClips])
    
    return <SectionContainer big={true}>
      <div className="flex flex-col w-full items-center">
        <SectionHeader text={exText.title} />
        <SectionSubHeader text={exText.subTitle} />
        <ForestSubSection forestData={[...forestData].slice(0, 8)} />
        <div className="w-full h-fit mt-12">
          <div className="-mb-16 px-4 font-ibm_mono_bolditalic text-lg">
            <div>Relations</div>
          </div>
          {
            forestData.length > 0 && (
              <ContentContainer full={false}>
                <div className="w-full h-[400px] bg-white flex">
                  <div className="w-1/2 h-full relative flex">
                    {
                      ([...forestData].filter(v => v.type === "clip").filter(v => v.data.type === "categoryLayer")).map((v, idx) => {
                        return (
                          <div key={idx} className="bg-white relative w-full h-full">
                           <Image src={`${BASE_URL}/${v.data.pandora_id}/480p${v.data.start}.jpg`} alt={"Pandora Video Image"} fill
                           style={{objectFit: "cover"}} />
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className="w-1/2 h-full bg-white">
                    <div className="font-ibm_mono_regular w-full min-w-[320px] bg-white max-h-[350px] overflow-y-scroll py-4 px-4 flex flex-col ">
                      {exText.placeText}
                    </div>
                  </div>
                </div>
              </ContentContainer>
            )
          }
          <ExploreBtn path={"/forest"} filter={"category_data"} view={"category_data"} title={"Explore"} subTitle={"Categories"} />
        </div>
        <div className="w-full h-fit mt-12">
          <div className="-mb-16 px-4 font-ibm_mono_bolditalic text-lg">
            <div>Time and Space</div>
          </div>
          {
            forestData.length > 0 && (
              <ContentContainer full={false}>
                <div className="w-full h-[400px] bg-white flex">
                  <ForestEventWrapper allEvents={[...forestData].filter(v => v.type === "clip").filter(v => v.data.type === "eventLayer")} />
                </div>
              </ContentContainer>
            )
          }
          <ExploreBtn path={"/forest"} filter={"event_data"} view={"event_data"} title={"Explore"} subTitle={"Events"} />
        </div>
        <div className="w-full h-fit mt-12">
          <div className="-mb-16 px-4 font-ibm_mono_bolditalic text-lg">
            <div>{exText.placeTitle}</div>
          </div>
          {
            forestData.length > 0 && (
              <ContentContainer full={false}>
                <div className="w-full h-[400px] bg-white flex">
                  <div className="w-1/2 h-full  relative">
                    <LeafletMap allPlaces={[...forestData].filter(v => v.type === "clip").filter(v => v.data.type === "placeLayer")} forest={true} />
                  </div>
                  <div className="w-1/2 h-full bg-white">
                    <div className="font-ibm_mono_regular w-full min-w-[320px] bg-white max-h-[350px] overflow-y-scroll py-4 px-4 flex flex-col ">
                      {exText.placeText}
                    </div>
                  </div>
                </div>
              </ContentContainer>
            )
          }
          <ExploreBtn path={"/forest"} filter={"place_data"} view={"place_data"} title={"Explore"} subTitle={"Places"} />
        </div>
      </div>
    </SectionContainer>
  }


export default ExploreSection
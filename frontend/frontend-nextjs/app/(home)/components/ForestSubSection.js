import ContentContainer from "@/app/components/containers/ContentContainer";
import ForestContentsBox from "@/app/components/containers/forest/ForestContentsBox";
import { getAllAnnotations, getAllClips, getAllVideos } from "@/app/utils/hooks/pandora_api";
import { useEffect, useState } from "react";
import ExploreBtn from "./elements/ExploreBtn";

const ForestSubSection = () => {
    const pagination = 1
    const amount = 3
    const [allData, setAlldata] = useState([])
    const {data, isLoading} = getAllVideos({pagination: pagination, amount: amount});
    const {data:dataClips, isLoading:isLoadingClips} = getAllClips({pagination: pagination, amount: amount})
    const {data:dataAnnotations, isLoading:isLoadingAnnotations} = getAllAnnotations({pagination: pagination, amount: amount})
    const maxDurationValue = 10

    useEffect(() => {
        if(!isLoading && !isLoadingClips && !isLoadingAnnotations){
            const layerList = [
                "categoryList",
                "eventList",
                "narrationList",
                "placeList",
                "refList",
                "tagList",
            ]
            const categoryList = [
                {
                   slug: "identity",
                   value: "Identity",
                   color: "#9E21E8"
                },
                {
                   slug: "knowledge",
                   value: "Knowledge",
                   color: "#8BA5F8"
                },
                {
                   slug: "artistic_reflections",
                   value: "Artistic Reflections",
                   color: "#691220"
                },
                {
                   slug: "restitution",
                   value: "Restitution",
                   color: "#EC6735"
                },
                {
                   slug: "memory",
                   value: "Memory and The Imaginary",
                   color: "#F1A73D"
                },
                
             ]
            data.data.items.map((v) => {
                const randomIn = Math.floor(Math.random() * v.duration/2);
                v.type = "R"
                v.videoId = v.id
                v.duration = v.duration
                v.in = randomIn;
                v.out = (randomIn + maxDurationValue > v.duration) ? v.duration : randomIn + maxDurationValue // v.duration
                return v
            })
            dataClips.data.items.map((v) => {
                const id = v.id.split("/")[0]
                const maxDuration = (v.out - v.in) > maxDurationValue ? v.in + maxDurationValue : v.out;
                v.type = "C"
                v.videoId = id
                v.out = maxDuration
                return v
            })
            
            dataAnnotations.data.items.map((v) => {
                const randomIndex = Math.floor(Math.random() * layerList.length)
                const maxDuration = (v.out - v.in) > maxDurationValue ? v.in + maxDurationValue : v.out;
                v.type = "A"
                v.layer = layerList[randomIndex] //Fake Data
                v.videoId = v.item
                v.out = maxDuration

                if(layerList[randomIndex] === "categoryList" ){
                    v.category = categoryList[Math.floor(Math.random() * categoryList.length)]
                }
                return v
            })
            setAlldata([...allData,...[...data.data.items, ...dataClips.data.items, ...dataAnnotations.data.items].sort(() => Math.random() - 0.5)].slice(0, 8))
        }
    },[data, dataClips, dataAnnotations])
    
    return <div className="w-full h-fit mt-12">
          <div className="-mb-16 px-4 font-ibm_mono_bolditalic text-lg">
            <div>Index</div>
          </div>
          {
            <ContentContainer full={false}>
                <ForestContentsBox isLoading={(isLoading || isLoadingClips || isLoadingAnnotations)} allData={allData} />
            </ContentContainer>
          }
          <ExploreBtn path={"/forest"} />
        </div>
     

}

export default ForestSubSection;
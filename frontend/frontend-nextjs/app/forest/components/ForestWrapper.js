
import ContentContainer from "@/app/components/containers/ContentContainer";
import ForestContentsBox from "@/app/components/containers/forest/ForestContentsBox";
import ForestPlayerCon from "@/app/components/containers/players/ForestPlayerCon";
import LoadingCon from "@/app/components/LoadingCon";
import LoadingDataCon from "@/app/components/LoadingDataCon";
import { getAllAnnotations, getAllClips, getAllVideos } from "@/app/utils/hooks/pandora_api";
import { loadingState } from "@/app/utils/recoillib/state/state";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";


const ForestWrapper = () => {
    const [pagination, setPagination] = useState(1)
    // const {data:dataCount, isLoading:isLoadingCount} = getAllVideosCounts();
    const [allData, setAlldata] = useState([])
    const {data, isLoading} = getAllVideos({pagination: pagination});
    const {data:dataClips, isLoading:isLoadingClips} = getAllClips({pagination: pagination})
    const {data:dataAnnotations, isLoading:isLoadingAnnotations} = getAllAnnotations({pagination: pagination})

    const [previewVideoData, setPreviewVideoData] = useState(null)
    const maxDurationValue = 10
     const getLoadingState = useRecoilValue(loadingState);
     const [isReady, setIsReady] = useState(false)

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
            setAlldata([...allData,...[...data.data.items, ...dataClips.data.items, ...dataAnnotations.data.items].sort(() => Math.random() - 0.5)])
        }
    },[data, dataClips, dataAnnotations])


    useEffect(() => {
        const previewDataList = JSON.parse(JSON.stringify(allData));
        const filteredDataList = [];
        let index = 0;
        while(filteredDataList.length < 10 && index < 20){
            if(previewDataList[index]?.out - previewDataList[index]?.in > 0){
                filteredDataList.push(previewDataList[index])
            }
            index += 1
        }

        const newData = filteredDataList.map((value) => {
            const newItem = {
                videoId: value.videoId,
                ...(String(value.in) && {in: value.in} ),
                ...(String(value.out) && {out: value.out}),
                ...(String(value.duration) && {duration: value.duration})
            }
            return newItem
        })
        newData.map((value, index) => {
            value.newIn = newData[index - 1] ? newData[index - 1].newOut : 0
            value.newOut = newData[index - 1] ? newData[index].newIn + (newData[index].out - newData[index].in) : (newData[index].out - newData[index].in )
            return value;
        })

        setPreviewVideoData(newData)
        



    },[allData])

    if((getLoadingState.isLoading && getLoadingState.hasAnimated && !Boolean(isReady))){
        return <div className="w-full h-[100svh]">
          <LoadingDataCon ready={isReady} readyData={Boolean(previewVideoData)} comLoader={() => setIsReady(true)} />
        </div>
      }
    
    return <>
        {(!getLoadingState.isLoading || !getLoadingState.hasAnimated) && (
        <LoadingCon ready={Boolean(previewVideoData)} comLoader={() => setIsReady(true)} />
      )}
        {<div className="w-full h-full flex flex-col items-center relative pt-[56px]">
            {/* Forest Video Player */}
            {(previewVideoData && previewVideoData.length > 0) && <ForestPlayerCon data={previewVideoData} />}
            <div className="w-full h-[62px] bg-[#8BA5F8] sticky top-[56px] left-0 z-[40]"></div>
            {getLoadingState.hasAnimated && (
                <ContentContainer>
                    <ForestContentsBox isLoading={(isLoading || isLoadingClips || isLoadingAnnotations)} allData={allData} />
                    {(!isLoading || !isLoadingClips || !isLoadingAnnotations) && <div className="w-full py-4 flex justify-center items-center">
                        <div onClick={() => setPagination((prev) => prev + 1)} className="py-4 px-4 w-fit h-fit border border-black rounded-full cursor-pointer">Load More</div>
                    </div>}
                </ContentContainer>
            )}
        </div>}
    </>
}


export default ForestWrapper;
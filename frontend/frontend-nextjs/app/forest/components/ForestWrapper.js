import { ContentContainer, ForestPlayerContainer } from "@/app/components/containers/Containers";
import { BASE_URL, COLORS } from "@/app/utils/constant/etc";
import { getAllAnnotations, getAllAnnotationsCounts, getAllClips, getAllVideos, getAllVideosCounts } from "@/app/utils/hooks/pandora_api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const InfoLable = ({children}) => {
    return <div className="group-hover:opacity-100 group-hover:left-[28px] flex opacity-0 absolute top-0 left-[16px] bg-neutral-800 px-1 py-1 border-[0.5px] border-neutral-300 text-white rounded-md w-fit text-xs whitespace-nowrap pointer-events-none select-none transition-all duration-150">{children}</div>
}
const AnnotationIcon = ({layer}) => {
    const getLayerName = (layer) => {
        if(layer === "eventList"){
            return "Event layer"
        }
        if(layer === "tagList"){
            return "Tag layer"
        }
        if(layer === "placeList"){
            return "Place layer"
        }
        if(layer === "refList"){
            return "Reference layer"
        }
        if(layer === "narrationList"){
            return "Narration layer"
        }
        if(layer === "categoryList"){
            return "Category layer"
        }
        return "Error say to DainDev"
    }
    return <div className="w-8 h-8 bg-white flex justify-center items-center cursor-help group relative">
         <InfoLable><span>{getLayerName(layer)}</span></InfoLable>
        {layer === "categoryList" && <div className="w-2/3 aspect-square grid grid-cols-2 text-white text-xs font-medium ">
            <div style={{backgroundColor: `${COLORS.c6}`}} className="w-full h-full"></div>
            <div style={{backgroundColor: `${COLORS.c5}`}} className="w-full h-full"></div>
            <div style={{backgroundColor: `${COLORS.c4}`}} className="w-full h-full"></div>
            <div style={{backgroundColor: `${COLORS.c3}`}} className="w-full h-full"></div>
        </div>}
        {layer === "eventList" && <div style={{backgroundColor: `${COLORS.c6}`, borderColor: `${COLORS.c5}`}} className="w-2/3 aspect-square flex justify-center items-center border-[3px] text-white text-xs font-medium"></div>}
        {layer === "tagList" && <div style={{backgroundColor: `${COLORS.c6}`}} className="w-2/3 aspect-square border border-black flex justify-center items-center text-white text-xs font-medium"></div>}
        {layer === "placeList" && <div style={{backgroundColor: `${COLORS.c6}`, borderColor: `${COLORS.c4}`}} className="w-2/3 aspect-square border-[3px] rounded-full flex justify-center items-center text-white text-xs font-medium"></div>}
        {layer === "refList" && <div style={{backgroundColor: `${COLORS.c0}`, borderColor: `${COLORS.c4}`}} className="w-2/3 aspect-square border-[3px] rounded-full flex justify-center items-center text-white text-xs font-medium"></div>}
        {layer === "narrationList" && <div style={{backgroundColor: `${COLORS.c2}`}} className="w-2/3 aspect-square border border-black flex justify-center items-center text-white text-xs font-medium"></div>}
    </div>
}

const RawIcon = () => {
    return  <div className="w-8 h-8 bg-white flex justify-center items-center cursor-help group relative">
        <InfoLable className="group-hover:flex hidden absolute top-[0px] left-[32px] bg-white text-black w-fit max-w-20 text-xs"><span>Raw Video</span></InfoLable>
        <div className="w-2/3 aspect-square bg-black rounded-full flex justify-center items-center text-white text-xs font-medium">R</div>
        </div>
}
const ClipIcon = () => {
    return  <div className="w-8 h-8 bg-white flex justify-center items-center cursor-help group relative">
        <InfoLable className="group-hover:flex hidden absolute top-0 left-[32px] bg-white text-black w-fit max-w-20 text-xs"><span>Clip</span></InfoLable>
        <div className="w-2/3 aspect-square bg-black rounded-full flex justify-center items-center text-white text-xs font-medium">C</div>
        </div>
}

const ForestContentsImageBox = ({val}) => {
    const [getId, setId] = useState(null);
    const [getPostFrame, setPostFrame] = useState(null);
    useEffect(() => {
        if(val.type === "R"){
            setId(val.id)
            setPostFrame(val.posterFrame)
        }
        if(val.type === "C"){
            setId(val.id.split("/")[0])
            setPostFrame(val.in)
        }
        if(val.type === "A"){
            setId(val.item)
            setPostFrame(val.in)
        }
    },[])
    return <div 
    style={{backgroundImage: `url(${BASE_URL}/${getId}/480p${getPostFrame}.jpg)`}} 
    className="w-full aspect-video bg-neutral-200 rounded-md overflow-hidden bg-no-repeat bg-cover bg-center flex justify-center items-center">
        {val.layer === "placeList" && <div className="bg-white text-black">Place</div>}
    </div>
}

const ForestContentsContainer = ({isLoading=true, allData}) => {
    const router = useRouter();

    const onPush = (value) => {
        if(value.type === "R"){
            router.push(`/video/${value.id}`)
        }
        if(value.type === "C"){
            const id = value.id.split("/")[0]
            router.push(`/clip/${id}?clipId=${value.id}&id=${id}`)
        }
    }
    
    return <div className="w-full py-4 h-fit">
        {isLoading && <div className="w-full rounded-lg bg-[#fff] h-[450px] animate-pulse"></div>}
        {(!isLoading) && <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allData && allData.map((val, idx) => {
                return <div key={idx} className="flex w-full">
                            <div className="w-8 flex flex-col h-full">
                                {val.type === "R" && <RawIcon />}
                                {(val.type === "C" || val.type === "A" )&& <ClipIcon />}
                                {val.type === "A" && <AnnotationIcon layer={val.layer} />}
                            </div>
                        <div onClick={() => onPush(val)} className="w-full h-full cursor-pointer">
                            <ForestContentsImageBox val={val} />
                            <div className="w-fit text-xs mt-2 font-semibold italic">{val.title}</div>
                        </div>
                   
                      
                    </div>
            })}
            </div>}
    </div>
}


const ForestWrapper = () => {
    const [pagination, setPagination] = useState(1)
    // const {data:dataCount, isLoading:isLoadingCount} = getAllVideosCounts();
    const [allData, setAlldata] = useState([])
    const {data, isLoading} = getAllVideos({pagination: pagination});
    const {data:dataClips, isLoading:isLoadingClips} = getAllClips({pagination: pagination})
    const {data:dataAnnotations, isLoading:isLoadingAnnotations} = getAllAnnotations({pagination: pagination})

    const [previewVideoData, setPreviewVideoData] = useState(null)
    useEffect(() => {
        if(!isLoading && !isLoadingClips && !isLoadingAnnotations){
            console.log(data.data.items)
            console.log(dataClips.data.items)
            console.log(dataAnnotations.data.items)
           
            const layerList = [
                "categoryList",
                "eventList",
                "narrationList",
                "placeList",
                "refList",
                "tagList",
            ]
            data.data.items.map((v) => {
                const randomIn = Math.floor(Math.random() * v.duration/2);
                v.type = "R"
                v.videoId = v.id
                v.duration = v.duration
                v.in = randomIn;
                v.out = (randomIn + 10 > v.duration) ? v.duration : randomIn + 10 // v.duration
                return v
            })
            dataClips.data.items.map((v) => {
                const id = v.id.split("/")[0]
                v.type = "C"
                v.videoId = id
                return v
            })
            
            dataAnnotations.data.items.map((v) => {
                v.type = "A"
                v.layer = layerList[Math.floor(Math.random() * layerList.length)] //Fake Data
                v.videoId = v.item
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
        console.log("Preview Data",newData)



    },[allData])
    
    return <>
        <div className="w-full h-full flex flex-col items-center relative">
            <div className="w-full h-fit py-4 flex justify-center items-center text-7xl font-medium">Our Archive</div>
            {/* Forest Video Player */}
            {(previewVideoData && previewVideoData.length > 0) && <ForestPlayerContainer data={previewVideoData} />}
            <div className="w-full h-[62px] bg-[#8BA5F8] sticky top-0 left-0 z-[30]"></div>
                <ContentContainer>
                    <ForestContentsContainer isLoading={(isLoading || isLoadingClips || isLoadingAnnotations)} allData={allData} />
              
                    {(!isLoading || !isLoadingClips || !isLoadingAnnotations) && <div className="w-full py-4 flex justify-center items-center">
                        <div onClick={() => setPagination((prev) => prev + 1)} className="py-4 px-4 w-fit h-fit border border-black rounded-full cursor-pointer">Load More</div>
                    </div>}
                </ContentContainer>
        </div>
    </>
}


export default ForestWrapper;
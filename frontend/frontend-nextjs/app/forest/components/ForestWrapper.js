import { ContentContainer } from "@/app/components/containers/Containers";
import { BASE_URL, COLORS } from "@/app/utils/constant/etc";
import { getAllAnnotations, getAllAnnotationsCounts, getAllClips, getAllVideos, getAllVideosCounts } from "@/app/utils/hooks/pandora_api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AnnotationIcon = ({layer}) => {
    return <div className="w-8 h-8 bg-white flex justify-center items-center">
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
    return  <div className="w-8 h-8 bg-white flex justify-center items-center">
        <div className="w-2/3 aspect-square bg-black rounded-full flex justify-center items-center text-white text-xs font-medium">R</div>
        </div>
}
const ClipIcon = () => {
    return  <div className="w-8 h-8 bg-white flex justify-center items-center">
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
        {isLoading && <div className="w-full rounded-lg bg-[#8BA5F8] h-[450px] animate-pulse"></div>}
        {(!isLoading) && <div className="w-full grid grid-cols-4 gap-4">
            {allData && allData.map((val, idx) => {
                return <div key={idx} onClick={() => onPush(val)} className="flex w-full cursor-pointer">
                            <div className="w-8 flex flex-col h-full">
                                {val.type === "R" && <RawIcon />}
                                {val.type === "C" && <ClipIcon />}
                                {val.type === "A" && <AnnotationIcon layer={val.layer} />}
                            </div>
                        <div className="w-full h-full">
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
    const {data, isLoading} = getAllVideos({pagination: pagination});
    const [allData, setAlldata] = useState([])
    const {data:dataClips, isLoading:isLoadingClips} = getAllClips({pagination: pagination})
    const {data:dataAnnotations, isLoading:isLoadingAnnotations} = getAllAnnotations({pagination: pagination})
    useEffect(() => {
        if(!isLoading && !isLoadingClips && !isLoadingAnnotations){
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
                v.type = "R"
                return v
            })
            dataClips.data.items.map((v) => {
                v.type = "C"
                return v
            })
            
            dataAnnotations.data.items.map((v) => {
                v.type = "A"
                v.layer = layerList[Math.floor(Math.random() * layerList.length)] //Fake Data
                return v
            })
            setAlldata([...allData,...[...data.data.items, ...dataClips.data.items, ...dataAnnotations.data.items].sort(() => Math.random() - 0.5)])
        }
    },[data, dataClips, dataAnnotations])
    
    return <>
        <div className="w-full h-full flex flex-col items-center">
            <div className="w-full h-fit py-4 flex justify-center items-center text-7xl font-medium">Our Archive</div>
            <div className="w-full h-[100svh] bg-black"></div>
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
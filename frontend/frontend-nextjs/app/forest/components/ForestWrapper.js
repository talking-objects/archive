import { ContentContainer } from "@/app/components/containers/Containers";
import { BASE_URL } from "@/app/utils/constant/etc";
import { getAllAnnotations, getAllAnnotationsCounts, getAllClips, getAllVideos, getAllVideosCounts } from "@/app/utils/hooks/pandora_api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VideosContainer = ({data, isLoading, dataCount, isLoadingCount}) => {
    const router = useRouter()
    const [getData, setData] = useState(null)
    const [getCount, setCount] = useState(null)
    useEffect(() => {
        if(!isLoading){
            
            setData(data.data)
        }
    },[data])
    useEffect(() => {
        if(!isLoadingCount){
            setCount(dataCount.data)
        }
    },[dataCount])

    const onPush = (path) => {
        router.push(path)
    }
    return <div className="w-full py-4 h-fit">
        <div className="flex w-full gap-4 items-center text-2xl mb-4">
            <div>Videos</div>
            {(!isLoadingCount && getCount) && <div>({getCount.items})</div>}
        </div>
        {isLoading && <div className="w-full rounded-lg bg-neutral-300 h-[450px] animate-pulse"></div>}
        {(!isLoading && getData) && <div className="flex flex-col w-full gap-4">
            <div className="w-full grid grid-cols-3 gap-4">
            {getData.items.map((val, idx) => {
                return <div key={idx} onClick={() => onPush(`/video/${val.id}`)} className="flex flex-col w-full cursor-pointer">
                        <div 
                        style={{backgroundImage: `url(${BASE_URL}/${val.id}/480p${val.posterFrame}.jpg)`}}
                        className="w-full aspect-video bg-neutral-200 rounded-lg overflow-hidden border-2 border-black bg-no-repeat bg-cover bg-center" />
                        <div className="bg-orange-400 px-2 w-fit">{val.title}</div>
                    </div>
            })}
            </div>
            <div onClick={() => onPush(`/video`)} className="cursor-pointer text-emerald-400">See all</div>
        </div>}

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
    },[])
    return <div style={{backgroundImage: `url(${BASE_URL}/${getId}/480p${getPostFrame}.jpg)`}} className="w-full aspect-video bg-neutral-200 rounded-md overflow-hidden bg-no-repeat bg-cover bg-center" />
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
    // const {data:dataAnnotations, isLoading:isLoadingAnnotations} = getAllAnnotations({rangeToggle:true, range: [0, 12]})
    useEffect(() => {
        if(!isLoading && !isLoadingClips){
           
            data.data.items.map((v) => {
                v.type = "R"
                return v
            })
            dataClips.data.items.map((v) => {
                v.type = "C"
                return v
            })
            setAlldata([...allData,...[...data.data.items, ...dataClips.data.items].sort(() => Math.random() - 0.5)])
        }
    },[data, dataClips])
    return <>
        <div className="w-full h-full flex flex-col items-center">
            <div className="w-full h-fit py-4 flex justify-center items-center text-7xl font-medium">Our Archive</div>
                <ContentContainer>
                    <ForestContentsContainer isLoading={(isLoading || isLoadingClips)} allData={allData} />
                    {/* <VideosContainer data={data} isLoading={isLoading} dataCount={dataCount} isLoadingCount={isLoadingCount} /> */}
                    {/* <AnnotationsContainer data={dataAnnotations} isLoading={isLoadingAnnotations} /> */}
                    {(!isLoading || !isLoadingClips) && <div className="w-full py-4 flex justify-center items-center">
                        <div onClick={() => setPagination((prev) => prev + 1)} className="py-4 px-4 w-fit h-fit border border-black rounded-full cursor-pointer">Load More</div>
                    </div>}
                </ContentContainer>
        </div>
    </>
}


export default ForestWrapper;
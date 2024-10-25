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

const AnnotationsContainer = ({data, isLoading}) => {
    const [getData, setData] = useState(null)
    
    useEffect(() => {
        if(!isLoading){
            
            setData(data.data)
        }
    },[data])
    
    return <div className="w-full py-4 h-fit">
        <div className="flex w-full gap-4 items-center text-2xl mb-4">
            <div>Annotations</div>
         
        </div>
        {isLoading && <div className="w-full rounded-lg bg-neutral-300 h-[450px] animate-pulse"></div>}
        {(!isLoading && getData) && <div className="flex flex-col w-full gap-4">
            <div className="w-full grid grid-cols-3 gap-4">
            {getData.items.map((val, idx) => {
                return <div key={idx} className="flex aspect-video border-red-400 border-2 overflow-hidden rounded-xl w-full cursor-pointer gap-2">
                        <div className="bg-white px-2 w-full flex-1 flex flex-col gap-2 p-2 text-sm">
                            <div>Layer: {val.layer}</div>
                            <div>Value: {val.value}</div>
                        </div>
                        <div 
                        style={{backgroundImage: `url(${BASE_URL}/${val.item}/480p${val.in}.jpg)`}}
                        className="w-full flex-1 aspect-square bg-neutral-200 overflow-hidden bg-no-repeat bg-cover bg-center" />
                    </div>
            })}
            </div>
            <div className="cursor-pointer text-emerald-400">See all</div>
        </div>}

    </div>
}


const ForestWrapper = () => {
    const {data:dataCount, isLoading:isLoadingCount} = getAllVideosCounts();
    const {data, isLoading} = getAllVideos({rangeToggle:true, range: [0, 6]});

    const {data:dataAnnotations, isLoading:isLoadingAnnotations} = getAllAnnotations({rangeToggle:true, range: [0, 12]})
    const {data:dataClips, isLoading:isLoadingClips} = getAllClips()
    // const {data:dataAnnotationsCount, isLoading:isLoadingAnnotationsCount} = getAllAnnotationsCounts()
    // useEffect(() => {
    //     if(!isLoading && !isLoadingCount){
    //         
    //         
    //     }
    // },[data, dataCount])
    useEffect(() => {
        if(!isLoadingClips){
            
        }
    },[dataClips]) 
    useEffect(() => {
        if(!isLoadingAnnotations){
       
            
            const test = dataAnnotations.data.items
            const cate = {}

            for(let i = 0; i < test.length; i++){
                if(cate[test[i].layer]){
                    cate[test[i].layer] += 1;
                }else{
                    cate[test[i].layer] = 1
                }
            }
            
          
        }
    },[dataAnnotations])
    return <>
        <div className="w-full h-full flex flex-col items-center">
            <div className="w-full h-fit py-4 flex justify-center items-center text-7xl font-medium">Our Archive</div>
            <div className="w-full py-4 bg-blue-400">nav</div>
            <ContentContainer>
                <VideosContainer data={data} isLoading={isLoading} dataCount={dataCount} isLoadingCount={isLoadingCount} />
                <AnnotationsContainer data={dataAnnotations} isLoading={isLoadingAnnotations} />
            </ContentContainer>
        </div>
    </>
}


export default ForestWrapper;
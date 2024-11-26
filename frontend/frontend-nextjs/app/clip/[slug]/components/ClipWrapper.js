import { MainContainer, VideoPlayerContainer } from "@/app/components/containers/Containers";
import VideoPlayerCon from "@/app/components/containers/players/VideoPlayerCon";
import { getClip } from "@/app/utils/hooks/pandora_api";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";


const ClipWrapper = () => {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const videoContainerRef = useRef(null)
    const {isLoading, data, error} = getClip({originId:searchParams.get("clipId")})
    const [getVideoData, setVideoData] = useState(null);
    useEffect(() => {
        console.log(searchParams.get("clipId"))

    },[])

    useEffect(() => {
        if(!isLoading){
            console.log(data)
            let editedData = JSON.parse(JSON.stringify(data.data.items[0]))
            editedData.originId = editedData.id
            editedData.id = searchParams.get("id")
            editedData.duration = editedData.out - editedData.in
            editedData.director = []
            console.log(editedData)
            
            setVideoData(editedData)
        }
    },[data])
   
 
    return (
        <MainContainer>
            {(!isLoading && getVideoData) && <>
            <div ref={videoContainerRef} className="w-full h-[100svh] relative">
                {/* <VideoPlayerCon data={getVideoData} clip={true} /> */}
                <VideoPlayerContainer data={getVideoData} clip={true} />
            </div>
            
            </>
            }
        </MainContainer>
      
    )
}


export default ClipWrapper;
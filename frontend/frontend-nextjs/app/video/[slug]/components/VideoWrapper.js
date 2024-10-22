"use client"

import { MainContainer, VideoPlayerContainer } from "@/app/components/containers/Containers";
import { BASE_URL } from "@/app/utils/constant/etc";
import { getVideo } from "@/app/utils/hooks/pandora_api";
import { toaFetchData } from "@/app/utils/hooks/toaFetch";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";





const VideoWrapper = () => {
    const params = useParams();
    const [getVideoData, setVideoData] = useState(null);
    const {isLoading, data, error} = getVideo({pId:params.slug})
    useEffect(() => {
        console.log(isLoading)
        if(!isLoading){
            console.log(data)
            setVideoData(data.data.items[0])
        }
    },[data])
    if(error){
       return (<div className="w-screen h-[100svh] flex justify-center items-center">
            Error
        </div>)
    }
   

    return (<MainContainer>
        {(!isLoading && getVideoData) && <>
            <VideoPlayerContainer data={getVideoData} />
            <div>
                Contents
            </div>
        </>
        }
    </MainContainer>)
}

export default VideoWrapper;
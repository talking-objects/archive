"use client"

import { BASE_URL } from "@/app/utils/constant/etc";
import { toaFetchData } from "@/app/utils/hooks/toaFetch";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const getVideo = async (pId) => {
    // Get Item
    const bodyData = {
      action: "get",
      data: { id: pId, keys: [] },
    };
    return await toaFetchData(bodyData);
};


  

const VideoWrapper = () => {
    const params = useParams();
    const [getLoading, setLoading] = useState(true);
    const [getVideoData, setVideoData] = useState(null);

    useEffect(() => {
        (async () => {
            const video = await getVideo(params.slug);
          
            if(video.status.code === 404){
                setLoading(false)
            }else{
                setLoading(false)
                setVideoData(video.data)
            }
      
            console.log(video.data)

        })()
    },[])
    
    if(getLoading){
       return (<div className="w-screen h-[100svh] flex justify-center items-center">
            Loading...
        </div>)
    }
    if(!Boolean(getVideoData) && !getLoading){
        return (<div className="w-screen h-[100svh] flex justify-center items-center">
            Video Not Found
        </div>)
    }

    
    return (<div className="w-screen h-full min-h-[100svh] flex justify-center items-center">
        <div className="w-screen h-[100svh] p-8">
            <div>
                <div>{getVideoData?.title}</div>
                <video src={`${BASE_URL}/${params.slug}/480p1.mp4`} className="w-full aspect-video relative" controls={true} aria-label="video player" preload="auto">
                    <source type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    </div>)
}

export default VideoWrapper;
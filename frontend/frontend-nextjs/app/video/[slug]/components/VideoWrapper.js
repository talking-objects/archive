"use client"

import { ContentContainer, MainContainer, VideoPlayerContainer } from "@/app/components/containers/Containers";
import LeafletMap from "@/app/components/map/Map";
import { BASE_URL } from "@/app/utils/constant/etc";
import { getVideo } from "@/app/utils/hooks/pandora_api";
import { toaFetchData } from "@/app/utils/hooks/toaFetch";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";





const VideoWrapper = () => {
    const params = useParams();
    const [getVideoData, setVideoData] = useState(null);
    const {isLoading, data, error} = getVideo({pId:params.slug})
    const videoContainerRef = useRef(null);
    const [showContentVideo, setShowContentVideo] = useState(false)

    useEffect(() => {
 
        if(!isLoading){
            console.log(data.data.items[0])
            setVideoData(data.data.items[0])
        }
    },[data])
    if(error){
       return (<div className="w-screen h-[100svh] flex justify-center items-center">
            Error
        </div>)
    }

    useEffect(() => {
        if(videoContainerRef){
            const detectScroll = (e) => {
                if(videoContainerRef.current){
                    if((videoContainerRef.current.clientHeight/2) < window.scrollY){
                        setShowContentVideo(true)
                    }else{
                        setShowContentVideo(false)
                    }
                    
                }
               
                }

                window.addEventListener("scroll", detectScroll)
        
                    return () => {
                        window.removeEventListener("scroll", detectScroll)
                    }
               
        }
    },[])
   

    return (<MainContainer>
        {(!isLoading && getVideoData) && <>
            <div ref={videoContainerRef} className="w-full h-[100svh] relative">
                <VideoPlayerContainer data={getVideoData} />
            </div>
           
            <ContentContainer>
                <div className="w-full relative bg-neutral-200">
                    <div className={`sticky top-0 left-0 w-1/2 aspect-video bg-red-300 ${showContentVideo ? "translate-x-0 opacity-100 select-auto" : "-translate-x-full opacity-0 pointer-events-none select-none"} transition-all duration-700`}></div>
                    <div className="w-full h-[200svh]">
                        <div className="w-full h-[100svh]">
                            {/* <LeafletMap /> */}
                        </div>
                    </div>
                </div>
            </ContentContainer>
        </>
        }
    </MainContainer>)
}

export default VideoWrapper;
"use client"

import { ContentContainer, MainContainer, VideoPlayerContainer } from "@/app/components/containers/Containers";
import VideoPlayerCon from "@/app/components/containers/players/VideoPlayerCon";
import ContentBox from "@/app/components/elements/contents/ContentBox";
import LeafletMap from "@/app/components/map/Map";
import { BASE_URL } from "@/app/utils/constant/etc";
import { createFakeAnnotations } from "@/app/utils/hooks/etc";
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
    const contentsRef = useRef(null)
    const contentsDummyRef = useRef(null)
    useEffect(() => {
 
        if(!isLoading){
            console.log(data.data.items[0])
            data.data.items[0].nAnnotations = createFakeAnnotations({duration:data.data.items[0].duration, editVersion: false})
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

    useEffect(() => {
        if(!isLoading){
            if(contentsDummyRef && contentsRef){
                console.log(contentsRef)
                const refHeight = contentsRef.current.clientHeight;
                console.log(refHeight)
                contentsDummyRef.current.style.height = `${refHeight}px`
            }
        }
    },[getVideoData])
   

    return (<MainContainer>
        {(!isLoading && getVideoData) && <>
            <div ref={videoContainerRef} className="w-full h-[100svh] relative">
                {/* <VideoPlayerContainer data={getVideoData} /> */}
                <VideoPlayerCon data={getVideoData} />
            </div>
           
            <ContentContainer>
                <div className="w-full relative bg-white">
                    {/* Small Video */}
                    <div className={`sticky top-[0] mt-[40px] left-0 w-1/2 py-4 px-4 bg-white ${showContentVideo ? "translate-x-0 opacity-100 select-auto" : "-translate-x-full opacity-0 pointer-events-none select-none"} transition-all duration-700 z-[30]`}>
                        <div className="aspect-video bg-green-300"></div>
                    </div>
                    <div ref={contentsDummyRef} className="w-full bg-emerald-600"></div>
                    <div ref={contentsRef} className="w-full absolute top-[40px] left-0 bg-blue-400 flex flex-col gap-10">
                        {getVideoData.summary && <ContentBox>
                                 <div className="text-2xl">Context</div>
                                 <div>
                                    <div>Summary</div>
                                    <div className="text-sm whitespace-break-spaces" dangerouslySetInnerHTML={{__html: getVideoData.summary}}></div>
                                 </div>
                                 <div className="grid grid-cols-3 mt-4 gap-4">
                                    <div>
                                       <div>Contributors</div>
                                       <div className="text-sm"> {getVideoData.user} </div>
                                    </div>
                                    <div>
                                       <div>Country</div>
                                       <div className="text-sm"> {getVideoData.country.join(", ")} </div>
                                    </div>
                                    <div>
                                       <div>Source</div>
                                       <div className="text-sm"></div>
                                    </div>
                                    <div>
                                       <div>Language</div>
                                       <div className="text-sm"> {getVideoData.language.join(", ")} </div>
                                    </div>
                                    <div>
                                       <div>Genre</div>
                                       <div className="text-sm"></div>
                                    </div>
                                 </div>  
                        </ContentBox>}
                         {(getVideoData.nAnnotations.placeList && getVideoData.nAnnotations.placeList.length > 0) && <ContentBox>
                            <div className="text-2xl">Place</div>
                            <div className="w-full aspect-video relative bg-black overflow-hidden">
                                <LeafletMap allPlaces={getVideoData.nAnnotations.placeList} />
                            </div>
                         </ContentBox>}
                         {(getVideoData.nAnnotations.eventList && getVideoData.nAnnotations.eventList.length > 0) && <ContentBox>
                            <div className="text-2xl">Event</div>
                         </ContentBox>}
                         {(getVideoData.nAnnotations.categoryList && getVideoData.nAnnotations.categoryList.length > 0) && <ContentBox>
                            <div className="text-2xl">categoryList</div>
                         </ContentBox>}
                    </div>
                </div>
            </ContentContainer>
        </>
        }
    </MainContainer>)
}

export default VideoWrapper;
"use client";

import {
  MainContainer,
} from "@/app/components/containers/Containers";
import ContentContainer from "@/app/components/containers/ContentContainer";
import VideoPlayerCon from "@/app/components/containers/players/VideoPlayerCon";
import Contents from "@/app/components/elements/contents/Contents";
import LoadingCon from "@/app/components/LoadingCon";
import LoadingDataCon from "@/app/components/LoadingDataCon";
import { getEvaVideo } from "@/app/utils/hooks/eva_api";
import { loadingState } from "@/app/utils/recoillib/state/state";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";

const VideoWrapper = () => {
  const params = useParams();
  const { data: video, isLoading: isLoadingVideo, error: isVideoNotFound } = useQuery({
    queryKey: ["video", params.slug],
    queryFn: () => getEvaVideo(params.slug)
  })
  const [getVideoData, setVideoData] = useState(null);
  const videoContainerRef = useRef(null);
  const [showContentVideo, setShowContentVideo] = useState(false);
  const [getCurrentTimeForMini, setCurrentTimeForMini] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const getLoadingState = useRecoilValue(loadingState);
 
  useEffect(() => {
    if (!isLoadingVideo && !isVideoNotFound) {
      console.log(video)
      setVideoData(video);
    }
  }, [video, isLoadingVideo]);

  
  // Show Contents Video
  useEffect(() => {
    if (videoContainerRef) {
      const detectScroll = (e) => {
        if (videoContainerRef.current) {
          if (videoContainerRef.current.clientHeight / 2 < window.scrollY) {
            setShowContentVideo(true);
          } else {
            setShowContentVideo(false);
          }
        }
      };

      window.addEventListener("scroll", detectScroll);

      return () => {
        window.removeEventListener("scroll", detectScroll);
      };
    }
  }, []);
  

  if((getLoadingState.isLoading && getLoadingState.hasAnimated && !Boolean(isReady))){
    return <div className="w-full h-[100svh]">
      <LoadingDataCon ready={isReady} readyData={Boolean(!isLoadingVideo)} comLoader={() => setIsReady(true)} />
    </div>
  }

  if(isVideoNotFound){
    return <div className="w-full h-[100svh]">
      <div className="w-full h-full flex justify-center items-center">
        <div className="text-black text-[24px] font-ibm_mono_bolditalic">Video Not Found</div>
      </div>
    </div>
  }

  return (
    <>
      {(!getLoadingState.isLoading || !getLoadingState.hasAnimated) && (
        <LoadingCon ready={Boolean(!isLoadingVideo)} comLoader={() => setIsReady(true)} />
      )}
      {getVideoData && !isLoadingVideo && (
        <MainContainer>
          <>
            <div ref={videoContainerRef} className="w-full h-[100svh] relative pt-[56px]">
              <VideoPlayerCon data={getVideoData} showContentVideo={showContentVideo} setCurrentTimeForMini={setCurrentTimeForMini} />
            </div>
            {getLoadingState.hasAnimated && <Contents getCurrentTimeForMini={getCurrentTimeForMini} videoId={getVideoData.pandora_id} isLoading={isLoadingVideo} getVideoData={getVideoData} showContentVideo={showContentVideo} />}
          </>
        </MainContainer>)
      }
    </>
  );
};

export default VideoWrapper;

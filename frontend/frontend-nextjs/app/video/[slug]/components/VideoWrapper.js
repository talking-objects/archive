"use client";

import {
  MainContainer,
} from "@/app/components/containers/Containers";
import VideoPlayerCon from "@/app/components/containers/players/VideoPlayerCon";
import Contents from "@/app/components/elements/contents/Contents";
import LoadingCon from "@/app/components/LoadingCon";
import LoadingDataCon from "@/app/components/LoadingDataCon";
import { createFakeAnnotations } from "@/app/utils/hooks/etc";
import { getAllAnnotations, getVideo } from "@/app/utils/hooks/pandora_api";
import { loadingState } from "@/app/utils/recoillib/state/state";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";

const VideoWrapper = () => {
  const params = useParams();
  const [getVideoData, setVideoData] = useState(null);
  const { isLoading, data, error } = getVideo({ pId: params.slug });
  const {data:annotationData, isLoading:annotationLoading} = getAllAnnotations({itemId:params.slug})
  const videoContainerRef = useRef(null);
  const [showContentVideo, setShowContentVideo] = useState(false);
  const [getCurrentTimeForMini, setCurrentTimeForMini] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const getLoadingState = useRecoilValue(loadingState);
 
  useEffect(() => {
    if (!isLoading && !annotationLoading) {
      // 🤡Fake DataData: You can use "annotationData" later.
      /* 
        Data Strucutre
        {
          categoryList: [],
          eventList: [],
          narrationList: [],
          placeList: [],
          refList: [],
          tagList: []
        }
      */

      data.data.items[0].nAnnotations = createFakeAnnotations({
        duration: data.data.items[0].duration,
        editVersion: false,
      });
      setVideoData(data.data.items[0]);
    }
  }, [data, annotationData]);

  // useEffect(() => {
  //   if(getLoadingState.isLoading && getLoadingState.hasAnimated && !Boolean(isReady)){
  //     if(Boolean(getVideoData)){
  //       setIsReady(true)
  //     }
  //   }
  // },[getVideoData])

  if (error) {
    return (
      <div className="w-screen h-[100svh] flex justify-center items-center">
        Error
      </div>
    );
  }

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
      <LoadingDataCon ready={isReady} readyData={Boolean(getVideoData)} comLoader={() => setIsReady(true)} />
    </div>
  }

  return (
    <>
    
      {(!getLoadingState.isLoading || !getLoadingState.hasAnimated) && (
        <LoadingCon ready={Boolean(getVideoData)} comLoader={() => setIsReady(true)} />
      )}
      
     {!isLoading && getVideoData && getLoadingState.hasAnimated && (<MainContainer>
        <>
          <div ref={videoContainerRef} className="w-full h-[100svh] relative pt-[56px]">
            <VideoPlayerCon data={getVideoData} showContentVideo={showContentVideo} setCurrentTimeForMini={setCurrentTimeForMini} />
          </div>
          <Contents getCurrentTimeForMini={getCurrentTimeForMini} videoId={params.slug} isLoading={isLoading} getVideoData={getVideoData} showContentVideo={showContentVideo}  />
        </>
    </MainContainer>)}
    </>
  );
};

export default VideoWrapper;

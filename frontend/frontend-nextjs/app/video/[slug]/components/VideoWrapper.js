"use client";

import {
  MainContainer,
} from "@/app/components/containers/Containers";
import VideoPlayerCon from "@/app/components/containers/players/VideoPlayerCon";
import Contents from "@/app/components/elements/contents/Contents";
import { createFakeAnnotations } from "@/app/utils/hooks/etc";
import { getVideo } from "@/app/utils/hooks/pandora_api";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const VideoWrapper = () => {
  const params = useParams();
  const [getVideoData, setVideoData] = useState(null);
  const { isLoading, data, error } = getVideo({ pId: params.slug });
  const videoContainerRef = useRef(null);
  const [showContentVideo, setShowContentVideo] = useState(false);
 
  useEffect(() => {
    if (!isLoading) {
      console.log(data.data.items[0]);
      // 🤡Fake DataData
      data.data.items[0].nAnnotations = createFakeAnnotations({
        duration: data.data.items[0].duration,
        editVersion: false,
      });
      setVideoData(data.data.items[0]);
    }
  }, [data]);

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

  return (
    <MainContainer>
      {!isLoading && getVideoData && (
        <>
          <div ref={videoContainerRef} className="w-full h-[100svh] relative">
            <VideoPlayerCon data={getVideoData} />
          </div>
          <Contents videoId={params.slug} isLoading={isLoading} getVideoData={getVideoData} showContentVideo={showContentVideo}  />
        </>
      )}
    </MainContainer>
  );
};

export default VideoWrapper;

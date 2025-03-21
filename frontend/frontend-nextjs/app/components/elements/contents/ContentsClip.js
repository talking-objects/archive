import React, { useEffect, useRef, useState } from "react";
import ContentContainer from "../../containers/ContentContainer";
import MiniVideoPlayerCon from "../../containers/players/MiniVideoPlayerCon";
import AboutWapper from "./AboutWrapper";
import PlaceWrapper from "./PlaceWrapper";
import EventWrapper from "./EventWrapper";
import CateAndTagWrapper from "./CateAndTagWrapper";
import RefWapper from "./RefWrapper";
import NarrationWrapper from "./NarrationWrapper";
import ContentBox from "./ContentBox";
import CateAndTagWrapper2 from "./CateAndTagWrapper2";
import gsap from "gsap";
import { formatTime } from "@/app/utils/hooks/etc";

const ContentsClip = ({
  videoId,
  isLoading,
  getVideoData,
  clipData={},
  clip=true
}) => {
  const contentsRef = useRef(null);

 

 
  return (
    <ContentContainer>
      <div className="w-full relative bg-white mb-[20px]">
       

        <div ref={contentsRef} className="w-full flex flex-col gap-10 ">
          <AboutWapper clip={clip} getVideoData={getVideoData} />
          {
            <div className="w-full text-[40px] flex justify-start">
              <div className="w-full px-4 font-ibm_mono_bolditalic text-[48px] leading-[1.1]">
                Expand the objects universe
              </div>
            </div>
          }
          {clipData.annotations?.place_annotations &&
            clipData.annotations.place_annotations.length > 0 && (
              <PlaceWrapper
                clip={clip}
                getVideoData={clipData.annotations.place_annotations}
                changeItemTime={() => {}}
              />
            )}
          {clipData.annotations?.event_annotations &&
            clipData.annotations.event_annotations.length > 0 && (
              <EventWrapper
                clip={clip}
                getVideoData={clipData.annotations.event_annotations}
                isLoading={isLoading}
                changeItemTime={() => {}}
              />
            )}
          {clipData.annotations?.category_annotations &&
            clipData.annotations.category_annotations.length > 0 && (
              <CateAndTagWrapper2
                clip={clip}
                getVideoData={clipData}
                videoId={videoId}
                changeItemTime={() => {}}
                clipData={clipData}
              />
            )}
          {clipData.annotations?.tag_annotations &&
            clipData.annotations.tag_annotations.length > 0 && (
              <CateAndTagWrapper2
                clip={clip}
                getVideoData={clipData}
                videoId={videoId}
                changeItemTime={() => {}}
                clipData={clipData}
              />
            )}
          {clipData.annotations?.reference_annotations &&
            clipData.annotations.reference_annotations.length > 0 && (
              <RefWapper
                clip={clip}
                getVideoData={clipData.annotations.reference_annotations}
                changeItemTime={() => {}}
              />
            )}
          {clipData.annotations?.narration_annotations &&
            clipData.annotations.narration_annotations.length > 0 && (
              <NarrationWrapper
                clip={clip}
                getVideoData={clipData.annotations.narration_annotations}
                changeItemTime={() => {}}
              />
            )}
        </div>
      </div>
  
    </ContentContainer>
  );
};

export default ContentsClip;

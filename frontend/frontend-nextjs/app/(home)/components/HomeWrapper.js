"use client";
import { MainContainer } from "@/app/components/containers/Containers";
import ContentContainer from "@/app/components/containers/ContentContainer";
import AboutSection from "./AboutSection";
import RelatedSection from "./RelatedSection";
import HomeHeader from "./HomeHeader";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { componentDataLoadingState, loadingState } from "@/app/utils/recoillib/state/state";

import LoadingCon from "@/app/components/LoadingCon";
import CurrentStage from "./CurrentStage";
import AboutSection2 from "./AboutSection2";
import { ScrollSmoother } from "gsap/all";

import ExploreSection from "./ExploreSection";
import { useQuery } from "@tanstack/react-query";
import { getVideos } from "@/app/utils/hooks/eva_api";






const HomeWrapper = () => {
  const { data: videos, isLoading: isLoadingVideos, error: videosNotFound } = useQuery({
    queryKey: ["videos"],
    queryFn: () => {
      return getVideos({random: true, page: 1, page_limit: 5})
    }
  })

  const [currentVideo, setCurrentVideo] = useState(null);
  const getLoadingState = useRecoilValue(loadingState);

  useEffect(() => {
    
    if(!isLoadingVideos && videos) {
    
      setCurrentVideo(videos.data[0]);
    }
  }, [videos, isLoadingVideos]);

  useEffect(() => {
    if(videos){
     console.log(videos)
    }
  }, [videos])

  if(videosNotFound){
    return <div className="w-full h-screen flex justify-center items-center">
      <div className="text-black text-[24px] font-ibm_mono_bolditalic">No videos found</div>
    </div>
  }
  return (
    <>
      {(!getLoadingState.isLoading || !getLoadingState.hasAnimated) && (
        <LoadingCon ready={Boolean(currentVideo)} />
      )}

      {(getLoadingState.isLoading && !isLoadingVideos && currentVideo) && (
        <MainContainer>
          <HomeHeader currentVideo={currentVideo} />
          {getLoadingState.hasAnimated && (
            <ContentContainer padding={false}>
              <CurrentStage itemList={videos.data} setCurrentVideo={setCurrentVideo} currentVideo={currentVideo} />
              <AboutSection />
              <AboutSection2 />
              <ExploreSection />
              <RelatedSection />
            </ContentContainer>
          )}
        </MainContainer>
      )}
    </>
  );
};

export default HomeWrapper;

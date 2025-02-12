"use client";
import { MainContainer } from "@/app/components/containers/Containers";
import ContentContainer from "@/app/components/containers/ContentContainer";
import AboutSection from "./AboutSection";
import RelatedSection from "./RelatedSection";
import HomeHeader from "./HomeHeader";
import { getVideo } from "@/app/utils/hooks/pandora_api";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { componentDataLoadingState, loadingState } from "@/app/utils/recoillib/state/state";

import LoadingCon from "@/app/components/LoadingCon";
import CurrentStage from "./CurrentStage";
import AboutSection2 from "./AboutSection2";
import { ScrollSmoother } from "gsap/all";
import { fakeVideoDataList } from "@/app/utils/constant/fakeData";
import ExploreSection from "./ExploreSection";
import { useQuery } from "@tanstack/react-query";
import { getVideos } from "@/app/utils/hooks/eva_api";






const HomeWrapper = () => {
  const { data: videos, isLoading: isLoadingVideos } = useQuery({
    queryKey: ["videos"],
    queryFn: getVideos
  })
  const itemList = ["AT", "G", "U"]
  const [mainVideoId, setMainVideoId] = useState([...itemList][Math.floor(Math.random() * itemList.length)])
  const { data, isLoading } = getVideo({ pId: mainVideoId });
  const [currentVideo, setCurrentVideo] = useState(null);
  const getLoadingState = useRecoilValue(loadingState);
  const [getComDataLoadingState, setComDataLoadingState] = useRecoilState(componentDataLoadingState)

  useEffect(() => {
    if(isLoading){
      setComDataLoadingState(false)
    }
    if (!isLoading) {
      setComDataLoadingState(true)
      setCurrentVideo(fakeVideoDataList[mainVideoId] ? fakeVideoDataList[mainVideoId] : data.data.items[0]);
    }
  }, [data]);

  useEffect(() => {
    if(videos){
     console.log(videos)
    }
  }, [videos])
  return (
    <>
       
      {(!getLoadingState.isLoading || !getLoadingState.hasAnimated) && (
        <LoadingCon ready={Boolean(currentVideo)} />
      )}
      {(getLoadingState.isLoading && !isLoading && currentVideo) && (
        <MainContainer>
          <HomeHeader currentVideo={currentVideo} />
          {getLoadingState.hasAnimated && (
            <ContentContainer padding={false}>
              <CurrentStage itemList={itemList} setMainVideoId={setMainVideoId} mainVideoId={mainVideoId} />
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

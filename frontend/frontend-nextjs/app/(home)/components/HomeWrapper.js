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

const HomeWrapper = () => {
  const itemList = ["AL", "G", "AA", "CL", "U", "F"]
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
      setCurrentVideo(data.data.items[0]);
    }
  }, [data]);

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
              <RelatedSection />
            </ContentContainer>
          )}
        </MainContainer>
      )}
    </>
  );
};

export default HomeWrapper;

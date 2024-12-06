"use client";
import { MainContainer } from "@/app/components/containers/Containers";
import ContentContainer from "@/app/components/containers/ContentContainer";
import AboutSection from "./AboutSection";
import RelatedSection from "./RelatedSection";
import HomeHeader from "./HomeHeader";
import { getVideo } from "@/app/utils/hooks/pandora_api";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { loadingState } from "@/app/utils/recoillib/state/state";

import LoadingCon from "@/app/components/LoadingCon";


const HomeWrapper = () => {
  const { data, isLoading } = getVideo({ pId: "AL" });
  const [currentVideo, setCurrentVideo] = useState(null);
  const getLoadingState = useRecoilValue(loadingState);

  useEffect(() => {
    if (!isLoading) {
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
            <ContentContainer>
              <AboutSection />
              <RelatedSection />
            </ContentContainer>
          )}
        </MainContainer>
      )}
    </>
  );
};

export default HomeWrapper;

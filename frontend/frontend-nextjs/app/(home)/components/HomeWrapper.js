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
import SectionContainer from "./elements/SectionContainer";
import SectionHeader from "./elements/SectionHeader";
import SectionSubHeader from "./elements/SectionSubHeader";
import Link from "next/link";

const ExploreSection = () => {
  const exText = {
    title: `Explore our Archive`,
    subTitle: `Explore Manyfolded Knowlegde and Relations`
  }
  return  <SectionContainer big={true}>
    <div className="flex flex-col w-full px-4 items-center">
      <SectionHeader text={exText.title} />
      <SectionSubHeader text={exText.subTitle} />
      <div className="w-full h-[60svh] bg-red-400 mt-12">
        <Link href="/forest"><div className="text-black">Forest</div></Link>
      </div>
      <div className="w-full h-[60svh] bg-red-400 mt-12"></div>
      <div className="w-full h-[60svh] bg-red-400 mt-12"></div>
    </div>
  </SectionContainer>
}


const HomeWrapper = () => {
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

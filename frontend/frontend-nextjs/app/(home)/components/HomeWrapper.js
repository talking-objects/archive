"use client"
import { MainContainer } from "@/app/components/containers/Containers";
import ContentContainer from "@/app/components/containers/ContentContainer";
import AboutSection from "./AboutSection";
import RelatedSection from "./RelatedSection";
import HomeHeader from "./HomeHeader";
import { getVideo } from "@/app/utils/hooks/pandora_api";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loadingState } from "@/app/utils/recoillib/state/state";





const HomeWrapper = () => {
    const {data, isLoading} = getVideo({pId: "AL"});
    const [currentVideo, setCurrentVideo] = useState(null)
    const [getLoadingState, setLoadingState] = useRecoilState(loadingState);

    useEffect(() => {
        if(!isLoading){
            setCurrentVideo(data.data.items[0])
        }
    },[data]);

    useEffect(() => {
        if(!getLoadingState && currentVideo){
            const timer = setTimeout(() => {
                // setLoading(false);
                setLoadingState(true)
                console.log(currentVideo)
                console.log("loadingState => True")
              }, 3000);
          
            return () => {
                clearTimeout(timer); 
            }
        }
    },[currentVideo])

    return (
        <>
            <MainContainer>
                <HomeHeader isLoading={isLoading} currentVideo={currentVideo} />
                <ContentContainer>
                    <AboutSection />
                    <RelatedSection />
                </ContentContainer>
            </MainContainer>
        </>
    )
}


export default HomeWrapper;
"use client"
import { MainContainer } from "@/app/components/containers/Containers";
import ContentContainer from "@/app/components/containers/ContentContainer";
import AboutSection from "./AboutSection";
import RelatedSection from "./RelatedSection";
import HomeHeader from "./HomeHeader";





const HomeWrapper = () => {
   


    return (
        <MainContainer>
            <HomeHeader />
            <ContentContainer>
                <AboutSection />
                <RelatedSection />
            </ContentContainer>
        </MainContainer>
    )
}


export default HomeWrapper;
"use client"

import { MainContainer } from "@/app/components/containers/Containers";
import ContentContainer from "@/app/components/containers/ContentContainer";
import HomeVideoPlayer from "@/app/components/containers/players/HomeVideoPlayer";
import { getAllVideosCounts, getRandomVideo } from "@/app/utils/hooks/pandora_api";
import { useEffect, useState } from "react";
import CurrentStage from "./CurrentStage";
import AboutSection from "./AboutSection";
import ExploreSection from "./ExploreSection";
import RelatedSection from "./RelatedSection";





const HomeWrapper = () => {
    const [getRandomN, setRandomN] = useState(null)
    const {data:dataR, isLoading:isLoadingR} = getRandomVideo({randomN: getRandomN})
    const {data, isLoading} = getAllVideosCounts()
    const [getData, setData] = useState(null)
    const [totalItems, setTotalItems] = useState(0)

    useEffect(() => {
        if(!isLoading){
            const randomNumber = Math.floor(Math.random() * data.data.items)
            setRandomN(randomNumber)
            setTotalItems(data.data.items)
        }  
    },[data])

    const updateVideo = () => {
        const randomNumber = Math.floor(Math.random() * totalItems)
        setRandomN(randomNumber)
    }

    useEffect(() => {
        if(!isLoadingR){
            console.log(dataR)
            if(dataR.data.items.length > 0){
                console.log(dataR.data.items)
                setData(dataR.data.items[0])
            }
        }
    },[dataR])


    return (
        <MainContainer>
            <div className="fixed top-0 left-0 w-full h-[56px] bg-black z-[100] text-white flex items-center px-4 gap-8">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
            </div>
            {(!isLoading && getData) && <HomeVideoPlayer data={getData} updateVideo={updateVideo} />}
           
            <ContentContainer>
                <CurrentStage />
                <AboutSection />
                <ExploreSection />
                <RelatedSection />
            </ContentContainer>
        </MainContainer>
    )
}


export default HomeWrapper;
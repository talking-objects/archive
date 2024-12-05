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
            
            {(!isLoading && getData) && <HomeVideoPlayer data={getData} updateVideo={updateVideo} />}
           
            <ContentContainer>
                <CurrentStage totalItemsCount={totalItems} />
                <AboutSection />
                <ExploreSection />
                <RelatedSection />
            </ContentContainer>
        </MainContainer>
    )
}


export default HomeWrapper;
"use client"

import { useRecoilValue } from "recoil";

import { useState, useEffect } from "react";
import { loadingState } from "@/app/utils/recoillib/state/state";
import LoadingCon from "@/app/components/LoadingCon";
import LoadingDataCon from "@/app/components/LoadingDataCon";
import SectionContainer from "@/app/(home)/components/elements/SectionContainer";
import { BASE_URL } from "@/app/utils/constant/etc";
import AboutPlayerCon from "@/app/components/containers/players/AboutPlayerCon";
import { useRef } from "react";
const aboutData = {
    text: [
        `The Experimental Video Archive is a further branch of the Talking Objects Archive (www.talkingobjectsarchive.org). It is designed to capture and share diverse forms of knowledge production, emphasizing plural perspectives and interpretations. Instead of centering solely on objects, the archive focuses on the relationships, narratives, and practices surrounding them.`,
        `Knowledge is stored and explored in dynamic ways—videos serve as foundational elements, enriched by annotations that provide transcriptions, translations, critical reflections, and contextual stories. These annotations transform videos into living knowledge items, creating connections across time, disciplines, and perspectives.`,
        `The archive invites exploration in multiple modes: through visual diagrams that reveal overarching structures, entangled experiences embedded in the videos themselves, or accessible overviews that layer annotations alongside the footage. This approach ensures that knowledge remains multifaceted, interactive, and inclusive.`
      ]
}


const AboutWrapper = () => {
    const getLoadingState = useRecoilValue(loadingState);
    const [isReady, setIsReady] = useState(false);
    const [playToggle, setPlayToggle] = useState(false);
    const videoRef = useRef(null);

    const togglePlay = () => {
        if(videoRef){
            if(videoRef.current.paused){
                videoRef.current.play()
                setPlayToggle(true)
            }else{
                videoRef.current.pause()
                setPlayToggle(false)
            }
        }
    }
    useEffect(() => {
        setIsReady(true)
    }, [])

    if((getLoadingState.isLoading && getLoadingState.hasAnimated && !Boolean(isReady))){
        return <div className="w-full h-[100svh]">
          <LoadingDataCon ready={isReady} readyData={isReady} comLoader={() => setIsReady(true)} />
        </div>
    }

    return <>
     {(!getLoadingState.isLoading || !getLoadingState.hasAnimated) && (
            <LoadingCon ready={isReady} comLoader={() => setIsReady(true)} />
        )}
    <div className="w-full h-full flex flex-col items-center relative pt-[56px]">
        <div className="w-full h-[calc(100svh-118px)] flex justify-center items-center relative">
            <AboutPlayerCon />
        </div>
     
        <div className="w-full h-full flex flex-col items-center relative pt-[56px]">
           <div className="flex-1 flex justify-center items-center py-8">
            <div className="w-4/5 px-4 lg:px-0 lg:w-2/3 mx-auto font-ibm_mono_regular text-[16px] lg:text-[24px] flex flex-col gap-4">
            {
                aboutData.text.map((v, idx) => {
                    return <p
                    key={idx}
                    className="leading-tight"
                    dangerouslySetInnerHTML={{ __html: `${v}` }}
                ></p>
                })
            }
            </div>
           </div>
        </div>
      
    </div>
    </> 
}
export default AboutWrapper;
"use client"

import { useRecoilValue } from "recoil";

import { useState, useEffect } from "react";
import { loadingState } from "@/app/utils/recoillib/state/state";
import LoadingCon from "@/app/components/LoadingCon";
import LoadingDataCon from "@/app/components/LoadingDataCon";
import SectionContainer from "@/app/(home)/components/elements/SectionContainer";

const aboutData = {
    text: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`
}


const AboutWrapper = () => {
    const getLoadingState = useRecoilValue(loadingState);
    const [isReady, setIsReady] = useState(false);


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
        <div className="w-full h-[calc(100svh-118px)] flex justify-center items-center">
            <div className="w-full h-full bg-eva-c2"></div>
        </div>
     
        <div>
           <div className="flex-1 flex justify-center items-center py-8">
            <div className="w-4/5 px-4 lg:px-0 lg:w-2/3 mx-auto font-ibm_mono_regular text-[16px] lg:text-[24px]">
                <p className="">{aboutData.text}</p>
            </div>
           </div>
        </div>
      
    </div>
    </> 
}
export default AboutWrapper;
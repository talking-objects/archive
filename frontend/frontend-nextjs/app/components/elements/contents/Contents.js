import React, { useEffect, useRef, useState } from "react";
import ContentContainer from "../../containers/ContentContainer";
import MiniVideoPlayerCon from "../../containers/players/MiniVideoPlayerCon";
import AboutWapper from "./AboutWrapper";
import PlaceWrapper from "./PlaceWrapper";
import EventWrapper from "./EventWrapper";
import CateAndTagWrapper from "./CateAndTagWrapper";
import RefWapper from "./RefWrapper";
import NarrationWrapper from "./NarrationWrapper";
import ContentBox from "./ContentBox";
import CateAndTagWrapper2 from "./CateAndTagWrapper2";
const Contents = ({getCurrentTimeForMini, videoId, isLoading, getVideoData, showContentVideo}) => {
    const contentsRef = useRef(null)
    const contentsDummyRef = useRef(null)
    const contentVideoBoxRef = useRef(null)
    
    const [getItemTime, setItemTime] = useState(null)
    const [getCurrentItem, setCurrentItem] = useState(null)
    const [currentBox, setCurrentBox] = useState("")

    const changeItemTime = ({data}) => {
        console.log(data)
        setCurrentItem(data)
        setItemTime(data.in)
    }
    
    useEffect(() => {
        if(!isLoading){
            if(contentsDummyRef && contentsRef && contentVideoBoxRef){
                console.log(contentsRef)
                const refHeight = contentsRef.current.clientHeight;
                console.log(contentVideoBoxRef.current.clientHeight)
                contentsDummyRef.current.style.height = `${Math.floor(refHeight)}px`
                contentsDummyRef.current.style.transform = `translateY(-${contentVideoBoxRef.current.clientHeight}px)`
            }
        }
    },[getVideoData])

   

    useEffect(() => {
        const boxes = [
            { id: "#context_box", name: "contextBox" },
            { id: "#place_box", name: "placeBox" },
            { id: "#event_box", name: "eventBox" },
            { id: "#cate_and_tag_box", name: "cateAndTagBox" },
            { id: "#ref_box", name: "refBox" },
            { id: "#narration_box", name: "narrationBox" },
          ];
      
          const scrollEvent = () => {
            const currentPos = window.innerHeight / 2; // 화면 중간 기준
            let currentBoxName = "";
      
            for (const box of boxes) {
              const element = document.querySelector(box.id);
              if (element) {
                const { top, bottom } = element.getBoundingClientRect();
      
                // 화면 중앙에 박스가 있으면 currentBoxName 갱신
                if (top <= currentPos && bottom >= currentPos) {
                  currentBoxName = box.name;
                  break; // 가장 먼저 찾은 박스만 처리
                }
              }
            }
      
            if (currentBoxName) {
              setCurrentBox(currentBoxName); // 상태 변경
            }
          };
        window.addEventListener("scroll", scrollEvent);
        return () => {
            window.removeEventListener("scroll", scrollEvent)
        }

    },[])

    
    return <ContentContainer>
                <div className="w-full relative bg-white">
                    {/* Small Video */}
                    <div ref={contentVideoBoxRef} className={`sticky top-[0] mt-[40px] left-0 w-1/2 h-full py-4 px-4 ${showContentVideo ? "translate-x-0 opacity-100 select-auto pointer-events-auto" : "-translate-x-full opacity-0"} transition-all duration-700 z-[30]`}>
                        <div className="">
                            <div className="text-sm text-neutral-600 font-light">Current Position: {currentBox}</div>
                            <MiniVideoPlayerCon getCurrentItem={getCurrentItem}  currentBox={currentBox} getItemTime={getItemTime} getCurrentTimeForMini={getCurrentTimeForMini} getVideoData={getVideoData} showContentVideo={showContentVideo} />
                            {getCurrentItem && <div>data</div>}
                        </div>
                    </div>
                    <div ref={contentsDummyRef} className="w-full bg-white"></div>
                    <div ref={contentsRef} className="w-full absolute top-[40px] left-0 flex flex-col gap-10">
                        {getVideoData.summary && <AboutWapper getVideoData={getVideoData} />}
                        {(getVideoData.nAnnotations.placeList && getVideoData.nAnnotations.placeList.length > 0) && <div className="w-full text-[40px] flex justify-end"><div className="w-1/2 px-4 font-ibm_mono_bolditalic text-[48px] leading-[1.1]">Expand the objects universe</div></div>}
                        {(getVideoData.nAnnotations.placeList && getVideoData.nAnnotations.placeList.length > 0) && <PlaceWrapper getVideoData={getVideoData} changeItemTime={changeItemTime}/>}
                        {(getVideoData.nAnnotations.eventList && getVideoData.nAnnotations.eventList.length > 0) && <EventWrapper getVideoData={getVideoData} isLoading={isLoading} changeItemTime={changeItemTime} />}
                        {(getVideoData.nAnnotations.categoryList && getVideoData.nAnnotations.categoryList.length > 0) && <CateAndTagWrapper2 getVideoData={getVideoData} videoId={videoId} changeItemTime={changeItemTime} />}
                        {(getVideoData.nAnnotations.categoryList && getVideoData.nAnnotations.categoryList.length > 0) && <CateAndTagWrapper getVideoData={getVideoData} videoId={videoId} changeItemTime={changeItemTime} />}
                        {(getVideoData.nAnnotations.refList && getVideoData.nAnnotations.refList.length > 0) && <RefWapper getVideoData={getVideoData} changeItemTime={changeItemTime} />}
                        {(getVideoData.nAnnotations.narrationList && getVideoData.nAnnotations.narrationList.length > 0) && <NarrationWrapper getVideoData={getVideoData} changeItemTime={changeItemTime}  />}
                    </div>   
                </div>
                <div className="w-full h-[200svh] bg-red-400">
                    Related Items
                </div>
        </ContentContainer>
}

export default Contents;
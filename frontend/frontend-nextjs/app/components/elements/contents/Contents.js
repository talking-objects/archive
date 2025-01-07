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
import gsap from "gsap";
import { formatTime } from "@/app/utils/hooks/etc";

const Contents = ({
  getCurrentTimeForMini,
  videoId,
  isLoading,
  getVideoData,
  showContentVideo,
}) => {
  const contentsRef = useRef(null);
  const contentVideoBoxRef = useRef(null);

  const [getItemTime, setItemTime] = useState(null);
  const [getCurrentItem, setCurrentItem] = useState(null);
  const [currentBox, setCurrentBox] = useState("");

  const changeItemTime = ({ data }) => {
    if (data) {
      setCurrentItem(data);
      setItemTime(data.in);
    } else {
      setCurrentItem(null);
      setItemTime(0);
    }
  };

  // useEffect(() => {
  //     if(!isLoading){
  //         // if(contentsDummyRef && contentsRef && contentVideoBoxRef){
  //         //     console.log(contentsRef)
  //         //     const refHeight = contentsRef.current.clientHeight;
  //         //     console.log(contentVideoBoxRef.current.clientHeight)
  //         //     contentsDummyRef.current.style.height = `${Math.floor(refHeight)}px`
  //         //     contentsDummyRef.current.style.transform = `translateY(-${contentVideoBoxRef.current.clientHeight}px)`
  //         // }
  //     }
  // },[getVideoData])

  useEffect(() => {
    if (showContentVideo) {
      gsap.to("#contentVideoBox", {
        duration: 0.7,
        ease: "power3.inOut",
        css: {
          opacity: 1,
          transform: `translateX(0)`,
        },
      });
    } else {
      gsap.to("#contentVideoBox", {
        duration: 0.7,
        ease: "power3.inOut",
        css: {
          opacity: 0,
          transform: `translateX(-100%)`,
        },
      });
    }
  }, [showContentVideo]);

  useEffect(() => {
    const boxes = [
      { id: "#context_box", name: "contextBox" },
      { id: "#place_box", name: "placeBox" },
      { id: "#event_box", name: "eventBox" },
      { id: "#cate_and_tag_box", name: "cateAndTagBox" },
      { id: "#ref_box", name: "refBox" },
      { id: "#narration_box", name: "narrationBox" },
    ];

    let activeAnimation = null; // 마지막 애니메이션 추적용 변수

    const scrollEvent = () => {
      const currentPos = window.innerHeight / 2; // 화면 중간 기준
      let currentBoxName = "";

      for (const box of boxes) {
        const element = document.querySelector(box.id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const pos = element.offsetTop;

          // 화면 중앙에 박스가 있으면 currentBoxName 갱신
          if (top <= currentPos && bottom >= currentPos) {
            currentBoxName = box.name;
            if (contentVideoBoxRef) {
              if (activeAnimation) {
                activeAnimation.kill(); // 이전에 생성된 애니메이션 취소
              }
            
              // 새로운 GSAP 애니메이션 생성
              activeAnimation = gsap.to("#contentVideoBox", {
                delay: 1,
                ease: "expo.out",
                duration: 2.5,
                css: {
                  top: `${pos}px`,
                },
                onStart: () => {
                  activeAnimation = null; // 애니메이션이 끝나면 null로 초기화
                },
                // onComplete: () => {
                //   activeAnimation = null; // 애니메이션이 끝나면 null로 초기화
                // },
              });
            }
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
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);

  useEffect(() => {
    if (!showContentVideo) {
      changeItemTime({ data: null });
    }
  }, [showContentVideo]);
  useEffect(() => {
    console.log("getCurrentItem", getCurrentItem);
  }, [getCurrentItem]);

  return (
    <ContentContainer>
      <div className="w-full relative bg-white mb-[20px]">
        {/* Small Video */}
        <div
          id={"contentVideoBox"}
          ref={contentVideoBoxRef}
          className={`absolute top-[0] mt-[45px] bg-white left-0 w-1/2 h-fit aspect-square px-4 ${
            showContentVideo ? "select-auto pointer-events-auto" : ""
          } z-[30]`}
        >
          <div className="w-full h-full flex flex-col justify-center">
            {/* <div className="text-sm text-neutral-600 font-light">Current Position: {currentBox}</div> */}
            <div className="w-full aspect-video relative">
              <MiniVideoPlayerCon
                getCurrentItem={getCurrentItem}
                currentBox={currentBox}
                getItemTime={getItemTime}
                getCurrentTimeForMini={getCurrentTimeForMini}
                getVideoData={getVideoData}
                showContentVideo={showContentVideo}
              />
            </div>
            {getCurrentItem && (
              <div className="w-full">
                {(getCurrentItem.in && getCurrentItem.out) && <div className="text-[11px] font-ibm_mono_regular flex items-center px-1 py-1 gap-1"><span>{formatTime(getCurrentItem.in)}</span> <span>{getCurrentItem.out && "~"}</span> <span>{getCurrentItem.out && formatTime(getCurrentItem.out)}</span></div>}
              </div>
            )}
          </div>
        </div>

        <div ref={contentsRef} className="w-full flex flex-col gap-10">
          {getVideoData.summary && <AboutWapper getVideoData={getVideoData} />}
          {
            <div className="w-full text-[40px] flex justify-end">
              <div className="w-1/2 px-4 font-ibm_mono_bolditalic text-[48px] leading-[1.1]">
                Expand the objects universe
              </div>
            </div>
          }
          {getVideoData.nAnnotations.placeList &&
            getVideoData.nAnnotations.placeList.length > 0 && (
              <PlaceWrapper
                getVideoData={getVideoData}
                changeItemTime={changeItemTime}
              />
            )}
          {getVideoData.nAnnotations.eventList &&
            getVideoData.nAnnotations.eventList.length > 0 && (
              <EventWrapper
                getVideoData={getVideoData}
                isLoading={isLoading}
                changeItemTime={changeItemTime}
              />
            )}
          {getVideoData.nAnnotations.categoryList &&
            getVideoData.nAnnotations.categoryList.length > 0 && (
              <CateAndTagWrapper2
                getVideoData={getVideoData}
                videoId={videoId}
                changeItemTime={changeItemTime}
              />
            )}
          {/* {(getVideoData.nAnnotations.categoryList && getVideoData.nAnnotations.categoryList.length > 0) && <CateAndTagWrapper getVideoData={getVideoData} videoId={videoId} changeItemTime={changeItemTime} />} */}
          {getVideoData.nAnnotations.refList &&
            getVideoData.nAnnotations.refList.length > 0 && (
              <RefWapper
                getVideoData={getVideoData}
                changeItemTime={changeItemTime}
              />
            )}
          {getVideoData.nAnnotations.narrationList &&
            getVideoData.nAnnotations.narrationList.length > 0 && (
              <NarrationWrapper
                getVideoData={getVideoData}
                changeItemTime={changeItemTime}
              />
            )}
          {/* Related Objects */}
          <div className="w-full h-fit bg-white flex flex-col justify-stretch">
            <div className="mb-4">Related Objects</div>
            <div className="w-full h-fit bg-red-400 grid grid-cols-4 gap-4">
              {Array.from({length:8}).map((v, idx) => {
                return <div key={idx} className="w-full aspect-video bg-blue-400">idx</div>
              })}
            </div>
          </div>
            
        
        </div>
      </div>
      {/* <div className="w-full h-[100svh] bg-red-400">
                    Related Items
                </div> */}
    </ContentContainer>
  );
};

export default Contents;

import { getAllVideos, getVideo } from "@/app/utils/hooks/pandora_api";
import SectionHeader from "./elements/SectionHeader";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/app/utils/constant/etc";
import SectionContainer from "./elements/SectionContainer";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import Image from "next/image";

const IndicatorBtn = ({ left=true, clickFunc}) => {
  return <div onClick={clickFunc} className="flex w-[30px] lg:w-[50px] opacity-50 hover:opacity-100 bg-white border-0 border-black rounded-full cursor-pointer aspect-square justify-center items-center">
    {
      left && <div className="lg:pr-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 lg:size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
    </div>
    }
    {
      !left && <div className="lg:pl-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 lg:size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
    </div>
    }
  </div>
}
const CurrentStageBox = ({ val, clickFunc, currentVideo }) => { 
  if (!val) {
    return (
      <div className="w-full aspect-video bg-cover bg-center bg-no-repeat">
        Error
      </div>
    );
  }
  return (
    <div
      onClick={clickFunc}
      className={`relative w-full aspect-video bg-cover bg-center bg-no-repeat cursor-pointer group overflow-hidden`}
    >
      <Image
        src={`${BASE_URL}/${val.pandora_id}/480p${val.poster}.jpg`}
        alt=""
        fill
        style={{objectFit: "cover"}}
      /> 
      <div className={`w-full h-full absolute top-0 left-0 bg-black ${val.pk === currentVideo.pk ? "bg-opacity-0" : "bg-opacity-40"} group-hover:bg-opacity-0 transition-all`}></div>
      <div className={`w-full  absolute top-0 left-0 ${val.pk === currentVideo.pk ? "bg-opacity-0" : "bg-opacity-40"} opacity-0 group-hover:opacity-100 transition-all flex p-2`}>
        <div className="text-[24px] font-ibm_mono_bolditalic text-black flex">
          <span className="bg-eva-c2 inline leading-tight">{val.title}</span>
        </div>
      </div>
    </div>
  );
};

const CurrentStage = ({ itemList, setCurrentVideo, currentVideo }) => {
  const [swiperRef, setSwiperRef] = useState(null);

  const onNext = () => {
    if (swiperRef) {
      swiperRef.slideNext(); // Navigate to the next slide
      
    }
  };
  const onPrev = () => {
    if (swiperRef) {
      swiperRef.slidePrev(); // Navigate to the next slide
    }
  };

  const onChangeCurrentVideo = (videodata) => {
    setCurrentVideo(videodata)
  }

  return (
    <SectionContainer row={false} big={true}>
      <SectionHeader text={"Currently on Stage"} />
      <div className={`w-full flex justify-between items-center gap-4 mt-4 ${itemList.length > 3 ? "px-4" : "px-4"}`}>
        {itemList.length > 3 && <IndicatorBtn clickFunc={onPrev}></IndicatorBtn>}
        {itemList && (
          <Swiper
            className="flex-1 w-full h-fit bg-white overflow-hidden"
            slidesPerView={3}
            loop={true}
            spaceBetween={20}
            onSwiper={(swiper) => setSwiperRef(swiper)}
          
          >
            {
                itemList.length > 0 && itemList.map((val, idx) => {
                  return <SwiperSlide key={idx} ><CurrentStageBox val={val} currentVideo={currentVideo} clickFunc={() => onChangeCurrentVideo(val)} /></SwiperSlide>
                })
              }
          </Swiper>
        )}
        {itemList.length > 3 && <IndicatorBtn clickFunc={onNext} left={false}></IndicatorBtn>}
        
      </div>
      </SectionContainer>
  );
};

export default CurrentStage;

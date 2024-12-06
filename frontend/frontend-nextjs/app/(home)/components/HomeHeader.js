import { BASE_URL } from "@/app/utils/constant/etc";
import { loadingState } from "@/app/utils/recoillib/state/state";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import gsap from "gsap"
const HomeHeader = ({currentVideo, isLoading}) => {
    const [getLoadingState, setLoadingState] = useRecoilState(loadingState);
    useEffect(() => {
      if(getLoadingState.isLoading && !getLoadingState.hasAnimated){
          gsap
          .to("#headerVideoAni", {
              duration: 2,
              ease: "expo.inOut",
              css: {
                  transform: "translateY(0)",
                  opacity: 1
              },
            
          })
      }
    },[getLoadingState])
    return <div className="w-full h-[100svh] pt-[56px] bg-white overflow-hidden">
        <div id="headerVideoAni" className={` ${getLoadingState.hasAnimated ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}  w-full h-full bg-white relative`}>
            {(!isLoading && currentVideo) && <div 
                style={{backgroundImage: `url(${BASE_URL}/${currentVideo.id}/480p${currentVideo.posterFrame}.jpg)`}}
                className="w-full h-full bg-no-repeat bg-center bg-cover">

            </div>}
        </div>
    </div>
}

export default HomeHeader;
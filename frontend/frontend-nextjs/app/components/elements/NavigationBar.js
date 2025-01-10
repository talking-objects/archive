"use client";
import { loadingState } from "@/app/utils/recoillib/state/state";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import gsap from "gsap"
import { useRouter } from "next/navigation";

const InfiniteScrollingText = () => {
  useEffect(() => {
    const rows = document.querySelectorAll(".cb-tagreel-row");

    rows.forEach((row) => {
      let duration = 20; // 애니메이션 지속 시간 (조절 가능)

      // 무한 반복 애니메이션
      gsap.to(row, {
        xPercent: -100, // 왼쪽 끝까지 이동
        ease: "none",
        duration: duration,
        repeat: -1, // 무한 반복
        modifiers: {
          xPercent: (x) => `${parseFloat(x) % 100}`, // xPercent 값을 0~100으로 반복
        },
      });
    });
  }, []);

  return (
    <div className="tag-reel w-full h-full bg-black overflow-hidden flex items-center text-[16px] font-ibm_mono_italic">
      <div className="cb-tagreel-row flex gap-1 whitespace-nowrap w-full px-4">
        <div className="cb-tagreel-item nm_text">This website is currently a prototype version. Some features may be incomplete or subject to change in future updates</div>
        
      </div>
      <div className="cb-tagreel-row flex gap-1 whitespace-nowrap w-full px-4">
        <div className="cb-tagreel-item nm_text">This website is currently a prototype version. Some features may be incomplete or subject to change in future updates</div>
      </div>
      <div className="cb-tagreel-row flex gap-1 whitespace-nowrap w-full px-4">
        <div className="cb-tagreel-item nm_text">This website is currently a prototype version. Some features may be incomplete or subject to change in future updates</div>
      </div>
    </div>
  );
};


const NavigationBar = () => {
  const [getLoadingState, setLoadingState] = useRecoilState(loadingState);
  const router = useRouter()

  return (
    <>
      { (
        <div className={`${(getLoadingState.isLoading) ? "translate-y-0" : "-translate-y-full"} navAni font-ibm_mono_semibold text-[16px] fixed top-0 left-0 w-full h-[56px] bg-black z-[2000] text-white flex items-center gap-4 justify-between duration-700`}>
          <div onClick={() => router.push("/")} className="cursor-pointer w-[360px] h-full flex justify-center items-center">
            <div>Experimental Video Archive</div>
          </div>
          <InfiniteScrollingText />
        </div>
      )}
    </>
  );
};

export default NavigationBar;

"use client";
import { loadingState } from "@/app/utils/recoillib/state/state";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import gsap from "gsap"
import { useRouter, usePathname } from "next/navigation";

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
      <div className="cb-tagreel-row flex gap-1 whitespace-nowrap w-fit px-4">
        <div className="cb-tagreel-item nm_text">This Website is a Preview of the Video Archive. The final Video Archive will be launched in March 2025.</div>
      </div>
      <div className="cb-tagreel-row flex gap-1 whitespace-nowrap w-fit px-4">
        <div className="cb-tagreel-item nm_text">This Website is a Preview of the Video Archive. The final Video Archive will be launched in March 2025.</div>
      </div>
      <div className="cb-tagreel-row flex gap-1 whitespace-nowrap w-fit px-4">
        <div className="cb-tagreel-item nm_text">This Website is a Preview of the Video Archive. The final Video Archive will be launched in March 2025.</div>
      </div>
    </div>
  );
};


const NavigationBar = () => {
  const [getLoadingState, setLoadingState] = useRecoilState(loadingState);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // usePathname을 사용하여 메인 경로 체크
  const isMainPath = () => {
    return ['/', '/forest', '/about'].includes(pathname);
  };


  const handleBack = () => {
    router.back();
  };

  const handleClose = () => {
    setIsOpen(false)
  }

  const onLinkClick = (path) => {
    setIsOpen(false)
    router.push(path)
  }

  return (
    <>
      {(
        <div className={`${(getLoadingState.isLoading) ? "translate-y-0" : "-translate-y-full"} navAni font-ibm_mono_semibold text-[16px] fixed top-0 left-0 w-full h-[56px] bg-black z-[3001] text-white flex items-center gap-4 justify-center duration-700`}>
          {isMainPath() ? (
            <>
              <div className="absolute left-0 h-full flex items-center">
                <button onClick={() => setIsOpen(!isOpen)} className="p-4 transition-colors">
                  <div className="w-6 h-0.5 bg-white mb-1"></div>
                  <div className="w-6 h-0.5 bg-white mb-1"></div>
                  <div className="w-6 h-0.5 bg-white"></div>
                </button>
                {isOpen && (
                  <div className="absolute top-full left-0 bg-[#C2CEFB] w-72 h-screen shadow-lg">
                    <div className="flex justify-end p-4">
                      <button onClick={handleClose} className="text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div onClick={() => onLinkClick("/")} className="block px-4 py-2 hover:bg-eva-c2 transition-colors cursor-pointer text-black">Home</div>
                    <div onClick={() => onLinkClick("/forest")} className="block px-4 py-2 hover:bg-eva-c2 transition-colors cursor-pointer text-black font-ibm_mono_semibold">Archive</div>
                    <div onClick={() => onLinkClick("/about")} className="block px-4 py-2 hover:bg-eva-c2 transition-colors cursor-pointer text-black font-ibm_mono_semibold">About</div>
                    <div className="flex flex-col">
                      <div className="block px-4 py-2 transition-colors text-black font-ibm_mono_semibold select-none">Related Resources</div>
                      <a target="_blank" href="https://talkingobjectsarchive.org" className="block px-4 pl-6 py-2 hover:bg-eva-c2 transition-colors cursor-pointer text-black font-ibm_mono_regular">
                        <div className="flex items-center gap-1">
                          <div>Archive</div>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </div>
                      </a>
                      <a target="_blank" href="https://talkingobjectsarchive.org/team" className="block px-4 pl-6 py-2 hover:bg-eva-c2 transition-colors cursor-pointer text-black font-ibm_mono_regular">
                        <div className="flex items-center gap-1">
                          <div>Team</div>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </div>
                      </a>
                      <a target="_blank" href="https://talkingobjectsarchive.org/info/documentation" className="block px-4 pl-6 py-2 hover:bg-eva-c2 transition-colors cursor-pointer text-black font-ibm_mono_regular">
                        <div className="flex items-center gap-1">
                          <div>Documentation</div>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div onClick={() => onLinkClick("/")} className="cursor-pointer px-4 w-fit h-full flex justify-center items-center">
                <div>Experimental Video Archive</div>
              </div>
            </>
          ) : (
            <>
              <div className="absolute left-0 h-full flex items-center">
                <button onClick={handleBack} className="p-4 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                </button>
              </div>
              <div className="cursor-pointer px-4 w-fit h-full flex justify-center items-center">
                <div>Experimental Video Archive</div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default NavigationBar;

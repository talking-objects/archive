"use client";
import { loadingState } from "@/app/utils/recoillib/state/state";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import gsap from "gsap"
import { useRouter } from "next/navigation";

const NavigationBar = () => {
  const [getLoadingState, setLoadingState] = useRecoilState(loadingState);
  const router = useRouter()
  return (
    <>
      { (
        <div className={`${(getLoadingState.isLoading) ? "translate-y-0" : "-translate-y-full"} navAni font-ibm_mono_semibold text-[16px] fixed top-0 left-0 w-full h-[56px] bg-black z-[2000] text-white flex items-center justify-between px-4 gap-8 duration-700`}>
          <div onClick={() => router.push("/")} className="cursor-pointer">Experimental Video Archive</div>
          {/* <div className="flex gap-4 items-center text-[14px]">
            <div>Forest</div>
            <div>About</div>
            <div className="px-3 py-[6px] bg-eva-c2 rounded-sm">Annotation Board</div>
          </div> */}
          {/* <div onClick={() => router.push("/")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div> */}
        </div>
      )}
    </>
  );
};

export default NavigationBar;

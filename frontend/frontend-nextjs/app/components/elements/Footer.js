"use client"

import { loadingState } from "@/app/utils/recoillib/state/state";
import { useRecoilState } from "recoil";





const Footer = () => {
    const [getLoadingState, setLoadingState] = useRecoilState(loadingState);
    return <>
        {(getLoadingState.isLoading && getLoadingState.hasAnimated) && <div className="w-full min-h-[200px] bg-black">Footer</div>}
    </>
}

export default Footer;
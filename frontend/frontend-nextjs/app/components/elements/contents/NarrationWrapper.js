import { useState } from "react";
import ContentBox from "./ContentBox";

const NarrationWrapper = ({getVideoData, changeItemTime}) => {
    const [showNarration, setShowNarration] = useState(false)
    return <ContentBox title={"Narrations"} id="narration_box">
    <div className="flex w-full h-fit overflow-hidden bg-eva-c2 bg-opacity-[27%] px-4 py-4 flex-col gap-4 ">
        {
            getVideoData.nAnnotations.narrationList.slice(0, showNarration ? getVideoData.nAnnotations.narrationList.length : 4).map((val, idx) => {
                return <div key={idx} onClick={() => changeItemTime({data:val})} className="bg-white cursor-pointer w-full h-fit min-h-28 rounded-lg border-4 border-eva-c2 px-4 py-2">
                    <div>Narration test</div>
                    <div>in: {val.in}</div>
                </div>
            })
        }
    </div>
    {getVideoData.nAnnotations.narrationList.length > 4 && <div className="w-full flex justify-center"><span onClick={() => setShowNarration((prev) => !prev)} className="bg-eva-c2 px-4 bg-opacity-[27%] py-2 rounded-b-xl text-sm font-extralight cursor-pointer">{!showNarration ? "Expand/Show All" : "Close"}</span></div>}
 </ContentBox>
}

export default NarrationWrapper;
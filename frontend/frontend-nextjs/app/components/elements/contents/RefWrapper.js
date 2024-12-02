import { useState } from "react";
import ContentBox from "./ContentBox";

const RefWapper = ({getVideoData, changeItemTime}) => {
    const [openRef, setOpenRef] = useState(false)
    return <ContentBox title={"References"} id="ref_box">
    <div className="flex w-full h-fit overflow-hidden bg-eva-c2 bg-opacity-[27%] px-4 py-4 flex-col gap-4 ">
        {
            getVideoData.nAnnotations.refList.slice(0, openRef ? getVideoData.nAnnotations.refList.length : 4).map((val, idx) => {
                return <div key={idx} onClick={() => changeItemTime({data:val})} className="bg-white w-full cursor-pointer h-fit min-h-28 rounded-lg border-4 border-eva-c5 px-4 py-2 ">
                    <div>Reference test</div>
                    <div>in: {val.in}</div>
                </div>
            })
        }
    </div>
    {getVideoData.nAnnotations.refList.length > 4 && <div className="w-full flex justify-center"><span onClick={() => setOpenRef((prev) => !prev)} className="bg-eva-c2 px-4 bg-opacity-[27%] py-2 rounded-b-xl text-sm font-extralight cursor-pointer">{!openRef ? "Expand/Show All" : "Close"}</span></div>}
 </ContentBox>
}

export default RefWapper;
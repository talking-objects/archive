import {CATEGORY_AND_TAGVALUE } from "@/app/utils/constant/etc";
import ContentBox from "./ContentBox";
import { useEffect, useState } from "react";
import CTVis from "./CTVis";

const CateAndTagWrapper2 = ({getVideoData, videoId, changeItemTime}) => {
    const [currentCatAndTag, setCurrentCatAndTag] = useState(CATEGORY_AND_TAGVALUE[0])
    const [currentCatAndTagData, setCurrentCatAndTagData] = useState(null)
   

    // categories & tags
    const onClickCatAndTag = (idx) => {
        if(currentCatAndTag.slug !== CATEGORY_AND_TAGVALUE[idx].slug){
            setCurrentCatAndTag(CATEGORY_AND_TAGVALUE[idx])
            const changeData = (dataList, tag) => {
                const getData = dataList.filter((val) => {
                    if(tag){
                        return val
                    }else{
                        if(val.category.slug === CATEGORY_AND_TAGVALUE[idx].slug){
                            return val;
                        }
                    }
                })
                setCurrentCatAndTagData(getData)
            }
            if(CATEGORY_AND_TAGVALUE[idx].slug === "tag"){
                changeData(getVideoData.nAnnotations.tagList, true)
            }else{
                changeData(getVideoData.nAnnotations.categoryList, false)
            }
        }
    }

     // categories & tags
     useEffect(() => {
        console.log(getVideoData)
        const getData = getVideoData.nAnnotations.categoryList.filter((val) => {
            if(val.category.slug === CATEGORY_AND_TAGVALUE[0].slug){
                return val;
            }
        })
        setCurrentCatAndTagData(getData)
    },[])

    return (
    <ContentBox title={"Categories & Tags"} id="cate_and_tag_box">
        <div className="w-full relative bg-neutral-100 overflow-hidden">
            <div className="flex gap-2 items-center justify-start flex-wrap mb-2">
                {CATEGORY_AND_TAGVALUE.map((val, idx) => {
                    return <div onClick={() => onClickCatAndTag(idx)} key={idx} className={`text-sm px-2 py-1 ${(currentCatAndTag && currentCatAndTag.slug === val.slug) ? "bg-eva-c5" : "bg-eva-c2"} hover:bg-eva-c5 rounded-xl select-none cursor-pointer transition-all duration-150`}>{val.value}</div>
                })}
            </div>
            {currentCatAndTagData && <CTVis totalDuration={getVideoData.duration} data={currentCatAndTagData} bgColor={CATEGORY_AND_TAGVALUE[0].color} />}
        </div>
    </ContentBox>)
}

export default CateAndTagWrapper2;
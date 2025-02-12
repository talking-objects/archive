import {CATEGORY_AND_TAGVALUE } from "@/app/utils/constant/etc";
import ContentBox from "./ContentBox";
import { useEffect, useState } from "react";
import CTVis from "./CTVis";

const CateAndTagWrapper2 = ({getVideoData, videoId, changeItemTime}) => {
    const [currentCatAndTag, setCurrentCatAndTag] = useState({slug:"All"})
    const [currentCatAndTagData, setCurrentCatAndTagData] = useState(null)
    const [currentColor, setCurrentColor] = useState(CATEGORY_AND_TAGVALUE[0].color)

    const getAllData = () => {
        const clonedData = JSON.parse(JSON.stringify(getVideoData));
        const categoires = [...clonedData.annotations.category_annotations]
        const tag = [...clonedData.annotations.tag_annotations].map((val) => {
            const value = {
                text: val.value.value,
                slug: "tag",
                value: "Tag",
                color: "#3118E8",
                tBG: "bg-eva-c6",
                tBGHover: "hover:bg-eva-c6"

            }
            val.value.value = value
            return val
        })
        const getData = [...categoires, ...tag]
        return getData
}
    // categories & tags
    const onClickCatAndTag = (idx) => {
        const changeData = (dataList, tag) => {
            const getData = dataList.filter((val) => {
                if(tag){
                    return val
                }else{
                    if(val.value.value.slug === CATEGORY_AND_TAGVALUE[idx].slug){
                        return val;
                    }
                }
            })
        
            if(CATEGORY_AND_TAGVALUE[idx]){
                setCurrentColor(CATEGORY_AND_TAGVALUE[idx].color)

            }
            setCurrentCatAndTagData(getData)
        }
        if(CATEGORY_AND_TAGVALUE[idx] && currentCatAndTag.slug !== CATEGORY_AND_TAGVALUE[idx].slug){
            setCurrentCatAndTag(CATEGORY_AND_TAGVALUE[idx])
            if(CATEGORY_AND_TAGVALUE[idx].slug === "tag"){
                const clonedData = JSON.parse(JSON.stringify(getVideoData));
                const tag = [...clonedData.annotations.tag_annotations].map((val) => {
                    const value = {
                        text: val.value.value,
                        slug: "tag",
                        value: "Tag",
                        color: "#3118E8",
                        tBG: "bg-eva-c6",
                        tBGHover: "hover:bg-eva-c6"
        
                    }
                    val.value.value = value
                    return val
                })
                changeData(tag, true)
            }else{
                changeData([...getVideoData.annotations.category_annotations], false)
            }
        }else{
            setCurrentCatAndTag({slug: "All"})
            const getData = getAllData()
         
            changeData(getData, true)
        }
    }
    


     // categories & tags
     useEffect(() => {
        if(!getVideoData) return;
        setCurrentCatAndTagData(getAllData())
        onClickCatAndTag()
    },[])

    return (
    <ContentBox title={"Categories & Tags"} id="cate_and_tag_box">
        <div className="w-full aspect-square relative overflow-hidden flex flex-col gap-4">
            <div className="flex gap-2 items-center justify-start flex-wrap">
                {CATEGORY_AND_TAGVALUE.map((val, idx) => {
                    return <div onClick={() => onClickCatAndTag(idx)} key={idx} className={`text-[12px] px-2 py-1 text-white ${(currentCatAndTag && currentCatAndTag.slug === val.slug) ? `${val.tBG} ` : `bg-neutral-400 text-black`} ${val.tBGHover} rounded-xl select-none cursor-pointer transition-all duration-150 font-ibm_mono_semibold`}>{val.value}</div>
                })}
                <div onClick={() => onClickCatAndTag()} className={`text-[12px] px-2 py-1 ${(currentCatAndTag && currentCatAndTag.slug === "All") ? "bg-black" : "bg-neutral-400"} hover:bg-black text-white rounded-xl select-none cursor-pointer transition-all duration-150 font-ibm_mono_semibold`}>All</div>
               
            </div>
            {currentCatAndTagData && <CTVis changeItemTime={changeItemTime} totalDuration={parseFloat(getVideoData.duration)} data={currentCatAndTagData} bgColor={currentColor} videoId={videoId} />}
        </div>
    </ContentBox>)
}

export default CateAndTagWrapper2;
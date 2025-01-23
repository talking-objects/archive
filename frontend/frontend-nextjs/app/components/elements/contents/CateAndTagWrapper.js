import { BASE_URL, CATEGORY_AND_TAGVALUE } from "@/app/utils/constant/etc";
import ContentBox from "./ContentBox";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3"
const CateAndTagWrapper = ({getVideoData, videoId, changeItemTime}) => {
    const [currentCatAndTag, setCurrentCatAndTag] = useState(CATEGORY_AND_TAGVALUE[0])
    const svgContainerRef = useRef(null)
    const [currentCatAndTagData, setCurrentCatAndTagData] = useState(null)
    const svgRef = useRef(null)
    // categories & tags
    const createGrid = ({data, bgColor="#fff"}) => {
        if(svgContainerRef && svgRef){
            const svgContainerSize = {
                width: svgContainerRef.current?.clientWidth - 10,
                height: svgContainerRef.current?.clientHeight - 10,
            }
            const newGridList = []
            const totalColumnLength = data.length < 5 ? 7 : data.length + (data.length % 2 === 0 ? 5 : 6)

            for(let i = 0; i < totalColumnLength; i++){
                for(let j = 0; j < totalColumnLength; j++){
                    newGridList.push({
                        column: j,
                        row: i,
                        x: (svgContainerSize.width / totalColumnLength) * j,
                        y: (svgContainerSize.width / totalColumnLength) * i,
                        width: svgContainerSize.width / totalColumnLength,
                        height: svgContainerSize.width / totalColumnLength,
                    })
                }
            }
            const startPos = {
                column: Math.floor(totalColumnLength/2),
                row: Math.floor(totalColumnLength/2),
                data: data[0]
            }
            const randomValue = () => {
                const random = Math.random();
                return random < 0.33 ? -1 : random < 0.66 ? 0 : 1;
            };
            const randomPosList = [startPos]
            let index = 1;
            let maxIndex = 0
            while(index < data.length && maxIndex < 1000){
          
                // start Point
                const startPoint = randomPosList[index - 1];

                // random Direction
                const getRandomX = startPoint.column + randomValue()
                const getRandomY = startPoint.row + randomValue()
            
                // check if there is already a box exist;
                const check = randomPosList.findIndex((v) => {
                    if(v.column === getRandomX && v.row === getRandomY){
                        return v;
                    }
                })
             
                if(check < 0){
                 
                    //  get New Pos
                    if((getRandomX >= 0 && getRandomX < totalColumnLength) && (getRandomY >= 0 && getRandomY < totalColumnLength)){
                        randomPosList.push({
                            row: getRandomY,
                            column: getRandomX,
                            data: data[index]
                        })
                        index +=1
                    }
                    
                }else{

                }
                // 


                maxIndex += 1

            
                
            }

           
           
            const svg = d3.select(svgRef.current)
            svg.selectAll("*").remove()

            svg
            .attr("viewBox", [0, 0, svgContainerSize.width + 10, svgContainerSize.height + 10])
            .style("background", "white")

          
            const gridG = svg.append("g")
            gridG
            .attr("transform", "translate(5, 5)")

            gridG
            .selectAll("g")
            .data(newGridList)
            .join("g")
            .attr("transform", (d, i) => {
                return `translate(${d.x}, ${d.y})`
            })
            .each(function(d2, i2){
                const group = d3.select(this);

                const getItem = randomPosList.filter((v) => {
                    if(v.column === d2.column && v.row === d2.row){
                        return v
                    }
                })
                group
                .on("mouseenter",function(){
                    if(getItem[0]){
                        document.body.style.cursor = "pointer"
                    }else{
                        document.body.style.cursor = "auto"
                    }
                })
                .on("mouseleave", function(){
                    document.body.style.cursor = "auto"  
                })
                .on("click", function(){
                    if(getItem[0]){
                        changeItemTime({data:getItem[0].data})
                        // setItemTime(getItem[0].data.in)
                    }
                })

               
               
                const rectEleBG = group.append("rect")
                rectEleBG
                .attr("x", (d, i) => {
                    return 0
                })
                .attr("y", (d, i) => {
                    return 0
                })
                .attr("width", () => {
                    return d2.width
                })
                .attr("height", () => {
                    return d2.height
                })
                .attr("fill",  () => {
                    if(getItem[0] && data.length > 0){
                        return bgColor
                    }else{
                        return "none"
                    }
                })

                if(getItem[0] && data.length > 0){
                    const imageEle = group.append("image")
                    imageEle
                    .attr("width", d2.width)
                    .attr("height", d2.height)
                    .attr("x", 0) 
                    .attr("y", 0)
                    .attr("xlink:href", () => {
                        return `${BASE_URL}/${videoId}/480p${getItem[0].data?.in}.jpg`
                    })
                    .attr("background", "red")
                }
                const rectEle = group.append("rect")
                rectEle
                .attr("x", (d, i) => {
                    return 0
                })
                .attr("y", (d, i) => {
                    return 0
                })
                .attr("width", () => {
                    return d2.width
                })
                .attr("height", () => {
                    return d2.height
                })
                .attr("fill",  () => {
                    if(getItem[0]){
                        return "none"
                    }else{
                        return "none"
                    }
                })
                .attr("stroke", "#000") 
                .attr("stroke-width", "0.1") 
            })
            
      



        }
    }

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
                createGrid({data: getData, bgColor:CATEGORY_AND_TAGVALUE[idx].color})
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
        const getData = getVideoData.nAnnotations.categoryList.filter((val) => {
            if(val.category.slug === CATEGORY_AND_TAGVALUE[0].slug){
                return val;
            }
        })
        setCurrentCatAndTagData(getData)
        createGrid({data: getData, bgColor:CATEGORY_AND_TAGVALUE[0].color})
    },[])
    return <ContentBox title={"Categories & Tags"} id="cate_and_tag_box">
    <div className="w-full relative bg-neutral-100 overflow-hidden">
        <div className="flex gap-2 items-center justify-start flex-wrap mb-2">
            {CATEGORY_AND_TAGVALUE.map((val, idx) => {
                return <div onClick={() => onClickCatAndTag(idx)} key={idx} className={`text-sm px-2 py-1 ${(currentCatAndTag && currentCatAndTag.slug === val.slug) ? "bg-eva-c5" : "bg-eva-c2"} hover:bg-eva-c5 rounded-xl select-none cursor-pointer transition-all duration-150`}>{val.value}</div>
            })}
        </div>
        <div ref={svgContainerRef} className="w-full aspect-square bg-neutral-200">
            <svg ref={svgRef}>

            </svg>
        </div>
    </div>
 </ContentBox>
}

export default CateAndTagWrapper;
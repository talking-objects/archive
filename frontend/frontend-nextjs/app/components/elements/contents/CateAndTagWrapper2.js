import { BASE_URL, CATEGORY_AND_TAGVALUE } from "@/app/utils/constant/etc";
import ContentBox from "./ContentBox";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3"
const CateAndTagWrapper2 = ({getVideoData, videoId, changeItemTime}) => {
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

            const k = svgContainerSize.height / svgContainerSize.width

            const x = d3.scaleLinear()
            .domain([-4.5, 4.5])
            .range([0, svgContainerSize.width])

            const y = d3.scaleLinear()
            .domain([-4.5 * k, 4.5 * k])
            .range([svgContainerSize.height, 0])

            const svg = d3.select(svgRef.current)
            svg.selectAll("*").remove()
            const gGrid = svg.append("g");
            const grid = (g, x, y) => g
            .attr("stroke", "currentColor")
            .attr("stroke-opacity", 0.1)
            .call(g => g
              .selectAll(".x")
              .data(x.ticks(12))
              .join(
                enter => enter.append("line").attr("class", "x").attr("y2", svgContainerSize.height),
                update => update,
                exit => exit.remove()
              )
                .attr("x1", d => 0.5 + x(d))
                .attr("x2", d => 0.5 + x(d)))
            .call(g => g
              .selectAll(".y")
              .data(y.ticks(12 * k))
              .join(
                enter => enter.append("line").attr("class", "y").attr("x2", svgContainerSize.width),
                update => update,
                exit => exit.remove()
              )
                .attr("y1", d => 0.5 + y(d))
                .attr("y2", d => 0.5 + y(d)));

            const zoomed = ({transform}) => {
                // const selectG = d3.select("#testg")
                // selectG.attr("transform", transform)
                const zx = transform.rescaleX(x).interpolate(d3.interpolateRound);
                const zy = transform.rescaleY(y).interpolate(d3.interpolateRound);
                gGrid.call(grid, zx, zy);
            }
            const zoom = d3.zoom()
            .scaleExtent([0.5, 10])
            .on("zoom", zoomed)
            
            
            svg
            .attr("viewBox", [0, 0, svgContainerSize.width + 10, svgContainerSize.height + 10])
            .style("background", "white")
            .call(zoom)
            .call(zoom.transform, d3.zoomIdentity);



          

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

export default CateAndTagWrapper2;
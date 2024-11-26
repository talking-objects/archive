import React, { useEffect, useRef, useState } from "react";
import ContentContainer from "../../containers/ContentContainer";
import ContentBox from "./ContentBox";
import LeafletMap from "../../map/Map";
import { BASE_URL, CATEGORY_AND_TAGVALUE } from "@/app/utils/constant/etc";
import * as d3 from "d3"
const Contents = ({videoId, isLoading, getVideoData, showContentVideo}) => {
    const contentsRef = useRef(null)
    const contentsDummyRef = useRef(null)
    const contentVideoBoxRef = useRef(null)
    const [currentCatAndTag, setCurrentCatAndTag] = useState(CATEGORY_AND_TAGVALUE[0])
    const [currentCatAndTagData, setCurrentCatAndTagData] = useState(null)
    const svgRef = useRef(null)
    const svgRefEvent = useRef(null)
    const eventSvgContainer = useRef(null)
    const svgContainerRef = useRef(null)
    const eventTextBoxRef = useRef(null)
    const [showRef, setShowRef] = useState(false)
    const [showNarration, setShowNarration] = useState(false)

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
                // console.log(check)


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

                const getItem = randomPosList.filter((v) => {
                    if(v.column === d2.column && v.row === d2.row){
                        return v
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
    useEffect(() => {
        if(!isLoading){
            if(contentsDummyRef && contentsRef && contentVideoBoxRef){
                console.log(contentsRef)
                const refHeight = contentsRef.current.clientHeight;
                console.log(contentVideoBoxRef.current.clientHeight)
                contentsDummyRef.current.style.height = `${Math.floor(refHeight)}px`
                contentsDummyRef.current.style.transform = `translateY(-${contentVideoBoxRef.current.clientHeight}px)`
            }
        }
    },[getVideoData])

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
    function formatDateToYYYYMMDD(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
        const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days
        return `${month}/${day}/${year}`;
    }
    // Event
    const createTimeLine = ({eventData}) => {
        console.log("timeline")
        if(svgRefEvent.current && eventSvgContainer.current){
            const svgContainerSize = {
                width: eventSvgContainer.current.clientWidth,
                height: eventSvgContainer.current.clientHeight
            }
            const svg = d3.select(svgRefEvent.current);
       
            svg.selectAll("*").remove()
            const maxDate = new Date()
            const minDate = new Date(Math.min(...eventData.map((val) => val.startDate.getTime())))
       
            const scaleTime = d3.scaleTime([minDate, maxDate],[0, svgContainerSize.height])

            svg
            .attr("viewBox", [0, 0, svgContainerSize.width + 10, svgContainerSize.height + 20])
            .style("background", "#ececec")

            const bgBarWidth = 50
            const itemBoxWidth = 50
            const bgBar = svg
            .append("rect")
            .attr("x", svgContainerSize.width + 5 - bgBarWidth)
            .attr("y", 10)
            .attr("fill", "blue")
            .attr("width", bgBarWidth)
            .attr("height", svgContainerSize.height)
            

            const timelineBoxG = svg
            .append("g")
            .attr("transform", `translate(${svgContainerSize.width + 5 - itemBoxWidth}, 10)`)

            const timelineBoxs = timelineBoxG
            .selectAll("rect")
            .data(eventData)
            .join("rect")
            .attr("x", 0)
            .attr("y", function(d,i){
                return scaleTime(d.startDate)
            })
            .attr("width", itemBoxWidth)
            .attr("height", function(d, i){
                return (scaleTime(d.endDate) - scaleTime(d.startDate)) < 5 ? 5 : (scaleTime(d.endDate) - scaleTime(d.startDate))
            })
            .attr("fill", "rgba(255,100,0,0.9)")
            .on("mouseenter", function(d, i){
                const yAxisGroupBox = d3.select(`#yAItemGroup${i.idx}`)
                yAxisGroupBox
                .transition()
                .duration(300)
                .attr("transform", function(d, i){
                    return `translate(${-100}, ${scaleTime(d.startDate)})`
                })
                const yAxisGroupLine = d3.select(`#yAItemGroupLine${i.idx}`)
                yAxisGroupLine
                .transition()
                .duration(300)
                .attr("width", 95)
                
                document.body.style.cursor = "pointer"
                if(eventTextBoxRef){
                    const textBox = eventTextBoxRef.current;
                    // textBox.style.display = `block`
                    textBox.style.transform = `translate(0,0)`
                    textBox.style.width = `${svgContainerSize.width - 20 - bgBarWidth - 200}px`
                    textBox.style.height = `${svgContainerSize.height - 20}px`

                    const textBoxTextWrapper = eventTextBoxRef.current.querySelector(".textbox");
                    const textBoxTextWrappertitle = eventTextBoxRef.current.querySelector(".textboxTitle");
                    const textBoxTextWrapperinput = eventTextBoxRef.current.querySelector(".textboxInput");

                    textBoxTextWrappertitle.innerText = `Event${i.idx}`
                    textBoxTextWrapperinput.innerText = `IN:${i.in}`
                    // textBoxInput.innerHTML = `<div className="flex flex-col gap-8"><div className="textbox-header">Event${i.idx}</div><div>IN:${i.in}</div></div>`
                }
            })
            .on("mouseleave", function(d, i){

                const yAxisGroupBox = d3.select(`#yAItemGroup${i.idx}`)
                yAxisGroupBox
                .transition()
                .duration(300)
                .attr("transform", function(d, i){
                    return `translate(${-20}, ${scaleTime(d.startDate)})`
                })
                const yAxisGroupLine = d3.select(`#yAItemGroupLine${i.idx}`)
                yAxisGroupLine
                .transition()
                .duration(300)
                .attr("width", 15)
                document.body.style.cursor = "auto"
                if(eventTextBoxRef){
                    const textBox = eventTextBoxRef.current;
                    textBox.style.transform = `translate(-${svgContainerSize.width - 20 - bgBarWidth - 200 + 10}px,0)`
                   

                    // textBox.style.display = `none`
                    // textBox.style.width = `${0}px`
                    // textBox.style.height = `${0}px`
                }
            })

            const yAxisGroup = svg.append("g")
            .attr("transform", `translate(${svgContainerSize.width + 5 - itemBoxWidth}, 10)`)

            const pointerLineWidth = 15
            const gap = 5 + pointerLineWidth
            yAxisGroup
            .selectAll("g")
            .data(eventData)
            .join("g")
            .attr("id", function(d, i){
                return `yAItemGroup${d.idx}`
            })
            .attr("transform", function(d, i){
                return `translate(${-gap}, ${scaleTime(d.startDate)})`
            })
            .each(function(p, j){
                const currentG = d3.select(this);
            
                const pointLine = currentG
                .append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("id", function(d, i){
                    return `yAItemGroupLine${d.idx}`
                })
                .attr("width", pointerLineWidth)
                .attr("height", 1)
                .attr("fill", "black")
               

                const axisText = currentG
                .append("text")
                .attr("x", -5)
                .attr("y", 0)
                .text(formatDateToYYYYMMDD(p.startDate))
                .style("text-anchor", "end")
                .attr("dy", "0.4em")
                .style("font-size", "12px")
                .style("font-weight", "medium")

                
            })



        }
    }
    useEffect(() => {
        if(!isLoading){
            createTimeLine({eventData: getVideoData.nAnnotations.eventList})
        }
    },[getVideoData])

    
    return <ContentContainer>
                <div className="w-full relative bg-white">
                    {/* Small Video */}
                    <div ref={contentVideoBoxRef} className={`sticky top-[0] mt-[40px] left-0 w-1/2 h-full py-4 px-4 bg-neutral-100 ${showContentVideo ? "translate-x-0 opacity-100 select-auto" : "-translate-x-full opacity-0 pointer-events-none select-none"} transition-all duration-700 z-[30]`}>
                        <div className="aspect-video bg-green-300"></div>
                    </div>
                    <div ref={contentsDummyRef} className="w-full bg-white"></div>
                    <div ref={contentsRef} className="w-full absolute top-[40px] left-0 bg-blue-400 flex flex-col gap-10">
                        {getVideoData.summary && <ContentBox title={"Context"}>
                                 <div>
                                    <div>Summary</div>
                                    <div className="text-sm whitespace-break-spaces" dangerouslySetInnerHTML={{__html: getVideoData.summary}}></div>
                                 </div>
                                 <div className="grid grid-cols-3 mt-4 gap-4">
                                    {getVideoData.user && <div>
                                       <div>Contributors</div>
                                       <div className="text-sm"> {getVideoData.user} </div>
                                    </div>}
                                    {getVideoData.country && <div>
                                       <div>Country</div>
                                       <div className="text-sm"> {getVideoData.country.join(", ")} </div>
                                    </div>}
                                    <div>
                                       <div>Source</div>
                                       <div className="text-sm"></div>
                                    </div>
                                    {getVideoData.language && <div>
                                       <div>Language</div>
                                       <div className="text-sm"> {getVideoData.language.join(", ")} </div>
                                    </div>}
                                    <div>
                                       <div>Genre</div>
                                       <div className="text-sm"></div>
                                    </div>
                                 </div>  
                        </ContentBox>}
                         {(getVideoData.nAnnotations.placeList && getVideoData.nAnnotations.placeList.length > 0) && <ContentBox title={"Place"}>
                            <div className="w-full aspect-square relative bg-black overflow-hidden">
                                <LeafletMap allPlaces={getVideoData.nAnnotations.placeList} />
                            </div>
                         </ContentBox>}
                         {(getVideoData.nAnnotations.eventList && getVideoData.nAnnotations.eventList.length > 0) && <ContentBox title={"Event"}>
                            <div ref={eventSvgContainer} className="w-full flex h-[90svh] bg-neutral-100 relative overflow-hidden">
                                    <svg ref={svgRefEvent}></svg>
                                    <div ref={eventTextBoxRef} className="absolute top-[10px] min-w-[50px] w-1/2 h-[calc(100%-20px)] left-[10px] bg-white px-2 py-2 rounded-lg border-4 border-eva-c6 -translate-x-[calc(100%+10px)] transition-all duration-700">
                                        <div className="textbox">
                                            <div className="textboxTitle text-2xl font-bold"></div>
                                            <div className="textboxInput"></div>
                                        </div>
                                    </div>
                            </div>
                         </ContentBox>}
                         {(getVideoData.nAnnotations.categoryList && getVideoData.nAnnotations.categoryList.length > 0) && <ContentBox title={"Categories & Tags"}>
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
                         </ContentBox>}
                         {(getVideoData.nAnnotations.refList && getVideoData.nAnnotations.refList.length > 0) && <ContentBox title={"References"}>
                            <div className="flex w-full h-fit overflow-hidden bg-eva-c2 bg-opacity-[27%] px-4 py-4 flex-col gap-4 ">
                                {
                                    getVideoData.nAnnotations.refList.slice(0, showRef ? getVideoData.nAnnotations.refList.length : 4).map((val, idx) => {
                                        return <div key={idx} className="bg-white w-full h-fit min-h-28 rounded-lg border-4 border-eva-c5 px-4 py-2 ">
                                            <div>Reference test</div>
                                            <div>in: {val.in}</div>
                                        </div>
                                    })
                                }
                            </div>
                            {getVideoData.nAnnotations.refList.length > 4 && <div className="w-full flex justify-center"><span onClick={() => setShowRef((prev) => !prev)} className="bg-eva-c2 px-4 bg-opacity-[27%] py-2 rounded-b-xl text-sm font-extralight cursor-pointer">{!showRef ? "Expand/Show All" : "Close"}</span></div>}
                         </ContentBox>}
                         {(getVideoData.nAnnotations.narrationList && getVideoData.nAnnotations.narrationList.length > 0) && <ContentBox title={"Narrations"}>
                            <div className="flex w-full h-fit overflow-hidden bg-eva-c2 bg-opacity-[27%] px-4 py-4 flex-col gap-4 ">
                                {
                                    getVideoData.nAnnotations.narrationList.slice(0, showNarration ? getVideoData.nAnnotations.narrationList.length : 4).map((val, idx) => {
                                        return <div key={idx} className="bg-white w-full h-fit min-h-28 rounded-lg border-4 border-eva-c2 px-4 py-2">
                                            <div>Narration test</div>
                                            <div>in: {val.in}</div>
                                        </div>
                                    })
                                }
                            </div>
                            {getVideoData.nAnnotations.narrationList.length > 4 && <div className="w-full flex justify-center"><span onClick={() => setShowNarration((prev) => !prev)} className="bg-eva-c2 px-4 bg-opacity-[27%] py-2 rounded-b-xl text-sm font-extralight cursor-pointer">{!showNarration ? "Expand/Show All" : "Close"}</span></div>}
                         </ContentBox>}
                    </div>
                            
                </div>
                <div className="w-full h-[200svh] bg-red-400">
                    Related Items
                </div>
        </ContentContainer>
}

export default Contents;
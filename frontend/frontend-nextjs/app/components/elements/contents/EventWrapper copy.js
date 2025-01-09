import { useEffect, useRef, useState } from "react";
import ContentBox from "./ContentBox";
import * as d3 from "d3"

const EventWrapper = ({getVideoData, isLoading, changeItemTime}) => {
    const eventSvgContainer = useRef(null)
    const svgRefEvent = useRef(null)
    const eventTextBoxRef = useRef(null)
    const [currentEventData, setCurrentEventData] = useState(null)
    let currentEventIdx = null
    function formatDateToYYYYMMDD(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
        const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days
        return `${month}/${day}/${year}`;
    }
     // Event
     const createTimeLine = ({eventData, eventSvgContainerSize}) => {
     
        if(svgRefEvent.current && eventSvgContainer.current){
            const svgContainerSize = eventSvgContainerSize
            // const svgContainerSize = {
            //     width: eventSvgContainer.current.clientWidth,
            //     height: eventSvgContainer.current.clientHeight
            // }

            const itemGroupSize = eventSvgContainerSize
            itemGroupSize.height = itemGroupSize.height - 20
            const svg = d3.select(svgRefEvent.current);
       
            svg.selectAll("*").remove()
            const maxDate = new Date(Math.max(
                ...eventData.map((val) => new Date(val.startDate).getTime()) // eventData에서 가장 큰 startDate 계산
              ))
            const minDate = new Date(Math.min(...eventData.map((val) => val.startDate.getTime())))
       
            const scaleTime = d3.scaleTime([minDate, maxDate],[0, itemGroupSize.height])

            svg
            // .attr("viewBox", [0, 0, svgContainerSize.width + 10, svgContainerSize.height + 20])
            .style("width", `100%`)
            .style("height", `100%`)
            // .style("width", `${svgContainerSize.width + 10}px`)
            // .style("height", `${svgContainerSize.height + 20}px`)
            .style("background", "white")

            const bgBarWidth = 50
            const itemBoxWidth = 50
            const bgBar = svg
            .append("rect")
            .attr("x", svgContainerSize.width + 5 - bgBarWidth)
            .attr("y", 5)
            .attr("fill", "blue")
            .attr("width", bgBarWidth)
            .attr("height", itemGroupSize.height + 10)
            

            const timelineBoxG = svg
            .append("g")
            .attr("transform", `translate(${itemGroupSize.width + 5 - itemBoxWidth}, 5)`)

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
                // return (scaleTime(d.endDate) - scaleTime(d.startDate)) < 5 ? 5 : (scaleTime(d.endDate) - scaleTime(d.startDate))
                const bH = scaleTime(d.endDate) - scaleTime(d.startDate)
                if((scaleTime(d.startDate) + bH) > itemGroupSize.height){
                    return 10
                }
                return 10
            })
            .attr("fill", "rgba(255,100,0,0.9)")
            .on("click", function(d, i){
                if(i.idx !== currentEventIdx){
                    changeItemTime({data:i})
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

                    if(eventTextBoxRef){
                        const textBox = eventTextBoxRef.current;
                        // textBox.style.display = `block`
                        textBox.style.transform = `translate(0,0)`
                        textBox.style.width = `${itemGroupSize.width - 20 - bgBarWidth - 200}px`
                        textBox.style.height = `${itemGroupSize.height - 20}px`

                        const textBoxTextWrapper = eventTextBoxRef.current.querySelector(".textbox");
                        const textBoxTextWrappertitle = eventTextBoxRef.current.querySelector(".textboxTitle");
                        const textBoxTextWrapperinput = eventTextBoxRef.current.querySelector(".textboxInput");

                        // textBoxTextWrappertitle.innerText = `Event${i.idx}`
                        // textBoxTextWrapperinput.innerText = `IN:${i.in}`
                        // textBoxInput.innerHTML = `<div className="flex flex-col gap-8"><div className="textbox-header">Event${i.idx}</div><div>IN:${i.in}</div></div>`
                    }
                    setCurrentEventData(i)
                    currentEventIdx = i.idx

                    for(let j = 0; j < eventData.length; j++){
                        if(eventData[j].idx !== i.idx ){
                            const yAxisGroupBox = d3.select(`#yAItemGroup${eventData[j].idx}`)
                            yAxisGroupBox
                            .transition()
                            .duration(300)
                            .attr("transform", function(d, i){
                                return `translate(${-20}, ${scaleTime(eventData[j].startDate)})`
                            })
                            const yAxisGroupLine = d3.select(`#yAItemGroupLine${eventData[j].idx}`)
                            yAxisGroupLine
                            .transition()
                            .duration(300)
                            .attr("width", 15)
                        }
                    }
                }else{
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
                       
                        if(eventTextBoxRef){
                            const textBox = eventTextBoxRef.current;
                            textBox.style.transform = `translate(-${itemGroupSize.width - 20 - bgBarWidth - 200 + 10}px,0)`
                        
                        
                            // textBox.style.display = `none`
                            // textBox.style.width = `${0}px`
                            // textBox.style.height = `${0}px`
                        }
                        currentEventIdx = null
                        // setCurrentEventData(null)
                }
            })
            .on("mouseenter", function(d, i){
                  document.body.style.cursor = "pointer"
            })
            .on("mouseleave", function(d, i){
                document.body.style.cursor = "auto" 
            })

            const yAxisGroup = svg.append("g")
            .attr("transform", `translate(${itemGroupSize.width + 5 - itemBoxWidth}, 0)`)

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
                .attr("y", 5)
                .attr("id", function(d, i){
                    return `yAItemGroupLine${d.idx}`
                })
                .attr("width", pointerLineWidth)
                .attr("height", 1)
                .attr("fill", "black")
               

                const axisText = currentG
                .append("text")
                .attr("x", -5)
                .attr("y", 5)
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
            if(svgRefEvent.current && eventSvgContainer.current){
                const svgContainerSize = {
                  width: eventSvgContainer.current.clientWidth,
                  height: eventSvgContainer.current.clientHeight
              }
                createTimeLine({eventData: getVideoData.nAnnotations.eventList, eventSvgContainerSize: svgContainerSize}) 
            }
        }
    
    },[getVideoData])
    const [getIsLoading, setIsLoading] = useState(false)
    let resizeTimer; // setTimeout을 저장할 변수
    useEffect(() => {
      if(!isLoading){
        
        const handleResize = () => {
          
            setIsLoading(true); // 대기 화면 표시
      
            // 이전 타이머 제거
            if (resizeTimer) {
              clearTimeout(resizeTimer);
            }
      
            // 새로운 타이머 설정
            resizeTimer = setTimeout(() => {
              setIsLoading(false); // 대기 화면 숨김
              if(eventSvgContainer){
      
                  const eventSvgContainerSize = {
                      width: eventSvgContainer.current?.clientWidth ,
                      height: eventSvgContainer.current?.clientHeight ,
                    };
               
                    createTimeLine({eventData: getVideoData.nAnnotations.eventList, eventSvgContainerSize: eventSvgContainerSize}) 
              }
           
            }, 1000); // 1초 대기
          };
      
          // 윈도우 리사이즈 이벤트 추가
          window.addEventListener("resize", handleResize);
      
          // 클린업 함수
          return () => {
            window.removeEventListener("resize", handleResize); // 이벤트 제거
            if (resizeTimer) {
              clearTimeout(resizeTimer); // 타이머 제거
            }
          };
      }
    },[getVideoData])


    return (
      <ContentBox title={"Annotated Events"} id="event_box">
        <div
          ref={eventSvgContainer}
          className="w-full aspect-square flex bg-white relative overflow-hidden"
        >
          <svg ref={svgRefEvent}></svg>
          <div
            ref={eventTextBoxRef}
            className="absolute top-[10px] min-w-[50px] w-1/2 h-[calc(100%-20px)] left-[10px] bg-white px-2 py-2 rounded-lg border border-black -translate-x-[calc(100%+10px)] transition-all duration-700"
          >
            {currentEventData && <div className="textbox">
              <div className="textboxTitle text-2xl font-bold">{currentEventData.idx}</div>
              <div className="textboxInput">{currentEventData.type}</div>
            </div>}
          </div>
          <div className={`${getIsLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}  select-none absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center text-sm duration-300`}><span className="animate-bounce font-ibm_mono_semibold">Resizing...</span></div>
        </div>
      </ContentBox>
    );
}

export default EventWrapper;
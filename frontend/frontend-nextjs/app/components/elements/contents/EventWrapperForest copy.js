import { useEffect, useRef, useState } from "react";
import ContentBox from "./ContentBox";
import * as d3 from "d3"
import Link from "next/link";
const EventWrapperForest = ({getVideoData, isLoading, changeItemTime, clip=false}) => {
    const eventSvgContainer = useRef(null)
    const svgRefEvent = useRef(null)
    const eventTextBoxRef = useRef(null)
    const [currentEventData, setCurrentEventData] = useState(null)
    let currentEventIdx = null
    function formatDateToYYYYMMDD(date) {
      const year = date.getFullYear();
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[date.getMonth()]; // Get month as a 3-letter abbreviation
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
            itemGroupSize.height = itemGroupSize.height
            const svg = d3.select(svgRefEvent.current);
       
            svg.selectAll("*").remove()
            const maxDate = new Date(Math.max(
                ...eventData.map((val) => new Date(val.value.value.startDate).getTime()) // eventData에서 가장 큰 startDate 계산
              ))
            const minDate = new Date(Math.min(...eventData.map((val) => new Date(val.value.value.startDate).getTime())))
       
            const scaleTime = d3.scaleTime([minDate, maxDate],[0, itemGroupSize.width - 20])

            svg
            .style("width", `100%`)
            .style("height", `100%`)
            .style("background", "#fff")

            // 고정된 파란색 배경
            const bgBarWidth = 50
            const itemBoxWidth = 50
            const bgBar = svg
            .append("rect")
            .attr("x", 10)
            .attr("y", itemGroupSize.height/1.5 - 25)
            .attr("fill", "blue")
            .attr("width", itemGroupSize.width -20)
            .attr("height", bgBarWidth)
            

            // zoom이 적용될 그룹 생성
            const timelineGroup = svg.append("g");

            // zoom 동작 정의
            const zoom = d3.zoom()
                .scaleExtent([1, 10])
                .on("zoom", (event) => {
                    const transform = event.transform;
                    timelineGroup.attr("transform", `translate(${transform.x}, 0) scale(${transform.k}, 1)`);
                });

            svg.call(zoom);

            // timelineBoxs를 timelineGroup 안에 생성
            const timelineBoxG = timelineGroup
            .append("g")
            .attr("transform", `translate(5, ${itemGroupSize.height/1.5 - 25})`);

            const timelineBoxs = timelineBoxG
            .selectAll("rect")
            .data(eventData)
            .join("rect")
            .attr("x", function(d,i){
              return scaleTime(new Date(d.value.value.startDate))
          })
            .attr("y", 0)
            .attr("width", 10)
            .attr("height", itemBoxWidth)
            .attr("fill", "rgba(255,100,0,1)")
            .attr("fill-opacity", 0.5)
            .on("click", function(d, i){
                if(i.pk !== currentEventIdx){
                    changeItemTime({data:i})
                    const yAxisGroupBox = d3.select(`#yAItemGroup${i.pk}`)
                    yAxisGroupBox
                    .transition()
                    .duration(300)
                    .attr("transform", function(d, i){
                        return `translate(${scaleTime(new Date(d.value.value.startDate))}, 75)rotate(90)`
                    })
                
                    const yAxisGroupLine = d3.select(`#yAItemGroupLine${i.pk}`)
                    yAxisGroupLine
                    .transition()
                    .duration(300)
                    .attr("width", 35)
                    .attr("x", -25)

                    if(eventTextBoxRef){
                        const textBox = eventTextBoxRef.current;
                        textBox.style.display = `block`
                        textBox.style.transform = `translate(0,0)`
                     

                        const textBoxTextWrapper = eventTextBoxRef.current.querySelector(".textbox");
                        const textBoxTextWrappertitle = eventTextBoxRef.current.querySelector(".textboxTitle");
                        const textBoxTextWrapperinput = eventTextBoxRef.current.querySelector(".textboxInput");

                        // textBoxTextWrappertitle.innerText = `Event${i.idx}`
                        // textBoxTextWrapperinput.innerText = `IN:${i.in}`
                        // textBoxInput.innerHTML = `<div className="flex flex-col gap-8"><div className="textbox-header">Event${i.idx}</div><div>IN:${i.in}</div></div>`
                    }
                    setCurrentEventData(i)
                    currentEventIdx = i.pk

                    for(let j = 0; j < eventData.length; j++){
                        if(eventData[j].pk !== i.pk ){
                            const yAxisGroupBox = d3.select(`#yAItemGroup${eventData[j].pk}`)
                            yAxisGroupBox
                            .transition()
                            .duration(300)
                            .attr("transform", function(d, i){
                                return `translate(${scaleTime(new Date(eventData[j].value.value.startDate))}, 50)rotate(90)`
                            })
                            const yAxisGroupLine = d3.select(`#yAItemGroupLine${eventData[j].pk}`)
                            yAxisGroupLine
                            .transition()
                            .duration(300)
                            .attr("width", 15)
                            .attr("x", 0)
                        }
                    }
                }else{
                     const yAxisGroupBox = d3.select(`#yAItemGroup${i.pk}`)
                        yAxisGroupBox
                        .transition()
                        .duration(300)
                        .attr("transform", function(d, i){
                            return `translate(${scaleTime(new Date(d.value.value.startDate))}, 50)rotate(90)`
                        })
                        const yAxisGroupLine = d3.select(`#yAItemGroupLine${i.pk}`)
                        yAxisGroupLine
                        .transition()
                        .duration(300)
                        .attr("width", 15)
                        .attr("x", 0)
                       
                        if(eventTextBoxRef){
                            const textBox = eventTextBoxRef.current;
                            textBox.style.transform = `translate(0, calc(-100% - 15px))`;

                        
                        
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

            // 나머지 요소들은 svg에 직접 추가
            // const yAxisGroup = svg
            // .append("g")
            // .attr("transform", `translate(10, ${itemGroupSize.height/1.5 - 25})`);

            // const pointerLineWidth = 15
    
            // yAxisGroup
            // .selectAll("g")
            // .data(eventData)
            // .join("g")
            // .attr("id", function(d, i){
            //     return `yAItemGroup${d.pk}`
            // })
            // .attr("transform", function(d, i){
            //     return `translate(${scaleTime(new Date(d.value.value.startDate))}, 50)rotate(90)`
                
            // })
            // .each(function(p, j){
            //     const currentG = d3.select(this);
            
            //     const pointLine = currentG
            //     .append("rect")
            //     .attr("x", 0)
            //     .attr("y", 0)
            //     .attr("id", function(d, i){
            //         return `yAItemGroupLine${d.pk}`
            //     })
            //     .attr("width", pointerLineWidth)
            //     .attr("height", 1)
            //     .attr("fill", "black")
               
            //     const axisText = currentG
            //     .append("text")
            //     .attr("x", pointerLineWidth)
            //     .attr("y", 0)
            //     .text(formatDateToYYYYMMDD(new Date(p.value.value.startDate)))
            //     .style("text-anchor", "start")
            //     .attr("dy", "0.4em")
            //     .style("font-size", "12px")
            //     .style("font-weight", "medium")

                
            // })



        }
    }
    useEffect(() => {
        if(!isLoading){
            if(svgRefEvent.current && eventSvgContainer.current){
                const svgContainerSize = {
                  width: eventSvgContainer.current.clientWidth,
                  height: eventSvgContainer.current.clientHeight
              }
                createTimeLine({eventData: getVideoData, eventSvgContainerSize: svgContainerSize}) 
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
               
                    createTimeLine({eventData: getVideoData, eventSvgContainerSize: eventSvgContainerSize}) 
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
      <div className="w-full h-full bg-white relative px-4 py-2">
        <div
          ref={eventSvgContainer}
          className={`w-full flex h-full bg-white relative overflow-hidden`}
        >
          <svg ref={svgRefEvent}></svg>
          <div
            ref={eventTextBoxRef}
            className="absolute top-[10px] min-w-[50px] w-[calc(100%-20px)] h-[calc(100%/1.5-50px)] left-[10px] bg-white px-2 py-2 rounded-md border border-black -translate-y-[calc(100%+15px)] transition-all duration-700"
          >
            {currentEventData && <div className="textbox">
              <Link href={`/clip/${currentEventData.pk}`}>Show Clip</Link>
              <div className="textboxInput whitespace-pre-wrap font-ibm_mono_regular">{currentEventData.value?.value?.text}</div>
            </div>}
          </div>
          <div className={`${getIsLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}  select-none absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center text-sm duration-300`}><span className="animate-bounce font-ibm_mono_semibold">Resizing...</span></div>
        </div>
      </div>
    );
}

export default EventWrapperForest;
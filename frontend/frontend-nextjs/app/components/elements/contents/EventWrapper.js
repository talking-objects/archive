import { useEffect, useRef, useState } from "react";
import ContentBox from "./ContentBox";
import * as d3 from "d3"

const EventWrapper = ({getVideoData, isLoading, changeItemTime, clip=false}) => {
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
            const itemGroupSize = eventSvgContainerSize
            const svg = d3.select(svgRefEvent.current);
       
            svg.selectAll("*").remove()
            
            // 날짜 범위 계산
            const maxDate = new Date(Math.max(
                ...eventData.map((val) => new Date(val.value.value.startDate).getTime())
            ))
            const minDate = new Date(Math.min(
                ...eventData.map((val) => new Date(val.value.value.startDate).getTime())
            ))
       
            // 두 개의 별도 scale 생성 (items용, axis용)
            const xScale = d3.scaleTime()
                .domain([minDate, maxDate])
                .range([0, itemGroupSize.width - 25]);
            
            const xScaleAxis = d3.scaleTime()
                .domain([minDate, maxDate])
                .range([0, itemGroupSize.width]);

            svg
            .style("width", `100%`)
            .style("height", `100%`)
            .style("background", "#fff")

            // 파란색 배경
            const bgBarWidth = 50
            const itemBoxWidth = 50
            const bgBar = svg
            .append("rect")
            .attr("x", 0)
            .attr("y", itemGroupSize.height/2 - 25)
            .attr("fill", "blue")
            .attr("width", itemGroupSize.width)
            .attr("height", bgBarWidth)
            
            // axis 그룹 추가
            const xAxis = svg.append("g")
                .attr("class", "x-axis")
                .attr("transform", `translate(0, ${itemGroupSize.height/2 + 35})`);

            // 초기 axis 생성
            xAxis.call(
                d3.axisBottom(xScaleAxis)
                .ticks(5)
                .tickFormat(d3.timeFormat("%Y-%m-%d"))
            );

            // zoom 동작 정의
            const zoom = d3.zoom()
                .scaleExtent([1, 10])
                .translateExtent([
                    [0, 0],
                    [itemGroupSize.width, itemGroupSize.height]
                ])
                .on("zoom", (event) => {
                    // 새로운 scale 계산
                    const newXScale = event.transform.rescaleX(xScale);
                    const newXScaleAxis = event.transform.rescaleX(xScaleAxis);
                    
                    // items 위치 업데이트
                    timelineBoxG
                        .selectAll("rect")
                        .attr("x", function(d) {
                            return newXScale(new Date(d.value.value.startDate));
                        });

                    // axis 업데이트
                    xAxis.call(
                        d3.axisBottom(newXScaleAxis)
                        .ticks(5)
                        .tickFormat(d3.timeFormat("%Y-%m-%d"))
                    );
                });

            svg.call(zoom);

            // items 그룹 생성
            const timelineBoxG = svg.append("g");

            // items 생성
            const timelineBoxs = timelineBoxG
            .selectAll("rect")
            .data(eventData)
            .join("rect")
            .attr("x", function(d,i){
                return xScale(new Date(d.value.value.startDate))
            })
            .attr("y", itemGroupSize.height/2 - 25)
            .attr("width", 10)
            .attr("height", itemBoxWidth)
            .attr("fill", "rgba(255,100,0,1)")
            .attr("fill-opacity", 0.8)
            .on("click", function(d, i){
                if(i.id !== currentEventIdx){
                    changeItemTime({data:i})
                    const yAxisGroupBox = d3.select(`#yAItemGroup${i.id}`)
                    yAxisGroupBox
                    .transition()
                    .duration(300)
                    .attr("transform", function(d, i){
                        return `translate(${xScale(new Date(d.value.value.startDate))}, 75)rotate(90)`
                    })
                
                    const yAxisGroupLine = d3.select(`#yAItemGroupLine${i.id}`)
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
                    currentEventIdx = i.id

                    for(let j = 0; j < eventData.length; j++){
                        if(eventData[j].id !== i.id ){
                            const yAxisGroupBox = d3.select(`#yAItemGroup${eventData[j].id}`)
                            yAxisGroupBox
                            .transition()
                            .duration(300)
                            .attr("transform", function(d, i){
                                return `translate(${xScale(new Date(eventData[j].value.value.startDate))}, 50)rotate(90)`
                            })
                            const yAxisGroupLine = d3.select(`#yAItemGroupLine${eventData[j].id}`)
                            yAxisGroupLine
                            .transition()
                            .duration(300)
                            .attr("width", 15)
                            .attr("x", 0)
                        }
                    }
                }else{
                     const yAxisGroupBox = d3.select(`#yAItemGroup${i.id}`)
                        yAxisGroupBox
                        .transition()
                        .duration(300)
                        .attr("transform", function(d, i){
                            return `translate(${xScale(new Date(d.value.value.startDate))}, 50)rotate(90)`
                        })
                        const yAxisGroupLine = d3.select(`#yAItemGroupLine${i.id}`)
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

            const yAxisGroup = svg.append("g")
            .attr("transform", `translate(10, ${itemGroupSize.height/1.5 - 25})`)

            const pointerLineWidth = 15
    
          



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
      <ContentBox clip={clip} title={"Annotated Events"} id="event_box">
        <div
     
          className={`w-full ${clip ? "aspect-video" : "aspect-square"}  flex bg-white relative overflow-hidden flex-col`}
        >
           <div className="w-full h-full bg-white"></div>
          <div ref={eventSvgContainer} className="w-full h-full bg-white">
            <svg ref={svgRefEvent}></svg>
          </div>
          <div
            ref={eventTextBoxRef}
            className="absolute top-[10px] min-w-[50px] w-[calc(100%-20px)] h-[calc(100%/1.5-50px)] left-[10px] bg-white px-2 py-2 rounded-md border border-black -translate-y-[calc(100%+15px)] transition-all duration-700"
          >
            {currentEventData && <div className="textbox">
              <div className="flex flex-row gap-2 font-ibm_mono_semibold mb-2">
                {`${new Date(currentEventData.value?.value?.startDate).toLocaleDateString()} - ${new Date(currentEventData.value?.value?.endDate).toLocaleDateString()}`}
             </div>
              <div className="textboxInput whitespace-pre-wrap font-ibm_mono_regular">{currentEventData.value?.value?.text}</div>
            </div>}
          </div>
          <div className={`${getIsLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}  select-none absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center text-sm duration-300`}><span className="animate-bounce font-ibm_mono_semibold">Resizing...</span></div>
        </div>
      </ContentBox>
    );
}

export default EventWrapper;
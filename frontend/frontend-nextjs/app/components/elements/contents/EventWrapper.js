import { useEffect, useRef } from "react";
import ContentBox from "./ContentBox";
import * as d3 from "d3"

const EventWrapper = ({getVideoData, isLoading, changeItemTime}) => {
    const eventSvgContainer = useRef(null)
    const svgRefEvent = useRef(null)
    const eventTextBoxRef = useRef(null)
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
            .on("click", function(d, i){
                console.log(i)
                changeItemTime({data:i})
            })
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


    return <ContentBox title={"Annotated Events"} id="event_box">
    <div ref={eventSvgContainer} className="w-full flex h-[90svh] bg-neutral-100 relative overflow-hidden">
            <svg ref={svgRefEvent}></svg>
            <div ref={eventTextBoxRef} className="absolute top-[10px] min-w-[50px] w-1/2 h-[calc(100%-20px)] left-[10px] bg-white px-2 py-2 rounded-lg border-4 border-eva-c6 -translate-x-[calc(100%+10px)] transition-all duration-700">
                <div className="textbox">
                    <div className="textboxTitle text-2xl font-bold"></div>
                    <div className="textboxInput"></div>
                </div>
            </div>
    </div>
 </ContentBox>
}

export default EventWrapper;
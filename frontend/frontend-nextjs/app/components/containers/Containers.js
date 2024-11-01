import { BASE_URL } from "@/app/utils/constant/etc"
import { getAllAnnotations, getAllItemAnnotations } from "@/app/utils/hooks/pandora_api"
import { useEffect, useMemo, useRef, useState } from "react"
import * as d3 from "d3"
import { createFakeAnnotations, formatTime } from "@/app/utils/hooks/etc"
import gsap from "gsap"
import { LegendContainer, VideoNavigation } from "../elements/Elements"
import { useRouter } from "next/navigation"
import LeafletMap from "../map/Map"


export const ContentContainer = ({children}) => {
    return (<div className="w-screen px-4 lg:px-4">
      <div className="w-full min-h-[100svh] h-full max-w-screen-2xl mx-auto flex flex-col">
      {children}
      </div>
   </div>)
}

export const MainContainer = ({children}) => {
   return <div className="w-full h-full flex flex-col items-center">
      {children}
   </div>
}


const VideoDataVisContainer = ({data, onClickProgressBar, edit=false, clip=false, playToggle, fakeData, toggleShow, setCurrentTime, duration, annotationData, annotationLoading, videoRef}) => {
   const [getData, setData] = useState(null)
   const wrapperRef = useRef(null)
   const svgRef = useRef(null)
   const infoRef = useRef(null)
   const placeAndEventInfoRef = useRef(null)
   const infoSourceRef = useRef(null)
   const [hoverData, setHoverData] = useState(null)
   const [sourceHoverData, setSourceHoverData] = useState(null)
   const router = useRouter()
   const svgContainerRef = useRef(null)

   
   // the data of annotations of this video
   useEffect(() => {
      if(!annotationLoading){
         // setData(annotationData.data.items)
       
         const getDuration = duration
      
         // 🔥 create fake data just for test 🔥
         // fake data
         if(edit){
           
            let allData = {
               categoryList: [],
               eventList : [],
               narrationList : [],
               placeList : [],
               refList : [],
               tagList: []
            };
            for(let i = 0; i < fakeData.length; i++){
               const fAnnotations = fakeData[i].annotations;
               for(let j =0; j < Object.keys(fAnnotations).length; j++){
                
                  const getAnno = fAnnotations[Object.keys(fAnnotations)[j]]
                  allData[Object.keys(fAnnotations)[j]] = [...getAnno,...allData[Object.keys(fAnnotations)[j]]]
                
                  
               }
            }
         
            setData(allData)
       
         }else{
         
            let getFakeData = fakeData
            setData(getFakeData)
           
         }
         
       
      }
   },[annotationData])

   useEffect(() => {
      const category = d3.select("#cateGroup")
      const tag = d3.select("#tagGroup")
      const ref = d3.select("#refGroup")
      const narration = d3.select("#narrationGroup")
      const event = d3.select("#eventGroup")
      const place = d3.select("#placeGroup")
      
      
      const svg = d3.select(svgRef.current)
      if(toggleShow.view === "diagramatic"){
        
         svg.style("display", "block")

         // Category toggle
         if (toggleShow.category) {
            category.style("display", "block");
          } else {
            category.style("display", "none");
          }
       
          // Tag toggle
          if (toggleShow.tag) {
            tag.style("display", "block");
          } else {
            tag.style("display", "none");
          }
       
          // Reference toggle
          if (toggleShow.reference) {
            ref.style("display", "block");
          } else {
            ref.style("display", "none");
          }
       
          // Narration toggle
          if (toggleShow.narration) {
            narration.style("display", "block");
          } else {
            narration.style("display", "none");
          }
          // Event toggle
          if (toggleShow.event) {
            event.style("display", "block");
          } else {
            event.style("display", "none");
          }
          // Narration toggle
          if (toggleShow.place) {
            place.style("display", "block");
          } else {
            place.style("display", "none");
          }
      }else{
       
         // svg.style("display", "none")
      }

       
   },[toggleShow])

   const onMouseSourceLeave = (e, d) => {
      document.body.style.cursor = "auto"
      if(wrapperRef && infoSourceRef){
        
         infoSourceRef.current.style.opacity = `${0}`
         infoSourceRef.current.style.pointerEvents = `none`
         setSourceHoverData("")
      }
   }

   const onClickWatchVideo = () => {
      
      router.push(`/clip/${sourceHoverData.id}?clipId=${sourceHoverData.originId}&id=${sourceHoverData.id}`)
   }
   // Annotation Visualization using D3.js
   useEffect(() => {
      if(svgRef && svgContainerRef){
         const infoBoxTopMargin = 20;
         if(getData){
            const onMouseSourceEnter = (e, d) => {
               document.body.style.cursor = "auto"
               
            }
            const onMouseSourceClick = (e, d) => {
               document.body.style.cursor = "auto"
               if(wrapperRef && infoSourceRef){
                  console.log(d)
                  setSourceHoverData(d)
                  const bbox = e.target.getBoundingClientRect();
                  let currentMouseX = bbox.left
                  const boxWidth = svgRef.current.clientWidth/fakeData.length - 30
                  infoSourceRef.current.style.width = `${boxWidth}px`
                  infoSourceRef.current.style.height = `${boxWidth}px`
                  infoSourceRef.current.style.opacity = `${1}`
                  infoSourceRef.current.style.top = `${0}px`
                  infoSourceRef.current.style.left = `${currentMouseX - boxWidth + 30}px`
                  infoSourceRef.current.style.pointerEvents = `auto`
               }
            }
            
            const onMouseEnter = (e,d) => {
               document.body.style.cursor = "pointer"
               const mousePos = d3.pointer(e);
               
               if(d.type === "placeLayer" || d.type === "eventLayer"){
                  if(placeAndEventInfoRef){
                     const pAERef = placeAndEventInfoRef.current;
                     pAERef.style.opacity = "1"
                     setHoverData(d)
                  }
               }else{
                  if(wrapperRef && infoRef){
                     const wrapperHeight = wrapperRef.current.clientHeight;
                     const wrapperWidth = wrapperRef.current.clientWidth;
                     const infoBox = infoRef.current;
                     const addHeight = wrapperHeight * (2/3);
                     const infoBoxHeight = infoBox.clientHeight;
                     const infoBoxWidth = infoBox.clientWidth;
                     setHoverData(d)
                     
                     gsap.to(infoBox, {
                        css: {opacity: 1},
                        duration: 0.5
                     })
                     infoBox.style.top = `${addHeight + mousePos[1] - infoBoxHeight - infoBoxTopMargin}px`
   
   
                     let currentMouseX = mousePos[0] - infoBoxWidth/2
                     if((mousePos[0] + infoBoxWidth/2) > wrapperWidth){
                        currentMouseX = wrapperWidth - infoBoxWidth
                     }
                     if((mousePos[0] - infoBoxWidth/2) < 0){
                        currentMouseX = 0
                     }
                     infoBox.style.left = `${currentMouseX}px`
   
                  }
               }
               
              
            }
            const onMouseMove = (e,d) => {
               const mousePos = d3.pointer(e);

               if(d.type === "placeLayer" || d.type === "eventLayer"){
                  if(placeAndEventInfoRef){
                     const pAERef = placeAndEventInfoRef.current;
                     pAERef.style.opacity = "1"
                     setHoverData(d)
                  }
               }else{
                  if(wrapperRef && infoRef){
                     const wrapperHeight = wrapperRef.current.clientHeight;
                     const wrapperWidth = wrapperRef.current.clientWidth;
                     const infoBox = infoRef.current;
                     const addHeight = wrapperHeight * (2/3);
                     const infoBoxHeight = infoBox.clientHeight;
                     const infoBoxWidth = infoBox.clientWidth;
                     setHoverData(d)
                     gsap.to(infoBox, {
                        css: {opacity: 1},
                        duration: 0.5
                     })
                     infoBox.style.top = `${addHeight + mousePos[1] - infoBoxHeight - infoBoxTopMargin}px`
   
   
                     let currentMouseX = mousePos[0] - infoBoxWidth/2
                     if((mousePos[0] + infoBoxWidth/2) > wrapperWidth){
                        currentMouseX = wrapperWidth - infoBoxWidth
                     }
                     if((mousePos[0] - infoBoxWidth/2) < 0){
                        currentMouseX = 0
                     }
                     infoBox.style.left = `${currentMouseX}px`
   
   
                  }
               }
               
              
            }
            const onMouseLeave = (e,d) => {
               document.body.style.cursor = "auto"
               if(infoRef){
                  const infoBox = infoRef.current;
                  gsap.killTweensOf(infoBox)
                  setHoverData(null)
                  gsap.to(infoBox, {
                     css: {opacity: 0},
                     duration: 0.3
                  })
                  // infoBox.style.display = "none"
               }
               if(placeAndEventInfoRef){
                  const pAERef = placeAndEventInfoRef.current;
                  setHoverData(null)
                 
                  pAERef.style.opacity = "0"
               }
               
            }
            const onClick = ({inVlaue, video}) => {
               
               if(edit){
                  onClickProgressBar(inVlaue, edit)
               }else{
                  if(!clip){
                     console.log(typeof inVlaue, inVlaue)
                     videoRef.current.currentTime = inVlaue
                     setCurrentTime(inVlaue)
                  }else{
                     videoRef.current.currentTime = data.in + inVlaue
                     setCurrentTime(inVlaue)
                  }
                  
               }
            }
            
            const svg = d3.select(svgRef.current)
            // svg.attr("viewBox", `0 0 ${svgContainerRef.current.clientWidth} ${svgContainerRef.current.clientHeight}`)
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("id", "mainSVG")
            // svg
            // .style("width", "100%")
            // .style("height", "100%")
            // .style("background", "none")

            

            const canvasSize = {
               width: svg.node().clientWidth,
               height: svg.node().clientHeight/3,
            }
            const globalGourp = svg.append("g")
            globalGourp
            .attr("id", "mainG")
            .attr("transform", `translate(0,${canvasSize.height * 2})`);

          
          



            let scaleLinear = d3.scaleLinear([0, duration], [0, canvasSize.width]);
            const annotationRowHeight = canvasSize.height/4

            // edit video divider
            if(edit){
               const dividerGroup = svg.append("g")
               dividerGroup.attr("transform", `translate(0,0)`)
               dividerGroup
               .append("g")
               .attr("id", "divideGroupBar")
               .selectAll("rect")
               .data(fakeData)
               .join("rect")
               .attr("width", 1)
               .attr("height", svg.node().clientHeight)
               .attr("x", function (d) {
                  return `${scaleLinear(d.newOut)}px`;
                })
               .attr("y", 0)
               .attr("fill", "rgba(255, 255, 255, 0.5)")

               dividerGroup
               .append("g")
               .attr("id", "divideGroupBox")
               .selectAll("rect")
               .data(fakeData)
               .join("g")
               .attr("transform", d => `translate(${scaleLinear(d.newOut) - 30}, 0)`)
               .each(function(d) {
                   const group = d3.select(this);
                   // Append rectangle for the box
                   group.append("rect")
                       .attr("width", 30)
                       .attr("height", 30)
                       .attr("fill", "rgba(255, 255, 255, 0.8)")
       
                   // Append the icon path inside each box
                   group.append("path")
                       .attr("d", "M19.5 19.5L4.5 4.5M4.5 4.5v11.25M4.5 4.5h11.25")
                       .attr("stroke-linecap", "round")
                       .attr("stroke-linejoin", "round")
                       .attr("stroke-width", 1.5)
                       .attr("stroke", "currentColor")
                       .attr("fill", "none")
                       .attr("transform", "translate(5, 5)"); // Adjust positioning as needed
               })
               .on("mouseenter", onMouseSourceEnter)
               .on("click",onMouseSourceClick)
            }

            // create category box
            globalGourp
            .append("g")
            .attr("id", "cateGroup")
            .selectAll("rect")
            .data(getData.categoryList.sort((a,b) => a.in - b.in))
            .join("rect")
            .attr("width", function(d){
               return `${scaleLinear(d.out - d.in)}px`
            })
            .attr("height", annotationRowHeight)
            .attr("x", function (d) {
               return `${scaleLinear(d.in)}px`;
             })
            .attr("y", function (d, i) {
               return `${canvasSize.height - annotationRowHeight}px`;
             })
            .attr("fill", function (d, i) {
               return `${d.category.color}`;
             })
            // .style("mix-blend-mode", "multiply")
            .attr("opacity", 1)
            .style("stroke", "black")
            .style("stroke-width", "0.5px")
            .on("mouseenter", onMouseEnter)
            .on("mouseleave", onMouseLeave)
            .on("mousemove", onMouseMove)
            .on("click", function(event, value){
               onClick({inVlaue:value.in, video: videoRef})
            })
          
          
            // create tag box
            globalGourp
            .append("g")
            .attr("id", "tagGroup")
            .selectAll("rect")
            .data(getData.tagList)
            .join("rect")
            .attr("width", function(d){
               return `${scaleLinear(d.out - d.in)}px`
            })
            .attr("height", annotationRowHeight)
            .attr("x", function (d) {
               return `${scaleLinear(d.in)}px`;
             })
            .attr("y", function (d, i) {
               return `${canvasSize.height - ((annotationRowHeight) * 2)}px`;
             })
            .attr("fill","#3118E8")
            .style("stroke", "black")
            .style("stroke-width", "0.5px")
            .on("mouseenter", onMouseEnter)
            .on("mouseleave", onMouseLeave)
            .on("mousemove", onMouseMove)
            .on("click", function(event, value){
               onClick({inVlaue:value.in, video: videoRef})
            })
           
            // creat ref
            globalGourp
            .append("g")
            .attr("id", "refGroup")
            .selectAll("circle")
            .data(getData.refList)
            .join("circle")
            .attr("r", ((annotationRowHeight)/3)/2)
            .attr("cx", function (d) {
               return `${scaleLinear(d.in) + (((annotationRowHeight)/3)/2)}px`;
             })
            .attr("cy", function (d, i) {
               return `${canvasSize.height - ((annotationRowHeight) * 2) - ((annotationRowHeight)/3/2)}px`;
             })
            .attr("fill","#FFFFFF")
            .style("stroke", "#EC6735")
            .style("stroke-width", "4.5px")
            .on("mouseenter", onMouseEnter)
            .on("mouseleave", onMouseLeave)
            .on("mousemove", onMouseMove)
            .on("click", function(event, value){
               onClick({inVlaue:value.in, video: videoRef})
            })
            // creat narration
            globalGourp
            .append("g")
            .attr("id", "narrationGroup")
            .selectAll("circle")
            .data(getData.narrationList)
            .join("circle")
            .attr("r", ((annotationRowHeight)/3)/2)
            .attr("cx", function (d) {
               return `${scaleLinear(d.in) + (((annotationRowHeight)/3)/2)}px`;
             })
            .attr("cy", function (d, i) {
               return `${canvasSize.height - ((annotationRowHeight) * 2) - (((annotationRowHeight)/3/2) * 4)}px`;
             })
            .attr("fill","#8BA5F8")
            .style("stroke", "#000")
            .style("stroke-width", "0.5px")
            .on("mouseenter", onMouseEnter)
            .on("mouseleave", onMouseLeave)
            .on("mousemove", onMouseMove)
            .on("click", function(event, value){
               onClick({inVlaue:value.in, video: videoRef})
            })

            // create event box
            globalGourp
            .append("g")
            .attr("id", "eventGroup")
            .selectAll("rect")
            .data(getData.eventList)
            .join("rect")
            .attr("width", function(d){
               return `${annotationRowHeight/3}px`
            })
            .attr("height", annotationRowHeight/3)
            .attr("x", function (d) {
               return `${scaleLinear(d.in)}px`;
             })
            .attr("y", function (d, i) {
               return `${canvasSize.height - ((annotationRowHeight) * 4 - annotationRowHeight/2)}px`;
             })
            .attr("fill","#3118E8")
            .style("stroke", "#F1A73D")
            .style("stroke-width", "4.5px")
            .on("mouseenter", onMouseEnter)
            .on("mouseleave", onMouseLeave)
            .on("mousemove", onMouseMove)
            .on("click", function(event, value){
               onClick({inVlaue:value.in, video: videoRef})
            })
            // create place box
            globalGourp
            .append("g")
            .attr("id", "placeGroup")
            .selectAll("circle")
            .data(getData.placeList)
            .join("circle")
            .attr("r", (((annotationRowHeight)/3)/2))
            // .attr("width", function(d){
            //    return `${annotationRowHeight/3}px`
            // })
            // .attr("height", annotationRowHeight/3)
            .attr("cx", function (d) {
               return `${scaleLinear(d.in) + (((annotationRowHeight)/3)/2)}px`;
             })
            .attr("cy", function (d, i) {
               return `${canvasSize.height - ((annotationRowHeight) * 4 - (((annotationRowHeight)/3)/2) - 2.25)}px`;
             })
            .attr("fill","#3118E8")
            .style("stroke", "#EC6735")
            .style("stroke-width", "4.5px")
            .on("mouseenter", onMouseEnter)
            .on("mouseleave", onMouseLeave)
            .on("mousemove", onMouseMove)
            .on("click", function(event, value){
               onClick({inVlaue:value.in, video: videoRef})
            })
           

         }
      }
    
   },[getData])

   useEffect(() => {
      const updateViewBox = () => {
              
         let svgContainer = document.querySelector("#svgContainer")
     
         const globalGroup = d3.select("#mainG")
         const canvasSize = {
            width: svgContainer.clientWidth,
            height: svgContainer.clientHeight/3,
         }
         let scaleLinear = d3.scaleLinear([0, duration], [0, canvasSize.width]);
         const annotationRowHeight = canvasSize.height/4


         if(edit){
            d3.select("#divideGroupBar").selectAll("rect")
            .attr("width", 1)
            .attr("height", svgContainer.clientHeight)
            .attr("x", function (d) {
               return `${scaleLinear(d.newOut)}px`;
             })
            .attr("y", 0)
            
            d3.select("#divideGroupBox").selectAll("g")
            .attr("transform", d => `translate(${scaleLinear(d.newOut) - 30}, 0)`)
         }


         globalGroup.attr("transform", `translate(0,${(canvasSize.height) * 2})`);

         // category Resize
         globalGroup.select("#cateGroup").selectAll("rect")
         .attr("width", function(d){
            return `${scaleLinear(d.out - d.in)}px`
         })
         .attr("height", annotationRowHeight)
         .attr("x", function (d) {
            return `${scaleLinear(d.in)}px`;
          })
         .attr("y", function (d, i) {
            return `${canvasSize.height - annotationRowHeight}px`;
          })
         .attr("fill", function (d, i) {
            return `${d.category.color}`;
          })

         //  tag Reszie
         globalGroup.select("#tagGroup").selectAll("rect")
         .attr("width", function(d){
            return `${scaleLinear(d.out - d.in)}px`
         })
         .attr("height", annotationRowHeight)
         .attr("x", function (d) {
            return `${scaleLinear(d.in)}px`;
          })
         .attr("y", function (d, i) {
            return `${canvasSize.height - ((annotationRowHeight) * 2)}px`;
          })

         //  ref Resize
         globalGroup.select("#refGroup").selectAll("circle")
         .attr("r", ((annotationRowHeight)/3)/2)
         .attr("cx", function (d) {
            return `${scaleLinear(d.in) + (((annotationRowHeight)/3)/2)}px`;
          })
         .attr("cy", function (d, i) {
            return `${canvasSize.height - ((annotationRowHeight) * 2) - ((annotationRowHeight)/3/2)}px`;
          })
         //  narration Resize
         globalGroup.select("#narrationGroup").selectAll("circle")
         .attr("r", ((annotationRowHeight)/3)/2)
         .attr("cx", function (d) {
            return `${scaleLinear(d.in) + (((annotationRowHeight)/3)/2)}px`;
          })
         .attr("cy", function (d, i) {
            return `${canvasSize.height - ((annotationRowHeight) * 2) - (((annotationRowHeight)/3/2) * 4)}px`;
          })

         //  Event Resize
         globalGroup.select("#eventGroup").selectAll("rect")
         .attr("width", function(d){
            return `${annotationRowHeight/3}px`
         })
         .attr("height", annotationRowHeight/3)
         .attr("x", function (d) {
            return `${scaleLinear(d.in)}px`;
          })
         .attr("y", function (d, i) {
            return `${canvasSize.height - ((annotationRowHeight) * 4 - annotationRowHeight/2)}px`;
          })
         //  Place Resize
         globalGroup.select("#placeGroup").selectAll("circle")
         .attr("r", (((annotationRowHeight)/3)/2))
         .attr("cx", function (d) {
            return `${scaleLinear(d.in) + (((annotationRowHeight)/3)/2)}px`;
          })
         .attr("cy", function (d, i) {
            return `${canvasSize.height - ((annotationRowHeight) * 4 - (((annotationRowHeight)/3)/2) - 2.25)}px`;
          })

     };
     
     // 리사이즈 이벤트에 함수 연결
     window.addEventListener("resize", updateViewBox);
     return () => window.removeEventListener("resize", updateViewBox);
     
   },[])

   // const closePEInfo = () => {
   //    if(placeAndEventInfoRef){
   //       const pAERef = placeAndEventInfoRef.current;
   //       pAERef.style.opacity = "0"
   //    }
   // }

   if(annotationLoading || !Boolean(getData)){
      return;
   }
   return <div ref={wrapperRef} className="absolute top-0 left-0 w-full h-full bg-none">
         <div ref={infoRef} className="absolute opacity-0 pointer-events-none select-none border-[#000000] border rounded-lg overflow-hidden top-0 right-0 z-[30] bg-white text-black w-[300px] h-[250px] flex p-1">
            {
               hoverData && <div className="w-full h-full">
                  <OverViewBox data={hoverData} fakeData={getData}  />
               </div>
            }
         </div>
         <div ref={placeAndEventInfoRef} className="absolute opacity-0 pointer-events-none select-none border-[#000000] border-1 rounded-lg overflow-hidden top-4 right-4 z-[30] border bg-white text-black w-[400px] h-[250px] flex">
            {
               hoverData && <div className="flex flex-col w-full h-full">
                  {/* <div className="flex justify-end">
                     <div onClick={closePEInfo} className="p-2 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                     </div>
                  </div> */}
                  <div className="w-full h-full">
                     <OverViewBox data={hoverData} fakeData={getData} />
                  </div>
               </div>
            }
         </div>

         {<div ref={infoSourceRef} onMouseLeave={onMouseSourceLeave} className={`absolute opacity-0 pointer-events-none select-none top-0 right-0 z-[30] p-2 bg-white text-black w-[400px] h-[350px]`}>
            <div>Source: Title of the Original Video here lore ups dolor stat mukdasld edema.</div>
            <div onClick={onClickWatchVideo} className="border border-black rounded-lg px-2 py-1 cursor-pointer mt-2">Watch Video</div>
         </div>}
         <div ref={svgContainerRef} id={"svgContainer"} className={`${(toggleShow.view === "diagramatic" && playToggle) ? "opacity-100 translate-y-0" :"opacity-0 translate-y-full" } absolute bottom-0 left-0 z-[20] w-full h-full transition-all duration-1000`}>
            <svg ref={svgRef}>

            </svg>
         </div>
   </div>
}
const TagBox = ({tag}) => {
   return <div className="w-full flex gap-2">
      {
         tag.value.map((val, idx) => {
            return <div key={idx} className="bg-[#3118E8] px-2 py-1 text-white text-xl">#{val}</div>
         })
      }
      </div>
}
const PlaceBox = ({place, allPlaces}) => {

   const miniMap = useMemo(() => (<LeafletMap center={[place.position.lat, place.position.long]} allPlaces={allPlaces} />), [allPlaces, place])

   return <div className="w-full h-full min-h-[200px] flex flex-col text-[#3118E8] border-[#EC6735] border-4 font-bold text-2xl">
      <div className="w-full p-2 bg-white">{place.type}</div>
      <div className="flex-1 w-full h-full bg-red-400 border-white border flex justify-center items-center relative">
         {miniMap}
      </div>
   </div>
}
const EventBox = ({event}) => {
   return <div className="w-full min-h-[200px] h-full flex flex-col px-2 py-2 bg-[#3118E8] border-[#F1A73D] border-4 text-white">
      <div>{event.type}</div>
      <div className="w-full h-full flex-1 border-white border flex justify-center items-center">Event</div>
   </div>
}

const NarrationBox = ({narration}) => {
   return <div className="w-full min-h-[200px] h-full flex px-2 py-2 bg-white gap-4 border-[#8BA5F8] border-4 text-black">
      <div><div className="w-10 aspect-square rounded-full bg-[#8BA5F8]"></div></div>
      <div>{narration.type}</div>
   </div>
}
const ReferenceBox = ({reference}) => {
   return <div className="w-full min-h-[200px] h-full flex px-2 py-2 bg-white gap-4 border-[#EC6735] border-4 text-black">
      <div><div className="w-10 aspect-square rounded-full border-[#EC6735] border-4 bg-white"></div></div>
      <div>{reference.type}</div>
   </div>
}
const CategoryBox = ({category}) => {
   return <div style={{backgroundColor: category.category.color}} className="w-full h-full text-4xl text-white italic px-2 py-1">{category.category.value}</div>
}
export const OverViewBox = ({data, fakeData=false}) => {
  

  
  

   switch (data.type) {
      case "categoryLayer":
         return <CategoryBox category={data} />
      case "placeLayer":
         return <PlaceBox place={data} allPlaces={fakeData.placeList} />
      case "tagLayer":
         return <TagBox tag={data} />
      case "referenceLayer":
         return <ReferenceBox reference={data} />
      case "eventLayer":
         return <EventBox event={data} />
      case "narrationLayer":
         return <NarrationBox narration={data} />
      default:
         return <div>Error: Invalid Layer Type</div>;
   }
}

const FilterBox = ({children, type, toggleShow}) => {
   if(toggleShow.category && type === "categoryLayer"){
      return <>{children}</>
   }
   if(!toggleShow.category && type === "categoryLayer"){
      return <></>
   }
   if(toggleShow.tag && type === "tagLayer"){
      return <>{children}</>
   }
   if(!toggleShow.tag && type === "tagLayer"){
      return <></>
   }
   if(toggleShow.reference && type === "referenceLayer"){
      return <>{children}</>
   }
   if(!toggleShow.reference && type === "referenceLayer"){
      return <></>
   }
   if(toggleShow.narration && type === "narrationLayer"){
      return <>{children}</>
   }
   if(!toggleShow.narration && type === "narrationLayer"){
      return <></>
   }
   if(toggleShow.event && type === "eventLayer"){
      return <>{children}</>
   }
   if(!toggleShow.event && type === "eventLayer"){
      return <></>
   }
   if(toggleShow.place && type === "placeLayer"){
      return <>{children}</>
   }
   if(!toggleShow.place && type === "placeLayer"){
      return <></>
   }
   
   return <>{children}</>
}

export const EntangledContainer = ({clip=false, edit=false, toggleShow, playToggle, currentTime, fakeData}) => {
   const [allFakeData, setAllFakeData] = useState(null)
   const [getData, setData] = useState(null)
   useEffect(() => {
      if(!edit){
         setData(fakeData)
      }else{
         let allData = {
            categoryList: [],
            eventList : [],
            narrationList : [],
            placeList : [],
            refList : [],
            tagList: []
         };
         for(let i = 0; i < fakeData.length; i++){
            const fAnnotations = fakeData[i].annotations;
            for(let j =0; j < Object.keys(fAnnotations).length; j++){
             
               const getAnno = fAnnotations[Object.keys(fAnnotations)[j]]
               allData[Object.keys(fAnnotations)[j]] = [...getAnno,...allData[Object.keys(fAnnotations)[j]]]
             
               
            }
         }
         setData(allData)
      }
      if(!edit){
         let allData = []
         for(let i =0; i < Object.keys(fakeData).length; i++){
            allData = [...fakeData[Object.keys(fakeData)[i]],...allData]
         }
         allData = allData.sort((a,b) => a.in - b.in)

         setAllFakeData(allData)
      }else{
         let allData = []
         for(let i = 0; i < fakeData.length; i++){
            const fAnnotations = fakeData[i].annotations;
            for(let j =0; j < Object.keys(fAnnotations).length; j++){
             
               const getAnno = fAnnotations[Object.keys(fAnnotations)[j]]
               allData = [...getAnno,...allData]
               
            }
         }
         console.log(allData)
         allData = allData.sort((a,b) => a.in - b.in)
         setAllFakeData(allData)

      }
     
   },[])

   const previewGap = edit ? 3 : clip ? 3 :60

   return <div className={`${(toggleShow.view === "entangled" && playToggle) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"} absolute z-[40] top-0 right-0 w-[calc(100vw-76px-20px)] h-full bg-none transition-all duration-1000`}>
      <div className="w-full h-full overflow-scroll hide_scrollbar">
      <div className="w-full h-fit bg-none py-2 px-4" >
   {
      allFakeData && <div className="flex items-end flex-col gap-2">
         {
            allFakeData.map((v,idx) => {
               return (
                  <FilterBox key={idx} type={v.type} toggleShow={toggleShow}>
                     {/* Leaflet error */}
                     {(Math.floor(currentTime) >= Math.floor(v.in - previewGap) && (currentTime) <= Math.floor(v.out ? v.out + previewGap : v.in + previewGap)) && <div className={`${"flex items-center justify-center gap-2"} min-w-[380px]`}>
                        <div className="bg-white text-xs flex px-2 py-1"><span>{formatTime(v.in)}</span> <span>{v.out && "~"}</span> <span>{v.out && formatTime(v.out)}</span></div>
                        <OverViewBox data={v} fakeData={getData} />
                     </div>}
                  </FilterBox>
               )
            })
         }
      </div>
   }
   </div>
   </div>
</div>
}

export const OverViewContainer = ({data, clip=false, onClickProgressBar, currentTime, videoRef,setCurrentTime, toggleShow, playToggle, fakeData, edit=false}) => {
   const contentRef = useRef(null)
   const scrolltRef = useRef(null)
   const progressRef = useRef(null)
   const [allFakeData, setAllFakeData] = useState(null)
   const [getData, setData] = useState(null)
   const onJumpTo = (inValue) => {
      if(edit){
         onClickProgressBar(inValue, edit)
      }else{
         if(!clip){
            videoRef.current.currentTime = inValue
            setCurrentTime(inValue)
         }else{
            videoRef.current.currentTime = data.in + inValue
            setCurrentTime(inValue)
         }
       
      }
      
   }


   
   useEffect(() => {
      if(contentRef && scrolltRef && progressRef){
         const contentDiv = contentRef.current;
         const scrollDiv = scrolltRef.current;
         const progressDiv = progressRef.current;

         if(contentDiv && scrollDiv && progressDiv){
            const scrollEvent = () => {
               const scrollPx = scrollDiv.scrollTop;
               const winHeightPx = scrollDiv.scrollHeight - scrollDiv.clientHeight;
               const scrolled = `${(scrollPx / winHeightPx) * 100}%`;
               progressDiv.style.height = scrolled
            }
            scrollDiv.addEventListener("scroll", scrollEvent)
            return () => {
               scrollDiv.removeEventListener("scroll", scrollEvent)
            }
         }
      }
     
   },[])

   useEffect(() => {
      if(!edit){
         setData(fakeData)
      }else{
         let allData = {
            categoryList: [],
            eventList : [],
            narrationList : [],
            placeList : [],
            refList : [],
            tagList: []
         };
         for(let i = 0; i < fakeData.length; i++){
            const fAnnotations = fakeData[i].annotations;
            for(let j =0; j < Object.keys(fAnnotations).length; j++){
             
               const getAnno = fAnnotations[Object.keys(fAnnotations)[j]]
               allData[Object.keys(fAnnotations)[j]] = [...getAnno,...allData[Object.keys(fAnnotations)[j]]]
             
               
            }
         }
         setData(allData)
      }
      if(!edit){
         let allData = []
         for(let i =0; i < Object.keys(fakeData).length; i++){
            allData = [...fakeData[Object.keys(fakeData)[i]],...allData]
         }
         allData = allData.sort((a,b) => a.in - b.in)

         setAllFakeData(allData)
      }else{
         let allData = []
         for(let i = 0; i < fakeData.length; i++){
            const fAnnotations = fakeData[i].annotations;
            for(let j =0; j < Object.keys(fAnnotations).length; j++){
             
               const getAnno = fAnnotations[Object.keys(fAnnotations)[j]]
               allData = [...getAnno,...allData]
               
            }
         }
         console.log(allData)
         allData = allData.sort((a,b) => a.in - b.in)
         setAllFakeData(allData)

      }
     
   },[])


 
 
   return <div className={`${(toggleShow.view === "overview" && playToggle) ? "translate-x-0" : "translate-x-full"} z-[40] flex absolute top-0 right-0 lg:w-[660px] h-full bg-white transition-all duration-1000`}>
      <div ref={scrolltRef} className="w-full h-full overflow-scroll hide_scrollbar">
         <div ref={contentRef} className="w-full h-fit bg-white py-2 px-4">
               {allFakeData && <div className="flex flex-col gap-4">
                  {
                     allFakeData.map((v, idx) => {
                        return <FilterBox key={idx} type={v.type} toggleShow={toggleShow}>
                           <div className="w-full h-fit flex gap-2 items-center">
                              <div className="">
                                 <div className={`w-2 h-2 ${(Math.floor(currentTime) >= Math.floor(v.in) && (currentTime) <= Math.floor(v.out ? v.out : v.in + 5)) ? "bg-emerald-400" : "bg-neutral-300"} rounded-full`}></div>
                              </div>
                              <OverViewBox data={v} fakeData={getData} />
                              <div onClick={() => onJumpTo(v.in)} className="text-xs flex flex-col cursor-pointer hover:bg-black justify-center items-center hover:text-white transition-all duration-150 rounded-md px-1 py-1"><span>{formatTime(v.in)}</span> <span>{v.out && "~"}</span> <span>{v.out && formatTime(v.out)}</span></div>
                           </div>
                         </FilterBox>
                        // return <div key={idx} className="w-full h-fit flex gap-2 items-center">
                        //       <div className="">
                        //          <div className={`w-2 h-2 ${(Math.floor(currentTime) >= Math.floor(v.in) && (currentTime) <= Math.floor(v.out ? v.out : v.in + 5)) ? "bg-emerald-400" : "bg-neutral-300"} rounded-full`}></div>
                        //       </div>
                        //       <OverViewBox  data={v} />
                        //       <div onClick={() => onJumpTo(v.in)} className="text-xs flex flex-col cursor-pointer hover:bg-black justify-center items-center hover:text-white transition-all duration-150 rounded-md px-1 py-1"><span>{formatTime(v.in)}</span> <span>{v.out && "~"}</span> <span>{v.out && formatTime(v.out)}</span></div>
                        //    </div>
                        
                     })
                  }
                  </div>}
         </div>
      </div>
      <div className="w-fit h-full bg-white py-2 flex">
         {/* progress bar */}
         <div className="w-1 h-full bg-neutral-100 rounded-full overflow-hidden mr-1">
            <div ref={progressRef} className="w-full h-0 bg-black rounded-full"></div>
         </div>
      </div>
   </div>
}

export const VideoPlayerContainer = ({data, clip=false}) => {
   const [toggleLegend, setToggleLegend] = useState(false)
   const videoRef = useRef(null)
   const [playToggle, setPlayToggle] = useState(false)
   const {data:annotationData, isLoading:annotationLoading} = getAllItemAnnotations({itemId:data.id})
   const [currentTime, setCurrentTime] = useState(0)
   const [getFakeData, setFakeData] = useState(null)
   const route = useRouter()
   const [toggleShow, setToggleShow] = useState({
      category: true,
      tag: true,
      reference: true,
      narration: true,
      data: true,
      event: true,
      place: true,
      view: "diagramatic",
     
   })
 
  
   
   const onToggleShow = (key, view=false) => {
      if(!view){
         setToggleShow((prev) => ({
            ...prev,
            [key]: !prev[key], 
          }));
      }else{
         setToggleShow((prev) => ({
            ...prev,
            ["view"]: key, 
          }));
      }
      
    };
   const onToggleLegend = (value) => {
      if(value){
         window.scrollTo(0, 0)
         document.body.style.overflow = "hidden"
      }else{
         document.body.style.overflow = "auto"
      }
      setToggleLegend(value)
   }

   const togglePlay = () => {
      if(videoRef){
         if(videoRef.current.paused){
            videoRef.current.play()
            setPlayToggle(true)
         }else{
            videoRef.current.pause()
            setPlayToggle(false)
         }
         
      }
   }
   const onClickProgressBar = (e) => {

      if(videoRef){
         if(!clip){
            videoRef.current.currentTime = parseFloat(e.target.value)
            setCurrentTime(e.target.value)
         }else{
            console.log(parseFloat(e.target.value) + data.in)
            videoRef.current.currentTime = parseFloat(e.target.value) + data.in
            setCurrentTime(e.target.value)
         }
      }
         
     
      
   }

   useEffect(() => {
      if(clip){
         if(videoRef){
            videoRef.current.currentTime = data.in
         }
      }
   },[])

   useEffect(() => {
      const fakeData = createFakeAnnotations({duration:data.duration, editVersion: clip})
    
      setFakeData(fakeData)
   },[])

   // video keyboard controller
   useEffect(() => {
      const onSpaceScroll = (event) => {
      
         if (event.code === 'Space') {
            event.preventDefault(); 
          }
         if (event.code === 'ArrowDown') {
            event.preventDefault(); 
          }
         if (event.code === 'ArrowLeft') {
            event.preventDefault(); 
          }
        
      }
      const onKeyController = (event) => {
         event.preventDefault(); 
         if (event.code === 'Space') {
            if(videoRef){
               if(videoRef.current.paused){
                  
                  videoRef.current.play()
                  setPlayToggle(true)
               }else{
                  videoRef.current.pause()
                  setPlayToggle(false)
               }
            }
          }
      
         // diagramatic
         if(event.which === 81){
            onToggleShow("diagramatic", true)
         }
         // entangled
         if(event.which === 87){
            onToggleShow("entangled", true)
         }
         // overview
         if(event.which === 69){
            onToggleShow("overview", true)
         }
         // show : categories
         if(event.which === 49){
            onToggleShow("category")
         }
         // show : tag
         if(event.which === 50){
            onToggleShow("tag")
         }
         // show : reference
         if(event.which === 51){
            onToggleShow("reference")
         }
         // show : narration
         if(event.which === 52){
            onToggleShow("narration")
         }
         // show : data
         if(event.which === 53){
            onToggleShow("data")
         }
         // show : event
         if(event.which === 54){
            onToggleShow("event")
         }
         // show: place
         if(event.which === 55){
            onToggleShow("place")
         }
         // // +10s
         // if(event.key === "ArrowRight"){
         //    event.preventDefault()
         //    if (videoRef.current) {
         //       // 비디오가 있을 때만 실행
         //       videoRef.current.currentTime = Math.min(
         //          videoRef.current.currentTime + 20,
         //          videoRef.current.duration
         //      );
           
         //       setCurrentTime(videoRef.current.currentTime);
         //   }
            
         // }
        
      }

      // event = keyup & keydown
      document.addEventListener('keyup',onKeyController)
      document.addEventListener('keydown',onSpaceScroll)

      return () => {
         document.removeEventListener("keyup", onKeyController)
         document.removeEventListener("keydown", onSpaceScroll)
      }
   },[])

   // update video progress bar
   useEffect(() => {
      const videoElement = videoRef.current
      if (playToggle && videoElement) {
         const handleTimeUpdate = () => {
            if(!clip){
               const newCurrentTime = videoElement?.currentTime
               // 
               setCurrentTime(newCurrentTime)
               if(videoElement.ended){
                  // video ended
                  // - update play icon
                  // - update progress bar
                  
                  setPlayToggle(false)
                  setCurrentTime(0)
               }
            }
            if(clip){
               const newCurrentTime = videoElement?.currentTime
               // console.log(currentTime - data.in)
               setCurrentTime(newCurrentTime - data.in)
               // end
               if(Math.round(newCurrentTime) > data.out){
                  videoElement.pause()
                  videoElement.currentTime = data.in
                  setCurrentTime(0)
                  setPlayToggle(false)
               }
            }
            
           
         };
         videoElement.ontimeupdate = handleTimeUpdate
      
         return () => {
            videoElement.ontimeupdate = null
         };
      }
   },[playToggle])
   return <div className="w-full h-[100svh] relative">
       <div className="w-full h-[100svh] overflow-hidden flex flex-col">
        <div className="w-full h-full flex flex-col overflow-hidden relative">
            <video ref={videoRef} src={`${BASE_URL}/${data.id}/480p1.mp4`} className={`${(toggleShow.view === "overview" && playToggle) ? "w-[calc(100vw-660px)]" : "w-full"} h-full bg-black transition-all duration-1000`} controls={false} aria-label="video player" preload="auto">
              <source type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* video info */}
            <div className={`absolute top-0 left-0 z-[40] overflow-hidden w-full h-fit flex flex-col gap-4`}>
               <div onClick={togglePlay} className={`${playToggle ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-full pointer-events-none"} cursor-pointer w-[76px] absolute top-0 left-0 flex justify-center items-center aspect-square text-black bg-[#8BA5F8] transition-all duration-1000`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
               </div>
               {clip && <div className={`${!playToggle ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"} w-fit text-black px-2 py-1 bg-[#9E21E8] text-4xl font-bold italic transition-all duration-1000`}>Clip</div>}
               <div className={`${!playToggle ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"} w-full lg:w-2/3 text-black px-2 py-1 bg-[#8BA5F8] text-4xl font-bold italic transition-all duration-1000`}>{data.title}</div>
               <div className={`text-black bg-white w-fit px-2 py-1 ${!playToggle ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"} transition-all duration-1000`}>
                  <div>Author: {Boolean(data.director) && Boolean(data.director.length > 0) && data.director.map((v) => `${v},`)} {data.user}</div>
                  <div>
                     <div>Created:</div>
                     <div>{data.created}</div>
                  </div>
                  <div>
                     <div>Modified:</div>
                     <div>{data.modified}</div>
                  </div>
               </div>
               {clip && <div onClick={() => route.push(`/video/${data.id}`)} className={`text-black bg-white w-fit px-2 py-2 cursor-pointer ${!playToggle ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"} transition-all duration-1000`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 19.5-15-15m0 0v11.25m0-11.25h11.25" />
                  </svg>
               </div>}
               
            </div>
            {/* Video Data Visualization : Diagramatic View */}
            {(videoRef && getFakeData) && <VideoDataVisContainer data={data} clip={clip} fakeData={getFakeData} toggleShow={toggleShow} setCurrentTime={setCurrentTime} videoRef={videoRef} playToggle={playToggle} duration={data.duration} annotationData={annotationData} annotationLoading={annotationLoading} />}
            {/* Video Data Visualization : Entangled View */}
            {(videoRef && getFakeData) && <EntangledContainer clip={clip} toggleShow={toggleShow} playToggle={playToggle} currentTime={currentTime} fakeData={getFakeData} />}
            {/* Video Data Visualization : Overview View */}
            {(videoRef && getFakeData) && <OverViewContainer data={data} clip={clip} currentTime={currentTime} videoRef={videoRef} setCurrentTime={setCurrentTime} toggleShow={toggleShow} playToggle={playToggle} fakeData={getFakeData} />}
        </div>
        {/* video controller */}
        {videoRef && <div className="w-full h-[40px] bg-black border-t-[0.5px] border-neutral-500 text-white flex justify-between items-center">
            <div onClick={togglePlay} className="cursor-pointer px-2">
               {!playToggle && <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                  </svg>
               </div>}
               {playToggle && <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                  </svg>
               </div>}
            </div>
            <div className="w-full px-2">
               <div className="w-full h-1 rounded-full relative">
                  <input  onChange={(e) => onClickProgressBar(e)} step={clip? 0.01 :0.1} min={0} max={data.duration} defaultValue={0} type="range" className="w-full bg-red-400 range-custom" />
                  <progress value={currentTime} max={data.duration} className="absolute bg-red-400 w-full h-full select-none pointer-events-none"></progress>
               </div>
            </div>
            <div className="w-[140px] text-center text-xs">{formatTime(currentTime)} / {formatTime(data.duration)}</div>
     
        </div>}
        {/* video navigation */}
        <VideoNavigation onToggleShow={onToggleShow} toggleShow={toggleShow} onToggleLegend={onToggleLegend} />
      </div>
      
      {/* video Legend */}
       {toggleLegend && <LegendContainer onToggleLegend={onToggleLegend} />}
   </div>
}

export const EditVideoPlayerContainer = ({data, metaData}) => {
   const videoRef = useRef(null)
   const [playToggle, setPlayToggle] = useState(false)
   const [playToggleReal, setPlayToggleReal] = useState(false)
   const [toggleLegend, setToggleLegend] = useState(false)
   const [currentTime, setCurrentTime] = useState(0)
   const [currentVideo, setCurrentVideo] = useState(null)
   const [currentIndex, setCurrentIndex] = useState(null)
   const {data:annotationData, isLoading:annotationLoading} = getAllItemAnnotations({itemId:data.id})
   const [toggleShow, setToggleShow] = useState({
      category: true,
      tag: true,
      reference: true,
      narration: true,
      data: true,
      event: true,
      place: true,
      view: "diagramatic",
     
   })
   const findCurrentVideo = (currentTime) => {
      console.log("currentTime:", currentTime)
      let getCurrentVideo;

      for(let i =0; i < data.length; i++){
         if(data[i].newIn <= currentTime && data[i].newOut >= currentTime){
            getCurrentVideo = data[i]
            setCurrentIndex(i)
            console.log(i)
            break;
         }
      }
      console.log(getCurrentVideo)
      if(getCurrentVideo){
         // videoRef.current.src = `${BASE_URL}/${getCurrentVideo.id}/480p1.mp4`
         videoRef.current.currentTime = getCurrentVideo.in
         
         setCurrentVideo(getCurrentVideo)
   
         return getCurrentVideo
      }
    
   }
   useEffect(() => {
      findCurrentVideo(currentTime)
   },[])

   // update video progress bar

      useEffect(() => {
         const videoElement = videoRef.current;
         let isUpdating = false; // 중복 방지 플래그 추가
   
         if (playToggle && videoElement) {
            const handleTimeUpdate = (e) => {
               if (isUpdating) return; // 이미 업데이트 중이라면 실행하지 않음
   
               const getCurrentTime = videoElement?.currentTime;
   
               if (Math.round(getCurrentTime) > currentVideo.out) {
                  // 중복 실행 방지를 위해 플래그 설정
                  isUpdating = true;
                  
                  // 다음 비디오로 전환
                  videoElement.pause();
                  setPlayToggle(false);
                  console.log("next");
                  console.log(currentIndex + 1);
   
                  const getNextVideo = data[currentIndex + 1];
                  if (data[currentIndex + 1]) {
                     setCurrentIndex((prev) => prev + 1);
                     videoRef.current.currentTime = getNextVideo.in;
                     setCurrentVideo(getNextVideo);
                     setCurrentTime(getNextVideo.newIn);

                  // 0.5초 후 플래그 해제
                  if(playToggleReal){
                     setTimeout(() => {
                        isUpdating = false;
                        videoElement.play();
                        setPlayToggle(true);
                     }, 500);
                  }
                     
                  }else {
                     setPlayToggleReal(false)
                     const fristVideo = data[0];
                     setCurrentIndex(0);
                     
                     setCurrentVideo(fristVideo);
                     setCurrentTime(fristVideo.newIn);

                     // 0.5초 후 플래그 해제
                     setTimeout(() => {
                        isUpdating = false;
                        videoRef.current.currentTime = fristVideo.in;
                        // videoElement.play();
                        // setPlayToggle(true);
                     }, 500);
                  }
   
   
               } else {
                  // Update the video current time
                  setCurrentTime(currentVideo.newIn + (getCurrentTime - currentVideo.in));
                  // currentTimeR.current = currentVideo.newIn + (getCurrentTime - currentVideo.in);
               }
            };
   
            videoElement.ontimeupdate = handleTimeUpdate;
   
            return () => {
               videoElement.ontimeupdate = null;
            };
         }
      }, [playToggle]);
   
 
      const onClickProgressBar = (e, edit) => {
         if (videoRef.current) {
            // 클릭한 위치의 진행 시간 계산
            const targetTime = parseFloat(edit ? e : e.target.value);
            const getVideo = findCurrentVideo(targetTime);
         
      
            if (getVideo) {
               // Pause the video
               if(playToggleReal){
                  videoRef.current.pause();
                  setPlayToggle(false);
                  
                  // Set currentTime based on the progress bar position
                  const newCurrentTime = getVideo.in + (targetTime - getVideo.newIn);
                  videoRef.current.currentTime = newCurrentTime;
                  
                  // Update the state
                  setCurrentTime(targetTime);
                  // currentTimeR.current = targetTime;
                  
                  // Play the video
                  setTimeout(() => {
                     videoRef.current.play();
                     setPlayToggle(true);
                  }, 100); // Resume playback after a short delay
               }else{
                  videoRef.current.pause();
                  setPlayToggle(false);
                  
      
                  // Set currentTime based on the progress bar position
                  const newCurrentTime = getVideo.in + (targetTime - getVideo.newIn);
                  videoRef.current.currentTime = newCurrentTime;
                  
                  // Update the state
                  setCurrentTime(targetTime);
                  // currentTimeR.current = targetTime;
                  
                  // 비디오 재생
                  setTimeout(() => {
                     // videoRef.current.play();
                     // setPlayToggle(true);
                   
                  }, 100); // Resume playback after a short delay
               }
               
            }
         }
      };
   const togglePlay = () => {
      if(videoRef){
         if(videoRef.current.paused){
            videoRef.current.play()
            setPlayToggle(true)
         }else{
            videoRef.current.pause()
            setPlayToggle(false)
         }
         
      }
   }
   const onToggleLegend = (value) => {
      if(value){
         window.scrollTo(0, 0)
         document.body.style.overflow = "hidden"
      }else{
         document.body.style.overflow = "auto"
      }
      setToggleLegend(value)
   }
 
   const onToggleShow = (key, view=false) => {
      if(!view){
         setToggleShow((prev) => ({
            ...prev,
            [key]: !prev[key], 
          }));
      }else{
         setToggleShow((prev) => ({
            ...prev,
            ["view"]: key, 
          }));
      }
      
    };

     // video keyboard controller
   useEffect(() => {
      const onSpaceScroll = (event) => {
         if (event.code === 'Space') {
            event.preventDefault(); 
          }
        
      }
      const onKeyController = (event) => {
         event.preventDefault(); 
         if (event.code === 'Space') {
            if(videoRef){
               if(videoRef.current.paused){
                  
                  videoRef.current.play()
                  setPlayToggle(true)
                  setPlayToggleReal(true)
               }else{
                  videoRef.current.pause()
                  setPlayToggle(false)
                  setPlayToggleReal(false)
               }
            }
          }
      
         // diagramatic
         if(event.which === 81){
            onToggleShow("diagramatic", true)
         }
         // entangled
         if(event.which === 87){
            onToggleShow("entangled", true)
         }
         // overview
         if(event.which === 69){
            onToggleShow("overview", true)
         }
         // show : categories
         if(event.which === 49){
            onToggleShow("category")
         }
         // show : tag
         if(event.which === 50){
            onToggleShow("tag")
         }
         // show : reference
         if(event.which === 51){
            onToggleShow("reference")
         }
         // show : narration
         if(event.which === 52){
            onToggleShow("narration")
         }
         // show : data
         if(event.which === 53){
            onToggleShow("data")
         }
         // show : event
         if(event.which === 54){
            onToggleShow("event")
         }
         // show: place
         if(event.which === 55){
            onToggleShow("place")
         }
        
      }

      // event = keyup & keydown
      document.addEventListener('keyup',onKeyController)
      document.addEventListener('keydown',onSpaceScroll)

      return () => {
         document.removeEventListener("keyup", onKeyController)
         document.removeEventListener("keydown", onSpaceScroll)
      }
   },[])
   return (<div className="w-full h-[100svh] relative">
      <div className="w-full h-[100svh] overflow-hidden flex flex-col">
         {/* Video Container */}
         <div className="w-full h-full flex flex-col overflow-hidden relative">
            {/* Video */}
            {<video ref={videoRef} src={`${BASE_URL}/${currentVideo && currentVideo.id}/480p1.mp4`} className={`${(toggleShow.view === "overview" && (playToggleReal)) ? "w-[calc(100vw-660px)]" : "w-full"} h-full bg-black transition-all duration-1000`} controls={false} aria-label="video player" preload="auto">
              <source type="video/mp4" />
              Your browser does not support the video tag.
            </video>}
            {/* Video Info */}
            {
               <div className={`absolute z-[40] top-0 left-0 w-full h-full ${!playToggleReal ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"} transition-all duration-1000 flex flex-col`}>
                  <div className="w-full lg:w-2/3 text-black px-2 py-1 bg-[#8BA5F8] text-4xl font-bold italic">{metaData.title}</div>
                  <div className="bg-white text-black w-fit px-2 py-1 mt-4">
                     <div>Author: {Boolean(metaData.director) && Boolean(metaData.director.length > 0) && metaData.director.map((v) => `${v},`)} {metaData.user}</div>
                        <div className="flex items-center gap-2">
                           <div>Created:</div>
                           <div>{metaData.created}</div>
                        </div>
                        <div className="flex items-center gap-2">
                           <div>Modified:</div>
                           <div>{metaData.modified}</div>
                        </div>
                     </div>
               </div>
               }
            <div className={`absolute top-0 left-0 z-[20] overflow-hidden w-full h-full bg-white flex pointer-events-none ${playToggleReal ? "opacity-0" : "opacity-100"} transition-all duration-1000`}>
               {
                  data.map((v, idx) => {
                     return <div 
                     key={idx} 
                     style={{
                        backgroundImage: `url(${BASE_URL}/${data[idx].id}/480p${data[idx].in}.jpg)`
                     }}
                     className="w-full h-full bg-red-400 bg-cover bg-center bg-no-repeat"></div>
                  })
               }
            </div>
            {/* Video Data Visualization */}
            {/* - Diagramatic View */}
            {(videoRef && data) && <VideoDataVisContainer onClickProgressBar={onClickProgressBar} edit={true} fakeData={data} toggleShow={toggleShow} setCurrentTime={setCurrentTime} videoRef={videoRef} playToggle={playToggleReal} duration={data.totalDuration} annotationData={annotationData} annotationLoading={annotationLoading} />}
            {/* - Entangled View */}
            {(videoRef && data) && <EntangledContainer edit={true} toggleShow={toggleShow} playToggle={playToggleReal} currentTime={currentTime} fakeData={data} />}
            {/* - Overview View */}
            {(videoRef && data) && <OverViewContainer onClickProgressBar={onClickProgressBar} currentTime={currentTime} videoRef={videoRef} setCurrentTime={setCurrentTime} toggleShow={toggleShow} playToggle={playToggleReal} fakeData={data} edit={true} />}
         </div>
         {/* video controller */}
         {(videoRef && currentVideo) && <div className="w-full h-[40px] bg-black border-t-[0.5px] border-neutral-500 text-white flex justify-between items-center">
            <div onClick={togglePlay} className="cursor-pointer px-2">
               {!playToggle && <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                  </svg>
               </div>}
               {playToggle && <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                  </svg>
               </div>}
            </div>
            <div className="w-full px-2">
               <div className="w-full h-1 rounded-full relative">
                  <input  onChange={(e) => onClickProgressBar(e)} step={0.1} min={0} max={data.totalDuration} defaultValue={0} type="range" className="w-full bg-red-400 range-custom" />
                  <progress value={currentTime} max={data.totalDuration} className="absolute bg-red-400 w-full h-full select-none pointer-events-none"></progress>
               </div>
            </div>
            <div className="w-[140px] text-center text-xs">{formatTime(currentTime)} / {formatTime(data.totalDuration)}</div>
         </div>}
         {/* video navigation */}
         <VideoNavigation onToggleShow={onToggleShow} toggleShow={toggleShow} onToggleLegend={onToggleLegend} />
      </div>
     
       {/* video Legend */}
       {toggleLegend && <LegendContainer onToggleLegend={onToggleLegend} />}
   </div>

   )
}
 


export const ForestPlayerContainer = ({data, metaData}) => {
   const videoRef = useRef(null)
   const [playToggle, setPlayToggle] = useState(false)
   const [currentTime, setCurrentTime] = useState(0)
   const [currentIndex, setCurrentIndex] = useState(0)

   const findCurrentVideo = (data) => {
     const getCurrentVideoIndex = data.findIndex((v) => {
         if(v.newIn <= currentTime && v.newOut >= currentTime){
            return v;
         }
     });
     if(videoRef){
      setCurrentIndex(getCurrentVideoIndex)
      videoRef.current.currentTime = data[getCurrentVideoIndex].in
     }
    

   }
   useEffect(() => {
      findCurrentVideo(data)
   },[])

   // change Current Time and Next Video
   useEffect(() => {
      const videoElement = videoRef.current;
      let isUpdating = false; // 중복 방지 플래그 추가

      if (playToggle && videoElement) {
         const handleTimeUpdate = (e) => {
            if (isUpdating) return; // 이미 업데이트 중이라면 실행하지 않음

            const getCurrentTime = videoElement?.currentTime;

            if (Math.round(getCurrentTime) > data[currentIndex].out) {
               // 중복 실행 방지를 위해 플래그 설정
               isUpdating = true;
               
               // 다음 비디오로 전환
               videoElement.pause();
               setPlayToggle(false);
               
               console.log("next");

               const getNextVideo = data[currentIndex + 1];
               if (data[currentIndex + 1]) {
                  setCurrentIndex((prev) => prev + 1);
                  videoRef.current.currentTime = getNextVideo.in;
                  setCurrentTime(getNextVideo.newIn);

               // 0.5초 후 플래그 해제
               if(playToggle){
                  setTimeout(() => {
                     isUpdating = false;
                     videoElement.play();
                     setPlayToggle(true);
                  }, 500);
               }
                  
               }else {
         
                  const fristVideo = data[0];
                  setCurrentIndex(0);
                  setCurrentTime(fristVideo.newIn);

                  // 0.5초 후 플래그 해제
                  setTimeout(() => {
                     isUpdating = false;
                     videoRef.current.currentTime = fristVideo.in;
                     videoElement.pause();
                     setPlayToggle(false);
                  
                  }, 500);
               }


            } else {
               // Update the video current time
            
               setCurrentTime(data[currentIndex].newIn + (getCurrentTime - data[currentIndex].in));
               // currentTimeR.current = currentVideo.newIn + (getCurrentTime - currentVideo.in);
            }
         };

         videoElement.ontimeupdate = handleTimeUpdate;

         return () => {
            videoElement.ontimeupdate = null;
         };

      }
   },[playToggle])
  
    // video keyboard controller
    useEffect(() => {
      const onSpaceScroll = (event) => {
         if (event.code === 'Space') {
            event.preventDefault(); 
          }
        
      }
      const onKeyController = (event) => {
         event.preventDefault(); 
         if (event.code === 'Space') {
            if(videoRef){
               if(videoRef.current.paused){
                  
                  videoRef.current.play()
                  setPlayToggle(true)
           
               }else{
                  videoRef.current.pause()
                  setPlayToggle(false)
      
               }
            }
          }
      
     
      }

      // event = keyup & keydown
      document.addEventListener('keyup',onKeyController)
      document.addEventListener('keydown',onSpaceScroll)

      return () => {
         document.removeEventListener("keyup", onKeyController)
         document.removeEventListener("keydown", onSpaceScroll)
      }
   },[])

   
   return (<div className="w-full h-[calc(100svh-66px)] relative">
      <div className="w-full h-[calc(100svh-66px)] overflow-hidden flex flex-col">
         {/* Video Container */}
         <div className="w-full h-full flex flex-col overflow-hidden relative">
            {/* Video */}
            <div>{currentTime}</div>
            {<video ref={videoRef} src={`${BASE_URL}/${data[currentIndex].videoId}/480p1.mp4`} className={`w-full h-full bg-black transition-all duration-1000`} controls={true} aria-label="video player" preload="auto">
              <source type="video/mp4" />
              Your browser does not support the video tag.
            </video>}
            {/* Video Info */}
          
           
         
         </div>
         {/* video controller */}
        
         {/* video navigation */}
      
      </div>
     
       {/* video Legend */}
       
   </div>

   )
}
 
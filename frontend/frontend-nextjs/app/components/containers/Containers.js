import { BASE_URL } from "@/app/utils/constant/etc"
import { getAllAnnotations, getAllItemAnnotations } from "@/app/utils/hooks/pandora_api"
import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { formatTime } from "@/app/utils/hooks/etc"
import gsap from "gsap"
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

// 🔥create fake data
const createFakeAnnotations = ({duration}) => {
   const categoryCounts = Math.floor(Math.random() * 30)
   const tagCounts = Math.floor(Math.random() * 10)
   const refCounts = Math.floor(Math.random() * 10)
   const narrationCounts = Math.floor(Math.random() * 10)
   const eventsCounts = Math.floor(Math.random() * 10)
   const placeCounts = Math.floor(Math.random() * 10)


   // create Category
   let categoryList = [];
   const CATEGORYSVALUE = [
      {
         slug: "identity",
         value: "Identity",
         color: "#9E21E8"
      },
      {
         slug: "knowledge",
         value: "Knowledge",
         color: "#8BA5F8"
      },
      {
         slug: "artistic_reflections",
         value: "Artistic Reflections",
         color: "#691220"
      },
      {
         slug: "restitution",
         value: "Restitution",
         color: "#EC6735"
      },
      {
         slug: "memory",
         value: "Memory and The Imaginary",
         color: "#F1A73D"
      },
      
   ]
   for(let i = 0; i < categoryCounts; i++){
      const randomIn = Math.floor(Math.random() * duration)
      const outValue = 300
      const randomOut = randomIn + Math.floor(Math.random() * outValue) >= duration ? duration : randomIn + Math.floor(Math.random() * outValue)
      const cate = {
         type: "categoryLayer",
         category: CATEGORYSVALUE[Math.floor(Math.random() * CATEGORYSVALUE.length)],
         in: randomIn,
         out: randomOut
      };
      categoryList.push(cate)
   }
   // create tags
   let tagList = [];
   for(let i = 0; i < tagCounts; i++){
      const randomIn = Math.floor(Math.random() * duration)
      const outValue = 30
      const randomOut = randomIn + outValue > duration ? duration : randomIn + outValue
      const tag = {
         type: "tagLayer",
         in: randomIn,
         out: randomOut,
         value: Array.from({length: Math.floor(Math.random() * 5) + 1}).map((v) => `tag${Math.floor(Math.random() * 10)}`)
      };
      tagList.push(tag)
   }
   // create ref
   let refList = [];
   for(let i = 0; i < refCounts; i++){
      const randomIn = Math.floor(Math.random() * duration)
      const ref = {
         type: "referenceLayer",
         in: randomIn,
     
      };
      refList.push(ref)
   }
   // create narration
   let narrationList = [];
   for(let i = 0; i < narrationCounts; i++){
      const randomIn = Math.floor(Math.random() * duration)
      const narration = {
         type: "narrationLayer",
         in: randomIn,
     
      };
      narrationList.push(narration)
   }
   // create events
   let eventList = [];
   for(let i = 0; i < eventsCounts; i++){
      const randomIn = Math.floor(Math.random() * duration)
      const event = {
         type: "eventLayer",
         in: randomIn,
     
      };
      eventList.push(event)
   }
   // create place
   let placeList = [];
   for(let i = 0; i < placeCounts; i++){
      const randomIn = Math.floor(Math.random() * duration)
      const place = {
         type: "placeLayer",
         in: randomIn,
     
      };
      placeList.push(place)
   }

   const result = {
      categoryList: categoryList,
      tagList: tagList,
      refList: refList,
      narrationList: narrationList,
      eventList: eventList,
      placeList: placeList
   }
   return result
}

const VideoDataVisContainer = ({playToggle, fakeData, toggleShow, setCurrentTime, duration, annotationData, annotationLoading, videoRef}) => {
   const [getData, setData] = useState(null)
   const wrapperRef = useRef(null)
   const svgRef = useRef(null)
   const infoRef = useRef(null)
   const [hoverData, setHoverData] = useState(null)
   // the data of annotations of this video
   useEffect(() => {
      if(!annotationLoading){
         // setData(annotationData.data.items)

         const getDuration = duration
      
         // 🔥 create fake data just for test 🔥
         // fake data
         let getFakeData = fakeData
         setData(getFakeData)
         console.log(fakeData)
       
      }
   },[annotationData])

   useEffect(() => {
      const category = d3.select("#cateGroup")
      const tag = d3.select("#tagGroup")
      const ref = d3.select("#refGroup")
      const narration = d3.select("#narrationGroup")
      const event = d3.select("#eventGroup")
      const place = d3.select("#placeGroup")
      
      console.log(toggleShow.view)
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
       
         svg.style("display", "none")
      }

       
   },[toggleShow])
   // Annotation Visualization using D3.js
   useEffect(() => {
      if(svgRef){
         const infoBoxTopMargin = 20;
         if(getData){
            const onMouseEnter = (e,d) => {
               document.body.style.cursor = "pointer"
               const mousePos = d3.pointer(e);
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
            const onMouseMove = (e,d) => {
               const mousePos = d3.pointer(e);
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
            const onMouseLeave = () => {
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
            }
            const onClick = ({inVlaue, video}) => {
               console.log(inVlaue)
               console.log(video)
               videoRef.current.currentTime = inVlaue
               setCurrentTime(inVlaue)
            }
            
            const svg = d3.select(svgRef.current)
            svg
            .style("width", "100%")
            .style("height", "100%")
            .style("background", "none")

            const canvasSize = {
               width: svg.node().clientWidth,
               height: svg.node().clientHeight,
            }

            let scaleLinear = d3.scaleLinear([0, duration], [0, canvasSize.width]);
            const annotationRowHeight = canvasSize.height/4
            // create category box
            svg
            .append("g")
            .attr("id", "cateGroup")
            .selectAll("rect")
            .data(fakeData.categoryList.sort((a,b) => a.in - b.in))
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
            svg
            .append("g")
            .attr("id", "tagGroup")
            .selectAll("rect")
            .data(fakeData.tagList)
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
            svg
            .append("g")
            .attr("id", "refGroup")
            .selectAll("circle")
            .data(fakeData.refList)
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
            svg
            .append("g")
            .attr("id", "narrationGroup")
            .selectAll("circle")
            .data(fakeData.narrationList)
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
            svg
            .append("g")
            .attr("id", "eventGroup")
            .selectAll("rect")
            .data(fakeData.eventList)
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
            svg
            .append("g")
            .attr("id", "placeGroup")
            .selectAll("circle")
            .data(fakeData.placeList)
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


   if(annotationLoading || !Boolean(getData)){
      return;
   }
   return <div ref={wrapperRef} className="absolute top-0 left-0 w-full h-full bg-none">
         <div ref={infoRef} className="absolute opacity-0 pointer-events-none select-none p-4 border-[#EC6735] border-2 rounded-lg top-0 right-0 z-[30] bg-white text-black border- w-[400px] h-[350px] shadow-md shadow-[#EC6735]">
            {
               hoverData && <div>
                  <OverViewBox data={hoverData} />
               </div>
            }
         </div>
         <div className={`${(toggleShow.view === "diagramatic" && playToggle) ? "opacity-100 translate-y-0" :"opacity-0 translate-y-full" } absolute bottom-0 left-0 z-[20] w-full h-1/3 lg:h-1/3 transition-all duration-1000`}>
            <svg ref={svgRef}>

            </svg>
         </div>
   </div>
}

export const OverViewBox = ({data}) => {
   const CategoryBox = ({category}) => {
      return <div style={{backgroundColor: category.category.color}} className="w-full text-4xl text-white italic px-2 py-1">{category.category.value}</div>
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
   const PlaceBox = ({place}) => {
      return <div className="w-full min-h-72 h-full flex flex-col px-2 py-2 bg-[#3118E8] border-[#EC6735] border-4 text-white">
         <div>{place.type}</div>
         <div className="w-full h-full flex-1 border-white border flex justify-center items-center">Map</div>
      </div>
   }
   const EventBox = ({event}) => {
      return <div className="w-full min-h-72 h-full flex flex-col px-2 py-2 bg-[#3118E8] border-[#F1A73D] border-4 text-white">
         <div>{event.type}</div>
         <div className="w-full h-full flex-1 border-white border flex justify-center items-center">Event</div>
      </div>
   }

   const NarrationBox = ({narration}) => {
      return <div className="w-full min-h-72 h-full flex px-2 py-2 bg-white gap-4 border-[#8BA5F8] border-4 text-black">
         <div><div className="w-10 aspect-square rounded-full bg-[#8BA5F8]"></div></div>
         <div>{narration.type}</div>
      </div>
   }
   const ReferenceBox = ({reference}) => {
      return <div className="w-full min-h-72 h-full flex px-2 py-2 bg-white gap-4 border-[#EC6735] border-4 text-black">
         <div><div className="w-10 aspect-square rounded-full border-[#EC6735] border-4 bg-white"></div></div>
         <div>{reference.type}</div>
      </div>
   }

   switch (data.type) {
      case "categoryLayer":
         return <CategoryBox category={data} />
      case "placeLayer":
         return <PlaceBox place={data} />
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

export const EntangledContainer = ({toggleShow, playToggle, currentTime, fakeData}) => {
   const [allFakeData, setAllFakeData] = useState(null)
   useEffect(() => {
      console.log(fakeData)
      let allData = []
      for(let i =0; i < Object.keys(fakeData).length; i++){
         allData = [...fakeData[Object.keys(fakeData)[i]],...allData]
      }
      allData = allData.sort((a,b) => a.in - b.in)
      console.log(allData)
      setAllFakeData(allData)
     
   },[])

   const previewGap = 60

   return <div className={`${(toggleShow.view === "entangled" && playToggle) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"} absolute z-[40] top-0 right-0 w-[calc(100vw-76px-20px)] h-full bg-none transition-all duration-1000`}>
      <div className="w-full h-full overflow-scroll hide_scrollbar">
      <div className="w-full h-fit bg-none py-2 px-4" >
   {
      allFakeData && <div className="flex items-end flex-col gap-2">
         {
            allFakeData.map((v,idx) => {
               return (
                  <FilterBox key={idx} type={v.type} toggleShow={toggleShow}>
                  <div key={idx} className={` ${(Math.floor(currentTime) >= Math.floor(v.in - previewGap) && (currentTime) <= Math.floor(v.out ? v.out + previewGap : v.in + previewGap)) ? "flex items-center justify-center gap-2" : "hidden"} min-w-[380px]`}>
                     <div className="bg-white text-xs flex px-2 py-1"><span>{formatTime(v.in)}</span> <span>{v.out && "~"}</span> <span>{v.out && formatTime(v.out)}</span></div>
                     <OverViewBox data={v} />
                  </div>
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

export const OverViewContainer = ({currentTime, videoRef,setCurrentTime, toggleShow, playToggle, fakeData}) => {
   const contentRef = useRef(null)
   const scrolltRef = useRef(null)
   const progressRef = useRef(null)
   const [allFakeData, setAllFakeData] = useState(null)

   const onJumpTo = (inValue) => {
      videoRef.current.currentTime = inValue
      setCurrentTime(inValue)
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
      console.log(fakeData)
      let allData = []
      for(let i =0; i < Object.keys(fakeData).length; i++){
         allData = [...fakeData[Object.keys(fakeData)[i]],...allData]
      }
      allData = allData.sort((a,b) => a.in - b.in)
      console.log(allData)
      setAllFakeData(allData)
     
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
                              <OverViewBox data={v} />
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

export const VideoPlayerContainer = ({data}) => {
   const [toggleLegend, setToggleLegend] = useState(false)
   const videoRef = useRef(null)
   const [playToggle, setPlayToggle] = useState(false)
   const {data:annotationData, isLoading:annotationLoading} = getAllItemAnnotations({itemId:data.id})
   const [currentTime, setCurrentTime] = useState(0)
   const [getFakeData, setFakeData] = useState(null)
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
   
   useEffect(() => {
      const fakeData = createFakeAnnotations({duration:data.duration})
      setFakeData(fakeData)
   },[])
  
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
 
   useEffect(() => {
      console.log(data)   
  
   },[])

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
               console.log(videoRef.current.paused)
            }
          }
          console.log(event.code)
         // diagramatic
         if(event.code === "KeyZ"){
            onToggleShow("diagramatic", true)
         }
         // entangled
         if(event.code === "KeyX"){
            onToggleShow("entangled", true)
         }
         // overview
         if(event.code === "KeyC"){
            onToggleShow("overview", true)
         }

         // show : categories
         if(event.code === "Digit1"){
            onToggleShow("category")
         }
         // show : tag
         if(event.code === "Digit2"){
            onToggleShow("tag")
         }
         // show : reference
         if(event.code === "Digit3"){
            onToggleShow("reference")
         }
         // show : narration
         if(event.code === "Digit4"){
            onToggleShow("narration")
         }
         // show : data
         if(event.code === "Digit5"){
            onToggleShow("data")
         }
         // show : event
         if(event.code === "Digit6"){
            onToggleShow("event")
         }
         // show: place
         if(event.code === "Digit7"){
            onToggleShow("place")
         }
        
      }

      // event = keyup or keydown
   document.addEventListener('keyup',onKeyController)
   document.addEventListener('keydown',onSpaceScroll)

   return () => {
      document.removeEventListener("keyup", onKeyController)
      document.removeEventListener("keydown", onSpaceScroll)
   }
   },[])

   const togglePlay = () => {
      if(videoRef){
         if(videoRef.current.paused){
            
            videoRef.current.play()
            setPlayToggle(true)
         }else{
            videoRef.current.pause()
            setPlayToggle(false)
         }
         console.log(videoRef.current.paused)
      }
   }
   const onClickProgressBar = (e) => {
      videoRef.current.currentTime = e.target.value
      setCurrentTime(e.target.value)
   }
   // update video progress bar
   useEffect(() => {
      const videoElement = videoRef.current
      if (playToggle && videoElement) {
         const handleTimeUpdate = () => {
            const currentTime = videoElement?.currentTime
            // console.log(`currentTime: ${currentTime}`)
            setCurrentTime(currentTime)
            if(videoElement.ended){
               // video ended
               // - update play icon
               // - update progress bar
               console.log("end")
               setPlayToggle(false)
               setCurrentTime(0)
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
            <div className={`absolute top-0 left-0 z-[20] overflow-hidden w-full h-fit flex flex-col gap-4`}>
               <div onClick={togglePlay} className={`${playToggle ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-full pointer-events-none"} cursor-pointer w-[76px] absolute top-0 left-0 flex justify-center items-center aspect-square text-black bg-[#8BA5F8] transition-all duration-1000`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
               </div>
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
            </div>
            {/* Video Data Visualization : Diagramatic View */}
            {(videoRef && getFakeData) && <VideoDataVisContainer fakeData={getFakeData} toggleShow={toggleShow} setCurrentTime={setCurrentTime} videoRef={videoRef} playToggle={playToggle} duration={data.duration} annotationData={annotationData} annotationLoading={annotationLoading} />}
            {/* Video Data Visualization : Entangled View */}
            {(videoRef && getFakeData) && <EntangledContainer toggleShow={toggleShow} playToggle={playToggle} currentTime={currentTime} fakeData={getFakeData} />}
            {/* Video Data Visualization : Overview View */}
            {(videoRef && getFakeData) && <OverViewContainer currentTime={currentTime} videoRef={videoRef} setCurrentTime={setCurrentTime} toggleShow={toggleShow} playToggle={playToggle} fakeData={getFakeData} />}
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
                  <input  onChange={(e) => onClickProgressBar(e)} step={0.1} min={0} max={data.duration} defaultValue={0} type="range" className="w-full bg-red-400 range-custom" />
                  <progress value={currentTime} max={data.duration} className="absolute bg-red-400 w-full h-full select-none pointer-events-none"></progress>
               </div>
            </div>
            <div className="w-[140px] text-center text-xs">{formatTime(currentTime)} / {formatTime(data.duration)}</div>
     
        </div>}
        {/* video navigation */}
        <div className="w-full h-[62px] bg-[#8BA5F8] flex items-center justify-between overflow-hidden">
         <div className="px-4 flex items-center gap-4">
            <div>Show:</div>
            <div className="flex items-center gap-2 mr-4">
               <div onClick={() => onToggleShow("category")} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer text-sm ${toggleShow.category ? "opacity-100" : "opacity-50"}`}>Categories(1)</div>
               <div onClick={() => onToggleShow("tag")} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer text-sm ${toggleShow.tag ? "opacity-100" : "opacity-50"}`}>Tags(2)</div>
               <div onClick={() => onToggleShow("reference")} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer text-sm ${toggleShow.reference ? "opacity-100" : "opacity-50"}`}>References(3)</div>
               <div onClick={() => onToggleShow("narration")} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer text-sm ${toggleShow.narration ? "opacity-100" : "opacity-50"}`}>Narrations(4)</div>
            </div>
            <div className="flex items-center gap-2">
               <div onClick={() => onToggleShow("data")} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer text-sm ${toggleShow.data ? "opacity-100" : "opacity-50"}`}>Data(5)</div>
               <div onClick={() => onToggleShow("event")} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer text-sm ${toggleShow.event ? "opacity-100" : "opacity-50"}`}>Events(6)</div>
               <div onClick={() => onToggleShow("place")} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer text-sm ${toggleShow.place ? "opacity-100" : "opacity-50"}`}>Places(7)</div>
            </div>
            
         </div>
         <div className="px-4 flex items-center gap-4">
            <div>View:</div>
            <div onClick={() => onToggleShow("diagramatic", true)} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer text-sm ${toggleShow.view === "diagramatic" ? "opacity-100" : "opacity-50"}`}>Diagramatic(Z)</div>
            <div onClick={() => onToggleShow("entangled", true)} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer text-sm ${toggleShow.view === "entangled" ? "opacity-100" : "opacity-50"}`}>Entangled(X)</div>
            <div onClick={() => onToggleShow("overview", true)} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer text-sm ${toggleShow.view === "overview" ? "opacity-100" : "opacity-50"}`}>Overview(C)</div>
         </div>
         <div onClick={() => onToggleLegend(true)} className={`h-full aspect-square cursor-pointer select-none flex bg-[#8BA5F8] hover:bg-opacity-30 hover:bg-white justify-center items-center text-black`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
               <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
         </div>
        </div>
      </div>
      
      {/* video Legend */}
       {toggleLegend && <div className="w-screen h-[100svh] bg-white bg-opacity-90 absolute top-0 left-0 z-[50] px-4 py-4">
            <div className="w-full max-w-screen-2xl mx-auto">
               <div className="flex w-full justify-between items-center">
               <div>Legend</div>
               <div onClick={() => onToggleLegend(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
               </div>
               </div>
            </div>
       </div>}
   </div>
}
 
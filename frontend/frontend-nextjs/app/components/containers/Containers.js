import { BASE_URL } from "@/app/utils/constant/etc"
import { getAllAnnotations, getAllItemAnnotations } from "@/app/utils/hooks/pandora_api"
import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { formatTime } from "@/app/utils/hooks/etc"
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
      const randomOut = randomIn + Math.floor(Math.random() * outValue) > duration ? duration : randomIn + Math.floor(Math.random() * outValue)
      const cate = {
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
        
         in: randomIn,
         out: randomOut
      };
      tagList.push(tag)
   }
   // create ref
   let refList = [];
   for(let i = 0; i < refCounts; i++){
      const randomIn = Math.floor(Math.random() * duration)
      const ref = {
         in: randomIn,
     
      };
      refList.push(ref)
   }
   // create narration
   let narrationList = [];
   for(let i = 0; i < narrationCounts; i++){
      const randomIn = Math.floor(Math.random() * duration)
      const narration = {
         in: randomIn,
     
      };
      narrationList.push(narration)
   }
   // create events
   let eventList = [];
   for(let i = 0; i < eventsCounts; i++){
      const randomIn = Math.floor(Math.random() * duration)
      const event = {
         in: randomIn,
     
      };
      eventList.push(event)
   }
   // create place
   let placeList = [];
   for(let i = 0; i < placeCounts; i++){
      const randomIn = Math.floor(Math.random() * duration)
      const place = {
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

const VideoDataVisContainer = ({fakeData, toggleShow, setCurrentTime, duration, annotationData, annotationLoading, videoRef}) => {
   const [getData, setData] = useState(null)
   const svgRef = useRef(null)

   // the data of annotations of this video
   useEffect(() => {
      if(!annotationLoading){
         // setData(annotationData.data.items)

         const getDuration = duration
         console.log(getDuration)
         // 🔥 create fake data just for test 🔥
         // fake data
         let getFakeData = fakeData
         setData(getFakeData)
     
       
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
         if(getData){
            const onMouseEnter = () => {
               document.body.style.cursor = "pointer"
            }
            const onMouseLeave = () => {
               document.body.style.cursor = "auto"
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
            .data(getData.categoryList)
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
            .style("stroke", "black")
            .style("stroke-width", "0.5px")
            .on("mouseenter", onMouseEnter)
            .on("mouseleave", onMouseLeave)
            .on("click", function(event, value){
               onClick({inVlaue:value.in, video: videoRef})
            })
          
            // create tag box
            svg
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
            .on("click", function(event, value){
               onClick({inVlaue:value.in, video: videoRef})
            })
           
            // creat ref
            svg
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
            .on("click", function(event, value){
               onClick({inVlaue:value.in, video: videoRef})
            })
            // creat narration
            svg
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
            .on("click", function(event, value){
               onClick({inVlaue:value.in, video: videoRef})
            })

            // create event box
            svg
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
            .on("click", function(event, value){
               onClick({inVlaue:value.in, video: videoRef})
            })
            // create place box
            svg
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
            .on("click", function(event, value){
               onClick({inVlaue:value.in, video: videoRef})
            })
           

         }
      }
   },[getData])


   if(annotationLoading || !Boolean(getData)){
      return;
   }
   return <div className="absolute bottom-0 left-0 z-[20]  w-full h-1/3 lg:h-1/3">
      <svg ref={svgRef}>

      </svg>
   </div>
}

export const VideoPlayerContainer = ({data}) => {
   const [toggleLegend, setToggleLegend] = useState(false)
   const videoRef = useRef(null)
   const [playToggle, setPlayToggle] = useState(false)
   const {data:annotationData, isLoading:annotationLoading} = getAllItemAnnotations({itemId:data.id})
   const [currentTime, setCurrentTime] = useState(0)
   const fakeData = createFakeAnnotations({duration:data.duration})
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
 
   useEffect(() => {
      console.log(data)   
      console.log(fakeData)
   },[])

   // video keyboard controller
   useEffect(() => {
      const onSpaceScroll = (event) => {
         if (event.code === 'Space') {
            event.preventDefault(); 
          }
        
      }
      const onSpaceBar = (event) => {
         if (event.code === 'Space') {
            event.preventDefault(); 
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
        
      }

      // event = keyup or keydown
   document.addEventListener('keyup',onSpaceBar)
   document.addEventListener('keydown',onSpaceScroll)

   return () => {
      document.removeEventListener("keyup", onSpaceBar)
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
            <video ref={videoRef} src={`${BASE_URL}/${data.id}/480p1.mp4`} className={`${(toggleShow.view === "overview" && playToggle) ? "w-[calc(100vw-660px)]" : "w-full"} w-full h-full bg-black transition-all duration-1000`} controls={false} aria-label="video player" preload="auto">
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
                  <div>Author: {data.user}</div>
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
            {videoRef && <VideoDataVisContainer fakeData={fakeData} toggleShow={toggleShow} setCurrentTime={setCurrentTime} videoRef={videoRef} duration={data.duration} annotationData={annotationData} annotationLoading={annotationLoading} />}
            {/* Video Data Visualization : Entangled View */}
            {videoRef && <div className={`${(toggleShow.view === "entangled" && playToggle) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"} absolute top-0 right-0 w-[calc(100vw-76px-20px)] h-fit bg-red-400 transition-all duration-1000`}>
                  <div>entangled view</div>
               </div>}
            {/* Video Data Visualization : Overview View */}
            {videoRef && <div className={`${(toggleShow.view === "overview" && playToggle) ? "translate-x-0" : "translate-x-full"} absolute top-0 right-0 w-[660px] h-full overflow-scroll bg-red-400 transition-all duration-1000`}>
                  <div>overview view</div>
               </div>}
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
               <div onClick={() => onToggleShow("category")} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer ${toggleShow.category ? "opacity-100" : "opacity-50"}`}>Categories</div>
               <div onClick={() => onToggleShow("tag")} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer ${toggleShow.tag ? "opacity-100" : "opacity-50"}`}>Tags</div>
               <div onClick={() => onToggleShow("reference")} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer ${toggleShow.reference ? "opacity-100" : "opacity-50"}`}>References</div>
               <div onClick={() => onToggleShow("narration")} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer ${toggleShow.narration ? "opacity-100" : "opacity-50"}`}>Narrations</div>
            </div>
            <div className="flex items-center gap-2">
               <div onClick={() => onToggleShow("data")} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer ${toggleShow.data ? "opacity-100" : "opacity-50"}`}>Data</div>
               <div onClick={() => onToggleShow("event")} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer ${toggleShow.event ? "opacity-100" : "opacity-50"}`}>Events</div>
               <div onClick={() => onToggleShow("place")} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer ${toggleShow.place ? "opacity-100" : "opacity-50"}`}>Places</div>
            </div>
            
         </div>
         <div className="px-4 flex items-center gap-4">
            <div>View:</div>
            <div onClick={() => onToggleShow("diagramatic", true)} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer ${toggleShow.view === "diagramatic" ? "opacity-100" : "opacity-50"}`}>Diagramatic</div>
            <div onClick={() => onToggleShow("entangled", true)} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer ${toggleShow.view === "entangled" ? "opacity-100" : "opacity-50"}`}>Entangled</div>
            <div onClick={() => onToggleShow("overview", true)} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer ${toggleShow.view === "overview" ? "opacity-100" : "opacity-50"}`}>Overview</div>
         </div>
         <div onClick={() => onToggleLegend(true)} className={`h-full aspect-square cursor-pointer select-none flex bg-[#8BA5F8] hover:bg-opacity-30 hover:bg-white justify-center items-center text-black`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
               <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
         </div>
        </div>
      </div>
      
      {/* video content */}
       {toggleLegend && <div className="w-screen h-[100svh] bg-white bg-opacity-90 absolute top-0 left-0 z-[30] px-4 py-4">
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
 
import { BASE_URL } from "@/app/utils/constant/etc"
import { getAllAnnotations, getAllItemAnnotations } from "@/app/utils/hooks/pandora_api"
import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
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

   const result = {
      categoryList: categoryList,
      tagList: tagList,
      refList: refList,
      narrationList: narrationList
   }
   return result
}

const VideoDataVisContainer = ({duration, annotationData, annotationLoading, videoRef}) => {
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
         let fakeData = createFakeAnnotations({duration:getDuration})
         setData(fakeData)
         console.log(fakeData)
       
      }
   },[annotationData])

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

            // create category box
            svg
            .append("g")
            .selectAll("rect")
            .data(getData.categoryList)
            .join("rect")
            .attr("width", function(d){
               return `${scaleLinear(d.out - d.in)}px`
            })
            .attr("height", canvasSize.height/3)
            .attr("x", function (d) {
               return `${scaleLinear(d.in)}px`;
             })
            .attr("y", function (d, i) {
               return `${canvasSize.height - canvasSize.height/3}px`;
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
            .selectAll("rect")
            .data(getData.tagList)
            .join("rect")
            .attr("width", function(d){
               return `${scaleLinear(d.out - d.in)}px`
            })
            .attr("height", canvasSize.height/3)
            .attr("x", function (d) {
               return `${scaleLinear(d.in)}px`;
             })
            .attr("y", function (d, i) {
               return `${canvasSize.height - ((canvasSize.height/3) * 2)}px`;
             })
            .attr("fill","#3118E8")
            .style("stroke", "black")
            .style("stroke-width", "0.5px")
            .on("mouseenter", onMouseEnter)
            .on("mouseleave", onMouseLeave)
           
           
            // creat ref
            svg
            .append("g")
            .selectAll("circle")
            .data(getData.refList)
            .join("circle")
            .attr("r", ((canvasSize.height/3)/3)/2)
            .attr("cx", function (d) {
               return `${scaleLinear(d.in)}px`;
             })
            .attr("cy", function (d, i) {
               return `${canvasSize.height - ((canvasSize.height/3) * 2) - ((canvasSize.height/3)/3/2)}px`;
             })
            .attr("fill","#FFFFFF")
            .style("stroke", "#EC6735")
            .style("stroke-width", "4.5px")
            .on("mouseenter", onMouseEnter)
            .on("mouseleave", onMouseLeave)
            // creat narration
            svg
            .append("g")
            .selectAll("circle")
            .data(getData.narrationList)
            .join("circle")
            .attr("r", ((canvasSize.height/3)/3)/2)
            .attr("cx", function (d) {
               return `${scaleLinear(d.in)}px`;
             })
            .attr("cy", function (d, i) {
               return `${canvasSize.height - ((canvasSize.height/3) * 2) - (((canvasSize.height/3)/3/2) * 4)}px`;
             })
            .attr("fill","#8BA5F8")
            .style("stroke", "#000")
            .style("stroke-width", "0.5px")
            .on("mouseenter", onMouseEnter)
            .on("mouseleave", onMouseLeave)
           

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

   // update video progress bar
   useEffect(() => {
      const videoElement = videoRef.current
      if (playToggle && videoElement) {
         const handleTimeUpdate = () => {
            const currentTime = videoElement?.currentTime
            // console.log(`currentTime: ${currentTime}`)
            if(videoElement.ended){
               // video ended
               // - update play icon
               // - update progress bar
               console.log("end")
               setPlayToggle(false)
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
            <video ref={videoRef} src={`${BASE_URL}/${data.id}/480p1.mp4`} className="w-full h-full bg-black" controls={false} aria-label="video player" preload="auto">
              <source type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* video info */}
            <div className="absolute top-0 left-0 z-[20] text-black px-2 py-1 bg-blue-400 text-4xl font-bold italic">{data.title}</div>
            {/* Video Data Visualization */}
            {videoRef && <VideoDataVisContainer videoRef={videoRef} duration={data.duration} annotationData={annotationData} annotationLoading={annotationLoading} />}

        </div>
        {/* video controller */}
        {videoRef && <div className="w-full h-[40px] bg-black border-t border-white text-white px-4 flex justify-between items-center">
         <div>
            <div onClick={togglePlay} className="cursor-pointer">
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
         </div>
        </div>}
        {/* video navigation */}
        <div className="w-full h-[62px] bg-blue-400 flex items-center justify-between overflow-hidden">
         <div className="px-4">Show:</div>
         <div className="px-4">View:</div>
         <div onClick={() => setToggleLegend(true)} className={`h-full aspect-square cursor-pointer select-none flex hover:bg-blue-200 ${toggleLegend ? "bg-blue-200" : "bg-none"} justify-center items-center text-black`}>
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
               <div onClick={() => setToggleLegend(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
               </div>
               </div>
            </div>
       </div>}
   </div>
}
 
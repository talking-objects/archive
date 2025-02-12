import { useEffect, useRef, useState } from "react"
import { formatTime } from "@/app/utils/hooks/etc"
import { FilterBox, OverViewBox } from "./view_element/ViewElements"




const OverviewView = ({data, clip=false, onClickProgressBar, currentTime, videoRef,setCurrentTime, toggleShow, playToggle, annotationData, edit=false}) => {
    const contentRef = useRef(null)
    const scrolltRef = useRef(null)
    const progressRef = useRef(null)
    const [allAnnotation, setAllAnnotation] = useState(null)
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
          setData(annotationData)
       }else{
          let allData = {
             categoryList: [],
             eventList : [],
             narrationList : [],
             placeList : [],
             refList : [],
             tagList: []
          };
          for(let i = 0; i < annotationData.length; i++){
             const fAnnotations = annotationData[i].annotations;
             for(let j =0; j < Object.keys(fAnnotations).length; j++){
              
                const getAnno = fAnnotations[Object.keys(fAnnotations)[j]]
                allData[Object.keys(fAnnotations)[j]] = [...getAnno,...allData[Object.keys(fAnnotations)[j]]]
              
                
             }
          }
          setData(allData)
       }
       if(!edit){
         let allData = [];
         const keys = Object.keys(annotationData);
         for (let i = 0; i < keys.length; i++) {
           const key = keys[i];
           const annotations = annotationData[key];
           if (Array.isArray(annotations)) {
             allData = [...annotations, ...allData];
           }
         }
        
         allData = allData.sort((a, b) => parseFloat(a.start) - parseFloat(b.start));
   
          setAllAnnotation(allData)
       }else{
          let allData = []
          for(let i = 0; i < annotationData.length; i++){
             const fAnnotations = annotationData[i].annotations;
             for(let j =0; j < Object.keys(fAnnotations).length; j++){
              
                const getAnno = fAnnotations[Object.keys(fAnnotations)[j]]
                allData = [...getAnno,...allData]
                
             }
          }
          
          allData = allData.sort((a,b) => a.in - b.in)
          setAllAnnotation(allData)
 
       }
      
    },[])
 
 
  
  
    return <div className={`${(toggleShow.view === "overview" && playToggle) ? "translate-x-0" : "translate-x-full"} z-[40] flex absolute top-0 right-0 lg:w-[660px] h-full bg-white transition-all duration-1000`}>
       <div ref={scrolltRef} className="w-full h-full overflow-scroll hide_scrollbar">
          <div ref={contentRef} className="w-full h-fit bg-white py-2 px-4">
                {allAnnotation && <div className="flex flex-col gap-5">
                   {
                      allAnnotation.map((v, idx) => {
                         return <FilterBox key={idx} type={v.type} toggleShow={toggleShow}>
                            <div className="w-full h-fit flex flex-col">
                               <OverViewBox data={v} allPlaces={annotationData.place_annotations} over={true} />
                               <div className="flex gap-1 items-center mt-1">
                                 <div className={`w-[24px] h-[24px] flex justify-center items-center relative bg-none`}>
                                    <div className={`absolute top-0 left-0  w-full h-full rounded-full ${(Math.floor(currentTime) >= Math.floor(parseFloat(v.start) - 5) && (currentTime) <= Math.floor(parseFloat(v.end) + 5)) ? "bg-eva-c2" : " bg-white "}`}></div>
                                    <div className={`absolute top-0 left-0  w-full h-full rounded-full ${(Math.floor(currentTime) >= Math.floor(parseFloat(v.start) - 5) && (currentTime) <= Math.floor(parseFloat(v.end) + 5)) ? "animate-custom-ping bg-eva-c2" : "animate-none bg-white "}`}></div>
                                    <div onClick={() => onJumpTo(parseFloat(v.start))} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer ${(Math.floor(currentTime) >= Math.floor(parseFloat(v.start) - 5) && (currentTime) <= Math.floor(parseFloat(v.end) + 5)) ? "text-white" : "text-black"}`}>
                                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                       </svg>
                                    </div>
                                 </div> 
                                 <div className="text-[11px] font-ibm_mono_regular flex justify-center items-center px-1 py-[1px] gap-1"><span>{formatTime(parseFloat(v.start))}</span> <span>{parseFloat(v.end) && "~"}</span> <span>{parseFloat(v.end) && formatTime(parseFloat(v.end))}</span></div>
                               </div>  
                            </div>
                          </FilterBox>                         
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


export default OverviewView;
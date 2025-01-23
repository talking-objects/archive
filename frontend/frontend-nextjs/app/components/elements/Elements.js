import { COLORS } from "@/app/utils/constant/etc"


const ItemBoxWrapper = ({children}) => {
   return <div className="flex items-center gap-2">{children}</div>
}


const CategoryItemBox = ({color, text}) => {
   return (
         <ItemBoxWrapper>
            <div style={{backgroundColor: `${color}`}} className="w-4 h-8 border border-black"></div>
            <div className="font-ibm_mono_regular">{text}</div>
         </ItemBoxWrapper>
   )
}

const EtcItemBox = ({children, text}) => {
   return <ItemBoxWrapper>
   {children}
   <div className="font-ibm_mono_regular">{text}</div>
</ItemBoxWrapper>  
}

const LegendBoxWrapper = ({children, title}) => {
   return <div className="flex flex-col w-full border-b border-black pb-4">
      <div className="text-2xl font-ibm_mono_bolditalic mb-8">{title}</div>
      {children}
   </div>
}


// 📄useing : video page, edit page
export const LegendContainer = ({onToggleLegend}) => {
    return <div className="w-screen h-[100svh] bg-white bg-opacity-95 absolute top-0 left-0 z-[50] px-4 py-4">
    <div className="w-full max-w-screen-2xl mx-auto">
       <div className="flex w-full justify-between items-center">
         <div className="text-4xl font-ibm_mono_bolditalic italic">Legend</div>
         <div onClick={() => onToggleLegend(false)} className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
         </div>
       </div>
       <div className="grid grid-cols-2 mt-8 gap-4 gap-x-8">
         <LegendBoxWrapper title={"Categories"}>
            <div className="flex flex-wrap gap-8">
               <CategoryItemBox color={COLORS.c1} text={"Identity"} />
               <CategoryItemBox color={COLORS.c2} text={"Knowledge"} />
               <CategoryItemBox color={COLORS.c3} text={"Artistic Reflections"} />
               <CategoryItemBox color={COLORS.c4} text={"Restitution"} />
               <CategoryItemBox color={COLORS.c5} text={"Memory and The Imaginary"} />
            </div>
         </LegendBoxWrapper>
         <LegendBoxWrapper title={"Data"}>
             <EtcItemBox text={"Coming Soon"}>
               {/* <div style={{backgroundColor: `${COLORS.c6}`}} className="w-2 h-8 border border-black"></div> */}
            </EtcItemBox>
         </LegendBoxWrapper>
         <LegendBoxWrapper title={"Tags"}>
            <EtcItemBox text={"Clip tagged with dynamic Keywords"}>
               <div style={{backgroundColor: `${COLORS.c6}`}} className="w-2 h-8 border border-black"></div>
            </EtcItemBox>
         </LegendBoxWrapper>
         <LegendBoxWrapper title={"Events"}>
            <EtcItemBox text={"Clip related to a certain timeframe"}>
               <div style={{backgroundColor: `${COLORS.c6}`, borderColor: `${COLORS.c5}`}} className="w-8 h-8 border-[5px]"></div>
            </EtcItemBox>
         </LegendBoxWrapper>
         <LegendBoxWrapper title={"References"}>
            <EtcItemBox text={"Clip tagged with References to other Sources"}>
               <div style={{backgroundColor: `${COLORS.c0}`, borderColor: `${COLORS.c4}`}} className="w-8 h-8 border-[5px] rounded-full"></div>
            </EtcItemBox>
         </LegendBoxWrapper>
         <LegendBoxWrapper title={"Places"}>
            <EtcItemBox text={"Clip related to a Location"}>
               <div style={{backgroundColor: `${COLORS.c6}`, borderColor: `${COLORS.c4}`}} className="w-8 h-8 border-[5px] rounded-full"></div>
            </EtcItemBox>
         </LegendBoxWrapper>
         <LegendBoxWrapper title={"Narrations"}>
            <EtcItemBox text={"Clip tagged with own thoughts, ideas or longer texts"}>
               <div style={{backgroundColor: `${COLORS.c2}`}} className="w-8 h-8 border-black border rounded-full"></div>
            </EtcItemBox>
         </LegendBoxWrapper>
       </div>
    </div>
    
</div>
}

const VideoNavLabel = ({text}) => {
   return <div className="font-ibm_mono_semibold">{text}</div>
}
const VideoNavItemBtn = ({text, onToggleShow, toggleShowBool}) => {
   return <div onClick={onToggleShow} className={`px-2 py-1 rounded-lg font-ibm_mono_semibold bg-white text-black select-none cursor-pointer text-sm ${toggleShowBool ? "opacity-100" : "opacity-50"}`}>{text}</div>
}

export const VideoNavigation = ({onToggleShow, toggleShow, onToggleLegend}) => {
    return <div className="w-full h-[62px] bg-[#8BA5F8] flex items-center justify-between overflow-hidden">
    <div className="px-4 flex items-center gap-4">
      <VideoNavLabel text={"Show:"} />
      <div className="flex items-center gap-2 mr-4">
         <VideoNavItemBtn text={"Categories"} onToggleShow={() => onToggleShow("category")} toggleShowBool={toggleShow.category} />
         <VideoNavItemBtn text={"Tags"} onToggleShow={() => onToggleShow("tag")} toggleShowBool={toggleShow.tag} />
         <VideoNavItemBtn text={"References"} onToggleShow={() => onToggleShow("reference")} toggleShowBool={toggleShow.reference} />
         <VideoNavItemBtn text={"Narrations"} onToggleShow={() => onToggleShow("narration")} toggleShowBool={toggleShow.narration} />
      </div>
      <div className="flex items-center gap-2">
         <VideoNavItemBtn text={"Data"} onToggleShow={() => onToggleShow("data")} toggleShowBool={toggleShow.data} />
         <VideoNavItemBtn text={"Events"} onToggleShow={() => onToggleShow("event")} toggleShowBool={toggleShow.event} />
         <VideoNavItemBtn text={"Places"} onToggleShow={() => onToggleShow("place")} toggleShowBool={toggleShow.place} />
      </div>
       
    </div>
    <div className="px-4 flex items-center gap-4">
      <VideoNavLabel text={"View:"} />
      <VideoNavItemBtn text={"Diagramatic"} onToggleShow={() => onToggleShow("diagramatic", true)} toggleShowBool={toggleShow.view === "diagramatic"} />
      <VideoNavItemBtn text={"Entangled"} onToggleShow={() => onToggleShow("entangled", true)} toggleShowBool={toggleShow.view === "entangled"} />
      <VideoNavItemBtn text={"Overview"} onToggleShow={() => onToggleShow("overview", true)} toggleShowBool={toggleShow.view === "overview"} />
    </div>
    <div onClick={() => onToggleLegend(true)} className={`h-full aspect-square cursor-pointer select-none flex bg-[#8BA5F8] hover:bg-opacity-30 hover:bg-white justify-center items-center text-black`}>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
       </svg>
    </div>
   </div>
}


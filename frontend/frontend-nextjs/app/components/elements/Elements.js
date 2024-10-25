
// 📄useing : video page, edit page
export const LegendContainer = ({onToggleLegend}) => {
    return <div className="w-screen h-[100svh] bg-white bg-opacity-90 absolute top-0 left-0 z-[50] px-4 py-4">
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
</div>
}


export const VideoNavigation = ({onToggleShow, toggleShow, onToggleLegend}) => {
    return <div className="w-full h-[62px] bg-[#8BA5F8] flex items-center justify-between overflow-hidden">
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
       <div onClick={() => onToggleShow("diagramatic", true)} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer text-sm ${toggleShow.view === "diagramatic" ? "opacity-100" : "opacity-50"}`}>Diagramatic(Q)</div>
       <div onClick={() => onToggleShow("entangled", true)} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer text-sm ${toggleShow.view === "entangled" ? "opacity-100" : "opacity-50"}`}>Entangled(W)</div>
       <div onClick={() => onToggleShow("overview", true)} className={`px-2 py-1 rounded-lg bg-white text-black select-none cursor-pointer text-sm ${toggleShow.view === "overview" ? "opacity-100" : "opacity-50"}`}>Overview(E)</div>
    </div>
    <div onClick={() => onToggleLegend(true)} className={`h-full aspect-square cursor-pointer select-none flex bg-[#8BA5F8] hover:bg-opacity-30 hover:bg-white justify-center items-center text-black`}>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
       </svg>
    </div>
   </div>
}


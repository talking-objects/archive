import { LegendContainer } from "@/app/components/elements/Elements";

const VideoPlayerContainer = ({children, toggleLegend, onToggleLegend}) => {

    return <div className="w-full h-[calc(100svh-56px)] relative">
       <div className="w-full h-[calc(100svh-56px)] overflow-hidden flex flex-col">
        {children}

       </div>
       {toggleLegend && <LegendContainer onToggleLegend={onToggleLegend} />}
    </div>
}

export default VideoPlayerContainer;
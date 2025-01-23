import { formatTime } from "@/app/utils/hooks/etc"

const VideoController = ({togglePlay, playToggle, currentTime, maxDuration, clip, onClickProgressBar}) => {
    return <div className="w-full h-[40px] bg-black border-t-[0.5px] border-neutral-500 text-white flex justify-between items-center">
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
                       <input  onChange={(e) => onClickProgressBar(e)} step={clip? 0.01 :0.1} min={0} max={maxDuration} defaultValue={0} type="range" className="w-full bg-red-400 range-custom" />
                       <progress value={currentTime} max={maxDuration} className="absolute bg-red-400 w-full h-full select-none pointer-events-none"></progress>
                    </div>
                 </div>
                 <div className="w-fit text-center text-[12px] whitespace-nowrap font-ibm_mono_regular px-2">{formatTime(currentTime)} / {formatTime(maxDuration)}</div>
          
        </div>
}

export default VideoController 
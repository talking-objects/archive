const VideoTitle = ({text}) => {
    return  <span className="w-full flex lg:w-4/5 text-black text-2xl md:text-4xl lg:text-5xl font-ibm_mono_bolditalic italic transition-all duration-1000">
    <div className="h-full bg-[#8BA5F8] px-2 lg:px-4"></div>
    <div>
      <span className=" inline bg-[#8BA5F8] leading-tight">{text}</span>
    </div>
  </span>
}

export default VideoTitle;
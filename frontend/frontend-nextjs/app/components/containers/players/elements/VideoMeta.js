const VideoMeta = ({ currentVideo, videoBool = true, playToggle = true, currentLanguage="en" }) => {
  return (
    <div
      className={`${
        videoBool
          ? !playToggle
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-full"
          : "opacity-100 translate-x-0"
      } text-black text-[14px] w-fit h-fit flex opacity-100 duration-1000 justify-stretch items-stretch  `}
    >
      <div className="h-full flex-1 bg-none w-full px-2 lg:px-4"></div>
      <div className="flex flex-col w-full max-w-[280px] px-2 py-2 text-white">
        <div className="w-full flex justify-center items-center">
          <div className="font-eva text-[120px] leading-[1.2]">C</div>
        </div>
        <div className="flex flex-wrap gap-2">
          {(currentVideo.author || currentVideo.contributors) && <BoxLabel text={"Author:"} />}
          <BoxValue
            text={`${currentVideo.author}${currentVideo.author && ","} ${currentVideo.contributors}`} 
          />
        </div>
        {currentVideo.created && <div className="flex flex-wrap gap-2">
          <BoxLabel text={"Created:"} />
          <BoxValue text={`${new Date(currentVideo.created).toLocaleDateString(currentLanguage)}`} />
        </div>}
        {currentVideo.updated && <div className="flex flex-wrap gap-2">
          <BoxLabel text={"Updated:"} />
          <BoxValue text={`${new Date(currentVideo.updated).toLocaleDateString(currentLanguage)}`} />
        </div>}
      </div>
    </div>
  );
};
const BoxLabel = ({ text }) => {
  return <span className="font-ibm_mono_regular">{text}</span>;
};
const BoxValue = ({ text }) => {
  return <span className="font-ibm_mono_bold">{text}</span>;
};
export default VideoMeta;

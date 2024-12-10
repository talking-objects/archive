const VideoMeta = ({currentVideo, videoBool=true, playToggle=true}) => {
    return <div
    className={`${videoBool ? (!playToggle) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full" : "opacity-100 translate-x-0"} text-black bg-white bg-opacity-80 w-fit px-2 py-1 opacity-100 duration-1000`}
  >
    <div className="flex flex-wrap gap-2">
      <BoxLabel text={"Author:"} />
      <BoxValue
        text={[
          currentVideo.user &&
            (Array.isArray(currentVideo.user)
              ? currentVideo.user
                  .map((val) => `${val[0].toUpperCase()}${val.slice(1)}`)
                  .join(", ")
              : `${currentVideo.user[0].toUpperCase()}${currentVideo.user.slice(1)}`),
          currentVideo.director &&
            (Array.isArray(currentVideo.director)
              ? currentVideo.director
                  .map((val) => `${val[0].toUpperCase()}${val.slice(1)}`)
                  .join(", ")
              : `${currentVideo.director[0].toUpperCase()}${currentVideo.director.slice(1)}`),
            ]
          .filter(Boolean) // null, undefined 또는 빈 값을 제거
          .join(", ")} // 쉼표로 연결
      />
    </div>
    <div className="flex flex-wrap gap-2">
      <BoxLabel text={"Created:"} />
      <BoxValue text={`${currentVideo.created}`} />
    </div>
    <div className="flex flex-wrap gap-2">
      <BoxLabel text={"Modified:"} />
      <BoxValue text={`${currentVideo.modified}`} />
    </div>
  </div>
}
const BoxLabel = ({ text }) => {
    return <span className="font-ibm_mono_regular">{text}</span>;
  };
  const BoxValue = ({ text }) => {
    return <span className="font-ibm_mono_bold">{text}</span>;
  };
export default VideoMeta;
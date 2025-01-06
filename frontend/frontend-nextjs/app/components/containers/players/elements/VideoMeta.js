const VideoMeta = ({ currentVideo, videoBool = true, playToggle = true, currentLanguage="en" }) => {
  return (
    <div
      className={`${
        videoBool
          ? !playToggle
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-full"
          : "opacity-100 translate-x-0"
      } text-black text-[14px] w-fit h-fit flex opacity-100  duration-1000 justify-stretch items-stretch`}
    >
      <div className="h-full flex-1 bg-white w-full px-2 lg:px-4"></div>
      <div className="flex flex-col w-full max-w-[280px] px-2 py-2 bg-white bg-opacity-80 ">
        <div className="w-full flex justify-center items-center">
          <div className="font-eva text-[120px] leading-[1.2]">C</div>
        </div>
        <div className="flex flex-wrap gap-2">
          <BoxLabel text={"Author:"} />
          <BoxValue
            text={[
              currentVideo.user &&
                (Array.isArray(currentVideo.user)
                  ? currentVideo.user
                      .map((val) => `${val[0].toUpperCase()}${val.slice(1)}`)
                      .join(", ")
                  : `${currentVideo.user[0].toUpperCase()}${currentVideo.user.slice(
                      1
                    )}`),
              currentVideo.director &&
                (Array.isArray(currentVideo.director)
                  ? currentVideo.director
                      .map((val) => `${val[0].toUpperCase()}${val.slice(1)}`)
                      .join(", ")
                  : `${currentVideo.director[0].toUpperCase()}${currentVideo.director.slice(
                      1
                    )}`),
            ]
              .filter(Boolean) // null, undefined 또는 빈 값을 제거
              .join(", ")} // 쉼표로 연결
          />
        </div>
        {currentVideo.created && <div className="flex flex-wrap gap-2">
          <BoxLabel text={"Created:"} />
          <BoxValue text={`${new Date(currentVideo.created.split("T", 1)[0]).toLocaleDateString(currentLanguage)}`} />
        </div>}
        {currentVideo.modified && <div className="flex flex-wrap gap-2">
          <BoxLabel text={"Modified:"} />
          <BoxValue text={`${new Date(currentVideo.modified.split("T", 1)[0]).toLocaleDateString(currentLanguage)}`} />
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

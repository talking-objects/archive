import { BASE_URL } from "@/app/utils/constant/etc";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const BoxLabel = ({ text }) => {
  return <span className="font-ibm_mono_regular">{text}</span>;
};
const BoxValue = ({ text }) => {
  return <span className="font-ibm_mono_bold">{text}</span>;
};

const HomeHeader = ({ currentVideo }) => {
  const router = useRouter();

  const moveToVideo = ({ videoId }) => {
    router.push(`/video/${videoId}`);
  };
  useEffect(() => {
    console.log(currentVideo);
  }, []);

  return (
    <div className="w-full h-[100svh] pt-[56px] bg-white overflow-hidden relative">
      <div
        id="headerVideoAni"
        className={`w-full h-full bg-white relative group`}
      >
        <div
          style={{
            backgroundImage: `url(${BASE_URL}/${currentVideo.id}/480p${
              currentVideo.posterFrame ? currentVideo.posterFrame : 0
            }.jpg)`,
          }}
          className="w-full h-full bg-no-repeat bg-center bg-cover"
        ></div>
        <div
          onClick={() => moveToVideo({ videoId: currentVideo.id })}
          className="absolute z-[45] w-[80px] aspect-square top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center cursor-pointer opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 rounded-full text-white transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-9 translate-x-[2px] opacity-90"
          >
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div
          className={`absolute top-0 left-0 z-[40] overflow-hidden w-full h-fit flex flex-col gap-4`}
        >
          <div
            className={`opacity-100 translate-x-0 w-full lg:w-3/5 text-black px-2 bg-[#8BA5F8] text-2xl md:text-4xl lg:text-5xl font-ibm_mono_bolditalic italic transition-all duration-1000 py-2 lg:py-4`}
          >
            {currentVideo.title}
          </div>
          <div
            className={`text-black bg-white bg-opacity-80 w-fit px-2 py-1 opacity-100 translate-x-0 transition-all duration-1000`}
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
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;

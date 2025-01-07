import VideoMeta from "@/app/components/containers/players/elements/VideoMeta";
import VideoTitle from "@/app/components/containers/players/elements/VideoTitle";
import { BASE_URL } from "@/app/utils/constant/etc";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



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
        <div className="absolute top-0 left-0 w-full h-full bg-black pointer-events-none select-none bg-opacity-30"></div>
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
          className="absolute z-[45] w-[180px] aspect-square top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center cursor-pointer opacity-0 group-hover:opacity-100 bg-black bg-opacity-0 rounded-full text-white transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-32 translate-x-[2px] opacity-90"
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
            className={`opacity-100 translate-x-0 flex`}
          >
             
            <VideoTitle text={currentVideo.title} />
          </div>
          <VideoMeta videoBool={false} currentVideo={currentVideo} />
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;

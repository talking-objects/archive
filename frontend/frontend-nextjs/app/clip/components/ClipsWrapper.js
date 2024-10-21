"use client";

import { BASE_URL } from "@/app/utils/constant/etc";
import { toaFetchData } from "@/app/utils/hooks/toaFetch";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const getClipsf = async (pId) => {
  const bodyData = {
    action: "findClips",
    data: {
      keys: ["position", "annotations", "id", "in", "out", "value"],
    //   query: { conditions: [], operator: "&" },
    //   sort: [{ key: "position", operator: "+" }],
    },
  };
  return await toaFetchData({bodyData:bodyData});
};
const ClipsWrapper = () => {
  const [getLoading, setLoading] = useState(true);
  const [getClips, setClips] = useState(null);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const clips = await getClipsf();

      if (clips.status.code === 404) {
        setLoading(false);
      } else {
        setLoading(false);
        setClips(clips.data);
      }
      console.log(clips);
    })();
  }, []);

  const onPush = (itemId) => {
    router.push(`/clip/${itemId}`)
  }

  if (getLoading) {
    return (
      <div className="w-screen h-[100svh] flex justify-center items-center">
        Loading...
      </div>
    );
  }
  if(!Boolean(getClips) && !getLoading){
    return (<div className="w-screen h-[100svh] flex justify-center items-center">
        Video Not Found
    </div>)
}
  return (
    <div className="w-screen h-full min-h-[100svh] flex justify-center items-center p-8">
      <div className="w-full grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4">
        {getClips?.items.length > 0 && getClips?.items.map((clip, idx) => {
          return (
            <div onClick={() => onPush(clip.id.split("/")[0])} key={idx} className="w-full aspect-video bg-neutral-200 rounded-lg cursor-pointer relative"> 
              <Image
                priority
                fill
                sizes="100%"
                style={{
                  position: "absolute",
                  objectFit: "cover",
                }}
                alt={`Talking Objects Archive Poster Image/${clip.id.split("/")[0]}`}
                src={`${BASE_URL}/${clip.id.split("/")[0]}/480p${clip.in}.jpg`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClipsWrapper;

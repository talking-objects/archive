import { MainContainer } from "@/app/components/containers/Containers";
import VideoPlayerCon from "@/app/components/containers/players/VideoPlayerCon";
import { createFakeAnnotations } from "@/app/utils/hooks/etc";
import { getClip } from "@/app/utils/hooks/pandora_api";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ClipWrapper = () => {
  const searchParams = useSearchParams();
  const videoContainerRef = useRef(null);
  const { isLoading, data, error } = getClip({
    originId: searchParams.get("clipId"),
  });
  const [getVideoData, setVideoData] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      let editedData = JSON.parse(JSON.stringify(data.data.items[0]));
      editedData.originId = editedData.id;
      editedData.id = searchParams.get("id");
      editedData.duration = editedData.out - editedData.in;
      editedData.director = [];

      // 🤡 FakeData: You can use "editedData.annotations" later.
      /* 
        Data Strucutre
        {
          categoryList: [],
          eventList: [],
          narrationList: [],
          placeList: [],
          refList: [],
          tagList: []
        }
      */
      editedData.nAnnotations = createFakeAnnotations({
        duration: editedData.out - editedData.in,
        editVersion: true,
      });

      setVideoData(editedData);
    }
  }, [data]);

  return (
    <MainContainer>
      {!isLoading && getVideoData && (
        <>
          <div ref={videoContainerRef} className="w-full h-[100svh] relative">
            <VideoPlayerCon data={getVideoData} clip={true} />
          </div>
        </>
      )}
    </MainContainer>
  );
};

export default ClipWrapper;

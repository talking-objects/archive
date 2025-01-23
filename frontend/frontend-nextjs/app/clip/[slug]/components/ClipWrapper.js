import { MainContainer } from "@/app/components/containers/Containers";
import VideoPlayerCon from "@/app/components/containers/players/VideoPlayerCon";
import LoadingCon from "@/app/components/LoadingCon";
import LoadingDataCon from "@/app/components/LoadingDataCon";
import { createFakeAnnotations } from "@/app/utils/hooks/etc";
import { getClip } from "@/app/utils/hooks/pandora_api";
import { loadingState } from "@/app/utils/recoillib/state/state";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";

const ClipWrapper = () => {
  const searchParams = useSearchParams();
  const videoContainerRef = useRef(null);
  const { isLoading, data, error } = getClip({
    originId: searchParams.get("clipId"),
  });
  const [getVideoData, setVideoData] = useState(null);
  const [isReady, setIsReady] = useState(false)
  const getLoadingState = useRecoilValue(loadingState);

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


  if((getLoadingState.isLoading && getLoadingState.hasAnimated && !Boolean(isReady))){
    return <div className="w-full h-[100svh]">
      <LoadingDataCon ready={isReady} readyData={Boolean(getVideoData)} comLoader={() => setIsReady(true)} />
    </div>
  }

  return (
    <>
    {(!getLoadingState.isLoading || !getLoadingState.hasAnimated) && (
        <LoadingCon ready={Boolean(getVideoData)} comLoader={() => setIsReady(true)} />
      )}
    {!isLoading && getVideoData && <MainContainer>
      {(
        <>
          <div ref={videoContainerRef} className="w-full h-[100svh] relative pt-[56px]">
            <VideoPlayerCon data={getVideoData} clip={true} />
          </div>
        </>
      )}
    </MainContainer>}
    </>
  );
};

export default ClipWrapper;

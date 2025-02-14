  import { MainContainer } from "@/app/components/containers/Containers";
import VideoPlayerConClip from "@/app/components/containers/players/VideoPlayerConClip";
import LoadingCon from "@/app/components/LoadingCon";
import LoadingDataCon from "@/app/components/LoadingDataCon";
import { createFakeAnnotations } from "@/app/utils/hooks/etc";
import { getClip, getClips, getEvaVideo } from "@/app/utils/hooks/eva_api";
import { loadingState } from "@/app/utils/recoillib/state/state";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import ContentsClip from "@/app/components/elements/contents/ContentsClip";
const ClipWrapper = () => {
  const params = useParams();
  const { data: clip, isLoading: isLoadingClip, error: isClipNotFound } = useQuery({
    queryKey: ["clip", params.slug],
    queryFn: () => getClip(params.slug)
  })

  const {data: video, isLoading: isLoadingVideo, error: isVideoNotFound} = useQuery({
    queryKey: ["video", clip?.data?.video_id],
    queryFn: () => getEvaVideo(clip.data.video_id),
    enabled: Boolean(clip?.data?.video_id)
  })
  const [getClipVideo, setClipVideo] = useState(null);
  const [getVideoData, setVideoData] = useState(null);
  const getLoadingState = useRecoilValue(loadingState);
  const videoContainerRef = useRef(null);
  const [isReady, setIsReady] = useState(false)
  const [clipData, setClipData] = useState(null);
  useEffect(() => {
    if (!isLoadingClip && !isClipNotFound) {
   
      setClipVideo(clip);

      const annotations = {
        category_annotations: [],
        event_annotations: [],
        place_annotations: [],
        reference_annotations: [],
        narration_annotations: [],
        data_annotations: [],
        tag_annotations: []
      }

      switch (clip.data.type) {
        case "categoryLayer":
          annotations.category_annotations.push(clip.data)
          break;
        case "eventLayer":
          annotations.event_annotations.push(clip.data)
          break;
        case "placeLayer":
          annotations.place_annotations.push(clip.data)
          break;
        case "referenceLayer":
          annotations.reference_annotations.push(clip.data)
          break;
        case "narrationLayer":
          annotations.narration_annotations.push(clip.data)
          break;
        case "dataLayer":
          annotations.data_annotations.push(clip.data)
          break;
        case "tagLayer":
          annotations.tag_annotations.push(clip.data)
          break;
      }
      console.log(annotations)
      setClipData({
        annotations
      })
    }
  }, [clip, isLoadingClip]);

  useEffect(() => {
    if (!isLoadingVideo && !isVideoNotFound) {
      console.log(video)
      setVideoData(video);
    }
  }, [video, isLoadingVideo]);



  if((getLoadingState.isLoading && getLoadingState.hasAnimated && !Boolean(isReady))){
    return <div className="w-full h-[100svh]">
      <LoadingDataCon ready={isReady} readyData={Boolean(getClipVideo && getVideoData)} comLoader={() => setIsReady(true)} />
    </div>
  }

  if(isClipNotFound){
    return <div className="w-full h-[100svh]">
      <div className="w-full h-full flex justify-center items-center">
        <div className="text-black text-[24px] font-ibm_mono_bolditalic">Clip Not Found</div>
      </div>
    </div>
  }


  return (
    <>
    {(!getLoadingState.isLoading || !getLoadingState.hasAnimated) && (
        <LoadingCon ready={Boolean(getClipVideo && getVideoData)} comLoader={() => setIsReady(true)} />
      )}
    {getClipVideo && !isLoadingClip && getVideoData && <MainContainer>
      {(
        <>
          <div ref={videoContainerRef} className="w-full h-[100svh] relative pt-[56px]">
            <VideoPlayerConClip data={getClipVideo} clip={true} videoData={getVideoData} />
          </div>
          <ContentsClip getVideoData={getVideoData} isLoading={isLoadingVideo} videoId={getVideoData.pandora_id} clipData={clipData} />
        </>
      )}
    </MainContainer>}
    </>
  );
};

export default ClipWrapper;

import { BASE_URL, COLORS } from "@/app/utils/constant/etc";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const InfoLable = ({ children }) => {
  return (
    <div className="group-hover:opacity-100 group-hover:left-[28px] z-[50] flex opacity-0 absolute top-0 left-[16px] bg-neutral-800 px-1 py-1 border-[0.5px] border-neutral-300 text-white rounded-md w-fit text-xs whitespace-nowrap pointer-events-none select-none transition-all duration-150">
      {children}
    </div>
  );
};
const AnnotationIcon = ({ val }) => {
    const [layer, setLayer] = useState(null)
    useEffect(() => {
        if(val.data.type){
            setLayer(val.data.type)
        }
    }, [val])
  const getLayerName = (layer) => {
    if (layer === "eventLayer") {
      return "Event layer";
    }
    if (layer === "tagLayer") {
      return "Tag layer";
    }
    if (layer === "placeLayer") {
      return "Place layer";
    }
    if (layer === "referenceLayer") {
      return "Reference layer";
    }
    if (layer === "narrationLayer") {
      return "Narration layer";
    }
    if (layer === "categoryLayer") {
      return "Category layer";
    }
    if (layer === "dataLayer") {
      return "Data layer";
    }
    return "Error say to DainDev";
  };
  return (
    <div className="w-8 h-8 bg-white flex justify-center items-center cursor-help group relative">
      <InfoLable>
        <span>
          {getLayerName(layer)}
          {layer === "categoryLayer" && `-${val.data.value.value.value}`}
        </span>
      </InfoLable>
      {layer === "categoryLayer" && (
        <div
          style={{ backgroundColor: `${val.data.value.value.color}` }}
          className="w-2/3 aspect-square border border-black flex justify-center items-center text-white text-xs font-medium"
        ></div>
      )}
      {layer === "eventLayer" && (
        <div
          style={{
            backgroundColor: `${COLORS.c6}`,
            borderColor: `${COLORS.c5}`,
          }}
          className="w-2/3 aspect-square flex justify-center items-center border-[3px] text-white text-xs font-medium"
        ></div>
      )}
      {layer === "tagLayer" && (
        <div className="w-2/3 aspect-square flex justify-center items-center text-white text-xs font-medium">
          <div
            style={{ backgroundColor: `${COLORS.c6}` }}
            className="w-1/4 h-full border border-black"
          ></div>
        </div>
      )}
      {layer === "placeLayer" && (
        <div
          style={{
            backgroundColor: `${COLORS.c6}`,
            borderColor: `${COLORS.c4}`,
          }}
          className="w-2/3 aspect-square border-[3px] rounded-full flex justify-center items-center text-white text-xs font-medium"
        ></div>
      )}
      {layer === "referenceLayer" && (
        <div
          style={{
            backgroundColor: `${COLORS.c0}`,
            borderColor: `${COLORS.c4}`,
          }}
          className="w-2/3 aspect-square border-[3px] rounded-full flex justify-center items-center text-white text-xs font-medium"
        ></div>
      )}
      {layer === "narrationLayer" && (
        <div
          style={{ backgroundColor: `${COLORS.c2}` }}
          className="w-2/3 aspect-square border border-black flex justify-center items-center text-white text-xs font-medium"
        ></div>
      )}
      {layer === "dataLayer" && (
        <div
          style={{ backgroundColor: `#000000` }}
          className="w-2/3 aspect-square border border-black flex justify-center items-center text-white text-xs font-medium"
        ></div>
      )}
    </div>
  );
};

const RawIcon = () => {
  return (
    <div className="w-8 h-8 bg-white flex justify-center items-center cursor-help group relative">
      <InfoLable className="group-hover:flex hidden absolute top-[0px] left-[32px] bg-white text-black w-fit max-w-20 text-xs">
        <span>Raw Video</span>
      </InfoLable>
      <div className="w-2/3 aspect-square bg-black rounded-full flex justify-center items-center text-white text-xs font-medium">
        R
      </div>
    </div>
  );
};
const ClipIcon = () => {
  return (
    <div className="w-8 h-8 bg-white flex justify-center items-center cursor-help group relative">
      <InfoLable className="group-hover:flex hidden absolute top-0 left-[32px] bg-white text-black w-fit max-w-20 text-xs">
        <span>Clip</span>
      </InfoLable>
      <div className="w-2/3 aspect-square bg-black rounded-full flex justify-center items-center text-white text-xs font-medium">
        C
      </div>
    </div>
  );
};

const ForestContentsImageBox = ({ val }) => {
  const [getId, setId] = useState(null);
  const [getPostFrame, setPostFrame] = useState(null);
  useEffect(() => {
    console.log(val);
    if (val.type === "R") {
      setId(val.id);
      setPostFrame(val.posterFrame);
    }
    if (val.type === "C") {
      setId(val.id.split("/")[0]);
      setPostFrame(val.in);
    }
    if (val.type === "A") {
      setId(val.item);
      setPostFrame(val.in);
    }
  }, []);
  return (
    <div
      // style={{backgroundImage: `url(${BASE_URL}/${getId}/480p${getPostFrame}.jpg)`}}
      className="w-full aspect-video bg-neutral-200 rounded-md overflow-hidden flex justify-center items-center relative"
    >
      <Image
        src={`${BASE_URL}/${
          val.type === "clip" ? val.data.pandora_id : val.pandora_id
        }/480p${val.type === "clip" ? val.data.start : val.poster}.jpg`}
        alt=""
        fill
        style={{ objectFit: "cover" }}
      />
      {val.layer === "placeList" && (
        <div className="bg-white text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Place
        </div>
      )}
    </div>
  );
};

const ForestContentsBox = ({ allData }) => {
  const router = useRouter();

  const onPush = (value) => {
    if (value.type === "R") {
      router.push(`/video/${value.id}`);
    }
    if (value.type === "C") {
      const id = value.id.split("/")[0];
      router.push(`/clip/${id}?clipId=${value.id}&id=${id}`);
    }
  };

  return (
    <div className="w-full py-4 h-fit">
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allData &&
          allData.map((val, idx) => {
            return (
              <div key={idx} className="flex w-full">
                <div className="w-8 flex flex-col h-full">
                  {val.type === "raw" && <RawIcon />}
                  {val.type === "clip" && <ClipIcon />}
                  {val.type === "clip" && (
                    <AnnotationIcon val={val} />
                  )}
                </div>
                <div
                  onClick={() => onPush(val)}
                  className="w-full h-full cursor-pointer"
                >
                  <ForestContentsImageBox val={val} />
                  <div className="w-fit text-xs mt-2 font-semibold italic">
                    {val.title}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ForestContentsBox;

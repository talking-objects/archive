import { useEffect, useState } from "react";
import { formatTime } from "@/app/utils/hooks/etc";
import { FilterBox, OverViewBox } from "./view_element/ViewElements";

const EntangledView = ({
  clip = false,
  edit = false,
  toggleShow,
  playToggle,
  currentTime,
  annotationData,
}) => {
  const [allAnnotation, setAllAnnotation] = useState(null);
  const [getData, setData] = useState(null);
  useEffect(() => {
    if (!edit) {
      setData(annotationData);
    } else {
      let allData = {
        categoryList: [],
        eventList: [],
        narrationList: [],
        placeList: [],
        refList: [],
        tagList: [],
      };
      for (let i = 0; i < annotationData.length; i++) {
        const fAnnotations = annotationData[i].annotations;
        for (let j = 0; j < Object.keys(fAnnotations).length; j++) {
          const getAnno = fAnnotations[Object.keys(fAnnotations)[j]];
          allData[Object.keys(fAnnotations)[j]] = [
            ...getAnno,
            ...allData[Object.keys(fAnnotations)[j]],
          ];
        }
      }
      setData(allData);
    }
    if (!edit) {
      let allData = [];
      for (let i = 0; i < Object.keys(annotationData).length; i++) {
        allData = [
          ...annotationData[Object.keys(annotationData)[i]],
          ...allData,
        ];
      }
      allData = allData.sort((a, b) => a.in - b.in);

      setAllAnnotation(allData);
    } else {
      let allData = [];
      for (let i = 0; i < annotationData.length; i++) {
        const fAnnotations = annotationData[i].annotations;
        for (let j = 0; j < Object.keys(fAnnotations).length; j++) {
          const getAnno = fAnnotations[Object.keys(fAnnotations)[j]];
          allData = [...getAnno, ...allData];
        }
      }
      allData = allData.sort((a, b) => a.in - b.in);
      setAllAnnotation(allData);
    }
  }, []);

  const previewGap = edit ? 3 : clip ? 3 : 60;

  return (
    <div
      className={`${
        toggleShow.view === "entangled" && playToggle
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full"
      } absolute z-[40] top-0 right-0 w-[calc(100vw-76px-20px)] h-full bg-none transition-all duration-1000`}
    >
      <div className="w-full h-full overflow-scroll hide_scrollbar">
        <div className="w-full h-fit bg-none py-2 px-4">
          {allAnnotation && (
            <div className="flex items-end flex-col gap-2">
              {allAnnotation.map((v, idx) => {
                return (
                  <FilterBox key={idx} type={v.type} toggleShow={toggleShow}>
                    {Math.floor(currentTime) >= Math.floor(v.in - previewGap) &&
                      currentTime <=
                        Math.floor(
                          v.out ? v.out + previewGap : v.in + previewGap
                        ) && (
                        <div
                          className={`${"flex items-center justify-center gap-2"} min-w-[380px]`}
                        >
                          <div className="bg-white text-xs flex px-2 py-1">
                            <span>{formatTime(v.in)}</span>{" "}
                            <span>{v.out && "~"}</span>{" "}
                            <span>{v.out && formatTime(v.out)}</span>
                          </div>
                          <OverViewBox data={v} fakeData={getData} />
                        </div>
                      )}
                  </FilterBox>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntangledView;

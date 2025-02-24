import { useEffect, useState } from "react";
import { formatTime } from "@/app/utils/hooks/etc";
import { FilterBox, OverViewBox } from "./view_element/ViewElements";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "./transition.css"
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
      const keys = Object.keys(annotationData);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const annotations = annotationData[key];
        if (Array.isArray(annotations)) {
          allData = [...annotations, ...allData];
        }
      }
     
      allData = allData.sort((a, b) => parseFloat(a.start) - parseFloat(b.start));

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
            <div className="flex items-end flex-col gap-4">
              {allAnnotation.map((v, idx) => {
                return (
                  <FilterBox key={idx} type={v.type} toggleShow={toggleShow}>
                    <TransitionGroup component={null}>
                    {(Math.floor(currentTime) >= Math.floor(parseFloat(v.start) - previewGap) && currentTime <= Math.floor(parseFloat(v.end) + previewGap)) && (
                      <CSSTransition
                      key={idx} // 유니크한 key 값
                      timeout={300} // 애니메이션 지속 시간
                      classNames="fade"
                    >
                        <div
                          className={`w-fit ${"flex flex-row items-center justify-end"} group relative opacity-[75%] hover:opacity-100 duration-300`}
                        >
                          {/* <div className="group-hover:translate-x-0 translate-x-0 text-[11px] font-ibm_mono_regular justify-center items-center px-1 py-[1px] gap-1 bg-white bg-blend-color bg-opacity-80"><span>{formatTime(v.in)}</span> <span>{v.out && "~"}</span> <span>{v.out && formatTime(v.out)}</span></div> */}
                          <OverViewBox data={v} allPlaces={annotationData.place_annotations} />
                          
                        </div>
                        </CSSTransition>
                     )}
                     </TransitionGroup>
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

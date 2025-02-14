import { useEffect, useState } from "react";
import ContentBox from "./ContentBox";

const RefWapper = ({getVideoData, changeItemTime, clip=false}) => {
    const [openRef, setOpenRef] = useState(false)
    useEffect(() => {
            const refSubCon = document.querySelector("#refSubCon");
            if(!clip){
                refSubCon.style.minHeight = `${refSubCon.clientWidth}px`
            }
        },[])
    return (
      <ContentBox clip={clip} title={"References"} id="ref_box">
        <div
          id="refSubCon"
          className="flex flex-col w-full h-fit overflow-hidden"
        >
          <div className="flex flex-col gap-4 w-full h-full bg-eva-c2 bg-opacity-[27%] px-4 py-4">
            {getVideoData
              .slice(0, openRef ? getVideoData.length : 4)
              .map((val, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => changeItemTime({ data: val })}
                    className="bg-white w-full cursor-pointer h-fit min-h-28 rounded-lg border-4 border-eva-c5 px-4 py-2 font-ibm_mono_italic"
                  >
                    {/* <div>in: {val.in}</div> */}
                    {val.value?.value?.url && <div className="w-full h-10 flex items-center">
                      <div className="w-[24px] h-[24px] flex justify-center items-center overflow-hidden relative">
                         <a target="_blank" href={val.value?.value?.url} className=" flex w-full h-full justify-center items-center bg-white transition-all ">
                               <div className="text-black transition-all "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                     <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                               </svg>
                            </div>
                         </a>
                      </div>
                  </div>}
                    {val.value.value.text && <div className="text-sm whitespace-pre-wrap">{val.value.value.text}</div>}
                  </div>
                );
              })}
          </div>
          {getVideoData.length > 4 && (
            <div className="w-full flex justify-center">
              <span
                onClick={() => setOpenRef((prev) => !prev)}
                className="bg-eva-c2 px-4 bg-opacity-[27%] py-2 rounded-b-xl text-sm font-extralight cursor-pointer font-ibm_mono_regular"
              >
                {!openRef ? "Expand/Show All" : "Close"}
              </span>
            </div>
          )}
        </div>
      </ContentBox>
    );
}

export default RefWapper;
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import gsap from "gsap";
import { OverViewBox } from "./view_element/ViewElements";

const DiagramaticView = ({
  data,
  onClickProgressBar,
  edit = false,
  clip = false,
  playToggle,
  toggleShow,
  setCurrentTime,
  duration,
  annotationData,
  annotationLoading,
  videoRef,
}) => {
  const [getData, setData] = useState(null);
  const wrapperRef = useRef(null);
  const svgRef = useRef(null);
  const infoRef = useRef(null);
  const placeAndEventInfoRef = useRef(null);
  const infoSourceRef = useRef(null);
  const [hoverData, setHoverData] = useState(null);
  const [sourceHoverData, setSourceHoverData] = useState(null);
  const router = useRouter();
  const svgContainerRef = useRef(null);

  // the data of annotations of this video
  useEffect(() => {
    if (!annotationLoading) {
      const getDuration = duration;

      if (edit) {
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
      } else {
        setData(annotationData);
      }
    }
  }, [annotationData]);

  useEffect(() => {
    const category = d3.select("#cateGroup");
    const tag = d3.select("#tagGroup");
    const ref = d3.select("#refGroup");
    const narration = d3.select("#narrationGroup");
    const event = d3.select("#eventGroup");
    const place = d3.select("#placeGroup");

    const svg = d3.select(svgRef.current);
    if (toggleShow.view === "diagramatic") {
      svg.style("display", "block");

      // Category toggle
      if (toggleShow.category) {
        category.style("display", "block");
      } else {
        category.style("display", "none");
      }

      // Tag toggle
      if (toggleShow.tag) {
        tag.style("display", "block");
      } else {
        tag.style("display", "none");
      }

      // Reference toggle
      if (toggleShow.reference) {
        ref.style("display", "block");
      } else {
        ref.style("display", "none");
      }

      // Narration toggle
      if (toggleShow.narration) {
        narration.style("display", "block");
      } else {
        narration.style("display", "none");
      }
      // Event toggle
      if (toggleShow.event) {
        event.style("display", "block");
      } else {
        event.style("display", "none");
      }
      // Narration toggle
      if (toggleShow.place) {
        place.style("display", "block");
      } else {
        place.style("display", "none");
      }
    } else {
      // svg.style("display", "none")
    }
  }, [toggleShow]);

  const onMouseSourceLeave = (e, d) => {
    document.body.style.cursor = "auto";
    if (wrapperRef && infoSourceRef) {
      infoSourceRef.current.style.opacity = `${0}`;
      infoSourceRef.current.style.pointerEvents = `none`;
      setSourceHoverData("");
    }
  };

  const onClickWatchVideo = () => {
    router.push(
      `/clip/${sourceHoverData.id}?clipId=${sourceHoverData.originId}&id=${sourceHoverData.id}`
    );
  };
  // Annotation Visualization using D3.js
  useEffect(() => {
    if (svgRef && svgContainerRef) {
      const infoBoxTopMargin = 20;
      if (getData) {
        const onMouseSourceEnter = (e, d) => {
          document.body.style.cursor = "auto";
        };
        const onMouseSourceClick = (e, d) => {
          document.body.style.cursor = "auto";
          if (wrapperRef && infoSourceRef) {
            console.log(d);
            setSourceHoverData(d);
            const bbox = e.target.getBoundingClientRect();
            let currentMouseX = bbox.left;
            const boxWidth =
              svgRef.current.clientWidth / annotationData.length - 30;
            infoSourceRef.current.style.width = `${boxWidth}px`;
            infoSourceRef.current.style.height = `${boxWidth}px`;
            infoSourceRef.current.style.opacity = `${1}`;
            infoSourceRef.current.style.top = `${0}px`;
            infoSourceRef.current.style.left = `${
              currentMouseX - boxWidth + 30
            }px`;
            infoSourceRef.current.style.pointerEvents = `auto`;
          }
        };

        const onMouseEnter = (e, d) => {
          document.body.style.cursor = "pointer";
          const mousePos = d3.pointer(e);

          if (d.type === "placeLayer" || d.type === "eventLayer") {
            if (placeAndEventInfoRef) {
              const pAERef = placeAndEventInfoRef.current;
              pAERef.style.opacity = "1";
              setHoverData(d);
            }
          } else {
            if (wrapperRef && infoRef) {
              const wrapperHeight = wrapperRef.current.clientHeight;
              const wrapperWidth = wrapperRef.current.clientWidth;
              const infoBox = infoRef.current;
              const addHeight = wrapperHeight * (2 / 3);
              const infoBoxHeight = infoBox.clientHeight;
              const infoBoxWidth = infoBox.clientWidth;
              setHoverData(d);

              gsap.to(infoBox, {
                css: { opacity: 1 },
                duration: 0.5,
              });
              infoBox.style.top = `${
                addHeight + mousePos[1] - infoBoxHeight - infoBoxTopMargin
              }px`;

              let currentMouseX = mousePos[0] - infoBoxWidth / 2;
              if (mousePos[0] + infoBoxWidth / 2 > wrapperWidth) {
                currentMouseX = wrapperWidth - infoBoxWidth;
              }
              if (mousePos[0] - infoBoxWidth / 2 < 0) {
                currentMouseX = 0;
              }
              infoBox.style.left = `${currentMouseX}px`;
            }
          }
        };
        const onMouseMove = (e, d) => {
          const mousePos = d3.pointer(e);

          if (d.type === "placeLayer" || d.type === "eventLayer") {
            if (placeAndEventInfoRef) {
              const pAERef = placeAndEventInfoRef.current;
              pAERef.style.opacity = "1";
              setHoverData(d);
            }
          } else {
            if (wrapperRef && infoRef) {
              const wrapperHeight = wrapperRef.current.clientHeight;
              const wrapperWidth = wrapperRef.current.clientWidth;
              const infoBox = infoRef.current;
              const addHeight = wrapperHeight * (2 / 3);
              const infoBoxHeight = infoBox.clientHeight;
              const infoBoxWidth = infoBox.clientWidth;
              setHoverData(d);
              gsap.to(infoBox, {
                css: { opacity: 1 },
                duration: 0.5,
              });
              infoBox.style.top = `${
                addHeight + mousePos[1] - infoBoxHeight - infoBoxTopMargin
              }px`;

              let currentMouseX = mousePos[0] - infoBoxWidth / 2;
              if (mousePos[0] + infoBoxWidth / 2 > wrapperWidth) {
                currentMouseX = wrapperWidth - infoBoxWidth;
              }
              if (mousePos[0] - infoBoxWidth / 2 < 0) {
                currentMouseX = 0;
              }
              infoBox.style.left = `${currentMouseX}px`;
            }
          }
        };
        const onMouseLeave = (e, d) => {
          document.body.style.cursor = "auto";
          if (infoRef) {
            const infoBox = infoRef.current;
            gsap.killTweensOf(infoBox);
            setHoverData(null);
            gsap.to(infoBox, {
              css: { opacity: 0 },
              duration: 0.3,
            });
            // infoBox.style.display = "none"
          }
          if (placeAndEventInfoRef) {
            const pAERef = placeAndEventInfoRef.current;
            setHoverData(null);

            pAERef.style.opacity = "0";
          }
        };
        const onClick = ({ inVlaue, video }) => {
          if (edit) {
            onClickProgressBar(inVlaue, edit);
          } else {
            if (!clip) {
              videoRef.current.currentTime = inVlaue;
              setCurrentTime(inVlaue);
            } else {
              videoRef.current.currentTime = data.in + inVlaue;
              setCurrentTime(inVlaue);
            }
          }
        };

        const svg = d3
          .select(svgRef.current)
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("preserveAspectRatio", "xMidYMid meet")
          .attr("id", "mainSVG");

        const canvasSize = {
          width: svg.node().clientWidth,
          height: svg.node().clientHeight / 3,
        };
        const globalGourp = svg.append("g");
        globalGourp
          .attr("id", "mainG")
          .attr("transform", `translate(0,${canvasSize.height * 2})`);

        let scaleLinear = d3.scaleLinear([0, duration], [0, canvasSize.width]);
        const annotationRowHeight = canvasSize.height / 4;

        // edit video divider
        if (edit) {
          const dividerGroup = svg.append("g");
          dividerGroup.attr("transform", `translate(0,0)`);
          dividerGroup
            .append("g")
            .attr("id", "divideGroupBar")
            .selectAll("rect")
            .data(annotationData)
            .join("rect")
            .attr("width", 1)
            .attr("height", svg.node().clientHeight)
            .attr("x", function (d) {
              return `${scaleLinear(d.newOut)}px`;
            })
            .attr("y", 0)
            .attr("fill", "rgba(255, 255, 255, 0.5)");

          dividerGroup
            .append("g")
            .attr("id", "divideGroupBox")
            .selectAll("rect")
            .data(annotationData)
            .join("g")
            .attr(
              "transform",
              (d) => `translate(${scaleLinear(d.newOut) - 30}, 0)`
            )
            .each(function (d) {
              const group = d3.select(this);
              // Append rectangle for the box
              group
                .append("rect")
                .attr("width", 30)
                .attr("height", 30)
                .attr("fill", "rgba(255, 255, 255, 0.8)");

              // Append the icon path inside each box
              group
                .append("path")
                .attr("d", "M19.5 19.5L4.5 4.5M4.5 4.5v11.25M4.5 4.5h11.25")
                .attr("stroke-linecap", "round")
                .attr("stroke-linejoin", "round")
                .attr("stroke-width", 1.5)
                .attr("stroke", "currentColor")
                .attr("fill", "none")
                .attr("transform", "translate(5, 5)"); // Adjust positioning as needed
            })
            .on("mouseenter", onMouseSourceEnter)
            .on("click", onMouseSourceClick);
        }

        // create category box
        globalGourp
          .append("g")
          .attr("id", "cateGroup")
          .selectAll("rect")
          .data(getData.categoryList.sort((a, b) => a.in - b.in))
          .join("rect")
          .attr("width", function (d) {
            return `${scaleLinear(d.out - d.in)}px`;
          })
          .attr("height", annotationRowHeight)
          .attr("x", function (d) {
            return `${scaleLinear(d.in)}px`;
          })
          .attr("y", function (d, i) {
            return `${canvasSize.height - annotationRowHeight}px`;
          })
          .attr("fill", function (d, i) {
            return `${d.category.color}`;
          })
          // .style("mix-blend-mode", "multiply")
          .attr("opacity", 1)
          .style("stroke", "black")
          .style("stroke-width", "0.5px")
          .on("mouseenter", onMouseEnter)
          .on("mouseleave", onMouseLeave)
          .on("mousemove", onMouseMove)
          .on("click", function (event, value) {
            onClick({ inVlaue: value.in, video: videoRef });
          });

        // create tag box
        globalGourp
          .append("g")
          .attr("id", "tagGroup")
          .selectAll("rect")
          .data(getData.tagList)
          .join("rect")
          .attr("width", function (d) {
            return `${scaleLinear(d.out - d.in)}px`;
          })
          .attr("height", annotationRowHeight)
          .attr("x", function (d) {
            return `${scaleLinear(d.in)}px`;
          })
          .attr("y", function (d, i) {
            return `${canvasSize.height - annotationRowHeight * 2}px`;
          })
          .attr("fill", "#3118E8")
          .style("stroke", "black")
          .style("stroke-width", "0.5px")
          .on("mouseenter", onMouseEnter)
          .on("mouseleave", onMouseLeave)
          .on("mousemove", onMouseMove)
          .on("click", function (event, value) {
            onClick({ inVlaue: value.in, video: videoRef });
          });

        // creat ref
        globalGourp
          .append("g")
          .attr("id", "refGroup")
          .selectAll("circle")
          .data(getData.refList)
          .join("circle")
          .attr("r", annotationRowHeight / 3 / 2)
          .attr("cx", function (d) {
            return `${scaleLinear(d.in) + annotationRowHeight / 3 / 2}px`;
          })
          .attr("cy", function (d, i) {
            return `${
              canvasSize.height -
              annotationRowHeight * 2 -
              annotationRowHeight / 3 / 2
            }px`;
          })
          .attr("fill", "#FFFFFF")
          .style("stroke", "#EC6735")
          .style("stroke-width", "4.5px")
          .on("mouseenter", onMouseEnter)
          .on("mouseleave", onMouseLeave)
          .on("mousemove", onMouseMove)
          .on("click", function (event, value) {
            onClick({ inVlaue: value.in, video: videoRef });
          });
        // creat narration
        globalGourp
          .append("g")
          .attr("id", "narrationGroup")
          .selectAll("circle")
          .data(getData.narrationList)
          .join("circle")
          .attr("r", annotationRowHeight / 3 / 2)
          .attr("cx", function (d) {
            return `${scaleLinear(d.in) + annotationRowHeight / 3 / 2}px`;
          })
          .attr("cy", function (d, i) {
            return `${
              canvasSize.height -
              annotationRowHeight * 2 -
              (annotationRowHeight / 3 / 2) * 4
            }px`;
          })
          .attr("fill", "#8BA5F8")
          .style("stroke", "#000")
          .style("stroke-width", "0.5px")
          .on("mouseenter", onMouseEnter)
          .on("mouseleave", onMouseLeave)
          .on("mousemove", onMouseMove)
          .on("click", function (event, value) {
            onClick({ inVlaue: value.in, video: videoRef });
          });

        // create event box
        globalGourp
          .append("g")
          .attr("id", "eventGroup")
          .selectAll("rect")
          .data(getData.eventList)
          .join("rect")
          .attr("width", function (d) {
            return `${annotationRowHeight / 3}px`;
          })
          .attr("height", annotationRowHeight / 3)
          .attr("x", function (d) {
            return `${scaleLinear(d.in)}px`;
          })
          .attr("y", function (d, i) {
            return `${
              canvasSize.height -
              (annotationRowHeight * 4 - annotationRowHeight / 2)
            }px`;
          })
          .attr("fill", "#3118E8")
          .style("stroke", "#F1A73D")
          .style("stroke-width", "4.5px")
          .on("mouseenter", onMouseEnter)
          .on("mouseleave", onMouseLeave)
          .on("mousemove", onMouseMove)
          .on("click", function (event, value) {
            onClick({ inVlaue: value.in, video: videoRef });
          });
        // create place box
        globalGourp
          .append("g")
          .attr("id", "placeGroup")
          .selectAll("circle")
          .data(getData.placeList)
          .join("circle")
          .attr("r", annotationRowHeight / 3 / 2)
          // .attr("width", function(d){
          //    return `${annotationRowHeight/3}px`
          // })
          // .attr("height", annotationRowHeight/3)
          .attr("cx", function (d) {
            return `${scaleLinear(d.in) + annotationRowHeight / 3 / 2}px`;
          })
          .attr("cy", function (d, i) {
            return `${
              canvasSize.height -
              (annotationRowHeight * 4 - annotationRowHeight / 3 / 2 - 2.25)
            }px`;
          })
          .attr("fill", "#3118E8")
          .style("stroke", "#EC6735")
          .style("stroke-width", "4.5px")
          .on("mouseenter", onMouseEnter)
          .on("mouseleave", onMouseLeave)
          .on("mousemove", onMouseMove)
          .on("click", function (event, value) {
            onClick({ inVlaue: value.in, video: videoRef });
          });
      }
    }
  }, [getData]);

  useEffect(() => {
    const updateViewBox = () => {
      let svgContainer = document.querySelector("#svgContainer");

      const globalGroup = d3.select("#mainG");
      const canvasSize = {
        width: svgContainer.clientWidth,
        height: svgContainer.clientHeight / 3,
      };
      let scaleLinear = d3.scaleLinear([0, duration], [0, canvasSize.width]);
      const annotationRowHeight = canvasSize.height / 4;

      if (edit) {
        d3.select("#divideGroupBar")
          .selectAll("rect")
          .attr("width", 1)
          .attr("height", svgContainer.clientHeight)
          .attr("x", function (d) {
            return `${scaleLinear(d.newOut)}px`;
          })
          .attr("y", 0);

        d3.select("#divideGroupBox")
          .selectAll("g")
          .attr(
            "transform",
            (d) => `translate(${scaleLinear(d.newOut) - 30}, 0)`
          );
      }

      globalGroup.attr("transform", `translate(0,${canvasSize.height * 2})`);

      // category Resize
      globalGroup
        .select("#cateGroup")
        .selectAll("rect")
        .attr("width", function (d) {
          return `${scaleLinear(d.out - d.in)}px`;
        })
        .attr("height", annotationRowHeight)
        .attr("x", function (d) {
          return `${scaleLinear(d.in)}px`;
        })
        .attr("y", function (d, i) {
          return `${canvasSize.height - annotationRowHeight}px`;
        })
        .attr("fill", function (d, i) {
          return `${d.category.color}`;
        });

      //  tag Reszie
      globalGroup
        .select("#tagGroup")
        .selectAll("rect")
        .attr("width", function (d) {
          return `${scaleLinear(d.out - d.in)}px`;
        })
        .attr("height", annotationRowHeight)
        .attr("x", function (d) {
          return `${scaleLinear(d.in)}px`;
        })
        .attr("y", function (d, i) {
          return `${canvasSize.height - annotationRowHeight * 2}px`;
        });

      //  ref Resize
      globalGroup
        .select("#refGroup")
        .selectAll("circle")
        .attr("r", annotationRowHeight / 3 / 2)
        .attr("cx", function (d) {
          return `${scaleLinear(d.in) + annotationRowHeight / 3 / 2}px`;
        })
        .attr("cy", function (d, i) {
          return `${
            canvasSize.height -
            annotationRowHeight * 2 -
            annotationRowHeight / 3 / 2
          }px`;
        });
      //  narration Resize
      globalGroup
        .select("#narrationGroup")
        .selectAll("circle")
        .attr("r", annotationRowHeight / 3 / 2)
        .attr("cx", function (d) {
          return `${scaleLinear(d.in) + annotationRowHeight / 3 / 2}px`;
        })
        .attr("cy", function (d, i) {
          return `${
            canvasSize.height -
            annotationRowHeight * 2 -
            (annotationRowHeight / 3 / 2) * 4
          }px`;
        });

      //  Event Resize
      globalGroup
        .select("#eventGroup")
        .selectAll("rect")
        .attr("width", function (d) {
          return `${annotationRowHeight / 3}px`;
        })
        .attr("height", annotationRowHeight / 3)
        .attr("x", function (d) {
          return `${scaleLinear(d.in)}px`;
        })
        .attr("y", function (d, i) {
          return `${
            canvasSize.height -
            (annotationRowHeight * 4 - annotationRowHeight / 2)
          }px`;
        });
      //  Place Resize
      globalGroup
        .select("#placeGroup")
        .selectAll("circle")
        .attr("r", annotationRowHeight / 3 / 2)
        .attr("cx", function (d) {
          return `${scaleLinear(d.in) + annotationRowHeight / 3 / 2}px`;
        })
        .attr("cy", function (d, i) {
          return `${
            canvasSize.height -
            (annotationRowHeight * 4 - annotationRowHeight / 3 / 2 - 2.25)
          }px`;
        });
    };

    window.addEventListener("resize", updateViewBox);
    return () => window.removeEventListener("resize", updateViewBox);
  }, []);

  if (annotationLoading || !Boolean(getData)) {
    return;
  }
  return (
    <div
      ref={wrapperRef}
      className="absolute top-0 left-0 w-full h-full bg-none"
    >
      <div
        ref={infoRef}
        className="absolute opacity-0 pointer-events-none select-none overflow-hidden top-0 right-0 z-[30] bg-none text-black w-fit h-fit flex"
      >
        {hoverData && (
          <div className="w-full h-full">
            <OverViewBox data={hoverData} fakeData={getData} />
          </div>
        )}
      </div>
      <div
        ref={placeAndEventInfoRef}
        className="absolute opacity-0 pointer-events-none select-none overflow-hidden top-4 right-4 z-[30] w-fit h-fit flex"
      >
        {hoverData && (
          <div className="flex flex-col w-full h-full">
            <div className="w-full h-full">
              <OverViewBox data={hoverData} fakeData={getData} diagramatic={true} />
            </div>
          </div>
        )}
      </div>

      {
        <div
          ref={infoSourceRef}
          onMouseLeave={onMouseSourceLeave}
          className={`absolute opacity-0 pointer-events-none select-none top-0 right-0 z-[30] p-2 bg-white text-black w-[400px] h-[350px]`}
        >
          <div>
            Source: Title of the Original Video here lore ups dolor stat
            mukdasld edema.
          </div>
          <div
            onClick={onClickWatchVideo}
            className="border border-black rounded-lg px-2 py-1 cursor-pointer mt-2"
          >
            Watch Video
          </div>
        </div>
      }
      <div
        ref={svgContainerRef}
        id={"svgContainer"}
        className={`${
          toggleShow.view === "diagramatic" && playToggle
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full"
        } absolute bottom-0 left-0 z-[20] w-full h-full transition-all duration-1000`}
      >
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default DiagramaticView;

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
    const dataG = d3.select("#dataGroup");

    const svg = d3.select(svgRef.current);
    if (toggleShow.view === "diagramatic") {
      svg.style("display", "block")
    

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
      // data toggle
      if (toggleShow.data) {
        dataG.style("display", "block");
      } else {
        dataG.style("display", "none");
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

          if (d.type === "placeLayer" || d.type === "eventLayer" || d.type === "dataLayer") {
            if (placeAndEventInfoRef) {
              const pAERef = placeAndEventInfoRef.current;
              // pAERef.style.opacity = "1";
             
              gsap.to(pAERef, {
                css: { opacity: 1 },
                duration: 0.7
              });
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
              gsap.to(infoBox, {
                css: { opacity: 1 },
                duration: 0.6
              });
             
            }
          }
        };
        const onMouseMove = (e, d) => {
          const mousePos = d3.pointer(e);

          if (d.type === "placeLayer" || d.type === "eventLayer" || d.type === "dataLayer") {
            if (placeAndEventInfoRef) {
              const pAERef = placeAndEventInfoRef.current;
              // pAERef.style.opacity = "1";
              // setHoverData(d);
            }
          } else {
            if (wrapperRef && infoRef) {
              const wrapperHeight = wrapperRef.current.clientHeight;
              const wrapperWidth = wrapperRef.current.clientWidth;
              const infoBox = infoRef.current;
              const addHeight = wrapperHeight * (2 / 3);
              const infoBoxHeight = infoBox.clientHeight;
              const infoBoxWidth = infoBox.clientWidth;
              // setHoverData(d);
             
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
              // gsap.to(infoBox, {
              //   css: { opacity: 1 },
              //   duration: 0.5,
              // });
            }
          }
        };
        const onMouseLeave = (e, d) => {
          document.body.style.cursor = "auto";
          if (d.type === "placeLayer" || d.type === "eventLayer" || d.type === "dataLayer") {
            if (placeAndEventInfoRef) {
              const pAERef = placeAndEventInfoRef.current;
              gsap.killTweensOf(pAERef);
              setHoverData(null);
              pAERef.style.opacity = "0";
            }
          } else{
            const infoBox = infoRef.current;
            gsap.killTweensOf(infoBox);
            setHoverData(null);
            gsap.to(infoBox, {
              css: { opacity: 0 },
              duration: 0.0,
            });

            // infoBox.style.display = "none"
          }
          // document.body.style.cursor = "auto";
          // if (infoRef) {
          //   const infoBox = infoRef.current;
          //   gsap.killTweensOf(infoBox);
          //   setHoverData(null);
          //   gsap.to(infoBox, {
          //     css: { opacity: 0 },
          //     duration: 0.0,
          //   });
          //   // infoBox.style.display = "none"
          // }
          // if (placeAndEventInfoRef) {
          //   const pAERef = placeAndEventInfoRef.current;
          //   setHoverData(null);

          //   pAERef.style.opacity = "0";
          // }
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
          .attr("id", "mainSVG")
        

        const canvasSize = {
          width: svg.node().clientWidth,
          height: svg.node().clientHeight / 3
        };

        const globalGourp = svg.append("g");
        globalGourp
          .attr("id", "mainG")
          .attr("transform", `translate(0,${canvasSize.height * 2})`)
       

        let scaleLinear = d3.scaleLinear([0, duration], [0, canvasSize.width])
        const annotationRowHeight = canvasSize.height / 10
        const circleRadius = annotationRowHeight / 2

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
          .attr("height", annotationRowHeight * 2)
          .attr("x", function (d) {
            return `${scaleLinear(d.in)}px`;
          })
          .attr("y", function (d, i) {
            return `${canvasSize.height - (annotationRowHeight * 2)}px`;
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
          .attr("height", annotationRowHeight * 2)
          .attr("x", function (d) {
            return `${scaleLinear(d.in)}px`;
          })
          .attr("y", function (d, i) {
            return `${canvasSize.height - (annotationRowHeight * 2) * 2}px`;
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
          .selectAll("g")
          .data(getData.refList)
          .join("g")
          .each(function(d){
            const g = d3.select(this)

            g.append("circle")
            .attr("class", "outer-circle")
            .attr("r", circleRadius)
            .attr("cx", function (d) {
              return `${scaleLinear(d.in) + circleRadius / 2}px`;
            })
            .attr("cy", function (d, i) {
              return `${
                canvasSize.height - ((annotationRowHeight * 2) * 2) - (circleRadius)
              }px`;
            })
            .attr("fill", "#EC6735")

            // inside
            g.append("circle")
            .attr("class", "inner-circle")
            .attr("r", circleRadius - 3)
            .attr("cx", function (d) {
              return `${scaleLinear(d.in) + circleRadius / 2}px`;
            })
            .attr("cy", function (d, i) {
              return `${
                canvasSize.height - ((annotationRowHeight * 2) * 2) - (circleRadius)
              }px`;
            })
            .attr("fill", "#FFFFFF")
  
          })
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
          .selectAll("g")
          .data(getData.narrationList)
          .join("g")
          .each(function(d){
            const g = d3.select(this)

            g.append("circle")
            .attr("class", "outer-circle")
            .attr("r", circleRadius)
            .attr("cx", function (d) {
              return `${scaleLinear(d.in) + circleRadius / 2}px`;
            })
            .attr("cy", function (d, i) {
              return `${
                canvasSize.height - ((annotationRowHeight * 2) * 2) - (circleRadius) - (circleRadius * 2)
              }px`;
            })
            .attr("fill", "#000")

            //inside
            g.append("circle")
            .attr("class", "inner-circle")
            .attr("r", circleRadius - 0.5)
            .attr("cx", function (d) {
              return `${scaleLinear(d.in) + circleRadius / 2}px`;
            })
            .attr("cy", function (d, i) {
              return `${
                canvasSize.height - ((annotationRowHeight * 2) * 2) - (circleRadius) - (circleRadius * 2)
              }px`;
            })
            .attr("fill", "#8BA5F8")
          })
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
          .selectAll("g")
          .data(getData.eventList)
          .join("g")
          .each(function(d){
            const g = d3.select(this)
            // outside
            g.append("rect")
            .attr("class", "outer-circle")
            .attr("width", function (d) {
              return `${circleRadius * 2}px`;
            })
            .attr("height", circleRadius * 2)
            .attr("x", `${scaleLinear(d.in)}px`)
            .attr("y", `${
                canvasSize.height - ((annotationRowHeight * 2) * 2) - (circleRadius) - (circleRadius * 3) - annotationRowHeight
              }px`)
            .attr("fill", "#F1A73D")

            // inside
            g.append("rect")
            .attr("class", "inner-circle")
            .attr("width", function (d) {
              return `${circleRadius * 2 - 6}px`;
            })
            .attr("height", circleRadius * 2 - 6)
            .attr("x", `${scaleLinear(d.in) + 3}px`)
            .attr("y", `${
                canvasSize.height - ((annotationRowHeight * 2) * 2) - (circleRadius) - (circleRadius * 3) - annotationRowHeight + 3
              }px`)
            .attr("fill", "#3118E8")
           
          })
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
          .selectAll("g")
          .data(getData.placeList)
          .join("g")
          .each(function(d){
            const g = d3.select(this)
            //outside
            g.append("circle")
            .attr("class", "outer-circle")
            .attr("r", circleRadius)
            .attr("cx", `${scaleLinear(d.in) + circleRadius}px`)
            .attr("cy", `${canvasSize.height - ((annotationRowHeight * 2) * 2) - (circleRadius) - (circleRadius * 4) - annotationRowHeight}px`)
            .attr("fill", "#EC6735")
            //inside
            g.append("circle")
            .attr("class", "inner-circle")
            .attr("r", circleRadius - 3)
            .attr("cx", `${scaleLinear(d.in) + circleRadius}px`)
            .attr("cy", `${canvasSize.height - ((annotationRowHeight * 2) * 2) - (circleRadius) - (circleRadius * 4) - annotationRowHeight}px`)
            .attr("fill", "#3118E8")
            })
          .on("mouseenter", onMouseEnter)
          .on("mouseleave", onMouseLeave)
          .on("mousemove", onMouseMove)
          .on("click", function (event, value) {
            onClick({ inVlaue: value.in, video: videoRef });
          });
          // Datagroup
        if(getData.dataList){
          globalGourp
          .append("g")
          .attr("id", "dataGroup")
          .selectAll("g")
          .data(getData.dataList)
          .join("g")
          .each(function (d) {
            const g = d3.select(this);
            // outside
            g.append("circle")
            .attr("class", "outer-circle")
              .attr("r", circleRadius)
              .attr("cx", `${scaleLinear(d.in) + circleRadius}px`)
              .attr("cy", `${canvasSize.height - ((annotationRowHeight * 2) * 2) - (circleRadius) - (circleRadius * 6) - annotationRowHeight}px`)
              .attr("fill", "#fff")
              // inside
              g.append("circle")
              .attr("class", "inner-circle")
              .attr("r", circleRadius - 3)  // 원 크기를 줄여 안쪽에 위치
              .attr("cx", `${scaleLinear(d.in) + circleRadius}px`)
              .attr("cy", `${canvasSize.height - ((annotationRowHeight * 2) * 2) - (circleRadius) - (circleRadius * 6) - annotationRowHeight}px`)
              .attr("fill", "#000");
          })
          .on("mouseenter", onMouseEnter)
          .on("mouseleave", onMouseLeave)
          .on("mousemove", onMouseMove)
          .on("click", function (event, value) {
            onClick({ inVlaue: value.in, video: videoRef });
          });
        }
       
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
      const annotationRowHeight = canvasSize.height / 10
      const circleRadius = annotationRowHeight / 2

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
        .attr("height", annotationRowHeight * 2)
        .attr("x", function (d) {
          return `${scaleLinear(d.in)}px`;
        })
        .attr("y", function (d, i) {
          return `${canvasSize.height - (annotationRowHeight * 2)}px`;
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
        .attr("height", annotationRowHeight * 2)
        .attr("x", function (d) {
          return `${scaleLinear(d.in)}px`;
        })
        .attr("y", function (d, i) {
          return `${canvasSize.height - (annotationRowHeight * 2) * 2}px`;
        });

      //  ref Resize
      const refGroup = globalGroup
        .select("#refGroup")
       
      refGroup
      .selectAll(".outer-circle")
      .attr("r", circleRadius)
      .attr("cx", function (d) {
        return `${scaleLinear(d.in) + circleRadius / 2}px`;
      })
      .attr("cy", function (d, i) {
        return `${canvasSize.height - ((annotationRowHeight * 2) * 2) - (circleRadius)}px`;
      });
      refGroup
      .selectAll(".inner-circle")
      .attr("r", circleRadius - 3)
      .attr("cx", function (d) {
        return `${scaleLinear(d.in) + circleRadius / 2}px`;
      })
      .attr("cy", function (d, i) {
        return `${canvasSize.height - ((annotationRowHeight * 2) * 2) - (circleRadius)}px`;
      });

      //  narration Resize
      const narrationGroup = globalGroup
        .select("#narrationGroup")

        narrationGroup
        .selectAll(".outer-circle")
        .attr("r", circleRadius)
        .attr("cx", function (d) {
          return `${scaleLinear(d.in) + circleRadius / 2}px`
        })
        .attr("cy", function (d, i) {
          return `${canvasSize.height - ((annotationRowHeight * 2) * 2) - (circleRadius) - (circleRadius * 2)}px`;
        });
        narrationGroup
        .selectAll(".inner-circle")
        .attr("r", circleRadius - 0.5)
        .attr("cx", function (d) {
          return `${scaleLinear(d.in) + circleRadius / 2}px`
        })
        .attr("cy", function (d, i) {
          return `${canvasSize.height - ((annotationRowHeight * 2) * 2) - (circleRadius) - (circleRadius * 2)}px`;
        });


      //  Event Resize
      const eventGroup = globalGroup
        .select("#eventGroup")

        eventGroup
        .selectAll(".outer-circle")
        .attr("width", function (d) {
          return `${circleRadius * 2}px`;
        })
        .attr("height", circleRadius * 2)
        .attr("x", function (d) {
          return `${scaleLinear(d.in)}px`;
        })
        .attr("y", function (d, i) {
          return `${canvasSize.height - ((annotationRowHeight * 2) * 2) - (circleRadius) - (circleRadius * 3) - annotationRowHeight}px`;
        });
        eventGroup
        .selectAll(".inner-circle")
        .attr("width", function (d) {
          return `${circleRadius * 2 - 6}px`;
        })
        .attr("height", `${circleRadius * 2 - 6}px`)
        .attr("x", function (d) {
          return `${scaleLinear(d.in) + 3}px`;
        })
        .attr("y", function (d, i) {
          return `${canvasSize.height - ((annotationRowHeight * 2) * 2) - (circleRadius) - (circleRadius * 3) - annotationRowHeight + 3}px`;
        });

      //  Place Resize
      const placeGroup = globalGroup
        .select("#placeGroup")

        placeGroup
        .selectAll(".outer-circle")
        .attr("r", circleRadius)
        .attr("cx", function (d) {
          return `${scaleLinear(d.in) + circleRadius}px`;
        })
        .attr("cy", function (d, i) {
          return `${canvasSize.height - ((annotationRowHeight * 2) * 2) - (circleRadius) - (circleRadius * 4) - annotationRowHeight}px`;
        });
        placeGroup
        .selectAll(".inner-circle")
        .attr("r", circleRadius - 3)
        .attr("cx", function (d) {
          return `${scaleLinear(d.in) + circleRadius}px`;
        })
        .attr("cy", function (d, i) {
          return `${canvasSize.height - ((annotationRowHeight * 2) * 2) - (circleRadius) - (circleRadius * 4) - annotationRowHeight}px`;
        });

      //  data Resize
      const dataGroup = globalGroup
        .select("#dataGroup")

        dataGroup
        .selectAll(".outer-circle")
        .attr("r", circleRadius)
        .attr("cx", function (d) {
          return `${scaleLinear(d.in) + circleRadius}px`;
        })
        .attr("cy", function (d, i) {
          return `${canvasSize.height - ((annotationRowHeight * 2) * 2) - (circleRadius) - (circleRadius * 6) - annotationRowHeight}px`;
        });
        dataGroup
        .selectAll(".inner-circle")
        .attr("r", circleRadius - 3)
        .attr("cx", function (d) {
          return `${scaleLinear(d.in) + circleRadius}px`;
        })
        .attr("cy", function (d, i) {
          return `${canvasSize.height - ((annotationRowHeight * 2) * 2) - (circleRadius) - (circleRadius * 6) - annotationRowHeight}px`;
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
        {hoverData && (hoverData.type !== "eventLayer" && hoverData.type !== "placeLayer" && hoverData.type !== "dataLayer") && (
         
            <OverViewBox data={hoverData} fakeData={getData} />
          
        )}
      </div>
      <div
        ref={placeAndEventInfoRef}
        className="absolute opacity-0 pointer-events-none select-none overflow-hidden top-4 right-4 z-[30] w-fit h-fit flex"
      >
        {(hoverData && (hoverData.type === "eventLayer" || hoverData.type === "placeLayer" || hoverData.type === "dataLayer")) && (
              <OverViewBox data={hoverData} fakeData={getData} diagramatic={true} />
          
       
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

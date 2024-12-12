import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
const CTVis = ({ data, bgColor, totalDuration }) => {
  const svgRef = useRef(null);
  const svgContainerRef = useRef(null);
  const [toggleGrid, setToggleGrid] = useState(false)

  const createGrid = ({ data, bgColor = "#fff" }) => {
    if (svgContainerRef && svgRef) {
      console.log(data);
      const svgContainerSize = {
        width: svgContainerRef.current?.clientWidth - 10,
        height: svgContainerRef.current?.clientHeight - 10,
      };

      const k = svgContainerSize.height / svgContainerSize.width;

      const x = d3
        .scaleLinear()
        .domain([0, 60])
        .range([0, svgContainerSize.width]);
      //   const x = d3
      //     .scaleLinear()
      //     .domain([0, Math.floor(totalDuration)])
      //     // .domain([0, Math.floor(totalDuration)])
      //     // .domain([-4.5, 4.5])
      //     .range([0, svgContainerSize.width]);
      const y = d3
        .scaleLinear()
        .domain([0, Math.floor(totalDuration / 60) * k]) // y축 도메인을 분 단위로 설정
        .range([svgContainerSize.height, 0]);
      //   const y = d3
      //     .scaleLinear()
      //     .domain([0 * k, Math.floor(totalDuration) * k])
      //     .range([svgContainerSize.height, 0]);

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const gGrid = svg.append("g");
      const gItems = svg.append("g");
      const gx = svg.append("g").attr("class","gaxis");
      const gy = svg.append("g").attr("class","gaxis");
      const gaxis = d3.selectAll(".gaxis")
      if(toggleGrid){
          gaxis.attr('visibility','auto')
      }else{
          gaxis.attr('visibility','hidden')
      }

      gItems
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("fill", "red")
        .attr("x", function (d) {
          const remainder = x(parseFloat(d.in) % 60);
          return remainder;
        })
        .attr("y", function (d) {
          const div = y(Math.floor(parseFloat(d.in) / 60)) - 15;
          return div;
        })
        .attr("width", "15px")
        .attr("height", "15px");

      const xAxis = (g, x) =>
        g
          .attr("transform", `translate(0,${svgContainerSize.height})`)
          .call(
            d3
              .axisTop(x)
              .ticks(12)
              .tickValues(x.ticks(12).filter((tick) => Number.isInteger(tick)))
              .tickFormat((d) => `${d}s`)
          )
          .call((g) => g.select(".domain").attr("display", "none"));

      const yAxis = (g, y) =>
        g
          .call(
            d3
              .axisRight(y)
              .ticks(12 * k)
              .tickValues(
                y.ticks(12 * k).filter((tick) => Number.isInteger(tick))
              )
              .tickFormat((d) => `${d}m`)
            //   .tickFormat(d3.format("d"))
          )
          .call((g) => g.select(".domain").attr("display", "none"));

      const grid = (g, x, y) =>
        g
          .attr("stroke", "currentColor")
          .attr("stroke-opacity", 0.1)
          .call((g) =>
            g
              .selectAll(".x")
              .data(x.ticks(12).filter((tick) => Number.isInteger(tick)))
              .join(
                (enter) =>
                  enter
                    .append("line")
                    .attr("class", "x")
                    .attr("y2", svgContainerSize.height),
                (update) => update,
                (exit) => exit.remove()
              )
              .attr("x1", (d) => 0.5 + x(d))
              .attr("x2", (d) => 0.5 + x(d))
          )
          .call((g) =>
            g
              .selectAll(".y")
              .data(y.ticks(12 * k).filter((tick) => Number.isInteger(tick)))
              .join(
                (enter) =>
                  enter
                    .append("line")
                    .attr("class", "y")
                    .attr("x2", svgContainerSize.width),
                (update) => update,
                (exit) => exit.remove()
              )
              .attr("y1", (d) => 0.5 + y(d))
              .attr("y2", (d) => 0.5 + y(d))
          );

      const zoomed = ({ transform }) => {
        const zx = transform.rescaleX(x).interpolate(d3.interpolateRound);
        const zy = transform.rescaleY(y).interpolate(d3.interpolateRound);

        gx.call(xAxis, zx);
        gy.call(yAxis, zy);
    
        gGrid.call(grid, zx, zy);
        gItems.attr("transform", transform);
      };

      const zoom = d3
        .zoom()
        .translateExtent([
          [0, 0],
          [svgContainerSize.width, svgContainerSize.height],
        ])
        .scaleExtent([1, 40])
        .on("zoom", zoomed);

      svg
        .attr("viewBox", [
          0,
          0,
          svgContainerSize.width + 10,
          svgContainerSize.height + 10,
        ])
        .style("background", "white")
        .call(zoom)
        .call(zoom.transform, d3.zoomIdentity.scale(1));
    }
  };

  useEffect(() => {
    createGrid({ data: data, bgColor: bgColor });
  }, [data]);

  useEffect(() => {
    const gaxis = d3.selectAll(".gaxis")
    if(toggleGrid){
        gaxis.attr('visibility','auto')
    }else{
        gaxis.attr('visibility','hidden')
    }
  },[toggleGrid])

  return (
    <div className="w-full flex flex-col gap-4">
        <div className="flex gap-4">
          <div onClick={() => setToggleGrid((prev) => !prev)} className={`w-[32px] flex justify-center items-center aspect-square bg-neutral-800 ${toggleGrid ? "opacity-100" : "opacity-45"} text-white rounded-lg cursor-pointer`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.745 3A23.933 23.933 0 0 0 3 12c0 3.183.62 6.22 1.745 9M19.5 3c.967 2.78 1.5 5.817 1.5 9s-.533 6.22-1.5 9M8.25 8.885l1.444-.89a.75.75 0 0 1 1.105.402l2.402 7.206a.75.75 0 0 0 1.104.401l1.445-.889m-8.25.75.213.09a1.687 1.687 0 0 0 2.062-.617l4.45-6.676a1.688 1.688 0 0 1 2.062-.618l.213.09" />
              </svg>
          </div>
        </div>
        <div ref={svgContainerRef} className="w-full aspect-square flex flex-col gap-2">
          <svg ref={svgRef}></svg>
        </div>
    </div>
  );
};

export default CTVis;

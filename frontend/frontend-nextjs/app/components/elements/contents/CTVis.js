import { useEffect, useRef } from "react";
import * as d3 from "d3";
const CTVis = ({ data, bgColor, totalDuration }) => {
  const svgRef = useRef(null);
  const svgContainerRef = useRef(null);

  const createGrid = ({ data, bgColor = "#fff" }) => {
    if (svgContainerRef && svgRef) {
        console.log(data)
      const svgContainerSize = {
        width: svgContainerRef.current?.clientWidth - 10,
        height: svgContainerRef.current?.clientHeight - 10,
      };

      const k = svgContainerSize.height / svgContainerSize.width;
     
      const x = d3
        .scaleLinear()
        .domain([0, 59])
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
      const gx = svg.append("g");
      const gy = svg.append("g");

      const xAxis = (g, x) => g
      .attr("transform", `translate(0,${svgContainerSize.height})`)
      .call(d3.axisTop(x).ticks(12))
      .call(g => g.select(".domain").attr("display", "none"))

      const yAxis = (g, y) => g
      .call(d3.axisRight(y).ticks(12 * k))
      .call(g => g.select(".domain").attr("display", "none"))

      const grid = (g, x, y) =>
        g
          .attr("stroke", "currentColor")
          .attr("stroke-opacity", 0.1)
          .call((g) =>
            g
              .selectAll(".x")
              .data(x.ticks(12))
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
              .data(y.ticks(12 * k))
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
        // const selectG = d3.select("#testg")
        // selectG.attr("transform", transform)
      
        const zx = transform.rescaleX(x).interpolate(d3.interpolateRound);
        const zy = transform.rescaleY(y).interpolate(d3.interpolateRound);
     
        gx.call(xAxis, zx);
        gy.call(yAxis, zy);
        gGrid.call(grid, zx, zy);
      };
      const zoom = d3.zoom().translateExtent([[0, 0], [svgContainerSize.width , svgContainerSize.height]]).scaleExtent([1, 40]).on("zoom", zoomed);

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
  return (
    <div ref={svgContainerRef} className="w-full aspect-square bg-neutral-200">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default CTVis;

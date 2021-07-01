import React, {useRef, useEffect, useState} from "react";
import {select, line, curveCardinal,axisBottom,axisLeft, scaleLinear,max,zoom, zoomTransform} from "d3";
import "./chart.css";

function LineChart({data, id="myClipPath"}) {
    const useResizeObserver = (ref) =>{
        const [dimensions, setDimensions] = useState(null);
        useEffect(() => {
            const observeTarget = ref.current;
            const resizeObserver = new ResizeObserver((entries)=>{
                entries.forEach(entry=>{
                    setDimensions(entry.contentRect);
                })
            });
            resizeObserver.observe(observeTarget);
            return()=>{
                resizeObserver.unobserve(observeTarget);
        };
        }, [ref]);
        return dimensions;
    }
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [currentZoomState, setCurrentZoomState] = useState();

    // will be called initially and on every data change
    useEffect(() => {
    const svg = select(svgRef.current);
    const svgContent = svg.select(".content");
    const { width, height } =
        dimensions || wrapperRef.current.getBoundingClientRect();

    // scales + line generator
    const xScale = scaleLinear()
        .domain([0, data.length - 1])
        .range([10, 300]);

    if (currentZoomState) {
        const newXScale = currentZoomState.rescaleX(xScale);
        xScale.domain(newXScale.domain());
    }

    const yScale = scaleLinear()
        .domain([0, max(data)])
        .range([height - 10, 10]);

    const lineGenerator = line()
        .x((d, index) => xScale(index))
        .y(d => yScale(d))
        .curve(curveCardinal);

    // render the line
    svgContent
        .selectAll(".myLine")
        .data([data])
        .join("path")
        .attr("class", "myLine")
        .attr("stroke", "black")
        .attr("fill", "none")
        .attr("d", lineGenerator);

    svgContent
        .selectAll(".myDot")
        .data(data)
        .join("circle")
        .attr("class", "myDot")
        .attr("stroke", "black")
        .attr("r", 4)
        .attr("fill", "orange")
        .attr("cx", (value, index) => xScale(index))
        .attr("cy", yScale);

    // axes
    const xAxis = axisBottom(xScale);
    svg
        .select(".x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);

    // zoom
    const zoomBehavior = zoom()
        .scaleExtent([0.5, 5])
        .translateExtent([
        [0, 0],
        [width, height]
        ])
        .on("zoom", () => {
        const zoomState = zoomTransform(svg.node());
        setCurrentZoomState(zoomState);
        });

    svg.call(zoomBehavior);
    }, [currentZoomState, data, dimensions]);
    
return(
    <div>
    <div ref={wrapperRef} style={{marginBottom: "2rem", padding:"0 50px"}}>
        <svg ref={svgRef} className="svg123" style={{overflow:"visible"}}>
            <defs>
                <clipPath id={id}>
                    <rect x="0" y="0" width="100%" height= "100%" />
                </clipPath>
            </defs>
            <g className="content" clipPath={`url(#${id})`}/>
            <g className="x-axis" />
            <g className="y-axis" />
            <g className="brush" />
        </svg>
    </div>
    </div>
)}
export default LineChart;
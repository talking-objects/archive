"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
const SmoothScroll = (props) => {
  const [height, setHeight] = useState(0);
  const viewportRef = useRef(null);
  const fakeRef = useRef(null);

  useEffect(() => {
    const handleResize = (elements) => {
      for (let elem of elements) {
        const crx = elem.contentRect;
        setHeight(crx.height);
      }
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(viewportRef.current);

    const onScroll = () => {
      gsap.to(viewportRef.current, {
        duration: 1,
        y: -window.scrollY,
        ease: "power4.out",
      });
    };

    window.addEventListener("scroll", onScroll);

    // Clean up
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div className="overflow-x-hidden w-screen m-0 fixed" ref={viewportRef}>
        {props.children}
      </div>
      <div
        ref={fakeRef}
        style={{
          height: height,
        }}
      />
    </>
  );
};

export default SmoothScroll;

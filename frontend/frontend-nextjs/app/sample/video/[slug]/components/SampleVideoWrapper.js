"use client";

import {
  MainContainer,
} from "@/app/components/containers/Containers";
import VideoPlayerCon from "@/app/components/containers/players/VideoPlayerCon";
import Contents from "@/app/components/elements/contents/Contents";
import { createFakeAnnotations } from "@/app/utils/hooks/etc";
import { getAllAnnotations, getVideo } from "@/app/utils/hooks/pandora_api";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const SampleVideoWrapper = () => {
  const params = useParams();
  const [getVideoData, setVideoData] = useState(null);
  const { isLoading, data, error } = getVideo({ pId: "Y" });
  const {data:annotationData, isLoading:annotationLoading} = getAllAnnotations({itemId:"Y"})
  const videoContainerRef = useRef(null);
  const [showContentVideo, setShowContentVideo] = useState(false);
  const [getCurrentTimeForMini, setCurrentTimeForMini] = useState(0)
  const [sampleData, setSampleData] = useState(null)
 

  useEffect(() => {
    const CATEGORYSVALUE = [
      {
         slug: "identity",
         value: "Identity",
         color: "#9E21E8"
      },
      {
         slug: "knowledge",
         value: "Knowledge",
         color: "#8BA5F8"
      },
      {
         slug: "artistic_reflections",
         value: "Artistic Reflections",
         color: "#691220"
      },
      {
         slug: "restitution",
         value: "Restitution",
         color: "#EC6735"
      },
      {
         slug: "memory",
         value: "Memory and The Imaginary",
         color: "#F1A73D"
      },
      
   ]
       d3.csv("/sample/toa-sample.csv").then(function(data){
         console.log(data)
        const refLayer = data.filter((val) => {
          if(val.layer.includes("References Layer")){
            return val
          }
        }).map((val) => {
          return {
            type: "referenceLayer",
            in: parseInt(val.time_start),
            out: parseInt(val.time_end),
            value: val.input
          }
        })
        const cateLayer = data.filter((val) => {
          if(val.layer.includes("Categories")){
            return val
          }
        }).map((val) => {
          // console.log(JSON.parse(val.input))
          const obj = val.input.split('\n').reduce((acc, line) => {
            const [key, value] = line.split(':').map(item => item.trim());
            acc[key] = value === 'true'; // 문자열 "true"/"false"를 불리언으로 변환
            return acc;
          }, {});
          console.log(obj)
          return {
            type: "categoryLayer",
            value: obj,
            in: parseInt(val.time_start),
            out: parseInt(val.time_end),
            category: CATEGORYSVALUE[Math.floor(Math.random() * CATEGORYSVALUE.length)],
          }
        })
  
        const narrationLayer = data.filter((val) => {
          if(val.layer.includes("Narration")){
            return val
          }
        }).map((val) => {
          return {
            type: "narrationLayer",
            in: parseInt(val.time_start),
            out: parseInt(val.time_end),
            value: val.input
          }
        })
  
        const tagLayer = data.filter((val) => {
          if(val.layer.includes("Tag")){
            return val
          }
        }).map((val) => {
          return {
            type: "tagLayer",
            in: parseInt(val.time_start),
            out: parseInt(val.time_end),
            value: val.input.split(" ").map((val) => val.trim())
          }
        })
  
        const placeLayer = data.filter((val) => {
          if(val.layer.includes("Data")){
            return val
          }
        }).map((val) => {
          // console.log(JSON.parse(val.input))
          const obj = val.input.split('\n').reduce((acc, line) => {
            if (line.trim()) { // 빈 줄 무시
              const [key, value] = line.split(':').map(item => item.trim());
              acc[key] = value || null; // 값이 비어 있으면 null로 설정
            }
            return acc;
          }, {});
          // return val
          return {
            type: "placeLayer",
            value: obj,
            in: parseInt(val.time_start),
            out: parseInt(val.time_end),
            position: {
              lat: 52.5200 + Math.floor((Math.random() - 0.5) * 10) ,
              long: 13.4050 + Math.floor((Math.random() - 0.5) * 10) 
            }
          }
        })
  
        let eventLayer = [];
        const duration = 10
      function getRandomDate(start, end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const randomTime = Math.random() * (endDate.getTime() - startDate.getTime()) + startDate.getTime();
        return new Date(randomTime);
    }
      for(let i = 0; i < 5; i++){
         const randomIn = Math.floor(Math.random() * duration)
         const outValue = 5
         const randomOut = randomIn + outValue >= duration ? duration : randomIn + outValue
         const now =  new Date()
         const startDate = getRandomDate('1900-01-01', now)
         const endDate = new Date(startDate);
         endDate.setFullYear(startDate.getFullYear() + ((Math.random() * 5) + 1))
         const event = {
            idx: i,
            type: "eventLayer",
            in: randomIn,
            out:randomOut,
            startDate: startDate,
            endDate: endDate
        
         };
         eventLayer.push(event)
      }
  
      setSampleData({
        categoryList: cateLayer,
        eventList: eventLayer,
        narrationList: narrationLayer,
        placeList: placeLayer,
        refList: refLayer,
        tagList: tagLayer
      })
   
        return {
          categoryList: cateLayer,
          eventList: eventLayer,
          narrationList: narrationLayer,
          placeList: placeLayer,
          refList: refLayer,
          tagList: tagLayer
        }
      
      })

  
     
    
  },[]) 
 
  useEffect(() => {

    

   
    if (!isLoading && !annotationLoading && sampleData) {
      console.log(annotationData)

      // 🤡Fake DataData: You can use "annotationData" later.
      /* 
        Data Strucutre
        {
          categoryList: [],
          eventList: [],
          narrationList: [],
          placeList: [],
          refList: [],
          tagList: []
        }
      */

      data.data.items[0].nAnnotations = sampleData
      data.data.items[0].director = ["Isabel Raabe"]
      data.data.items[0].genre = "Lecture Performance"
      data.data.items[0].source = "TALKING OBJECTS LAB"
      data.data.items[0].place = "Dakar"
      data.data.items[0].language = "French"
      data.data.items[0].user = ["Ibrahima Thiam"]
      data.data.items[0].summary = "Revisiter les objects - As part of the second TALKING OBJECTS LAB residency at the Musée Théodore Monod in Dakar, artist and photographer Ibrahima Thiam engages in a dialogue with the objects in the museum's collection, revisiter les objects."
      console.log(data.data.items[0])
      setVideoData(data.data.items[0]);
    }
  }, [data, annotationData, sampleData]);

  if (error) {
    return (
      <div className="w-screen h-[100svh] flex justify-center items-center">
        Error
      </div>
    );
  }

  // Show Contents Video
  useEffect(() => {
    if (videoContainerRef) {
      const detectScroll = (e) => {
        if (videoContainerRef.current) {
          if (videoContainerRef.current.clientHeight / 2 < window.scrollY) {
            setShowContentVideo(true);
          } else {
            setShowContentVideo(false);
          }
        }
      };

      window.addEventListener("scroll", detectScroll);

      return () => {
        window.removeEventListener("scroll", detectScroll);
      };
    }
  }, []);

  return (
    <MainContainer>
      {(!isLoading && getVideoData && sampleData) && (
        <>
          <div ref={videoContainerRef} className="w-full h-[100svh] relative">
            <VideoPlayerCon data={getVideoData} showContentVideo={showContentVideo} setCurrentTimeForMini={setCurrentTimeForMini} />
          </div>
          <Contents getCurrentTimeForMini={getCurrentTimeForMini} videoId={"Y"} isLoading={isLoading} getVideoData={getVideoData} showContentVideo={showContentVideo}  />
        </>
      )}
    </MainContainer>
  );
};

export default SampleVideoWrapper;

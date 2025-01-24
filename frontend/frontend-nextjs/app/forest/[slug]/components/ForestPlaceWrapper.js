"use client";

import ForestPlayerCon from "@/app/components/containers/players/ForestPlayerCon";
import LoadingCon from "@/app/components/LoadingCon";
import LoadingDataCon from "@/app/components/LoadingDataCon";
import LeafletMap from "@/app/components/map/Map";
import { getAllAnnotations } from "@/app/utils/hooks/pandora_api";
import { loadingState } from "@/app/utils/recoillib/state/state";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const ForestPlaceWrapper = () => {
  const [pagination, setPagination] = useState(1);
  const [allData, setAlldata] = useState([]);
  const { data: dataAnnotations, isLoading: isLoadingAnnotations } =
    getAllAnnotations({ pagination: pagination });
  const getLoadingState = useRecoilValue(loadingState);
  const [isReady, setIsReady] = useState(false);
  const maxDurationValue = 10;
  useEffect(() => {
    if (!isLoadingAnnotations) {
      const layerList = [
        // "categoryList",
        // "eventList",
        // "narrationList",
        "placeList",
        // "refList",
        // "tagList",
      ];
      const categoryList = [
        {
          slug: "identity",
          value: "Identity",
          color: "#9E21E8",
        },
        {
          slug: "knowledge",
          value: "Knowledge",
          color: "#8BA5F8",
        },
        {
          slug: "artistic_reflections",
          value: "Artistic Reflections",
          color: "#691220",
        },
        {
          slug: "restitution",
          value: "Restitution",
          color: "#EC6735",
        },
        {
          slug: "memory",
          value: "Memory and The Imaginary",
          color: "#F1A73D",
        },
      ];

      dataAnnotations.data.items.map((v, idx) => {
        const randomIndex = Math.floor(Math.random() * layerList.length);
        const maxDuration =
            v.out - v.in > maxDurationValue ? v.in + maxDurationValue : v.out;
            v.type = "A";
            v.layer = layerList[randomIndex]; //Fake Data
            v.videoId = v.item;
            v.position = {
                lat: 16.00536381801614 + ((Math.random() - 0.5) * 5),
                long: -16.490374627490187 + ((Math.random() - 0.5) * 5)
            }
            v.value = {
                source: `https://www.saintlouisdusenegal.com/histoire-de-saint-louis-du-senegal/`,
                placeName: `Place ${v.videoId}-${idx}`,
                content: `Saint-louis, named after the King of France, Louis IX, under the regency of Louis XIV, was founded in 1659 by Louis Caullier. The local name Ndar or N'dar is Wolof for a kind of island and has been borne by the island since before the French settlement.

The French were already present in Saint-Louis in 1638. The oldest French colony in Africa, Saint-Louis du Sénégal enjoyed two centuries of glory.

From 1895 to 1902, at its peak, Saint-Louis was both the capital of the Senegalese colonies and of French West Africa (Senegal, Mauritania, Sudan, Guinea and Côte d'Ivoire). It was one of the largest cities in Africa, the most politically and economically active, the most urbanised and the largest in terms of its white population. The capital of Senegal until 1957, it was also the capital of Mauritania from 1920 to 1960.
The heart of the old colonial city is located on a narrow island. The city with its old colonial buildings was listed as a UNESCO World Heritage Site in 2000.`
            }
            v.out = maxDuration;

        if (layerList[randomIndex] === "categoryList") {
          v.category =
            categoryList[Math.floor(Math.random() * categoryList.length)];
        }
        return v;
      });
      setAlldata([
        ...allData,
        ...[...dataAnnotations.data.items].sort(() => Math.random() - 0.5),
      ]);

      console.log([
        ...allData,
        ...[...dataAnnotations.data.items].sort(() => Math.random() - 0.5),
      ])
    }
  }, [dataAnnotations]);

  if (
    getLoadingState.isLoading &&
    getLoadingState.hasAnimated &&
    !Boolean(isReady)
  ) {
    return (
      <div className="w-full h-[100svh]">
        <LoadingDataCon
          ready={isReady}
          readyData={Boolean(allData.length > 0)}
          comLoader={() => setIsReady(true)}
        />
      </div>
    );
  }

  return (
    <>
      {(!getLoadingState.isLoading || !getLoadingState.hasAnimated) && (
        <LoadingCon
          ready={Boolean(allData.length > 0)}
          comLoader={() => setIsReady(true)}
        />
      )}
      {
       allData && allData.length > 0 && <div className="w-full h-full flex flex-col items-center relative pt-[56px]">
          {/* Forest Video Player */}
          { <ForestPlayerCon data={allData} />}
          <div className="w-full h-[62px] bg-[#8BA5F8] sticky top-[56px] left-0 z-[40]"></div>
          <div className="w-full h-[calc(100svh-62px-56px)] relative">
            <LeafletMap
                allPlaces={allData}
                content={true}
                forest={true}
             

            />
          </div>
        </div>
      }
    </>
  );
};

export default ForestPlaceWrapper;

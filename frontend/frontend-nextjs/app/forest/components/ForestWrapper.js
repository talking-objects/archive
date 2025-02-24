import ContentContainer from "@/app/components/containers/ContentContainer";
import ForestContentsBox from "@/app/components/containers/forest/ForestContentsBox";
import ForestPlayerCon from "@/app/components/containers/players/ForestPlayerCon";
import LoadingCon from "@/app/components/LoadingCon";
import LoadingDataCon from "@/app/components/LoadingDataCon";
import { getClips, getVideos, getVideosSearch, getClipsSearch } from "@/app/utils/hooks/eva_api";
import { loadingState } from "@/app/utils/recoillib/state/state";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import LeafletMap from "@/app/components/map/Map";
import ForestEventWrapper from "./ForestEventWrapper";
const ForestWrapper = () => {
    const [isReady, setIsReady] = useState(false)
    const getLoadingState = useRecoilValue(loadingState);
    const [page, setPage] = useState(1);    
    const [forestData, setForestData] = useState([]);  
    const [toggleSearch, setToggleSearch] = useState(false)
    const [query, setQuery] = useState(null)
    const [filterView, setFilterView] = useState("all")
    const [showFilters, setShowFilters] = useState(false)
    const [filterQuery, setFilterQuery] = useState({
        video_filter: true,
        clip_filter: {
            reference_data: true,
            category_data: true,
            event_data: true,
            place_data: true,
            narration_data: true,
            data_data: true,
            tag_data: true
        }
    })
    const [searchTimestamp, setSearchTimestamp] = useState(0);
    const [searchTrigger, setSearchTrigger] = useState(false);
    const [sortBy, setSortBy] = useState("time")
    const [tempSortBy, setTempSortBy] = useState("time")
    const [showSort, setShowSort] = useState(false)
    const {register, handleSubmit, getValues, setValue} = useForm()

    // Add new state for temporary filter values
    const [tempFilterView, setTempFilterView] = useState("all")
    const [tempFilterQuery, setTempFilterQuery] = useState({
        video_filter: true,
        clip_filter: {
            reference_data: true,
            category_data: true,
            event_data: true,
            place_data: true,
            narration_data: true,
            data_data: true,
            tag_data: true
        }
    })

    // Get Videos
    const {data: videos, isLoading: isLoadingVideos} = useQuery({
        queryKey: ["videos", page],
        queryFn: () => {
            return getVideos({page: page, page_limit: 8, random: false})
        },
        keepPreviousData: true 
    })  

    // Get Clips
    const {data: clips, isLoading: isLoadingClips} = useQuery({
        queryKey: ["clips", page],
        queryFn: () => {
            return getClips({page: page, page_limit: 8, random: false})
        },
        keepPreviousData: true 
    })       

 
    
    const {data: videosSearch, isLoading: isLoadingVideosSearch} = useQuery({
        queryKey: ["videosSearch", page, query, filterQuery, sortBy],
        queryFn: () => {
            return getVideosSearch({page: page, page_limit: 8, query: query, filter_params: JSON.stringify(filterQuery), sort_by: sortBy})
        },
        keepPreviousData: true,
        enabled: searchTrigger
    })  

    const {data: clipsSearch, isLoading: isLoadingClipsSearch} = useQuery({
        queryKey: ["clipsSearch", page, query, filterQuery, sortBy],
        queryFn: () => {
            return getClipsSearch({page: page, page_limit: 8, query: query, filter_params: JSON.stringify(filterQuery), sort_by: sortBy})
        },
        keepPreviousData: true,
        enabled: searchTrigger
    })  
    
    const getForestData = () => {
        if(videos && !isLoadingVideos && clips && !isLoadingClips){
            let newForestDataClips = []
            // Check videos data
            if(videos && !isLoadingVideos && videos.data){
                newForestDataClips = [...videos.data] 
            }
            // Check clips data
            if(clips && !isLoadingClips && clips.data){
                newForestDataClips = [...newForestDataClips, ...clips.data]
            }
            // Only proceed if we have data to add
            if(newForestDataClips.length > 0) {
                // Randomly sort the combined array
               
                newForestDataClips = newForestDataClips.sort(() => Math.random() - 0.5)
                // Add new data to previous data
                setForestData(prev => [...prev, ...newForestDataClips])
            }
        }
    }

    const getForestDataSearch = () => {
        if(videosSearch && !isLoadingVideosSearch && clipsSearch && !isLoadingClipsSearch){
            let newForestDataClips = []
            // Check videos data
            if(videosSearch && !isLoadingVideosSearch && videosSearch.data){
                newForestDataClips = [...videosSearch.data] 
            }
            // Check clips data
            if(clipsSearch && !isLoadingClipsSearch && clipsSearch.data){
                newForestDataClips = [...newForestDataClips, ...clipsSearch.data]
            }
            // Only proceed if we have data to add
            if(newForestDataClips.length > 0) {
                console.log(newForestDataClips)
                setForestData(prev => [...prev, ...newForestDataClips])
               
            }
        }
    }

    // Get Forest Data
    useEffect(() => {
        if(!toggleSearch){
            getForestData()
        }else{
            getForestDataSearch()
        }
    }, [videos, clips, page, videosSearch, clipsSearch, query, searchTimestamp])

    const onLoadMore = () => {
        setPage(page + 1)
    }
    const onSubmit = (data) => {
        setToggleSearch(true)
        setForestData([])
        setPage(1)
        // Apply temporary filters when submitting
        setSortBy(tempSortBy)
     
        setFilterView(tempFilterView)
        setFilterQuery(tempFilterQuery)
        if(getValues("search") !== ""){
            setQuery(getValues("search"))
            setSearchTrigger(true)
        }else{
            setQuery("")
            setSearchTrigger(true)
        }
        setSearchTimestamp(Date.now())
    }
    const onCancelSearch = () => {
        setToggleSearch(false)
        setForestData([])
        setPage(1)
        setQuery(null)
        setValue("search", "")
        // Reset both temporary and actual filters
        setFilterView("all")
        setTempFilterView("all")
        setFilterQuery({
            video_filter: true,
            clip_filter: {
                reference_data: true,
                category_data: true,
                event_data: true,
                place_data: true,
                narration_data: true,
                data_data: true,
                tag_data: true
            }
        })
        setTempFilterQuery({
            video_filter: true,
            clip_filter: {
                reference_data: true,
                category_data: true,
                event_data: true,
                place_data: true,
                narration_data: true,
                data_data: true,
                tag_data: true
            }
        })
        setSearchTrigger(false)
    }

    const handleFilter = ({filter, view}) => {
        // Update temporary filter values instead of actual ones
        setTempFilterView(view)
        setTempFilterQuery(prev => {
            if(filter === "all"){
                const newClipFilter = Object.keys(prev.clip_filter).reduce((acc, key) => {
                    acc[key] = true;
                    return acc;
                }, {});
                return {
                    video_filter: true,
                    clip_filter: newClipFilter
                }
            }
            const newClipFilter = Object.keys(prev.clip_filter).reduce((acc, key) => {
                acc[key] = false;
                return acc;
            }, {});
            
            if (filter in prev.clip_filter) {
                newClipFilter[filter] = true;
            }
            
            return {
                video_filter: false,
                clip_filter: newClipFilter
            };
        });
        setShowFilters(prev => !prev)
    }

    const handleSort = (sort) => {
        
        setTempSortBy(sort)
        setShowSort(false)
    }

    if((getLoadingState.isLoading && getLoadingState.hasAnimated && !Boolean(isReady))){
        return <div className="w-full h-[100svh]">
          <LoadingDataCon ready={isReady} readyData={Boolean((!isLoadingVideos && !isLoadingClips))} comLoader={() => setIsReady(true)} />
        </div>
    }
    
    return <>
        {(!getLoadingState.isLoading || !getLoadingState.hasAnimated) && (
            <LoadingCon ready={Boolean((!isLoadingVideos && !isLoadingClips))} comLoader={() => setIsReady(true)} />
        )}
        {forestData && <div className="w-full h-full flex flex-col items-center relative pt-[56px]">
            {/* Forest Video Player */}
            {forestData.length === 0 && <div className="w-full h-[calc(100svh-118px)] flex justify-center items-center">
                <div className="text-black text-[24px] font-ibm_mono_bolditalic">No videos found</div>
            </div>}
            {forestData.length > 0 && <ForestPlayerCon data={[...forestData].splice(0, 8)} />}
            <div className="w-full h-[62px] bg-[#8BA5F8] sticky top-[56px] left-0 z-[3000] flex justify-between items-center px-4 gap-4">
                {/* <div className="text-white text-[16px] font-ibm_mono_bolditalic w-full flex-1 flex items-center gap-2">
                    <div>Sort by</div>
                    <div className="relative">
                        <button 
                            onClick={() => setShowSort(prev => !prev)}
                            className="text-white text-[16px] font-ibm_mono_bolditalic flex items-center gap-2 bg-[#7B97F7] rounded-md px-4 py-2"
                        >
                            {tempSortBy === "time" ? "Time" : "Type"}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                        {showSort && (
                            <div className="absolute top-full left-0 mt-2 bg-white rounded-md shadow-lg p-2 flex flex-col gap-2 min-w-[120px]">
                                <button 
                                    onClick={() => handleSort("time")}
                                    className={`text-black text-[16px] font-ibm_mono_regular px-4 py-2 rounded-md text-left ${
                                        tempSortBy === "time" ? "bg-[#8BA5F8] text-white hover:bg-[#7B97F7]" : "hover:bg-gray-100"
                                    }`}
                                >Time</button>
                                <button
                                    onClick={() => handleSort("type")} 
                                    className={`text-black text-[16px] font-ibm_mono_regular px-4 py-2 rounded-md text-left ${
                                        tempSortBy === "type" ? "bg-[#8BA5F8] text-white hover:bg-[#7B97F7]" : "hover:bg-gray-100"
                                    }`}
                                >Type</button>
                            </div>
                        )}
                    </div>
                </div> */}
                <div className="flex items-center gap-2 w-fit">
                    <div className="text-white text-[16px] font-ibm_mono_bolditalic">Filter by Annotations</div>
                    <div className="relative">
                        <button 
                            onClick={() => setShowFilters(prev => !prev)}
                            className="text-white text-[16px] font-ibm_mono_bolditalic px-4 py-2 bg-[#7B97F7] rounded-md hover:bg-[#6A88F6] transition-colors flex items-center gap-2"
                        >
                            {tempFilterView === "all" ? "All" : 
                             tempFilterView === "category_data" ? "Category" :
                             tempFilterView === "reference_data" ? "Reference" :
                             tempFilterView === "event_data" ? "Event" :
                             tempFilterView === "place_data" ? "Place" :
                             tempFilterView === "narration_data" ? "Narration" :
                             tempFilterView === "data_data" ? "Data" :
                             tempFilterView === "tag_data" ? "Tag" : "All"}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                        {showFilters && (
                            <div className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-lg p-2 flex flex-col gap-2 min-w-[120px] z-[4000]">
                                <button 
                                    onClick={() => handleFilter({filter: "all", view: "all"})} 
                                    className={`text-black text-[16px] font-ibm_mono_regular px-4 py-2 rounded-md text-left ${
                                        tempFilterView === "all" ? "bg-[#8BA5F8] text-white hover:bg-[#7B97F7]" : "hover:bg-gray-100"
                                    }`}
                                >All</button>
                                <button 
                                    onClick={() => handleFilter({filter: "category_data", view: "category_data"})} 
                                    className={`text-black text-[16px] font-ibm_mono_regular px-4 py-2 rounded-md text-left ${
                                        tempFilterView === "category_data" ? "bg-[#8BA5F8] text-white hover:bg-[#7B97F7]" : "hover:bg-gray-100"
                                    }`}
                                >Category</button>
                                <button 
                                    onClick={() => handleFilter({filter: "reference_data", view: "reference_data"})} 
                                    className={`text-black text-[16px] font-ibm_mono_regular px-4 py-2 rounded-md text-left ${
                                        tempFilterView === "reference_data" ? "bg-[#8BA5F8] text-white hover:bg-[#7B97F7]" : "hover:bg-gray-100"
                                    }`}
                                >Reference</button>
                                <button 
                                    onClick={() => handleFilter({filter: "event_data", view: "event_data"})} 
                                    className={`text-black text-[16px] font-ibm_mono_regular px-4 py-2 rounded-md text-left ${
                                        tempFilterView === "event_data" ? "bg-[#8BA5F8] text-white hover:bg-[#7B97F7]" : "hover:bg-gray-100"
                                    }`}
                                >Event</button>
                                <button 
                                    onClick={() => handleFilter({filter: "place_data", view: "place_data"})} 
                                    className={`text-black text-[16px] font-ibm_mono_regular px-4 py-2 rounded-md text-left ${
                                        tempFilterView === "place_data" ? "bg-[#8BA5F8] text-white hover:bg-[#7B97F7]" : "hover:bg-gray-100"
                                    }`}
                                >Place</button>
                                <button 
                                    onClick={() => handleFilter({filter: "narration_data", view: "narration_data"})} 
                                    className={`text-black text-[16px] font-ibm_mono_regular px-4 py-2 rounded-md text-left ${
                                        tempFilterView === "narration_data" ? "bg-[#8BA5F8] text-white hover:bg-[#7B97F7]" : "hover:bg-gray-100"
                                    }`}
                                >Narration</button>
                                <button 
                                    onClick={() => handleFilter({filter: "data_data", view: "data_data"})} 
                                    className={`text-black text-[16px] font-ibm_mono_regular px-4 py-2 rounded-md text-left ${
                                        tempFilterView === "data_data" ? "bg-[#8BA5F8] text-white hover:bg-[#7B97F7]" : "hover:bg-gray-100"
                                    }`}
                                >Data</button>
                                <button 
                                    onClick={() => handleFilter({filter: "tag_data", view: "tag_data"})} 
                                    className={`text-black text-[16px] font-ibm_mono_regular px-4 py-2 rounded-md text-left ${
                                        tempFilterView === "tag_data" ? "bg-[#8BA5F8] text-white hover:bg-[#7B97F7]" : "hover:bg-gray-100"
                                    }`}
                                >Tag</button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full flex justify-start items-center h-full flex-[1]">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 w-full">
                        <input 
                            {...register("search")}
                            type="text" 
                            placeholder="Search"
                            className="px-4 py-2 rounded-md mr-2 w-full focus:outline-none focus:ring-0" 
                        />
                        <button 
                            type="submit"
                            className="px-4 py-2 bg-white rounded-md hover:bg-gray-100 transition-colors font-ibm_mono_semibold"
                        >
                            Search
                        </button>
                    </form>
                    {toggleSearch && (
                        <div className="flex items-center ml-4">
                            <button
                                onClick={onCancelSearch}
                                className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-500 transition-colors flex items-center gap-2 font-ibm_mono_semibold"
                            >
                                Reset
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {forestData.length > 0 && (filterView === "all" || filterView === "category_data" || filterView === "narration_data" || filterView === "data_data" || filterView === "tag_data" || filterView === "reference_data") && <ContentContainer>
                <ForestContentsBox allData={forestData} />
                <div className="w-full flex justify-center mt-4">
                    {!toggleSearch ? (
                        <button 
                            onClick={onLoadMore}
                            disabled={videosSearch?.total_pages <= page && clipsSearch?.total_pages <= page}
                            className={`px-6 py-2 text-white rounded-md transition-colors duration-200 ${
                            videos?.total_pages <= page && clips?.total_pages <= page 
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#8BA5F8] hover:bg-[#7B97F7]'
                        }`}
                        >
                            Load More
                        </button>
                    ) : (
                        <button 
                            onClick={onLoadMore}
                            disabled={videosSearch?.total_pages <= page && clipsSearch?.total_pages <= page}
                            className={`px-6 py-2 text-white rounded-md transition-colors duration-200 ${
                            videosSearch?.total_pages <= page && clipsSearch?.total_pages <= page 
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#8BA5F8] hover:bg-[#7B97F7]'
                        }`}
                        >
                            Load More
                        </button>
                    )}
                </div>
            </ContentContainer>}
            {forestData.length > 0 && (filterView === "place_data" || filterView === "event_data") && 
                <div className="w-full h-[calc(100svh-118px)] flex flex-col gap-4 relative bg-red-400">
                    <div className="w-full flex justify-center mt-4 absolute bottom-4 left-0 z-[2000]">
                    {!toggleSearch ? (
                        <button 
                            onClick={onLoadMore}
                            disabled={videosSearch?.total_pages <= page && clipsSearch?.total_pages <= page}
                            className={`px-6 py-2 text-white rounded-md transition-colors duration-200 ${
                            videos?.total_pages <= page && clips?.total_pages <= page 
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#8BA5F8] hover:bg-[#7B97F7]'
                        }`}
                        >
                            Load More
                        </button>
                    ) : (
                        <button 
                            onClick={onLoadMore}
                            disabled={videosSearch?.total_pages <= page && clipsSearch?.total_pages <= page}
                            className={`px-6 py-2 text-white rounded-md transition-colors duration-200 ${
                            videosSearch?.total_pages <= page && clipsSearch?.total_pages <= page 
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#8BA5F8] hover:bg-[#7B97F7]'
                        }`}
                        >
                            Load More
                        </button>
                    )}
                </div>
                {
                    filterView === "place_data" && <LeafletMap allPlaces={forestData} forest={true} />
                }
                {
                    filterView === "event_data" && <ForestEventWrapper allEvents={forestData} />
                }
                </div>
           }
        </div>}
    </>
}


export default ForestWrapper;
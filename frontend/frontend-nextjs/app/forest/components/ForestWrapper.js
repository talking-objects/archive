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

const ForestWrapper = () => {
    const [isReady, setIsReady] = useState(false)
    const getLoadingState = useRecoilValue(loadingState);
    const [page, setPage] = useState(1);    
    const [forestData, setForestData] = useState([]);  
    const [toggleSearch, setToggleSearch] = useState(false)
    const [query, setQuery] = useState(null)
    const [searchTimestamp, setSearchTimestamp] = useState(0);
    const {register, handleSubmit, getValues, setValue} = useForm()

    // Get Videos
    const {data: videos, isLoading: isLoadingVideos} = useQuery({
        queryKey: ["videos", page],
        queryFn: () => {
            return getVideos({page: page, page_limit: 4, random: false})
        },
        keepPreviousData: true 
    })  

    // Get Clips
    const {data: clips, isLoading: isLoadingClips} = useQuery({
        queryKey: ["clips", page],
        queryFn: () => {
            return getClips({page: page, page_limit: 4, random: false})
        },
        keepPreviousData: true 
    })       
    
    const {data: videosSearch, isLoading: isLoadingVideosSearch} = useQuery({
        queryKey: ["videosSearch", page, query],
        queryFn: () => {
            return getVideosSearch({page: page, page_limit: 4, query: query})
        },
        keepPreviousData: true,
        enabled: toggleSearch && query !== null
    })  

    const {data: clipsSearch, isLoading: isLoadingClipsSearch} = useQuery({
        queryKey: ["clipsSearch", page, query],
        queryFn: () => {
            return getClipsSearch({page: page, page_limit: 4, query: query})
        },
        keepPreviousData: true,
        enabled: toggleSearch && query !== null
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
        setQuery(getValues("search"))
        setSearchTimestamp(Date.now())
    }
    const onCancelSearch = () => {
        setToggleSearch(false)
        setForestData([])
        setPage(1)
        setQuery(null)
        setValue("search", "")
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
        {forestData && <div className="w-full h-full  flex flex-col items-center relative pt-[56px]">
            {/* Forest Video Player */}
            {forestData.length === 0 && <div className="w-full h-[calc(100svh-118px)] flex justify-center items-center">
                <div className="text-black text-[24px] font-ibm_mono_bolditalic">No videos found</div>
            </div>}
            {forestData.length > 0 && <ForestPlayerCon data={[...forestData].splice(0, 8).filter(item => item.type === "raw")} />}
            <div className="w-full h-[62px] bg-[#8BA5F8] sticky top-[56px] left-0 z-[40] flex items-center px-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        {...register("search")}
                        type="text" 
                        placeholder="Search"
                        className="px-4 py-2 rounded-md mr-2" 
                    />
                    <button 
                        type="submit"
                        className="px-4 py-2 bg-white rounded-md hover:bg-gray-100 transition-colors"
                    >
                        Search
                    </button>
                </form>
                {toggleSearch && (
                    <div className="flex items-center ml-4">
                        <button
                            onClick={onCancelSearch}
                            className="px-4 py-2 bg-white rounded-md hover:bg-gray-100 transition-colors"
                    >
                        Cancel Search
                        </button>
                    </div>
                )}
            </div>
            {forestData.length > 0 && <ContentContainer>
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
        </div>}
    </>
}


export default ForestWrapper;
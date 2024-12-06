import { BASE_URL } from "@/app/utils/constant/etc";

const HomeHeader = ({currentVideo, isLoading}) => {
    return <div className="w-full h-[100svh] pt-[56px] bg-black">
        <div className="w-full h-full bg-black relative">
            {(!isLoading && currentVideo) && <div 
                style={{backgroundImage: `url(${BASE_URL}/${currentVideo.id}/480p${currentVideo.posterFrame}.jpg)`}}
                className="w-full h-full bg-no-repeat bg-center bg-cover">

            </div>}
        </div>
    </div>
}

export default HomeHeader;
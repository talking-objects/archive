"use client"
import { MainContainer } from "@/app/components/containers/Containers";
import ContentContainer from "@/app/components/containers/ContentContainer";
import AboutSection from "./AboutSection";
import RelatedSection from "./RelatedSection";
import HomeHeader from "./HomeHeader";
import { getVideo } from "@/app/utils/hooks/pandora_api";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loadingState } from "@/app/utils/recoillib/state/state";
import gsap from "gsap";


const LoadingCon = ({ready=false}) => {
    const [getLoadingState, setLoadingState] = useRecoilState(loadingState);
    const [ready2, setReady2] = useState(false)
    useEffect(() => {
        if(!getLoadingState.isLoading && ready && ready2){
            gsap
            .to(".loadingTitle", {
                delay: 0,
                duration: 2,
                ease: "power3.inOut",
                css: {
                    opacity: 1,
                    transform: "translateY(200%)"
                },
                stagger: {
                    amount: 0.5
                },
                onComplete: () => {
                    console.log("Yeah")
                    setLoadingState((prev) => ({
                        ...prev,
                        isLoading: true
                      }))
                }
            })
            }
    },[ready, ready2])

    const textAni = () => {
        gsap
        .to(".loadingTitle", {
            duration: 2,
            ease: "power3.inOut",
            css: {
                opacity: 1,
                transform: "translateY(0)"
            },
            stagger: {
                amount: 0.5
            },
            onComplete: () => {
                console.log("Yeah")
                setReady2(true)
            }
        })
    }
    useEffect(() => {
        textAni()
    },[])
    return <div className="w-screen h-[100svh] bg-white flex justify-center items-center">
        <div className="flex overflow-hidden">
            {Array.from("Talking Object EVA").map((val, idx) => {
                return <span key={idx} className="loadingTitle font-eva text-6xl opacity-0 even:-translate-y-[200%] odd:translate-y-[200%]">{val === " " ? "\u00A0" : val}</span>
            })
                }
        </div>
    </div>
}


const HomeWrapper = () => {
    const {data, isLoading} = getVideo({pId: "AL"});
    const [currentVideo, setCurrentVideo] = useState(null)
    const [getLoadingState, setLoadingState] = useRecoilState(loadingState);

    useEffect(() => {
        if(!isLoading){
            setCurrentVideo(data.data.items[0])
        }
    },[data]);


    return (
        <>
            {(!getLoadingState.isLoading) && <LoadingCon ready={Boolean(currentVideo)} />}
            {(getLoadingState.isLoading) && (
                <MainContainer>
                    <HomeHeader isLoading={isLoading} currentVideo={currentVideo} />
                    {getLoadingState.hasAnimated && <ContentContainer>
                        <AboutSection />
                        <RelatedSection />
                    </ContentContainer>}
                </MainContainer>
            )}
        </>
    )
}


export default HomeWrapper;
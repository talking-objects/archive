import ContentBox from "./ContentBox";

const LabelTitle = ({text}) => {
   return <div className="font-ibm_mono_semibold text-[16px]">{text}</div>
}
const ContentText = ({text}) => {
   return <div className="text-[16px] font-ibm_mono_regular leading-tight">{text}</div>
}
const ContentTextHtml = ({text}) => {
   return <div dangerouslySetInnerHTML={{__html: `${text}`}} className="text-[16px] font-ibm_mono_regular leading-tight"></div>
}

const AboutWapper = ({getVideoData}) => {
    return <ContentBox title={"Context"} id="context_box">
    <div>
       <LabelTitle text={"Description"} />
       <ContentTextHtml text={getVideoData.summary} />
       {/* <div className="text-sm whitespace-break-spaces" dangerouslySetInnerHTML={{__html: getVideoData.summary}}></div> */}
    </div>
    <div className="grid grid-cols-3 mt-4 gap-4">
       {getVideoData.user && <div>
          <LabelTitle text={"Contributors"} />
          {getVideoData.director && <ContentText text={typeof getVideoData.director === "string" ? getVideoData.director : getVideoData.director.join(", ")} />}
          {getVideoData.user && <ContentText text={typeof getVideoData.user === "string" ? getVideoData.user : getVideoData.user.join(", ")} />}
          
       </div>}
       {getVideoData.country && <div>
          <LabelTitle text={"Country"} />
          <ContentText text={getVideoData.country.join(", ")} />
       </div>}
       {getVideoData.place && <div>
          <LabelTitle text={"Place"} />
          <ContentText text={getVideoData.place} />
       </div>}
       {getVideoData.source && <div>
          <LabelTitle text={"Source"} />
          <ContentText text={getVideoData.source} />
       </div>}
       {getVideoData.language && <div>
          <LabelTitle text={"Language"} />
          <ContentText text={typeof getVideoData.language ==="string" ? getVideoData.language : getVideoData.language.join(", ")} />
       </div>}
       {getVideoData.genre && <div>
          <LabelTitle text={"Genre"} />
          <ContentText text={getVideoData.genre} />
       </div>}
    </div>  
</ContentBox>
}

export default AboutWapper;
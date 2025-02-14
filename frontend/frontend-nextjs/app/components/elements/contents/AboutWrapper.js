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

const AboutWapper = ({getVideoData, clip=false}) => {
    return <ContentBox clip={clip} title={"Context"} id="context_box" about={true}>
    {getVideoData.description && <div>
       <LabelTitle text={"Description"} />
       <ContentTextHtml text={getVideoData.description} />
       {/* <div className="text-sm whitespace-break-spaces" dangerouslySetInnerHTML={{__html: getVideoData.summary}}></div> */}
    </div>}
    <div className="grid grid-cols-3 mt-4 gap-4">
       {(getVideoData.author || getVideoData.contributors) && <div>
          <LabelTitle text={"Contributors"} />
          {getVideoData.author && <ContentText text={typeof getVideoData.author === "string" ? getVideoData.author : getVideoData.author.join(", ")} />}
          {getVideoData.contributors && <ContentText text={typeof getVideoData.contributors === "string" ? getVideoData.contributors : getVideoData.contributors.join(", ")} />}
          
       </div>}
       {getVideoData.country && <div>
          <LabelTitle text={"Country"} />
          <ContentText text={getVideoData.country} />
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
import ContentBox from "./ContentBox";

const AboutWapper = ({getVideoData}) => {
    return <ContentBox title={"Context"} id="context_box">
    <div>
       <div>Summary</div>
       <div className="text-sm whitespace-break-spaces" dangerouslySetInnerHTML={{__html: getVideoData.summary}}></div>
    </div>
    <div className="grid grid-cols-3 mt-4 gap-4">
       {getVideoData.user && <div>
          <div>Contributors</div>
          <div className="text-sm"> {getVideoData.user} </div>
       </div>}
       {getVideoData.country && <div>
          <div>Country</div>
          <div className="text-sm"> {getVideoData.country.join(", ")} </div>
       </div>}
       <div>
          <div>Source</div>
          <div className="text-sm"></div>
       </div>
       {getVideoData.language && <div>
          <div>Language</div>
          <div className="text-sm"> {getVideoData.language.join(", ")} </div>
       </div>}
       <div>
          <div>Genre</div>
          <div className="text-sm"></div>
       </div>
    </div>  
</ContentBox>
}

export default AboutWapper;
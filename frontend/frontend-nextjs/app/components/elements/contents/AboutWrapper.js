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
          <div className="text-sm">{typeof getVideoData.director === "string" ? getVideoData.director : getVideoData.director.join(", ")} </div>
          <div className="text-sm">{typeof getVideoData.user === "string" ? getVideoData.user : getVideoData.user.join(", ")} </div>
       </div>}
       {getVideoData.country && <div>
          <div>Country</div>
          <div className="text-sm"> {getVideoData.country.join(", ")}</div>
       </div>}
       {getVideoData.place && <div>
          <div>Place</div>
          <div className="text-sm"> {getVideoData.place}</div>
       </div>}
       {getVideoData.source && <div>
          <div>Source</div>
          <div className="text-sm">{getVideoData.source}</div>
       </div>}
       {getVideoData.language && <div>
          <div>Language</div>
          <div className="text-sm"> {typeof getVideoData.language ==="string" ? getVideoData.language : getVideoData.language.join(", ")} </div>
       </div>}
       {getVideoData.genre && <div>
          <div>Genre</div>
          <div className="text-sm">{getVideoData.genre}</div>
       </div>}
    </div>  
</ContentBox>
}

export default AboutWapper;
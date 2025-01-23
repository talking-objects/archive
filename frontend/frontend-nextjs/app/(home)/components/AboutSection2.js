import SectionContainer from "./elements/SectionContainer";

const AboutSection2 = () => {
  const textlist = [
    `The Experimental Video Archive is a further branch of the Talking Objects Archive (www.talkingobjectsarchive.org). It is designed to capture and share diverse forms of knowledge production, emphasizing plural perspectives and interpretations. Instead of centering solely on objects, the archive focuses on the relationships, narratives, and practices surrounding them.`,
    `Knowledge is stored and explored in dynamic ways—videos serve as foundational elements, enriched by annotations that provide transcriptions, translations, critical reflections, and contextual stories. These annotations transform videos into living knowledge items, creating connections across time, disciplines, and perspectives.`,
    `The archive invites exploration in multiple modes: through visual diagrams that reveal overarching structures, entangled experiences embedded in the videos themselves, or accessible overviews that layer annotations alongside the footage. This approach ensures that knowledge remains multifaceted, interactive, and inclusive.`
  ]
        
  return (
    <SectionContainer row={true} big={true}>
      <div className="w-4/5 px-4 lg:px-0 lg:w-2/3 mx-auto font-ibm_mono_regular text-[16px] lg:text-[24px] flex flex-col gap-4">
        {
          textlist.map((v, idx) => {
            return <p
            key={idx}
            className="leading-tight"
            dangerouslySetInnerHTML={{ __html: `${v}` }}
          ></p>
          })
        }
       
      </div>
    </SectionContainer>
  );
};

export default AboutSection2;

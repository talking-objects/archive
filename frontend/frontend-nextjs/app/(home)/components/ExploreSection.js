import SectionContainer from "./elements/SectionContainer"
import SectionHeader from "./elements/SectionHeader"
import SectionSubHeader from "./elements/SectionSubHeader"
import ForestSubSection from "./ForestSubSection"

const ExploreSection = () => {
    const exText = {
      title: `Explore our Archive`,
      subTitle: `Explore Manyfolded Knowlegde and Relations`
    }
    return <SectionContainer big={true}>
      <div className="flex flex-col w-full items-center">
        <SectionHeader text={exText.title} />
        <SectionSubHeader text={exText.subTitle} />
        <ForestSubSection />
      </div>
    </SectionContainer>
  }


export default ExploreSection
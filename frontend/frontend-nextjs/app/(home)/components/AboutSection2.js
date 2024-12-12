import SectionContainer from "./elements/SectionContainer";

const AboutSection2 = () => {
  const text = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
        ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
        sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
        et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
        takimata sanctus est Lorem ipsum dolor sit amet. 
        `;
  const text2 = `Lorem ipsum dolor sit
        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
        kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
        diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
        erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
        et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
        Lorem ipsum dolor sit amet.`;
  return (
    <SectionContainer row={true} big={true}>
      <div className="w-4/5 px-4 lg:px-0 lg:w-2/3 mx-auto font-ibm_mono_regular text-[16px] lg:text-[24px] flex flex-col gap-4">
        <p
          className="leading-tight"
          dangerouslySetInnerHTML={{ __html: `${text}` }}
        ></p>
        <p
          className="leading-tight"
          dangerouslySetInnerHTML={{ __html: `${text2}` }}
        ></p>
      </div>
    </SectionContainer>
  );
};

export default AboutSection2;

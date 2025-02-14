const ContentBox = ({ children, title, id, about=false, clip=false }) => {
  return (
    <div id={id} className="w-full min-h-[50svh] h-fit bg-white flex relative">
      {!clip && <div className="flex-1"></div>}
      <div className="flex-1 bg-white flex flex-col">
        <div className="px-4 py-4">
          <div className="flex flex-col">
            {!about && <div className="text-[24px] mb-4 font-ibm_mono_regular leading-tight">{title}</div>}
            {about && <div className="w-1/2 font-ibm_mono_bolditalic text-[48px] leading-[1.1] my-8">{title}</div>}
            
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ContentBox;

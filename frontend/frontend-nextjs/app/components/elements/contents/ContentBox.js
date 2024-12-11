const ContentBox = ({ children, title, id }) => {
  return (
    <div id={id} className="w-full min-h-[50svh] h-fit bg-white flex relative">
      <div className="flex-1"></div>
      <div className="flex-1 bg-white flex flex-col">
        <div className="px-4 py-4">
          <div className="flex flex-col">
            <div className="text-[24px] mb-4 font-ibm_mono_regular leading-tight">{title}</div>
            
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ContentBox;

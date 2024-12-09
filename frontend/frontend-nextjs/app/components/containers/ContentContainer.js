const ContentContainer = ({children, full=true, padding=true}) => {
    return (<div className={`w-screen ${padding ? "px-4 lg:px-4" : "px-0 lg:px-0"} `}>
      <div className={`w-full ${full ? "min-h-[100svh]" : "h-fit"} h-full max-w-screen-2xl mx-auto flex flex-col`}>
      {children}
      </div>
   </div>)
}

export default ContentContainer;
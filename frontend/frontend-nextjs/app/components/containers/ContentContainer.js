const ContentContainer = ({children}) => {
    return (<div className="w-screen px-4 lg:px-0">
      <div className="w-full min-h-[100svh] h-full max-w-screen-2xl mx-auto flex flex-col">
      {children}
      </div>
   </div>)
}

export default ContentContainer;
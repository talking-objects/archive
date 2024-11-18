const ContentBox = ({children}) => {
    return <div className="w-full min-h-[50svh] h-fit bg-white flex">
        <div className="flex-1"></div>
        <div className="flex-1 bg-white flex flex-col">
            <div className="px-4 py-4">{children}</div>
        </div>
    </div>
}

export default ContentBox;
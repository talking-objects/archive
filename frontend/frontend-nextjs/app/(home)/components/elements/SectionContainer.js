const SectionContainer = ({children, row=false, big=false}) => {
    return <div className={`w-full flex ${!row ? "flex-col section-padding" : "flex-row"} gap-4 ${big && "min-h-[100svh] h-full"} ${!big && "h-[100svh]"} items-stretch overflow-hidden `}>
        {children}
    </div>
}

export default SectionContainer;
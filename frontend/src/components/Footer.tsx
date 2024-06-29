function Footer() {
    return (
        <div className="bg-orange-500 py-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <span className="text-3xl text-white font-bold tracking-tighter">
                    SAVORLY
                </span>
                <span className="text-white tracking-tight flex gap-4">
                    <span className="cursor-pointer hover:text-gray-200 transition-all">Privacy policy</span>
                    <span className="cursor-pointer hover:text-gray-200 transition-all">|</span>
                    <span className="cursor-pointer hover:text-gray-200 transition-all">Terms of service</span>
                </span>
            </div>
        </div>
    )
}

export default Footer;

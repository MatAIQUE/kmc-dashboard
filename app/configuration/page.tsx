import Nav from "../../components/ui/nav"

const ConfigurationPage = () => {
    return (
        <>
        <Nav/>
        
        <div className="p-2 pt-10 md:pt-10 sm:ml-64">
            <div className="rounded-lg dark:border-gray-700">
                <div className="grid grid-cols-3 gap-4 mb-4 mx-2">
                    <div className="col-span-3 h-auto rounded-xl bg-white dark:bg-gray-800 drop-shadow drop-shadow">
                        <div className="py-4 px-6">
                            Content
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ConfigurationPage
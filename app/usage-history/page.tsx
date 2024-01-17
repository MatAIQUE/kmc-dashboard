import { FaDownload, FaSearch } from "react-icons/fa"
import Nav from "../../components/ui/nav"

const UsageHistory = () => {
    return (
        <>
        <Nav/>
        <div className="p-2 pt-10 md:pt-10 sm:ml-64">
            <div className="rounded-lg dark:border-gray-700">
                <div className="grid grid-cols-3 gap-4 mb-4 mx-2">
                    <div className="col-span-3 h-auto rounded-xl bg-white dark:bg-gray-800 drop-shadow drop-shadow">
                        
                        <div className="py-4 px-6">

                            <div className="grid grid-cols-2 py-4 flex items-center py-4">
                                <div>
                                    <h1 className="md:text-xl font-bold capitalize text-sm">Usage History</h1>
                                </div>
                                <div className="md:me-4 flex justify-end">
                                    <button className="hover:opacity-80 bg-primary text-white p-2 rounded-lg flex items-center">
                                        <FaDownload className="w-4 h-4 md:me-2"/>
                                        <span className="hidden md:block">Download</span>
                                    </button>
                                </div>
                            </div>
                            {/* Content Table */}
                            <div className="flex justify-center h-40 items-center">GRAPH CONTENT</div>
                            {/* Search bar and Table */}
                            <div className="mb-6">
                                <div className="relative flex items-center w-full md:w-1/4">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <input type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name, ID, Locker"/>
                                </div>                               
                            </div>
                            <div className="">Table</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default UsageHistory
import { FaChevronRight, FaDownload } from "react-icons/fa"
import Nav from "../../components/ui/nav"

const OccupancyPage = () => {
    return (
        <>
        <Nav/>
        <div className="p-2 pt-10 md:pt-10 sm:ml-64">
            <div className="rounded-lg dark:border-gray-700">
                <div className="grid grid-cols-3 gap-4 mb-4 mx-2">
                    <div className="col-span-3 h-auto rounded-xl bg-white dark:bg-gray-800 drop-shadow drop-shadow">
                        
                        <div className="py-4 px-6">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="md:text-xl font-bold capitalize text-sm">Daily Usage</h1>
                                <div className="flex">
                                    <button className="md:p-4 hidden md:block hover:bg-secondary rounded-lg p-2">
                                        <FaDownload className="text-xs md:text-lg"/>
                                    </button>
                                    <input className="shadow appearance-none border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="" type="" placeholder="Name, ID, Locker"/>

                                    <button className="p-4 md:hidden block">
                                        <FaChevronRight/>
                                    </button>
                                </div>
                            </div>
                            <hr/>
                            <div className="flex w-full justify-center py-40 items-center">
                                <div className="p-4">
                                    Graph
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default OccupancyPage
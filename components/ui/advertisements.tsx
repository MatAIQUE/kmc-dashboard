import { FaPlusCircle, FaEllipsisV } from "react-icons/fa";
import Image from "next/image";
import SampleImage from "../../app/assets/img/kmc-ad-2.png"

const AdvertisementsSection = () => {
    return (
        <div className="drop-shadow-md py-4 px-6 rounded-xl">
            {/* title */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="md:text-xl font-bold capitalize text-sm">Advertisements</h1>
                <button className="btn rounded items-center p-2 md:p-4 text-white bg-primary flex hover:bg-primary/90 text-xs md:text-md">
                    <FaPlusCircle className="text-sm"/>
                    <p className="md:ml-3 text-xs ml-1">New Ad</p>
                </button>
                
            </div>
            <hr/>
            {/* content */}
            <div className="flex w-full justify-center pt-6 items-center grid grid-cols-3 gap-2">
                {/* Advertisement */}
                <div className="col-span-3 md:col-span-1 mb-6">
                    <div className="w-full relative flex flex-col justify-between sm:h-auto">
                        <button className="absolute rounded top-0 right-0 m-4 p-2 bg-white hover:bg-secondary sm:p-1">
                            <FaEllipsisV/>
                        </button>
                        <Image
                        className="rounded-xl "
                        alt=""
                        width={722}
                        height={512}
                        src={SampleImage}
                        />
                        <h1 className="font-bold mt-4 text-xs md:mt-1">Advertisement Title</h1>
                    </div>
                </div>
                {/* Advertisement */}
                <div className="col-span-3 md:col-span-1 mb-6">
                    <div className="w-full relative flex flex-col justify-between sm:h-auto">
                        <button className="absolute rounded top-0 right-0 m-4 p-2 bg-white hover:bg-secondary sm:p-1">
                            <FaEllipsisV/>
                        </button>
                        <Image
                        className="rounded-xl "
                        alt=""
                        width={722}
                        height={512}
                        src={SampleImage}
                        />
                        <h1 className="font-bold mt-4 text-xs md:mt-1">Advertisement Title</h1>
                    </div>
                </div>{/* Advertisement */}
                <div className="col-span-3 md:col-span-1 mb-6">
                    <div className="w-full relative flex flex-col justify-between sm:h-auto">
                        <button className="absolute rounded top-0 right-0 m-4 p-2 bg-white hover:bg-secondary sm:p-1">
                            <FaEllipsisV/>
                        </button>
                        <Image
                        className="rounded-xl "
                        alt=""
                        width={722}
                        height={512}
                        src={SampleImage}
                        />
                        <h1 className="font-bold mt-4 text-xs md:mt-1">Advertisement Title</h1>
                    </div>
                </div>{/* Advertisement */}
                <div className="col-span-3 md:col-span-1 mb-6">
                    <div className="w-full relative flex flex-col justify-between sm:h-auto">
                        <button className="absolute rounded top-0 right-0 m-4 p-2 bg-white hover:bg-secondary sm:p-1">
                            <FaEllipsisV/>
                        </button>
                        <Image
                        className="rounded-xl "
                        alt=""
                        width={722}
                        height={512}
                        src={SampleImage}
                        />
                        <h1 className="font-bold mt-4 text-xs md:mt-1">Advertisement Title</h1>
                    </div>
                </div>{/* Advertisement */}
                <div className="col-span-3 md:col-span-1 mb-6">
                    <div className="w-full relative flex flex-col justify-between sm:h-auto">
                        <button className="absolute rounded top-0 right-0 m-4 p-2 bg-white hover:bg-secondary sm:p-1">
                            <FaEllipsisV/>
                        </button>
                        <Image
                        className="rounded-xl "
                        alt=""
                        width={722}
                        height={512}
                        src={SampleImage}
                        />
                        <h1 className="font-bold mt-4 text-xs md:mt-1">Advertisement Title</h1>
                    </div>
                </div>
            </div>
            {/* legends */}
        </div>
    )
}
export default AdvertisementsSection
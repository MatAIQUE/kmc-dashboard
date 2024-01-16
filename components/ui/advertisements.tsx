import { FaPlusCircle, FaEllipsisV } from "react-icons/fa";
import Image from "next/image";
import SampleImage from "../../app/assets/img/kmc-ad-2.png"

const AdvertisementsSection = () => {
    return (
        <div className="w-full bg-white drop-shadow-md py-4 px-6 rounded-xl h-full">
            {/* title */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold capitalize">Advertisements</h1>
                <button className="btn rounded p-4 text-white bg-primary flex hover:bg-primary/90">
                    <FaPlusCircle/>
                    <p className="ml-3 text-xs">New Ad</p>
                </button>
                
            </div>
            <hr/>
            {/* content */}
            <div className="flex w-full justify-center pt-6 items-center grid grid-cols-3 gap-2">
                {/* Advertisement */}
                <div className="col-span-3 md:col-span-1 mb-6">
                    <div className="w-full relative flex flex-col justify-between h-52 sm:h-auto">
                        <button className="absolute rounded top-0 right-0 m-4 p-2 bg-white hover:bg-secondary">
                            <FaEllipsisV/>
                        </button>
                        <Image
                        className="rounded-xl"
                        alt=""
                        width={722}
                        height={512}
                        src={SampleImage}
                        />
                        <h1 className="font-bold sm:mt-3">Advertisement Title</h1>
                    </div>
                </div>
                {/* Advertisement */}
                <div className="col-span-3 md:col-span-1 mb-6">
                    <div className="w-full relative flex flex-col justify-between h-52 sm:h-auto">
                        <button className="absolute rounded top-0 right-0 m-4 p-2 bg-white hover:bg-secondary">
                            <FaEllipsisV/>
                        </button>
                        <Image
                        className="rounded-xl"
                        alt=""
                        width={722}
                        height={512}
                        src={SampleImage}
                        />
                        <h1 className="font-bold sm:mt-3">Advertisement Title</h1>
                    </div>
                </div>
                {/* Advertisement */}
                <div className="col-span-3 md:col-span-1 mb-6">
                    <div className="w-full relative flex flex-col justify-between h-52 sm:h-auto">
                        <button className="absolute rounded top-0 right-0 m-4 p-2 bg-white hover:bg-secondary">
                            <FaEllipsisV/>
                        </button>
                        <Image
                        className="rounded-xl"
                        alt=""
                        width={722}
                        height={512}
                        src={SampleImage}
                        />
                        <h1 className="font-bold sm:mt-3">Advertisement Title</h1>
                    </div>
                </div>
                {/* Advertisement */}
                <div className="col-span-3 md:col-span-1 mb-6">
                    <div className="w-full relative flex flex-col justify-between h-52 sm:h-auto">
                        <button className="absolute rounded top-0 right-0 m-4 p-2 bg-white hover:bg-secondary">
                            <FaEllipsisV/>
                        </button>
                        <Image
                        className="rounded-xl"
                        alt=""
                        width={722}
                        height={512}
                        src={SampleImage}
                        />
                        <h1 className="font-bold sm:mt-3">Advertisement Title</h1>
                    </div>
                </div>
                {/* Advertisement */}
                <div className="col-span-3 md:col-span-1 mb-6">
                    <div className="w-full relative flex flex-col justify-between h-52 sm:h-auto">
                        <button className="absolute rounded top-0 right-0 m-4 p-2 bg-white hover:bg-secondary">
                            <FaEllipsisV/>
                        </button>
                        <Image
                        className="rounded-xl"
                        alt=""
                        width={722}
                        height={512}
                        src={SampleImage}
                        />
                        <h1 className="font-bold sm:mt-3">Advertisement Title</h1>
                    </div>
                </div>
            </div>
            {/* legends */}
        </div>
    )
}
export default AdvertisementsSection
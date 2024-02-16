import React from "react";
import { RiArchiveDrawerLine } from "react-icons/ri";

interface Locker {
  doorNumber: string;
}

interface Props {
  dataVacant: Locker[];
}

const VacantLockers: React.FC<Props> = ({ dataVacant }) => {
  return (
    <div className="w-full mt-2 grid grid-cols-3 gap-2 gap-y-2">
      {dataVacant.map((item) => (
        <div
          key={item.doorNumber}
          className="col-span-3 md:col-span-1 mb-6 border-b-2 outline-gray-500
          md:border-b-0
          "
        >
          <div className="w-full flex flex-col justify-between sm:h-auto">
            <div className=" flex items-center bg-white md:drop-shadow-md rounded-xl px-4 py-8 md:py-6 relative">
              <div className="flex items-center justify-start me-2">
                <div className="bg-[#001738] text-white rounded-full p-4">
                  <RiArchiveDrawerLine />
                </div>
              </div>
              <div className="grid ms-2">
                <div>
                  <p className="font-bold w-full">{`Locker - ${item.doorNumber}`}</p>
                  <p className="opacity-80 w-full block">Vacant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VacantLockers;

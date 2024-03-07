import { FaSignOutAlt } from "react-icons/fa";
import SignoutIcon from "../../app/assets/icons/signout.svg";
import Image from "next/image";

const SignoutTab = () => {
  return (
    <>
      <div className="bottom-0 left-0 absolute w-full px-2 text-destructive">
        <button className="w-full p-4 sm:p-0 rounded items-center flex mb-4 hover:bg-secondary">
          <Image src={SignoutIcon} width={24} height={24} alt="" />
          <p className="ms-4 font-medium sm:text-xs sm:ms-2">Logout</p>
        </button>
      </div>
    </>
  );
};

export default SignoutTab;

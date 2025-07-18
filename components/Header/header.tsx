import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="mb-8">
      <div className=" items-center gap-3 mb-4">
        <div className="w-full">
          <Image
            src="/Logo/pxp.png"
            width={200}
            height={10}
            alt="PXP"
            className="h-[75px] w-[150px] rounded-lg"
          />
        </div>
        <h1 className="text-sm font-bold text-white">Responsible Gambling</h1>
      </div>
      <p className="text-white text-lg">
        Advanced Player Addiction Risk Assessment & Monitoring
      </p>
    </div>
  );
};

export default Header;

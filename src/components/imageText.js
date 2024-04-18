import React from "react";

const ImageText = () => {

  return (
    <section
      className="flex flex-col items-center justify-center mx-auto my-6 p-4 sm:p-8 bg-[#F7F7F7]">
      <div className="flex sm:flex-row flex-col items-start justify-center">
        <div className="flex items-center justify-center w-1/2 sm:p-5">
          <img src="/assets/images/brands.png" alt="brands" />
        </div>
        <div className="flex flex-col w-1/2 p-5 pr-10">
          <h3 className=" text-4xl font-medium py-2 mb-2">
            Lorem ipsum dolor sit amet
          </h3>
          <p className="my-2 text-slate-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <p className="my-2 text-slate-600">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImageText;

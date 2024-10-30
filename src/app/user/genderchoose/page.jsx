import React from "react";


const page = () => {
  return (
    <div className="genderbox">
      <h1 className=" pt-10 text-xl font-extrabold sm:ml-3">
        choose your companion gender
      </h1>
      <p className=" mt-3 text-sm text-gray-700">
        By tapping and selecting the gender that you wanted to you get results
        of our Cast lists
      </p>
      <div className="imgbox gap-5">
        <div className="leftimg">
          <button name="male"></button>

        </div>
        <div className="rightimg">
          <button name="female"></button>
        </div>
      </div>
      <div>

      </div>
    </div>
  );
};

export default page;
import React from "react";

const OurCustomers = () => {
  const list = [
    {
      id: 1,
      title: "Megha Sarpal",
      role: "IT Consultant (based in USA)",
      imgUrl: "/assets/images/customers/1.png",
      description:
        "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
      ratings: "5",
    },
    {
      id: 2,
      title: "Megha Sarpal",
      role: "IT Consultant (based in USA)",
      imgUrl: "/assets/images/customers/2.png",
      description:
        "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
      ratings: "5",
    },
    {
      id: 3,
      title: "Megha Sarpal",
      role: "IT Consultant (based in USA)",
      imgUrl: "/assets/images/customers/3.png",
      description:
        "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
      ratings: "5",
    },
  ];
  return (
    <section className="p-8 w-full">
      <div className="flex items-center justify-center pb-4">
        <h3 className="text-[40px] font-medium">What our customers say</h3>
      </div>
      <div className="flex mx-8">
        {list.map((item) => (
          <div key={item.id} className="flex flex-col mx-5 relative">
            <div className="flex flex-col p-8 mb-6 customerCard z-40 bg-white rounded">
              <div className="flex items-start mb-2">
                {Array.from({ length: item.ratings }, (_, index) => (
                  <img key={index} src="assets/icons/star.png" alt="rating" />
                ))}
              </div>
              <p className="mb-4 text-slate-600">{item.description}</p>
            </div>
            <div className="customerCard absolute h-14 w-16 min-w-max bg-white border rotate-[28deg] top-[50%] left-[5%] z-10"></div>
            <div className="flex items-center justify-center my-4">
              <img src={item.imgUrl} alt={item.title} />
              <div className="flex flex-col items-start justify-center mx-2">
                <p className="font-medium">{item.title}</p>
                <p className=" text-slate-600">({item.role})</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurCustomers;

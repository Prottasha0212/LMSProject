import React from "react";
import Footer from "../../componenets/student/Footer";
import DevelopersCard from "../../componenets/DevelopersCard";
import fznSirImage from "../../assets/FznSir.png";
import prottashaImage from "../../assets/Prottasha.png";

const fznSir = {
  name: "Fardin Nafis",
  title: "Lecturer",
  email: "fardin.nafis@bracu.ac.bd",
  image: fznSirImage,
  profileLink: "https://cse.sds.bracu.ac.bd/faculty_profile/342/md_asif_haider",
};

const developers = [
  {
    name: "Maysha Labiba Prottasha",
    title: "Project Leader",
    email: "maysha.labiba.prottasha@g.bracu.ac.bd",
    image: prottashaImage,
    profileLink: "https://github.com/Prottasha0212/LMSProject",
  },

];

const AboutUs = () => {
  return (
    <>
      <div className="relative md:px-36 px-8 py-20 text-left">
        <div className="mb-12">
          <h1 className="text-4xl font-semibold text-gray-800">About Us</h1>
          <p className="text-gray-500">
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              Home
            </span>{" "}
            / <span>About Us</span>
          </p>
        </div>

        {/* Top-centered Professor card */}
        <div className="flex justify-center mb-10">
          <DevelopersCard {...fznSir} />
        </div>

        {/* Grid for the rest of the developers */}
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {developers.map((dev, index) => (
            <DevelopersCard key={index} {...dev} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
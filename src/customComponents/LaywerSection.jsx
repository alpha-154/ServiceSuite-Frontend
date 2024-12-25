import React from "react";
//import CheckCircleIcon from "@/assets/check-circle.svg";
import { Card } from "./Card";
import { CheckCheckIcon } from "lucide-react";

const lawyerProfiles = [
  {
    name: "John Doe",
    specialization: "Corporate Law",
    description:
      "Specialized in handling corporate legal matters, mergers, acquisitions, and compliance.",
    highlights: [
      { title: "10+ years of experience in corporate law." },
      { title: "Assisted over 50 companies in legal compliance." },
      { title: "Expert in contract drafting and negotiations." },
    ],
    image:
      "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=600", // Replace with actual image file or URL
  },
  {
    name: "Jane Smith",
    specialization: "Family Law",
    description:
      "Providing compassionate legal support for family-related issues, including divorce and custody.",
    highlights: [
      { title: "Handled 200+ family law cases." },
      { title: "Experienced in mediation and conflict resolution." },
      { title: "Recognized for empathetic client relations." },
    ],
    image:
      "https://images.pexels.com/photos/2955376/pexels-photo-2955376.jpeg?auto=compress&cs=tinysrgb&w=600", // Replace with actual image file or URL
  },
  {
    name: "Joe Johnson",
    specialization: "Intellectual Property Law",
    description:
      "Protecting intellectual property rights for creators, inventors, and businesses.",
    highlights: [
      { title: "Filed over 300 successful trademarks and patents." },
      { title: "Expert in copyright law and IP litigation." },
      { title: "Worked with tech startups and creative professionals." },
    ],
    image:
      "https://images.pexels.com/photos/29453330/pexels-photo-29453330/free-photo-of-stylish-man-in-a-coat-in-autumn-geneva-park.jpeg?auto=compress&cs=tinysrgb&w=800", // Replace with actual image file or URL
  },
  {
    name: "Michael Brown",
    specialization: "Criminal Law",
    description:
      "Defending individuals accused of criminal activities with a focus on justice and fairness.",
    highlights: [
      { title: "Achieved 95% success rate in court trials." },
      { title: "15+ years of experience in criminal defense." },
      { title: "Recognized for expertise in high-profile cases." },
    ],
    image:
      "https://images.pexels.com/photos/29861078/pexels-photo-29861078/free-photo-of-portrait-of-a-man-by-the-riverfront.jpeg?auto=compress&cs=tinysrgb&w=800", // Replace with actual image file or URL
  },
];

const LawyerSection = () => {
  return (
    <section id="featured-lawyers" className="pb-16 lg:py-24 px-4">
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading mb-10">
          <div className="flex justify-center">
            <div className="tag dark:border-gray-600">Lawyers</div>
          </div>
          <h2 className="section-title mt-5 dark:from-white dark:to-[#4583df]">
            Meet Our Lawyers
          </h2>
          <p className="section-description mt-5 dark:text-[#6195cf]">
            Showcasing the expertise and achievements of top-rated lawyers
            across various specialties
          </p>
        </div>

        <div className="flex flex-col mt-10 md:mt-20 gap-20">
          {lawyerProfiles.map((lawyer, lawyerIndex) => (
            <Card
              key={lawyer.name}
              className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky top-0"
              style={{
                top: `calc(64px + ${lawyerIndex * 40}px)`,
              }}
            >
              <div className="lg:grid lg:grid-cols-2 lg:gap-16 ">
                <div className="lg:pb-16">
                  <div className="uppercase font-bold inline-flex gap-2 tracking-widest text-sm bg-gradient-to-r from-red-300 to-violet-400 bg-clip-text text-transparent">
                    <span>{lawyer.name}</span>
                    <span>&bull;</span>
                    <span>{lawyer.specialization}</span>
                  </div>

                  <h3 className="font-serif text-neutral-800 dark:text-primary text-2xl md:text-4xl mt-2 md:mt-5">
                    {lawyer.description}
                  </h3>
                  <hr className="border-t-2 border-neutral-700/30 mt-4 md:mt-5" />
                  <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                    {lawyer.highlights.map((highlight) => (
                      <li
                        key={highlight.title}
                        className="flex gap-2 text-sm md:text-base dark:text-primary text-neutral-600"
                      >
                        <CheckCheckIcon className="text-neutral-600 w-4 h-4" />
                        <span>{highlight.title}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="bg-white hover:bg-white/80 transition duration-300 cursor-pointer text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8">
                    <span>Top Rated</span>
                  </button>
                </div>
                <div>
                  <img
                    src={lawyer.image}
                    alt={lawyer.title}
                    className="mt-8 -mb-4 md:-mb-0 rounded-xl lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LawyerSection;

import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import image1 from "/image1.jpg";
import image2 from "/image2.jpg";
import image3 from "/image3.jpg";

import { Link } from "react-router-dom";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [image2, image3, image1];

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });

    // Image slider timer
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-[80vh] w-full overflow-x-clip">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 py-8">
          {/* Left Section */}
          <div className="w-full md:w-1/2 space-y-8">
            <h1
              //className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-950 dark:text-gray-200 tracking-wide"
              className="text-2xl md:text-4xl md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text"
              data-aos="fade-up"
              data-aos-delay="200"
            >
             Service Suite: Simplifying Legal Service Sharing
            </h1>

            <p
              className="text-[20px] leading-[27px] tracking-tight text-[#010D3E]"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Connect with expert lawyers and book tailored legal services effortlessly. Service Suite bridges the gap between professionals and clients for all your legal needs
            </p>
            <div data-aos="fade-up" data-aos-delay="600" className="flex items-center gap-4">
              <a href="#featured-movies" className="mt-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105">
                   Explore Services
                </button>
              </a>
              <Link to="/trending-movies">
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105">
                  Meet Lawyers
                </button>
              </Link>
            </div>

          </div>

          {/* Right Section - Image Slider */}
          <div
            className="w-full md:w-1/2 relative aspect-[4/3] rounded-xl overflow-hidden"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0  w-full h-full   transition-opacity duration-1000 ${
                  currentSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide}
                  alt={`Mountain trek ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {/* Slider Indicators */}
            <div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2"
              data-aos="fade-up"
              data-aos-delay="800"
            >
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    currentSlide === index ? "bg-white" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;


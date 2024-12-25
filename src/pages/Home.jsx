import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import FeaturedServices from "@/customComponents/FeaturedServices";
import TestimonialSection from "@/customComponents/TestimonialSection";
import Hero from "@/customComponents/Hero";
import LawyerSection from "@/customComponents/LaywerSection";


const Home = () => {
  // dynamic title on the browser's title bar
  useEffect(() => {
    document.title = "Home - ServiceSuite";
  }, []);

  // State initialized from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Update theme based on state
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen w-full">
      <div className="flex items-center justify-start p-4 mt-4 md:mb-10">
        <div className="flex items-center justify-start gap-2 border border-gray-200 dark:border-gray-600 p-2 rounded-lg">
          <Switch
            id="theme-switch"
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
          />
          <Label htmlFor="theme-switch">
            {isDarkMode ? "Dark Mode" : "Light Mode"}
          </Label>
        </div>
      </div>
      <Hero />

      <FeaturedServices />
      <LawyerSection/>
      

      <TestimonialSection />
    </div>
  );
};

export default Home;

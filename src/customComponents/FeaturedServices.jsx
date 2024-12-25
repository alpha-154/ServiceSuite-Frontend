import React, {useState, useEffect} from "react";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchSixServices } from "@/api";
import { FeaturedServiceCard } from "./FeaturedServicesCard";
import { SkeletonSection } from "./Skeleton";

const featuredServices = [
  {
    serviceObjectID: "1",
    ServiceProviderName: "John Doe",
    ServiceProviderImage:
      "https://images.pexels.com/photos/2955376/pexels-photo-2955376.jpeg?auto=compress&cs=tinysrgb&w=600",
    ServiceLocationArea: "Chittagong",
    ServiceImage:
      "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800",
    ServiceName: "Corporate Law Consultation",
    ServiceDescription:
      "Expert advice on corporate law matters, including mergers, acquisitions, and compliance.",
    ServicePrice: "25K BDT",
  },
  {
    serviceObjectID: "1",
    ServiceProviderName: "Steve Smith",
    ServiceProviderImage:
      "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=600",
    ServiceLocationArea: "Dhaka",
    ServiceImage:
      "https://images.pexels.com/photos/6077381/pexels-photo-6077381.jpeg?auto=compress&cs=tinysrgb&w=600",
    ServiceName: "Contract Drafting",
    ServiceDescription:
      "Drafting clear and concise contracts tailored to your needs.",
    ServicePrice: "20K BDT",
  },
  {
    serviceObjectID: "1",
    ServiceProviderName: "Steve Smith",
    ServiceProviderImage:
      "https://images.pexels.com/photos/1416971/pexels-photo-1416971.jpeg?auto=compress&cs=tinysrgb&w=800",
    ServiceLocationArea: "Chittagong",
    ServiceImage:
      "https://images.pexels.com/photos/8111815/pexels-photo-8111815.jpeg?auto=compress&cs=tinysrgb&w=600",
    ServiceName: "Family Law Services",
    ServiceDescription:
      "Providing support in divorce, child custody, and other family-related cases.",
    ServicePrice: "30K BDT",
  },
  {
    serviceObjectID: "1",
    ServiceProviderName: "Mary Johnson",
    ServiceProviderImage:
      "https://images.pexels.com/photos/936117/pexels-photo-936117.jpeg?auto=compress&cs=tinysrgb&w=600",
    ServiceLocationArea: "Khulna",
    ServiceImage:
      "https://images.pexels.com/photos/2146472/pexels-photo-2146472.jpeg?auto=compress&cs=tinysrgb&w=600",
    ServiceName: "Real Estate Legal Services",
    ServiceDescription:
      "Comprehensive legal assistance for real estate transactions.",
    ServicePrice: "40K BDT",
  },
  {
    serviceObjectID: "1",
    ServiceProviderName: "Michael Davis",
    ServiceProviderImage:
      "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=800",
    ServiceLocationArea: "Barisal",
    ServiceImage:
      "https://images.pexels.com/photos/7009611/pexels-photo-7009611.jpeg?auto=compress&cs=tinysrgb&w=800",
    ServiceName: "Immigration Law Assistance",
    ServiceDescription:
      "Expert guidance on visa applications, green cards, and citizenship.",
    ServicePrice: "29K BDT",
  },
  {
    serviceObjectID: "1",
    ServiceProviderName: "John Doe",
    ServiceProviderImage:
      "https://images.pexels.com/photos/2955376/pexels-photo-2955376.jpeg?auto=compress&cs=tinysrgb&w=600",
    ServiceLocationArea: "Dhaka",
    ServiceImage:
      "https://images.pexels.com/photos/6077431/pexels-photo-6077431.jpeg?auto=compress&cs=tinysrgb&w=600",
    ServiceName: "Criminal Defense",
    ServiceDescription: "Dedicated representation in criminal cases.",
    ServicePrice: "25K BDT",
  },
];

const FeaturedServices = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await fetchSixServices();
        if (response.status === 200) {
          setServices(response.data.services);
        }
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section
      id="featured-services"
      className="py-16 bg-gray-50 dark:bg-background p-4 border dark:border-gray-800 rounded-xl mb-5 md:mb-10"
    >
      <div className="container mx-auto px-4">
        <div className="section-heading mb-10">
          <div className="flex justify-center">
            <div className="tag dark:border-gray-600">Featured</div>
          </div>
          <h2 className="section-title mt-5 dark:from-white dark:to-[#4583df]">
            Featured Services
          </h2>
          <p className="section-description mt-5 dark:text-[#6195cf]">
            Explore top-rated legal services handpicked for your needs.
          </p>
        </div>
        <div className="w-full mt-5 mx-auto">
          {isLoading ? (
            <SkeletonSection />
          ) : (
            <>
              {services?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services?.map((service) => (
                    <FeaturedServiceCard
                      key={service._id}
                      serviceObjectId={service._id}
                      serviceImage={service.serviceImageUrl}
                      serviceName={service.serviceName}
                      serviceDescription={service.serviceDescription}
                      providerImage={service.serviceProviderImageUrl}
                      providerName={service.serviceProviderName}
                      servicePrice={service.price}
                      serviceArea={service.serviceArea}
                      serviceStatus={null}
                      serviceTakingDate={null}
                      specialInstructions={null}
                      isTodo={false}
                      onSelectService={null}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center text-lg">No services found!</div>
              )}
            </>
          )}
        </div>
        <div className="flex justify-center items-center mt-10">
          <Button
            onClick={() => navigate("/all-services")}
            className="text-white bg-blue-600 hover:bg-blue"
          >
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;

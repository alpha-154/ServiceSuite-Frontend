import React, { useState, useEffect } from "react";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchBookedServices } from "@/api";
import { FeaturedServiceCard } from "@/customComponents/FeaturedServicesCard";
import { SkeletonSection } from "@/customComponents/Skeleton";

const BookedServices = () => {
  const [user, loading] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);

  const [bookedServices, setBookedServices] = useState([]);

  // dynamic title on the browser's title bar
  useEffect(() => {
    document.title = "Booked Services - ServiceSuite";
  }, []);

  // fetching user's added service data
  useEffect(() => {
    const fetchBookedService = async () => {
      try {
        setIsLoading(true);
        const response = await fetchBookedServices(user?.uid);
        console.log("booked services: ", response.data.bookedServices);
        if (response.status === 200) {
          setBookedServices(response.data.bookedServices);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (user && !loading) {
      fetchBookedService();
    }
  }, [user]);

  return (
    <div className="min-h-screen w-full flex flex-col  gap-2 py-2 mb-20">
      {/* Section Heading */}
      <div className="section-heading mx-auto">
        <div className="flex justify-center">
          <div className="text-lg md:text-xl inline-flex border border-[#222]/10 px-3 py-1 rounded-lg">
            Manage Services
          </div>
        </div>

        <p className="text-center text-lg  leading-[27px] tracking-tight text-[#010D3E] mt-5">
          Manage and update your added services effortlessly to keep them
          accurate, attractive, and up-to-date.
        </p>
      </div>
      <div>
        {bookedServices.length > 0 && (
          <h1 className="w-fit mx-auto text-lg text-center text-violet-700 border border-violet-700 rounded-md p-2 my-4 md:my-5">
            You&apos;ve booked{" "}
            <span className="font-bold">{bookedServices.length}</span> services
          </h1>
        )}
      </div>
      {/* fetch managed services */}
      <div className="w-full mt-5 mx-auto">
        {isLoading ? (
          <SkeletonSection />
        ) : (
          <>
            {bookedServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {bookedServices.map((service) => (
                  <FeaturedServiceCard
                    key={service._id}
                    serviceObjectId={service._id}
                    serviceImage={service.serviceImageUrl}
                    serviceName={service.serviceName}
                    serviceDescription={service.serviceDescription}
                    providerImage={service.serviceProviderImageUrl}
                    providerName={service.serviceProviderName}
                    servicePrice={service.price}
                    serviceStatus={service.serviceStatus}
                    serviceTakingDate={service.serviceTakingDate}
                    specialInstructions={service.specialInstructions}
                    isTodo={false}
                    onSelectService={null}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-lg">
                You haven&apos;t booked any services yet!
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookedServices;

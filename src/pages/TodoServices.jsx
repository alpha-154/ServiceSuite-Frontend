import React, { useState, useEffect } from "react";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchTodoServices,  updateToDoServiceStatus } from "@/api";
import { FeaturedServiceCard } from "@/customComponents/FeaturedServicesCard";
import { SkeletonSection } from "@/customComponents/Skeleton";
import { toast } from "sonner";


const TodoServices = () => {
  const [user, loading] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);

  const [todoServices, setTodoServices] = useState([]);

  // dynamic title on the browser's title bar
  useEffect(() => {
    document.title = "Todo Services - ServiceSuite";
  }, []);

  // fetching user's added service data
  useEffect(() => {
    const fetchTodoService = async () => {
      try {
        setIsLoading(true);
        const response = await fetchTodoServices(user?.uid);
        console.log("todo services: ", response.data.todoServices);
        if (response.status === 200) {
          setTodoServices(response.data.todoServices);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (user && !loading) {
      fetchTodoService();
    }
  }, [user]);

  //handle select service
  const handleSelectService = async ({serviceId, serviceStatus}) => {
    console.log("selected service id: ", serviceId , "selected service status: ", serviceStatus);
    if(!user || !serviceId || !serviceStatus) {
      toast.error("Missing necessary data to make api calls!");
      return;
    }
    const updateData = {
      uid: user?.uid,
      serviceId,
      newStatus: serviceStatus
    }
    console.log("update data: ", updateData);
    try {
      const response = await updateToDoServiceStatus(updateData);
      if(response.status === 200) {
        toast.success(response.data.message);
      }
      setTodoServices((prev) => (prev.map((service) => service._id === serviceId ? {...service, serviceStatus} : service)));
    } catch (error) {
      if(error?.response?.data?.message) return toast.error(error?.response?.data?.message);
      else return toast.error("Something went wrong! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col  gap-2 py-2 mb-20">
      {/* Section Heading */}
      <div className="section-heading mx-auto">
        <div className="flex justify-center">
          <div className="text-lg md:text-xl inline-flex border border-[#222]/10 px-3 py-1 rounded-lg">
            Manage Services
          </div>
        </div>

        <p className="text-center text-lg  leading-[27px] tracking-tight text-[#010D3E] dark:text-[#6195cf] mt-5">
          Manage and update your added services effortlessly to keep them
          accurate, attractive, and up-to-date.
        </p>
      </div>
      <div>
        {todoServices.length > 0 && (
          <h1 className="w-fit mx-auto text-lg text-center text-violet-700 border border-violet-700 rounded-md p-2 my-4 md:my-5">
            You&apos;ve got{" "}
            <span className="font-bold">{todoServices.length}</span> services to work on
          </h1>
        )}
      </div>
      {/* fetch managed services */}
      <div className="w-full mt-5 mx-auto">
        {isLoading ? (
          <SkeletonSection />
        ) : (
          <>
            {todoServices?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {todoServices?.map((service) => (
                  <FeaturedServiceCard
                    key={service._id}
                    serviceObjectId={service._id}
                    serviceImage={service.serviceImageUrl}
                    serviceName={service.serviceName}
                    serviceDescription={service.serviceDescription}
                    providerImage={service.serviceProviderImageUrl}
                    providerName={service.serviceProviderName}
                    servicePrice={service.price}
                    serviceArea={service.servieArea}
                    serviceStatus={service.serviceStatus}
                    serviceTakingDate={service.serviceTakingDate}
                    specialInstructions={service.specialInstructions}
                    isTodo={true}
                    onSelectService={handleSelectService}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-lg">
                 None of your services are booked yet!
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TodoServices;
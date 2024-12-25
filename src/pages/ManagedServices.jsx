import React, { useState, useEffect } from "react";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  fetchAddedServices,
  deleteAddedService,
  updateAddedService,
} from "@/api";
import { SkeletonSection } from "@/customComponents/Skeleton";
import { ManagedServiceCard } from "@/customComponents/ManagedServicesCard";
import { toast } from "sonner";

const ManagedServices = () => {
  const [user, loading] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [managedServices, setManagedServices] = useState([]);

  // dynamic title on the browser's title bar
  useEffect(() => {
    document.title = "Manage Services - ServiceSuite";
  }, []);

  // Service edit function
  const handleEdit = async (serviceData) => {
    console.log("handle edit function called");
    console.log("user", user, "serviceData", serviceData);
    if (!user || !serviceData) {
      toast.error("user info or service data isn't available yet!");
    }
    try {
      setIsEditing(true);
      const updatedServiceData = {
        uid: user?.uid,
        serviceId: serviceData.serviceId,
        serviceImageUrl: serviceData.serviceImageUrl,
        serviceName: serviceData.serviceName,
        serviceDescription: serviceData.serviceDescription,
        serviceArea: serviceData.serviceArea,
        price: serviceData.price,
        serviceProviderImageUrl: user?.photoURL,
        serviceProviderName: user?.displayName,
        serviceProviderEmail: user?.email,
      };
      const response = await updateAddedService(updatedServiceData);
      if (response.status === 201) {
        toast.success(response.data.message);

        // Update the managedServices state to remove the deleted service
        setManagedServices((prevServices) =>
          prevServices.map((service) =>
            service._id === response.data.service._id ? response.data.service : service
          )
        );
        
      }
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data?.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setIsEditing(false);
    }
  };
  // Service delete function
  const handleDelete = async (serviceId) => {
    if (!user) {
      toast.error("user info isn't available yet!");
    }
    try {
      setIsDeleting(true);
      const response = await deleteAddedService({ uid: user?.uid, serviceId });
      if (response.status === 200) {
        toast.success(response.data.message);

        // Update the managedServices state to remove the deleted service
        setManagedServices((prevServices) =>
          prevServices.filter((service) => service._id !== serviceId)
        );
      }
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data?.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // fetching user's added service data
  useEffect(() => {
    const fetchManagedServices = async () => {
      try {
        setIsLoading(true);
        const response = await fetchAddedServices(user?.uid);
        if (response.status === 200) {
          setManagedServices(response.data.addedServices);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (user && !loading) {
      fetchManagedServices();
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
        {managedServices?.length > 0 && (
          <h1 className="w-fit mx-auto text-lg text-center text-violet-700 border border-violet-700 rounded-md p-2 my-4 md:my-5">
            You&apos;ve added{" "}
            <span className="font-bold">{managedServices?.length}</span> services
          </h1>
        )}
      </div>
      {/* fetch managed services */}
      <div className="w-full mt-5 mx-auto">
        {isLoading ? (
          <SkeletonSection />
        ) : (
          <>
            {managedServices?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {managedServices?.map((service) => (
                  <ManagedServiceCard
                    key={service._id}
                    serviceObjectId={service._id}
                    serviceImage={service.serviceImageUrl}
                    serviceName={service.serviceName}
                    serviceDescription={service.serviceDescription}
                    servicePrice={service.price}
                    serviceArea={service.serviceArea}
                    onDelete={handleDelete}
                    isDeleting={isDeleting}
                    onEdit={handleEdit}
                    isEditing={isEditing}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-lg">
                You haven&apos;t added any services yet!
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ManagedServices;

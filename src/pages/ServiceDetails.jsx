import React, { useState, useEffect } from "react";
import { bookService, fetchServiceById } from "@/api";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import BookServiceModal from "@/customComponents/BookServiceModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Mail } from 'lucide-react'

const ServiceDetails = () => {
  const [user] = useAuthState(auth);
  const [service, setService] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const { serviceId } = useParams();

  // dynamic title on the browser's title bar
  useEffect(() => {
    document.title = "Service Details - ServiceSuite";
  }, []);

  //fetching the service information
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchServiceById(serviceId);
        console.log("service: ", response.data.service);
        if (response.status === 200) {
          setService(response.data.service);
        }
      } catch (error) {
        console.log(error);
        if (error?.response) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Error while fetching the service details!");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (serviceId) fetchServiceData();
  }, []);

  //handle booking
  const handleBookService = async (serviceData) => {
    if (!user) {
      toast.error("user info isn't available yet!");
    }
    if(user?.displayName === serviceData.serviceProviderName){
      toast.error("You can't book your own service!");
      return;
    }
    const bookServiceData = {
      serviceId: serviceData.serviceId,
      serviceName: serviceData.serviceName,
      serviceDescription: serviceData.serviceDescription,
      serviceImageUrl: serviceData.serviceImageUrl,
      serviceProviderImageUrl: serviceData.serviceProviderImageUrl,
      serviceProviderEmail: serviceData.serviceProviderEmail,
      serviceProviderName: serviceData.serviceProviderName,
      currentUserEmail: serviceData.currentUserEmail,
      currentUserName: serviceData.currentUserName,
      serviceTakingDate: serviceData.serviceTakingDate,
      specialInstructions: serviceData.specialInstructions,
      price : serviceData.price,
      serviceStatus: serviceData.serviceStatus
    }
    console.log("book services", bookServiceData);
    try {
      setIsBooking(true)
      const response = await bookService(bookServiceData);
      if(response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data?.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col gap-2 py-2 mb-20">
      {/* Section Heading */}
      <div className="section-heading mx-auto">
        <div className="flex justify-center">
          <div className="text-lg md:text-xl inline-flex border border-[#222]/10 px-3 py-1 rounded-lg">
            Service Details
          </div>
        </div>

        <p className="text-center text-lg  leading-[27px] tracking-tight text-[#010D3E] mt-5">
          Below are the service details. To book this service, simply click the
          'Book Now' button.
        </p>
      </div>
      {/* Service Section */}
      {isLoading ? (
        <div className="flex justify-center items-center mt-10">
          <Loader2 className="text-violet-700 h-10 w-10 animate-spin mr-4" />
          Loading...
        </div>
      ) : (
        <div className="flex max-md:flex-col items-center gap-8 mt-10 p-5">
          {/* Service Image */}
          <Card className="overflow-hidden max-h-[400px] basis-1/2">
            <img
              src={service?.serviceImageUrl}
              alt="Service Image"
              className="w-full h-full object-cover"
              style={{ minHeight: "100%" }}
            />
          </Card>

          {/* Service Info */}
          <div className="space-y-8 basis-1/2">
            {/* Provider Info */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                  Service Provider Info
                </h2>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={service.serviceProviderImageUrl}
                      alt="Provider"
                    />
                    <AvatarFallback>SP</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="font-medium">
                      {service.serviceProviderName}
                    </h3>
                    <div className="flex items-center text-muted-foreground gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{service.serviceProviderEmail}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{service.serviceArea}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Information */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                  Service Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Service</h3>
                    <p className="text-muted-foreground">
                      {service.serviceName}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Description</h3>
                    <p className="text-muted-foreground">
                      {service.serviceDescription}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Service Area</h3>
                    <p className="text-muted-foreground">
                      {service.serviceArea}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Price</h3>
                    <p className="text-2xl font-semibold text-primary">
                      {service.price} BDT
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Book Now Button */}
            <div className="flex justify-end">
              <BookServiceModal
                serviceObjectId={service._id}
                serviceName={service.serviceName}
                serviceImage={service.serviceImageUrl}
                serviceDescription={service.serviceDescription}
                serviceProviderImageUrl={service.serviceProviderImageUrl}
                serviceProviderName={service.serviceProviderName}
                serviceProviderEmail={service.serviceProviderEmail}
                currentUserName={user?.displayName}
                currentUserEmail={user?.email}
                servicePrice={service.price}
                onBook={handleBookService}
                isBooking={isBooking}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;

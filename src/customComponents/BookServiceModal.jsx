import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BookServiceModal = ({
  serviceObjectId,
  serviceName,
  serviceImage,
  serviceDescription,
  serviceProviderImageUrl,
  serviceProviderName,
  serviceProviderEmail,
  currentUserName,
  currentUserEmail,
  servicePrice,
  onBook,
  isBooking
}) => {
  const [serviceTakingDate, setServiceTakingDate] = useState("");
  const [servicePlan, setServicePlan] = useState("");

  return (
   
             <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{isBooking ? "Booking..." : "Book Now"}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[450px] max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Service</DialogTitle>
          <DialogDescription>
             After filling remaining details, click book now.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceId" className="text-right">
              Service Id
            </Label>
            <Input
              id="serviceId"
              defaultValue={serviceObjectId}
              disabled
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceName" className="text-right">
              Service Title
            </Label>
            <Input
              id="serviceName"
              defaultValue={serviceName}
              disabled
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceImage" className="text-right">
              Service Image
            </Label>
            <Input
              id="serviceImage"
              defaultValue={serviceImage}
              disabled
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="providerName" className="text-right">
              Service Provider Name
            </Label>
            <Input
              id="providerName"
              defaultValue={serviceProviderName}
              disabled
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="providerEmail" className="text-right">
              Service Provider Email
            </Label>
            <Input
              id="providerEmail"
              defaultValue={serviceProviderEmail}
              disabled
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currentUserName" className="text-right">
              Your Username
            </Label>
            <Input
              id="currentUserName"
              defaultValue={currentUserName}
              disabled
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currentUserEmail" className="text-right">
              Your Email
            </Label>
            <Input
              id="currentUserEmail"
              defaultValue={currentUserEmail}
              disabled
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceTakingDate" className="text-right">
              Service Taking Date
            </Label>
            <Input
              id="serviceTakingDate"
              value={serviceTakingDate}
               
              onChange={(e) => setServiceTakingDate(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="servicePlan" className="text-right">
              Service Plan
            </Label>
            <Input
              id="servicePlan"
              value={servicePlan}
             
              onChange={(e) => setServicePlan(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() =>
              onBook({
                serviceId: serviceObjectId,
                serviceName: serviceName,
                serviceDescription: serviceDescription,
                serviceImageUrl: serviceImage,
                serviceProviderImageUrl: serviceProviderImageUrl,
                serviceProviderEmail: serviceProviderEmail,
                serviceProviderName: serviceProviderName,
                currentUserEmail: currentUserEmail,
                currentUserName: currentUserName,
                serviceTakingDate: serviceTakingDate,
                specialInstructions: servicePlan,
                price: servicePrice,
                serviceStatus: "pending",
              })
            }
          >
            Book Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
   
  );
};

export default BookServiceModal;

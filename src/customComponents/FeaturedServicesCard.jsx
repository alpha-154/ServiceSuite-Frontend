import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export function FeaturedServiceCard({
  serviceObjectId,
  serviceImage,
  serviceName,
  serviceDescription,
  providerImage,
  providerName,
  servicePrice,
  serviceStatus,
  serviceTakingDate,
  specialInstructions,
  isTodo,
  onSelectService,
}) {
  const navigate = useNavigate();
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="max-h-[350px] max-w-[400px]">
          <img src={serviceImage} alt={serviceName} className="h-60 w-full" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{serviceName}</h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {serviceDescription}
          </p>
          <div className="flex items-center mb-4">
            <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
              <img
                src={providerImage}
                alt={providerName}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-sm font-medium">{providerName}</span>
          </div>
          <div>
            {serviceStatus && (
              <p>
                Service Status :{" "}
                {serviceStatus === "pending" ? (
                  <span className="text-red-600">Pending</span>
                ) : (
                  <span className="text-green-600">{serviceStatus}</span>
                )}
              </p>
            )}
          </div>
          <div className="mt-2 flex flex-col gap-2">
            {serviceTakingDate && (
              <p>Service Taking Date : {serviceTakingDate}</p>
            )}
            {specialInstructions && (
              <p>Special Instructions : {specialInstructions}</p>
            )}
          </div>
          <div className="mt-2">
            {isTodo && onSelectService && (
              <Select
                onValueChange={(selectedStatus) =>
                  onSelectService({
                    serviceId: serviceObjectId,
                    serviceStatus: selectedStatus,
                  })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Update service status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Service Status</SelectLabel>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="working">Working</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-gray-50">
        <span className="text-lg font-bold">{servicePrice}</span>
        { !serviceStatus && (
            <Button onClick={() => navigate(`/service-details/${serviceObjectId}`)}>
            View Details
          </Button>
        )}
        
      </CardFooter>
    </Card>
  );
}

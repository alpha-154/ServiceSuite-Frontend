import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ManageServiceEditModal from "./ManageServiceEditModal";

export function ManagedServiceCard({
  serviceObjectId,
  serviceImage,
  serviceName,
  serviceDescription,
  servicePrice,
  serviceArea,
  onDelete,
  isDeleting,
  onEdit,
  isEditing,
}) {
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
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {serviceArea}
          </p>
          <span className="text-md font-bold">{servicePrice}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-gray-50 dark:bg-neutral-950">
        {/* edit button */}
        <div>
          <ManageServiceEditModal
            serviceObjectId={serviceObjectId}
            serviceImage={serviceImage}
            serviceName={serviceName}
            serviceDescription={serviceDescription}
            servicePrice={servicePrice}
            serviceArea={serviceArea}
            onEdit={onEdit}
            isEditing={isEditing}
          />
        </div>
        {/* delete button */}
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this service and remove this service data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(serviceObjectId)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
}

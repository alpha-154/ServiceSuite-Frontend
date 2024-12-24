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

const ManageServiceEditModal = ({
  serviceObjectId,
  serviceImage,
  serviceName,
  serviceDescription,
  servicePrice,
  serviceArea,
  onEdit,
  isEditing,
}) => {
  const [serviceImageEdit, setServiceImageEdit] = useState(serviceImage);
  const [serviceNameEdit, setServiceNameEdit] = useState(serviceName);
  const [serviceDescriptionEdit, setServiceDescriptionEdit] =
    useState(serviceDescription);
  const [servicePriceEdit, setServicePriceEdit] = useState(servicePrice);
  const [serviceAreaEdit, setServiceAreaEdit] = useState(serviceArea);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{isEditing ? "Editing..." : "Edit"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
          <DialogDescription>
            Make changes to service here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceImage" className="text-right">
              Service Image
            </Label>
            <Input
              id="serviceImage"
              value={serviceImageEdit}
              onChange={(e) => setServiceImageEdit(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceName" className="text-right">
              Service Title
            </Label>
            <Input
              id="serviceName"
              value={serviceNameEdit}
              onChange={(e) => setServiceNameEdit(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor=" serviceDescription" className="text-right">
              Service Description
            </Label>
            <Input
              id="serviceDescription"
              value={serviceDescriptionEdit}
              onChange={(e) => setServiceDescriptionEdit(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceArea" className="text-right">
              Service Area
            </Label>
            <Input
              id="serviceArea"
              value={serviceAreaEdit}
              onChange={(e) => setServiceAreaEdit(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="servicePrice" className="text-right">
              Price
            </Label>
            <Input
              id="servicePrice"
              value={servicePriceEdit}
              onChange={(e) => setServicePriceEdit(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() =>
              onEdit({
                serviceId: serviceObjectId,
                serviceImageUrl: serviceImageEdit,
                serviceName: serviceNameEdit,
                serviceDescription: serviceDescriptionEdit,
                serviceArea: serviceAreaEdit,
                price: servicePriceEdit,
              })
            }
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageServiceEditModal;

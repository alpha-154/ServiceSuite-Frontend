import React from "react";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { addService } from "@/api";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const addFormSchema = z.object({
  serviceName: z.string(),
  serviceDescription: z.string(),
  serviceArea: z.string(),
  price: z.string(),
  serviceImage: z.string(),
});

const AddService = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // dynamic title on the browser's title bar
  useEffect(() => {
    document.title = "Add Service - ServiceSuite";
  }, []);

  const form = useForm({
    resolver: zodResolver(addFormSchema),
    defaultValues: {
      serviceName: "",
      serviceDescription: "",
      serviceArea: "",
      price: "",
      serviceImage: "",
    },
  });

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("File size must be under 2MB.");
    } else {
      setImage(file || null);
      console.log("image", image);
      setImagePreview(URL.createObjectURL(file)); // Image preview
    }
  };

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      setLoading(true);
      let imageUrl = "";

      if (image) {
        console.log("image-> onSubmit()", image);
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "user_profile_image");

        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/dyy7hjubd/image/upload`,
          formData
        );

        imageUrl = cloudinaryResponse.data.secure_url;
      }
      //console.log("provider name", user?.displayName, "provider image", user?.photoURL);
      const addServiceData = {
        uid: user?.uid,
        serviceImageUrl: imageUrl,
        serviceName: data.serviceName,
        serviceDescription: data.serviceDescription,
        serviceArea: data.serviceArea,
        price: data.price,
        serviceProviderImageUrl: user?.photoURL,
        serviceProviderName: user?.displayName,
        serviceProviderEmail: user?.email,
      };
      console.log("addServiceData", addServiceData);

      const response = await addService(addServiceData);

      if (response.status === 201) {
        toast.success("Service created successfully!");
        form.reset();
        setImage(null);
        setImagePreview(null);
        setLoading(false);

        // Reset the file input
        if (fileInputRef?.current) {
          fileInputRef.current.value = "";
        }

        navigate("/all-services");
      }
    } catch (err) {
      setLoading(false);
      form.reset();
      setImage(null);
      setImagePreview(null);

      // Reset the file input
      if (fileInputRef?.current) {
        fileInputRef.current.value = "";
      }

      if (err.response && err.response.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col gap-2 py-2 mb-20">
      {/* Section Heading */}
      <div className="section-heading mx-auto">
        <div className="flex justify-center">
          <div className="text-lg md:text-xl inline-flex border border-[#222]/10 px-3 py-1 rounded-lg">
            Add Service
          </div>
        </div>

        <p className="text-center text-lg  leading-[27px] tracking-tight text-[#010D3E] mt-5">
          Provide details about your service and make your services accessible
          to clients by adding a new service
        </p>
      </div>
      {/* Add Service Form */}
      <div className="w-full flex justify-center gap-5 mt-5">
        {/* Form */}

        <div className="border border-gray-200 rounded-xl p-6 md:p-8 shadow-[0_0_20px_rgba(0,0,0,0.15)]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="serviceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Title</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Corporate Law Consultation"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Description</FormLabel>
                    <FormControl>
                      <Textarea
                        type="text"
                        placeholder="Expert advice on corporate law matters, including...."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="serviceArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Area</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Dhaka"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>price</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="25K" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serviceImage"
                render={() => (
                  <FormItem>
                    <FormLabel>Service Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {imagePreview && (
                <div className="flex justify-center mb-2">
                    <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover mt-2 border rounded-md"
                />
                </div>
                
              )}

              <div className="flex justify-center">
                {loading ? (
                  <Button disabled>
                    <span>Adding...</span>
                  </Button>
                ) : (
                  <Button type="submit">Add Service</Button>
                )}
              </div>
            </form>
          </Form>
        </div>

        {/* Image */}
        <div></div>
      </div>
    </div>
  );
};

export default AddService;

import React from "react";
import { useState, useEffect} from "react";
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
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { addService } from "@/api";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const addFormSchema = z.object({
  serviceName: z.string(),
  serviceDescription: z.string().max(100, {
    message: "Service description must be less than 100 characters.",
  }),
  serviceArea: z.string(),
  price: z.string(),
  serviceImage: z.string(),
});

const AddService = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      setLoading(true);

      //console.log("provider name", user?.displayName, "provider image", user?.photoURL);
      const addServiceData = {
        uid: user?.uid,
        serviceImageUrl: data.serviceImage,
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

        setLoading(false);

        navigate("/all-services");
      }
    } catch (err) {
      setLoading(false);
      form.reset();

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

        <p className="text-center text-lg  leading-[27px] tracking-tight text-[#010D3E] dark:text-[#6195cf] mt-5">
          Provide details about your service and make your services accessible
          to clients by adding a new service
        </p>
      </div>
      {/* Add Service Form */}
      <div className="w-full flex justify-center gap-5 mt-5">
        {/* Form */}

        <div className="min-w-[350px] md:min-w-[450px] border border-gray-200 rounded-xl p-6 md:p-8 shadow-[0_0_20px_rgba(0,0,0,0.15)]">
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
                      <Input type="text" placeholder="Dhaka" {...field} />
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Image Url</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="https://unsplash.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
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

  
      </div>
    </div>
  );
};

export default AddService;

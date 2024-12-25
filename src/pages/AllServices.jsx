import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import debounce from "lodash.debounce";
import { searchServices, fetchAllServices } from "@/api";
import { SkeletonSection } from "@/customComponents/Skeleton";
import { FeaturedServiceCard } from "@/customComponents/FeaturedServicesCard";
import SearchServiceCard from "@/customComponents/SearchServiceCard";

const AllServices = () => {
  //search states
  const [query, setQuery] = useState("");
  const [searchFindServices, setSearchFindServices] = useState([]);
  const [fetchSearcedServicesLoading, setFetchSearcedServicesLoading] =
    useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  // service states
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // dynamic title on the browser's title bar
  useEffect(() => {
    document.title = "All Services - ServiceSuite";
  }, []);

  // >>>>>>>>>>>>>>>> Searching Movies on the Search bar >>>>>>>>>>>>>> //

  // Debounced search function
  const fetchQueryServices = debounce(async (query) => {
    if (query.trim() === "") {
      setSearchFindServices([]);
      setFetchSearcedServicesLoading(false);
      return;
    }
    const data = {
      query,
    };
    try {
      setFetchSearcedServicesLoading(true); // Start loading when search begins
      const response = await searchServices(data);

      console.log("searched user data", response.data.searchedServices);
      setSearchFindServices(response.data.searchedServices);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setFetchSearcedServicesLoading(false); // End loading when search completes
    }
  }, 300);

  // Effect to handle input change
  useEffect(() => {
    fetchQueryServices(query);
  }, [query]);

  // Cancel debounce on component unmount to avoid potential memory leaks
  useEffect(() => {
    return () => fetchQueryServices.cancel();
  }, []);

  // Handle search button click
  const handleSearch = () => {
    setSearchClicked(true);
    fetchQueryServices(query);
  };

  // >>>>>>>>>>>>>>>> Fetch All Services from Server >>>>>>>>>>>>>> //
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await fetchAllServices();
        if (response.status === 200) {
          console.log("Services fetched successfully", response.data.services);
          setServices(response.data.services);
        }
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col  gap-2 py-2 mb-20">
      {/* Section Heading */}
      <div className="section-heading mx-auto">
        <div className="flex justify-center">
          <div className="text-lg md:text-xl inline-flex border border-[#222]/10 px-3 py-1 rounded-lg">
            All Services
          </div>
        </div>

        <p className="text-center text-lg  leading-[27px] tracking-tight text-[#010D3E] mt-5">
          Explore top-rated legal services handpicked for your needs
        </p>
      </div>
      {/* Search Section */}
      <div className="flex gap-2 max-w-2xl mx-auto mt-5">
        <Input
          value={query}
          className="w-full text-sm"
          placeholder="Search for legal documents..."
          onChange={(e) => {
            setQuery(e.target.value);
            setFetchSearcedServicesLoading(true); // Show "searching the user..." message while typing
            setSearchClicked(false); // Reset search click
          }}
        />
        <Button variant="default" className="text-sm" onClick={handleSearch}>
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>
      {/* Search results section */}
      <div className="max-h-[300px] flex flex-col items-center gap-2 p-4 overflow-y-auto">
        {/* Show loading message */}
        {fetchSearcedServicesLoading && !searchClicked ? (
          <p className="text-sm ">Searching the service...</p>
        ) : (
          <>
            {/* Show search results or "No users found" based on results */}
            {searchFindServices?.length > 0 ? (
              <>
                <h1 className="text-sm ">Available Services:</h1>
                {searchFindService?.map((service, index) => (
                  <SearchServiceCard key={service._id} service={service} />
                ))}
              </>
            ) : (
              query?.length !== 0 &&
              searchFindServices?.length === 0 && (
                <p className="text-sm ">No services found!</p>
              )
            )}
          </>
        )}
      </div>

      {/* Services Card Section */}
      <div className="w-full mt-5 mx-auto">
        {isLoading ? (
          <SkeletonSection />
        ) : (
          <>
            {services?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services?.map((service) => (
                  <FeaturedServiceCard
                    key={service._id}
                    serviceObjectId={service._id}
                    serviceImage={service.serviceImageUrl}
                    serviceName={service.serviceName}
                    serviceDescription={service.serviceDescription}
                    providerImage={service.serviceProviderImageUrl}
                    providerName={service.serviceProviderName}
                    servicePrice={service.price}
                    serviceStatus={null}
                    serviceTakingDate={null}
                    specialInstructions={null}
                    isTodo={false}
                    onSelectService={null}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-lg">No services found!</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllServices;

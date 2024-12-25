import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import debounce from "lodash.debounce";
import { searchServices, fetchAllServices } from "@/api";
import { SkeletonSection } from "@/customComponents/Skeleton";
import { FeaturedServiceCard } from "@/customComponents/FeaturedServicesCard";
import SearchServiceCard from "@/customComponents/SearchServiceCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const AllServices = () => {
  const [query, setQuery] = useState("");
  const [searchFindServices, setSearchFindServices] = useState([]);
  const [fetchSearcedServicesLoading, setFetchSearcedServicesLoading] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    document.title = "All Services - ServiceSuite";
  }, []);

  const fetchQueryServices = debounce(async (query) => {
    if (query.trim() === "") {
      setSearchFindServices([]);
      setFetchSearcedServicesLoading(false);
      return;
    }
    const data = { query };
    try {
      setFetchSearcedServicesLoading(true);
      const response = await searchServices(data);
      setSearchFindServices(response.data.searchedServices);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setFetchSearcedServicesLoading(false);
    }
  }, 300);

  useEffect(() => {
    fetchQueryServices(query);
  }, [query]);

  useEffect(() => {
    return () => fetchQueryServices.cancel();
  }, []);

  const handleSearch = () => {
    setSearchClicked(true);
    fetchQueryServices(query);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await fetchAllServices({ page: currentPage, limit: itemsPerPage });
        if (response.status === 200) {
          setServices(response.data.services);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen relative w-full flex flex-col gap-2 py-2 mb-20">
      <div className="section-heading mx-auto">
        <div className="flex justify-center">
          <div className="text-lg md:text-xl inline-flex border border-[#222]/10 px-3 py-1 rounded-lg">
            All Services
          </div>
        </div>
        <p className="text-center text-lg leading-[27px] tracking-tight dark:text-[#6195cf] text-[#010D3E] mt-5">
          Explore top-rated legal services handpicked for your needs
        </p>
      </div>

      <div className="flex gap-2 max-w-2xl mx-auto mt-5">
        <Input
          value={query}
          className="w-full text-sm"
          placeholder="Search for legal documents..."
          onChange={(e) => {
            setQuery(e.target.value);
            setFetchSearcedServicesLoading(true);
            setSearchClicked(false);
          }}
        />
        <Button variant="default" className="text-sm" onClick={handleSearch}>
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>

      <div className="max-h-[300px] flex flex-col items-center gap-2 p-4 overflow-y-auto">
        {fetchSearcedServicesLoading && !searchClicked ? (
          <p className="text-sm">Searching the service...</p>
        ) : (
          <>
            {searchFindServices?.length > 0 ? (
              <>
                <h1 className="text-sm">Available Services:</h1>
                {searchFindServices?.map((service) => (
                  <SearchServiceCard key={service._id} service={service} />
                ))}
              </>
            ) : (
              query?.length !== 0 && searchFindServices?.length === 0 && (
                <p className="text-sm">No services found!</p>
              )
            )}
          </>
        )}
      </div>

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
                    serviceArea={service.serviceArea}
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

      <div className="relative -bottom-10">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default AllServices;
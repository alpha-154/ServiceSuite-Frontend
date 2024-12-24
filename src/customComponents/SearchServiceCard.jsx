import React from "react";
import { useNavigate } from "react-router-dom";

const SearchServiceCard = ({ service }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/service-details/${service._id}`)}
      className="max-w-sm flex flex-col gap-2 border border-gray-300 rounded-md p-2 cursor-pointer"
    >
      <div className="max-w-[100px] max-h-[100px] border rounded-full mx-auto">
        <img
          src={service.serviceImageUrl}
          alt={service.serviceName}
          className="w-full h-full object-cover border rounded-md"
        />
      </div>
      <div>
      <span className="text-xs">Service Title</span>
        <h2 className="text-sm font-semibold -mt-1"> {service.serviceName}</h2>
        <span className="text-xs">Service Title</span>
        <h1 className="text-sm font-semibold -mt-1">{service.price}</h1>
      </div>
    </div>
  );
};

export default SearchServiceCard;

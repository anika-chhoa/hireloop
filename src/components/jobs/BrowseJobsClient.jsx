"use client";

import React, { useState } from "react";
import JobFilters from "./JobFilters";
import JobCard from "./JobCard";


export default function BrowseJobsClient({ initialJobs = [] }) {
  // Defining explicit states requested
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Filtering calculation logic
  const filteredJobs = initialJobs.filter((job) => {
    const matchesSearch = !search || 
      job.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      job.companyName.toLowerCase().includes(search.toLowerCase());

    const matchesLocation = !selectedLocation || 
      (selectedLocation === "Remote" ? job.isRemote === true : job.location.toLowerCase() === selectedLocation.toLowerCase());

    const matchesType = !selectedType || job.jobType.toLowerCase() === selectedType.toLowerCase();

    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <>
      <JobFilters 
        search={search}
        setSearch={setSearch}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job._id?.$oid || job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl bg-[#0A0A0C]">
          <p className="text-gray-400 text-sm">No positions match your search criteria.</p>
        </div>
      )}
    </>
  );
}
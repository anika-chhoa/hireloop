import BrowseJobsClient from "@/components/jobs/BrowseJobsClient";
import { getAllJobs } from "@/lib/api/jobs";


const BrowseJobs = async () => {
  const jobs = await getAllJobs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h3 className="text-lg uppercase tracking-widest text-white mb-6">
        Open Positions
      </h3>
      
      {/* Handing data over to the client container for filtering */}
      <BrowseJobsClient initialJobs={jobs} />
    </div>
  );
};

export default BrowseJobs;

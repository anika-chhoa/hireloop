import { getAllCompanies } from "@/lib/api/companies";

import CompaniesTableClient from "./CompaniesTableClient";

const AllCompanies = async () => {
  const companies = await getAllCompanies();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
        All Companies
      </h1>
      <CompaniesTableClient initialCompanies={companies} />
    </div>
  );
};

export default AllCompanies;

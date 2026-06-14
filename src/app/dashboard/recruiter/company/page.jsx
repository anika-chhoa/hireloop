import CompanyProfile from '@/components/company/CompanyProfile';
import { getRecruiterCompany } from '@/lib/api/companies';
import { getUserSession } from '@/lib/core/session';

import React from 'react';

const CompanyPage = async() => {
    const recruiter= await getUserSession();
    const company= await getRecruiterCompany(recruiter?.id)
    
    
    return (
        <CompanyProfile recruiter={recruiter} recruiterCompany={company}></CompanyProfile>
    );
};

export default CompanyPage;
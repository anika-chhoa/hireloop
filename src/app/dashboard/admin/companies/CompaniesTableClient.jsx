"use client";

import React, { useState } from 'react';
import { Table } from '@heroui/react';
import { updateCompany } from '@/lib/actions/companies';

const CompaniesTableClient = ({ initialCompanies = [] }) => {
    const [companies, setCompanies] = useState(initialCompanies);

   const handleUpdateStatus = async (companyId, newStatus) => {
    // 1. Instantly update UI status state using the string 'Approved' (newStatus)
    setCompanies(prevCompanies => 
        prevCompanies.map(company => 
            company._id === companyId ? { ...company, status: newStatus } : company
        )
    );

    try {
        // 2. Run the database update in the background
        // Pass newStatus dynamically so it works if you reuse it later
        await updateCompany(companyId, { status: newStatus }); 
        console.log(`Company ${companyId} status successfully updated in database to: ${newStatus}`);
    } catch (error) {
        console.error("Failed to update status in database:", error);
        // Optional: Reset status back to 'Pending' if the database update fails
    }
};

    const handleDeleteCompany = async (companyId) => {
    // 1. Instantly update the UI status state to 'Rejected' instead of removing it
    setCompanies(prevCompanies => 
        prevCompanies.map(company => 
            company._id === companyId ? { ...company, status: 'Rejected' } : company
        )
    );

    try {
        // 2. Update the status in your database to 'Rejected'
        await updateCompany(companyId, { status: 'Rejected' });
        console.log(`Company ${companyId} marked as Rejected`);
    } catch (error) {
        console.error("Failed to reject company in database:", error);
        // Optional: Revert state back if database call fails
    }
};

    return (
        <Table>
            <Table.ScrollContainer>
                <Table.Content aria-label="Companies management console">
                    <Table.Header>
                        <Table.Column isRowHeader>Company</Table.Column>
                        <Table.Column>Industry</Table.Column>
                        <Table.Column>Location</Table.Column>
                        <Table.Column>Website</Table.Column>
                        <Table.Column>Status</Table.Column>
                        <Table.Column className="text-right pr-6">Actions</Table.Column>
                    </Table.Header>
                    
                    <Table.Body>
                        {companies.map((company) => (
                            <Table.Row key={company._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                {/* Company Identity */}
                                <Table.Cell>
                                    <div className="flex items-center gap-3">
                                        {company.logo ? (
                                            <img 
                                                src={company.logo} 
                                                alt={`${company.name} logo`} 
                                                className="w-10 h-10 object-contain rounded bg-white p-1 border border-slate-200"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded bg-orange-100 flex items-center justify-center font-bold text-orange-600">
                                                {company.name?.charAt(0)}
                                            </div>
                                        )}
                                        <div className="font-semibold text-slate-900 dark:text-orange-400">
                                            {company.name}
                                        </div>
                                    </div>
                                </Table.Cell>

                                {/* Industry */}
                                <Table.Cell className="text-slate-700 dark:text-slate-300">{company.industry}</Table.Cell>

                                {/* Location */}
                                <Table.Cell className="text-slate-700 dark:text-slate-300">{company.location}</Table.Cell>

                                {/* Website Link */}
                                <Table.Cell>
                                    {company.website ? (
                                        <a 
                                            href={company.website} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium hover:underline"
                                        >
                                            Visit Site
                                        </a>
                                    ) : (
                                        <span className="text-slate-400">—</span>
                                    )}
                                </Table.Cell>

                                {/* Status Badge Column */}
                                <Table.Cell>
                                    <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${
                                        company.status === 'Approved' 
                                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' 
                                            : company.status === 'Rejected'
                                            ? 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400'
                                            : 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                                    }`}>
                                        {company.status}
                                    </span>
                                </Table.Cell>

                                {/* Actions Column (Only Approve or Delete) */}
                                <Table.Cell className="text-right pr-6">
                                    <div className="flex items-center justify-end gap-2">
                                        {/* Show Approve button if it's not already Approved */}
                                        {company.status !== 'Approved' && (
                                            <button 
                                                onClick={() => handleUpdateStatus(company._id, 'Approved')}
                                                className="px-2.5 py-1.5 text-xs font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition shadow-sm"
                                            >
                                                Approve
                                            </button>
                                        )}
                                        
                                        <button 
                                            onClick={() => handleDeleteCompany(company._id)}
                                            className="px-2.5 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-lg transition"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
            <Table.Footer />
        </Table>
    );
};

export default CompaniesTableClient;
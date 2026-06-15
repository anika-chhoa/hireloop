"use client";

import React, { useState } from "react";
import { Form, Button, TextField, Label, Input, Description, FieldError, TextArea, toast } from "@heroui/react";
import { submitApplication } from "@/lib/actions/applications";

const JobApply = ({ applicant, job }) => {

  // Local state to manage form fields
  const [formData, setFormData] = useState({
    name: applicant?.name || "",
    email: applicant?.email || "",
    resumeLink: "",
    coverLetter: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic URL validation for resume link
    const newErrors = {};
    if (!formData.resumeLink.trim()) {
      newErrors.resumeLink = "Resume link is required.";
    } else if (!formData.resumeLink.startsWith("http://") && !formData.resumeLink.startsWith("https://")) {
      newErrors.resumeLink = "Please enter a valid URL (e.g., https://...)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const submissionData = {
      jobId: job?._id,
      jobTitle: job?.jobTitle,
      applicantId: applicant?.id,
      applicantName: applicant?.name,
      applicantEmail: applicant?.email,
      companyName: job?.companyName,
      ...formData,
    };

   
    const res= await submitApplication(submissionData);
    console.log(res);
    if(res.insertedId){
      alert("Your application has been received. We will review your profile and get back to you soon.");
      setFormData({
        name: applicant?.name || "",
        email: applicant?.email || "",
        resumeLink: "",
        coverLetter: "",
      });
    }else{
      toast.error("There was an issue submitting your application. Please try again later.");
    }

  };

  const handleReset = () => {
    setFormData({
      name: applicant?.name || "",
      email: applicant?.email || "",
      resumeLink: "",
      coverLetter: "",
    });
    setErrors({});
  };

  return (
    <div className="relative max-w-xl mx-auto p-6 bg-[#0A0A0C] border border-white/5 rounded-2xl text-white my-8 overflow-hidden shadow-[0_8px_25px_rgba(124,58,237,0.05)]">
      
      {/* Subtle Background Glow Elements */}
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-sky-600/5 blur-3xl pointer-events-none" />

      {/* Job Info Header */}
      {job && (
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5 relative">
          {job.companyLogo && (
            <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2">
              <img 
                src={job.companyLogo} 
                alt={`${job.companyName} logo`} 
                className="h-full w-full object-contain"
              />
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold text-white leading-tight">{job.jobTitle}</h2>
            <p className="text-xs text-gray-400 mt-1">{job.companyName} • {job.location}</p>
          </div>
        </div>
      )}

      <h3 className="text-md font-medium text-gray-300 mb-5 relative">Application Details</h3>

      {/* Form Context */}
      <Form onSubmit={handleSubmit} className="flex flex-col gap-5 relative">
        
        {/* Full Name Field */}
        <TextField className="w-full">
          <Label className="text-xs font-medium text-gray-400">Full Name</Label>
          <Input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1.5 bg-white/[0.03] border border-white/10 rounded-xl p-2.5 text-white focus:border-violet-500/50 focus:outline-none transition-all text-sm"
            required
          />
        </TextField>

        {/* Email Field */}
        <TextField className="w-full">
          <Label className="text-xs font-medium text-gray-400">Email Address</Label>
          <Input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1.5 bg-white/[0.03] border border-white/10 rounded-xl p-2.5 text-white focus:border-violet-500/50 focus:outline-none transition-all text-sm"
            required
          />
        </TextField>

        {/* Resume Link Field */}
        <TextField className="w-full" isInvalid={!!errors.resumeLink}>
          <Label className="text-xs font-medium text-gray-400">Resume Link</Label>
          <Input 
            type="url"
            name="resumeLink"
            placeholder="https://drive.google.com/..."
            value={formData.resumeLink}
            onChange={handleChange}
            className="w-full mt-1.5 bg-white/[0.03] border border-white/10 rounded-xl p-2.5 text-white placeholder-gray-600 focus:border-violet-500/50 focus:outline-none transition-all text-sm"
            required
          />
          <Description className="text-[10px] text-gray-500 mt-1">
            Provide a Google Drive, Dropbox, or live document URL.
          </Description>
          {errors.resumeLink && (
            <FieldError className="text-xs text-red-400 mt-1">{errors.resumeLink}</FieldError>
          )}
        </TextField>

        {/* Cover Letter Text Area */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-xs font-medium text-gray-400">Cover Letter (Optional)</label>
          <TextArea
            aria-label="Cover Letter"
            name="coverLetter"
            placeholder="Tell us why you're a great fit for this position..."
            value={formData.coverLetter}
            onChange={handleChange}
            className="h-32 w-full mt-1 bg-white/[0.03] border border-white/10 rounded-xl p-2.5 text-white placeholder-gray-600 focus:border-violet-500/50 focus:outline-none transition-all text-sm"
          />
        </div>

        {/* Form Action Buttons */}
        <div className="flex gap-3 justify-end mt-4">
          <Button 
            type="button" 
            onClick={handleReset}
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-gray-300 hover:bg-white/10 transition-all"
          >
            Reset
          </Button>
          <Button 
            type="submit"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-semibold px-5 py-2.5 rounded-xl hover:from-violet-500 hover:to-indigo-500 transition-all shadow-[0_4px_15px_rgba(124,58,237,0.2)]"
          >
            Apply Now
          </Button>
        </div>

      </Form>
    </div>
  );
};

export default JobApply;
"use client";

import { createCompany } from "@/lib/actions/companies";
import {
  Button,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
  toast,
} from "@heroui/react";
import {
  Briefcase,
  Building2,
  Globe,
  MapPin,
  Pencil,
  Plus,
  Upload,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

// --- Tailwind Common Styles ---
const textInputClass =
  "w-full bg-[#161619] border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors text-sm";
const textAreaClass =
  "w-full bg-[#161619] border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors text-sm resize-none";
const selectBoxClass = "w-full";
const triggerClasses =
  "w-full flex items-center justify-between bg-[#161619] border border-zinc-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-zinc-700 transition-colors h-11";
const popoverClasses =
  "bg-[#121214] border border-zinc-800 rounded-xl shadow-2xl p-2 min-w-[200px]";
const listItemClasses =
  "text-zinc-300 hover:bg-zinc-900 hover:text-white px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors outline-none data-[focused=true]:bg-zinc-900 data-[focused=true]:text-white";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
  console.log(recruiter, recruiterCompany);

  // --- Hydration Mismatch Fix ---
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- States ---
  // FIX 1: recruiterCompany is an array — grab the first element
  const [company, setCompany] = useState(recruiterCompany?.[0] || null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  // --- Cloudinary Integration Handler ---
  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error?.message || `Upload failed with status: ${response.status}`
        );
      }

      if (data.secure_url) {
        setLogoUrl(data.secure_url);
      } else {
        throw new Error("Invalid response structure from Cloudinary");
      }
    } catch (err) {
      console.error("Cloudinary logo upload failed:", err);
      alert(
        err instanceof Error
          ? err.message
          : "Image upload failed. Try another format."
      );
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("companyName");
    const industry = formData.get("industry");
    const location = formData.get("location");
    const website = formData.get("website");
    const employeeRange = formData.get("employeeRange");
    const description = formData.get("description");

    const newErrors = {};
    if (!name) newErrors.companyName = "Company name is required";
    if (!industry) newErrors.industry = "Please select an industry";
    if (!location) newErrors.location = "Company location is required";
    if (!website) newErrors.website = "Company website is required";
    if (!description) newErrors.description = "Please write a short description";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newCompany = {
      name,
      industry,
      location,
      website,
      employeeRange,
      description,
      logo:
        logoUrl ||
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=60",
      status: company?.status || "Pending",
      recruiterId: recruiter.id,
    };

    // FIX 2: was referencing undefined `result` — use `updatedCompany` instead
    const updatedCompany = await createCompany(newCompany);
    setCompany(updatedCompany);

    if (updatedCompany) {
      toast.success(`${newCompany.name} is created successfully`);
    }

    setErrors({});
    setIsEditing(false);
  };

  const renderStatusBadge = (status) => {
    const styles = {
      Pending: "text-amber-500 bg-amber-950/30 border-amber-900/50",
      Approved: "text-emerald-500 bg-emerald-950/30 border-emerald-900/50",
      Rejected: "text-rose-500 bg-rose-950/30 border-rose-900/50",
    };
    return (
      <span
        className={`text-xs font-medium px-2 py-0.5 rounded border ${styles[status] || styles.Pending}`}
      >
        {status}
      </span>
    );
  };

  if (!mounted) {
    return <div className="min-h-screen bg-[#0d0d0e]" />;
  }

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* VIEW 1: EMPTY STATE */}
        {!company && !isEditing && (
          <div className="bg-[#121214] border border-zinc-900 rounded-xl p-12 shadow-2xl text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-500">
              <Building2 size={28} />
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h1 className="text-xl font-semibold tracking-tight">
                Register Your Company
              </h1>
              <p className="text-zinc-400 text-sm">
                You need to set up a company profile before you can start
                publishing jobs and finding potential candidates.
              </p>
            </div>
            <Button
              radius="lg"
              onClick={() => setIsEditing(true)}
              className="bg-violet-600 text-white font-semibold hover:bg-violet-700 px-6 transition-colors h-11 inline-flex items-center gap-2 shadow-lg shadow-violet-600/10"
            >
              <Plus size={16} /> Setup Profile
            </Button>
          </div>
        )}

        {/* VIEW 2: SHOW COMPANY DETAILS */}
        {company && !isEditing && (
          <div className="bg-[#121214] border border-zinc-900 rounded-xl p-8 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-zinc-800 pb-6">
              <div className="flex items-start gap-4">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-16 h-16 rounded-xl object-cover bg-zinc-900 border border-zinc-800"
                />
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-2xl font-semibold tracking-tight">
                      {company.name}
                    </h1>
                    {renderStatusBadge(company.status)}
                  </div>
                  <p className="text-zinc-400 text-sm mt-1 inline-flex items-center gap-4 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} className="text-zinc-600" />
                      {company.industry}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} className="text-zinc-600" />
                      {company.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} className="text-zinc-600" />
                      {company.employeeRange}
                    </span>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-violet-400 hover:underline"
                    >
                      <Globe size={14} className="text-violet-500/70" />
                      Website
                    </a>
                  </p>
                </div>
              </div>
              <Button
                radius="lg"
                onClick={() => {
                  setLogoUrl(company.logo);
                  setIsEditing(true);
                }}
                variant="bordered"
                className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 px-4 font-medium h-10 text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Pencil size={14} /> Edit Profile
              </Button>
            </div>

            <div className="space-y-3">
              <h3 className="text-zinc-400 font-medium text-sm">
                About Company
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
                {company.description}
              </p>
            </div>
          </div>
        )}

        {/* VIEW 3: CREATE / EDIT FORM */}
        {isEditing && (
          <div className="bg-[#121214] border border-zinc-900 rounded-xl p-8 shadow-2xl">
            <div className="border-b border-zinc-800 pb-6 mb-8">
              <h1 className="text-2xl font-semibold tracking-tight">
                {company ? "Update Company Profile" : "Create Company Profile"}
              </h1>
              <p className="text-zinc-400 text-sm mt-1">
                Provide precise workspace details to establish credibility with
                seekers.
              </p>
            </div>

            <Form
              onSubmit={handleSubmit}
              className="space-y-8"
              validationErrors={errors}
              validationBehavior="aria"
            >
              {/* Logo Upload Segment */}
              <div className="space-y-2">
                <span className="text-zinc-400 font-medium text-sm block">
                  Company Logo
                </span>
                <div className="flex items-center gap-4">
                  {logoUrl ? (
                    <div className="relative group w-20 h-20">
                      <img
                        src={logoUrl}
                        alt="Preview"
                        className="w-20 h-20 rounded-xl object-cover border border-zinc-800 bg-zinc-900"
                      />
                      <button
                        type="button"
                        onClick={() => setLogoUrl("")}
                        className="absolute -top-1.5 -right-1.5 p-1 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors shadow"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <label className="w-20 h-20 rounded-xl border-2 border-dashed border-zinc-800 hover:border-zinc-700 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#161619] group">
                      <Upload
                        size={18}
                        className="text-zinc-500 group-hover:text-zinc-400"
                      />
                      <span className="text-[10px] text-zinc-500 mt-1">
                        Upload
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoUpload}
                        disabled={uploadingLogo}
                      />
                    </label>
                  )}
                  <p className="text-xs text-zinc-500 max-w-xs">
                    {uploadingLogo
                      ? "Uploading to Cloudinary..."
                      : "Recommended size 400x400px. JPG or PNG."}
                  </p>
                </div>
              </div>

              {/* Form Input fields */}
              <Fieldset className="space-y-6 w-full">
                <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
                  General Metrics
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextField
                    name="companyName"
                    defaultValue={company?.name}
                    isInvalid={!!errors.companyName}
                    className="flex flex-col gap-1 w-full"
                  >
                    <Label className="text-zinc-400 font-medium text-sm">
                      Company Name
                    </Label>
                    <Input
                      placeholder="e.g. Stripe Inc."
                      className={textInputClass}
                    />
                    {errors.companyName && (
                      <FieldError className="text-xs text-danger mt-1">
                        {errors.companyName}
                      </FieldError>
                    )}
                  </TextField>

                  <Select
                    className={selectBoxClass}
                    name="industry"
                    defaultSelectedKeys={
                      company ? [company.industry] : undefined
                    }
                    isInvalid={!!errors.industry}
                  >
                    <Label className="text-zinc-400 font-medium text-sm mb-1 block">
                      Industry
                    </Label>
                    <Select.Trigger className={triggerClasses}>
                      <Select.Value className="text-white placeholder:text-zinc-600" />
                      <Select.Indicator />
                    </Select.Trigger>
                    {errors.industry && (
                      <span className="text-xs text-danger mt-1">
                        {errors.industry}
                      </span>
                    )}
                    <Select.Popover className={popoverClasses}>
                      <ListBox className="outline-none">
                        <ListBox.Item
                          id="Technology"
                          className={listItemClasses}
                          textValue="Technology"
                        >
                          Technology
                        </ListBox.Item>
                        <ListBox.Item
                          id="Finance"
                          className={listItemClasses}
                          textValue="Finance"
                        >
                          Finance
                        </ListBox.Item>
                        <ListBox.Item
                          id="Healthcare"
                          className={listItemClasses}
                          textValue="Healthcare"
                        >
                          Healthcare
                        </ListBox.Item>
                        <ListBox.Item
                          id="E-commerce"
                          className={listItemClasses}
                          textValue="E-commerce"
                        >
                          E-commerce
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextField
                    name="location"
                    defaultValue={company?.location}
                    isInvalid={!!errors.location}
                    className="flex flex-col gap-1 w-full"
                  >
                    <Label className="text-zinc-400 font-medium text-sm">
                      Location / HQ
                    </Label>
                    <div className="relative flex items-center">
                      <MapPin
                        size={16}
                        className="absolute left-3 text-zinc-600 pointer-events-none z-10"
                      />
                      <Input
                        placeholder="e.g. San Francisco, CA"
                        className={`${textInputClass} pl-10`}
                      />
                    </div>
                    {errors.location && (
                      <FieldError className="text-xs text-danger mt-1">
                        {errors.location}
                      </FieldError>
                    )}
                  </TextField>

                  <TextField
                    name="website"
                    defaultValue={company?.website}
                    isInvalid={!!errors.website}
                    className="flex flex-col gap-1 w-full"
                  >
                    <Label className="text-zinc-400 font-medium text-sm">
                      Company Website
                    </Label>
                    <div className="relative flex items-center">
                      <Globe
                        size={16}
                        className="absolute left-3 text-zinc-600 pointer-events-none z-10"
                      />
                      <Input
                        type="url"
                        placeholder="e.g. https://stripe.com"
                        className={`${textInputClass} pl-10`}
                      />
                    </div>
                    {errors.website && (
                      <FieldError className="text-xs text-danger mt-1">
                        {errors.website}
                      </FieldError>
                    )}
                  </TextField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    className={selectBoxClass}
                    name="employeeRange"
                    defaultSelectedKeys={
                      company ? [company.employeeRange] : ["1-10"]
                    }
                  >
                    <Label className="text-zinc-400 font-medium text-sm mb-1 block">
                      Employee Count
                    </Label>
                    <Select.Trigger className={triggerClasses}>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className={popoverClasses}>
                      <ListBox className="outline-none">
                        <ListBox.Item
                          id="1-10"
                          className={listItemClasses}
                          textValue="1-10 employees"
                        >
                          1-10 employees
                        </ListBox.Item>
                        <ListBox.Item
                          id="11-50"
                          className={listItemClasses}
                          textValue="11-50 employees"
                        >
                          11-50 employees
                        </ListBox.Item>
                        <ListBox.Item
                          id="51-200"
                          className={listItemClasses}
                          textValue="51-200 employees"
                        >
                          51-200 employees
                        </ListBox.Item>
                        <ListBox.Item
                          id="201-500"
                          className={listItemClasses}
                          textValue="201-500 employees"
                        >
                          201-500 employees
                        </ListBox.Item>
                        <ListBox.Item
                          id="500+"
                          className={listItemClasses}
                          textValue="500+ employees"
                        >
                          500+ employees
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <TextField
                  name="description"
                  defaultValue={company?.description}
                  isInvalid={!!errors.description}
                  className="flex flex-col gap-1 w-full"
                >
                  <Label className="text-zinc-400 font-medium text-sm">
                    Company Description
                  </Label>
                  <TextArea
                    placeholder="Describe your company culture, mission statements, or values..."
                    rows={5}
                    className={textAreaClass}
                  />
                  {errors.description && (
                    <FieldError className="text-xs text-danger mt-1">
                      {errors.description}
                    </FieldError>
                  )}
                </TextField>
              </Fieldset>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800 w-full">
                <Button
                  type="button"
                  variant="bordered"
                  radius="lg"
                  onClick={() => setIsEditing(false)}
                  className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 px-6 font-medium h-11"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  radius="lg"
                  disabled={uploadingLogo}
                  className="bg-violet-600 text-white font-semibold hover:bg-violet-700 px-6 transition-colors h-11 disabled:opacity-50 shadow-lg shadow-violet-600/10"
                >
                  Save Profile
                </Button>
              </div>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}
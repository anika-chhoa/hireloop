"use client";

import React from "react";
import { Label, ListBox, Select, SearchField } from "@heroui/react";
import { Compass, Magnifier } from "@gravity-ui/icons";
import { ArrowsUpFromLine, ChevronDown } from "lucide-react";

export default function JobFilters({ 
  search, 
  setSearch, 
  selectedLocation, 
  setSelectedLocation, 
  selectedType, 
  setSelectedType 
}) {
  return (
    <div className="w-full bg-[#0A0A0C] border border-white/5 rounded-2xl p-5 mb-8 text-white relative overflow-hidden flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      
      {/* Subtle background branding glow */}
      <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-sky-600/5 blur-2xl pointer-events-none" />
      <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-violet-600/5 blur-2xl pointer-events-none" />

      {/* SEARCH INPUT */}
      <div className="flex-1 min-w-[240px] relative z-10">
        <SearchField name="search" value={search} onChange={setSearch}>
          <Label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1.5">
            Keywords Search
          </Label>
          <SearchField.Group className="flex items-center bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 focus-within:border-violet-500/40 transition">
            <Magnifier className="h-4 w-4 text-sky-400 mr-2 shrink-0" />
            <SearchField.Input 
              className="w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none" 
              placeholder="Search title or company..." 
            />
            <SearchField.ClearButton className="text-gray-500 hover:text-white transition text-[11px] ml-2" />
          </SearchField.Group>
        </SearchField>
      </div>

      {/* LOCATION FILTER */}
      <div className="w-full md:w-[180px] relative z-10">
        <Select 
          className="w-full" 
          placeholder="All Locations"
          selectedKeys={selectedLocation ? [selectedLocation] : ["ALL"]}
          onSelectionChange={(keys) => {
            const val = Array.from(keys)[0];
            setSelectedLocation(val === "ALL" ? "" : val);
          }}
        >
          <Label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1.5">
            Location
          </Label>
          <Select.Trigger className="flex items-center justify-between w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300 hover:bg-white/10 transition">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-sky-400 shrink-0" />
              <Select.Value />
            </div>
            <Select.Indicator>
              <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
            </Select.Indicator>
          </Select.Trigger>
          <Select.Popover className="bg-[#0A0A0C] border border-white/10 rounded-xl overflow-hidden mt-1 shadow-2xl">
            <ListBox className="text-xs p-1 text-gray-300">
              <ListBox.Item id="ALL" textValue="All Locations" className="px-2.5 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer">
                All Locations
              </ListBox.Item>
              <ListBox.Item id="Dhaka" textValue="Dhaka" className="px-2.5 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer">
                Dhaka
              </ListBox.Item>
              <ListBox.Item id="Remote" textValue="Remote" className="px-2.5 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer">
                Remote
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* JOB TYPE FILTER */}
      <div className="w-full md:w-[180px] relative z-10">
        <Select 
          className="w-full" 
          placeholder="All Types"
          selectedKeys={selectedType ? [selectedType] : ["ALL"]}
          onSelectionChange={(keys) => {
            const val = Array.from(keys)[0];
            setSelectedType(val === "ALL" ? "" : val);
          }}
        >
          <Label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1.5">
            Job Type
          </Label>
          <Select.Trigger className="flex items-center justify-between w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300 hover:bg-white/10 transition">
            <div className="flex items-center gap-2">
              <ArrowsUpFromLine className="h-4 w-4 text-violet-400 shrink-0" />
              <Select.Value />
            </div>
            <Select.Indicator>
              <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
            </Select.Indicator>
          </Select.Trigger>
          <Select.Popover className="bg-[#0A0A0C] border border-white/10 rounded-xl overflow-hidden mt-1 shadow-2xl">
            <ListBox className="text-xs p-1 text-gray-300">
              <ListBox.Item id="ALL" textValue="All Types" className="px-2.5 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer">
                All Types
              </ListBox.Item>
              <ListBox.Item id="full-time" textValue="Full-Time" className="px-2.5 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer">
                Full-Time
              </ListBox.Item>
              <ListBox.Item id="part-time" textValue="Part-Time" className="px-2.5 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer">
                Part-Time
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

    </div>
  );
}
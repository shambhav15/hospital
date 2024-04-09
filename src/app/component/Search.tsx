"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import hospitalsData from "../../hospitalData";
import axios from "axios";

type HospitalData = {
  H_No: string;
  Hospital_Name: string;
  Place: string;
  Total_Doctors: number;
  Total_Beds: number;
  MortailityRate: number;
  Cleanliness_Score: number;
  Specialties_Present: string;
  Total_Specialties_Present: number;
  Stars: number;
  Image: string;
};

const Search = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dropdownOptions, setDropdownOptions] = useState<HospitalData[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<HospitalData[]>([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/hospital");
        const data: HospitalData[] = response.data;
        setDropdownOptions(data);
        setFilteredOptions(data); // Initialize filtered options with all data
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const matchingOptions = dropdownOptions.filter((hospital) =>
      hospital.Hospital_Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const limitedOptions = matchingOptions.slice(0, 7);
    setFilteredOptions(limitedOptions); // Update filtered options
    setSelectedOptionIndex(-1);
    setShowDropdown(searchTerm.trim() !== "" && limitedOptions.length > 0);
  }, [dropdownOptions, searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "/" && document.activeElement !== inputRef.current) {
      e.preventDefault();
      setSearchTerm("");
    }

    if (showDropdown) {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          setSelectedOptionIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedOptionIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
          break;
        case "Enter":
          if (selectedOptionIndex !== -1) {
            setSearchTerm(filteredOptions[selectedOptionIndex].Hospital_Name);
            setDropdownOptions([]);
            setShowDropdown(false);
            router.replace(
              `/${filteredOptions[selectedOptionIndex].H_No}/book`
            );
            setSearchTerm("");
          }
          break;
        default:
          break;
      }
    }
  };

  const handleOptionClick = (option: HospitalData) => {
    setSearchTerm(option.Hospital_Name);
    router.replace(`/${option.H_No}/book`);
    setDropdownOptions([]);
    setShowDropdown(false);
    setSearchTerm("");
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showDropdown, selectedOptionIndex, filteredOptions]);

  return (
    <div className="w-full relative">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search Hospitals..."
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full rounded-md bg-white border border-zinc-800 px-5 py-2 text-sm"
      />

      {showDropdown && (
        <div className="mt-1 absolute z-10 bg-white border border-zinc-800 rounded-b-md w-full">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className={`px-4 py-2 hover:bg-zinc-200 cursor-pointer ${
                selectedOptionIndex === index ? "bg-zinc-200 " : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              ({option.Hospital_Name})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;

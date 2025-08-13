import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";

interface ISearchFormProps {
  searchInput: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSiteNumber: React.Dispatch<React.SetStateAction<string>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchForm({
  searchInput,
  setSearchQuery,
  setSiteNumber,
  setSearchInput,
}: ISearchFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearchQuery(searchInput);
        setSiteNumber("1");
      }}
      className="w-[50%] relative group mx-auto mb-4"
    >
      <Input
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search product name, SKU or OEM..."
        className="border-neutral-200 text-neutral-500 rounded-full focus:border-neutral-400"
      />
      <Button
        type="submit"
        variant="ghost"
        className="absolute top-0 right-0 h-full"
      >
        <FaSearch className="text-neutral-300 transition duration-500 group-focus-within:text-neutral-400" />
      </Button>
    </form>
  );
}

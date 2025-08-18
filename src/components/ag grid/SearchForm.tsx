import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";

interface ISearchFormProps {
  searchInput: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setCurrentSite: React.Dispatch<React.SetStateAction<string>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchForm({
  searchInput,
  setSearchQuery,
  setCurrentSite,
  setSearchInput,
}: ISearchFormProps) {
  return (
      <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearchQuery(searchInput);
        setCurrentSite("1");
      }}
      className="w-full relative"
    >
      <Input
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search product name, SKU or OEM..."
        className="group border text-neutral-500 rounded-sm focus:border-neutral-500 border-neutral-300"
        value={searchInput}
      />
      <Button
        type="submit"
        variant="ghost"
        className="absolute top-0 right-0 h-full"
      >
        <FaSearch className="text-neutral-300 group focus:text-neutral-500" />
      </Button>
    </form>
  );
}

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { useQueryClient } from "@tanstack/react-query";

interface ISearchFormProps {
  searchInput: string;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setCurrentSite: React.Dispatch<React.SetStateAction<string>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setCategory?: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchForm({
  searchInput,
  searchQuery,
  setSearchQuery,
  setCurrentSite,
  setSearchInput,
  setCategory,
}: ISearchFormProps) {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [displayRecent, setDisplayRecent] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!searchQuery) return;
    const recentQueries = queryClient
      .getQueryCache()
      .findAll({ queryKey: ["eurasProducts"] });

    const extract = recentQueries.map((query) => {
      return query.queryKey[3] as string;
    });

    setRecentSearches(extract);
  }, [searchQuery]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (setCategory) {
          setCategory("");
        }
        setSearchQuery(searchInput);
        setCurrentSite("1");
      }}
      className="group w-1/4 transition rounded-md duration-500 focus-within:shadow-sm relative flex border bg-white text-sm border-2 border-neutral-200"
    >
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className=" top-0 text-neutral-400 m-0 transition duration-500 group-focus-within:text-blue-400"
      >
        <FaSearch />
      </Button>
      <Input
        onChange={(e) => setSearchInput(e.target.value)}
        required
        placeholder="Search products"
        className=" border-none text-neutral-400 rounded-xl bg-white shadow-none px-0"
        value={searchInput}
        onFocus={() => setDisplayRecent(true)}
        onBlur={() => setDisplayRecent(false)}
      />
      <Button
        onClick={() => setSearchInput("")}
        type="button"
        variant="ghost"
        size="sm"
        className={`top-0  text-neutral-400 m-0 ${searchInput.length > 0 ? "block" : "hidden"}`}
      >
        <IoMdCloseCircle className="group-focus-within:text-blue-400" />
      </Button>
      <div
        className={`absolute w-full rounded-md flex flex-col top-full mt-1 p-2  border border-neutral-200 shadow-md  bg-white z-20 ${displayRecent && searchInput.length < 1 ? "flex" : "hidden"}`}
      >
        <small className="text-xs text-neutral-800 font-[500]  mx-2 my-2">
          Recent
        </small>
        <div className="flex flex-col gap-2 max-h-[100px] overflow-y-scroll">
          {recentSearches.map((query: string) => {
            return (
              <Button
                type="button"
                onMouseDown={() => {
                  setSearchInput(query);
                  setSearchQuery(query);
                  setCurrentSite("1");
                }}
                size="sm"
                variant="ghost"
                className=" flex text-sm justify-start transition duration-500 gap-4 hover:bg-neutral-100  w-full text-neutral-500"
              >
                <FaSearch className="text-neutral-400 text-xs group-focus-within:text-blue-400 " />
                <span className="text-md">{query}</span>
                <MdArrowOutward className="ml-auto text-sm group-focus-within:text-blue-400" />
              </Button>
            );
          })}
        </div>
      </div>
    </form>
  );
}

import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { debounce } from "lodash";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchInput = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<string>("");

  const updateSearchParams = useRef(
    debounce((terms: string) => {
      setSearchParams((prev) => {
        prev.set("terms", terms);
        return prev;
      });
      if (!window.location.pathname.includes("/results")) {
        navigate(`/results?terms=${terms}`);
      }
    }, 300)
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchParams.current(event.target.value);
  };

  useEffect(() => {
    setValue(searchParams.get("terms") ?? "");
  }, [searchParams]);

  return (
    <InputGroup ml={6} w="660px">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.600" />
      </InputLeftElement>
      <Input
        placeholder="Search products, assets, quotes, orders, invoices and more"
        value={value}
        onChange={handleChange}
      />
    </InputGroup>
  );
};

export default SearchInput;

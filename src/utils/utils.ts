import { useSearchParams } from "react-router-dom";

export const useQueryString = () => {
  const [searchParams] = useSearchParams();
  const searchParamsEntries = Object.fromEntries([...searchParams]);
  return searchParamsEntries;
};

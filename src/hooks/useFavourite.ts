import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useFavourite = async () => {
  const {data, error, isLoading, mutate} = useSWR("/api/favourite", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {data, error, isLoading, mutate};
};

export default useFavourite;

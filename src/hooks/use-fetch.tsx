import { useState, useEffect } from "react";


const useFetch = (url: string) => {
  const baseUrl = "http://localhost:3004";
  const [response, setResponse] = useState<any| null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any| null>(null);
  const [options, setOptions] = useState({});
  const token = localStorage.getItem("token");

  const doFetch = (options = {}) => {
    setOptions(options);
    setIsLoading(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isLoading) {
          return;
        }
        const requestOptions = {
          ...options,
          ...{
            headers: {
              authorization: token ? `Token ${token}` : "",
            },
          },
        };
        const res = await fetch(baseUrl + url, requestOptions);
        const resData = await res.json();
        setResponse(resData.data);
      } catch (err: any) {
        setError(err);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [isLoading, options, token, url]);

  return [{ response, isLoading, error }, doFetch];
};

export default useFetch;

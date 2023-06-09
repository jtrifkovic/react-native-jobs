import { useState, useEffect } from "react";
import axios from "axios";



const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {

    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": 'a59fc85435mshed1f651c654f7ffp12a0fdjsne1fa19224593',
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
  
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.log("Too many requests. Retrying in 5 seconds...");
        setTimeout(() => {
          fetchData();
        }, 2000);
      } else {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
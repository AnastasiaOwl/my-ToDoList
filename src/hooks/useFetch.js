import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Update the base URL to match your JSON Server
axios.defaults.baseURL = 'http://localhost:3030/';

export const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (error) {
      console.warn('Something went wrong', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, isLoading };
};

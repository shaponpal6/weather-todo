import {useEffect, useState} from 'react';

export default function useFetch(url?: string, options?: any) {
    const [status, setStatus] = useState<{
      loading: boolean;
      error?: Error;
      data?: any;
    }>({
      loading: false
    });
    function fetchNow(url: string, options?: any) {
      setStatus({ loading: true });
      fetch(url, options)
        .then((res: any) => res.json())
        .then((res: any) => {
          setStatus({ loading: false, data: res });
        })
        .catch((error: Error) => {
          setStatus({ loading: false, error });
        });
    }
  
    useEffect(() => {
      if (url) {
        fetchNow(url, options);
      }
    }, []);
  
    return { ...status, fetchNow };
  }
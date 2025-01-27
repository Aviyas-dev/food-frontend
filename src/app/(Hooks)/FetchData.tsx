import { useEffect, useState } from "react";

export function useAuthFetch(path: any){
    const [data, setData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/${path}`);
            const data = await response.json();
            setData(data);
        };
        fetchData();
    },[]);
    return data;
}
       
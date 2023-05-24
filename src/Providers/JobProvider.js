import { useContext, createContext, useState, useEffect } from "react";
import { useContextProvider } from "./Provider.js";
import { useParams } from "react-router-dom";

export const JobContextData = createContext();
export function useJobProvider() {
  return useContext(JobContextData);
}

function JobProvider({ children }) {
  const { API, axios, userID } = useContextProvider();
  const [jobs, setJobs] = useState([]);
  const [searchResult, setSearchResult] = useState([])
  // possibly a state to keep track of all search options selected, then will filter all jobs accordingly???
  const { jobID } = useParams();

  useEffect(() => {
    axios
      .get(`${API}/jobs`)
      .then(({ data }) => {
        setJobs(data)
        setSearchResult(data)
      }
      )
      .catch((error) => console.log(error));
  }, []);

  return (
    <JobContextData.Provider
      value={{
        API,
        axios,
        jobID,
        userID,
        jobs,
        setJobs,
        searchResult,
        setSearchResult,
      }}
    >
      {children}
    </JobContextData.Provider>
  );
}

export default JobProvider;

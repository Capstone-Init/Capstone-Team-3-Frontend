import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContextProvider } from "../../Providers/Provider";
import { v4 as uuidv4 } from "uuid";
import SkillsComponent from "./SkillsComponent";
import { TfiAngleLeft } from "react-icons/tfi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { GoLocation } from "react-icons/go";
import "./JobsShow.css";

function JobsShow() {
  const { API, axios } = useContextProvider();
  const { jobID } = useParams();
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState({});
  const [skillIdArr, setSkillIdArr] = useState([]);
  const [reload, setReload] = useState(false)
  const [applied, setApplied] = useState(false)

//   hardcoded userId for testing
const [userID, setUserID] = useState(2)

  useEffect(() => {
    axios
      .get(`${API}/jobs/${jobID}`)
      .then(({ data }) => {
        setJobDetails(data);
        const extractSkills = data.skills.map((obj) => +Object.keys(obj)[0]);
        setSkillIdArr(extractSkills);
      })
      .catch((err) => console.log(err));
    //   check if user-jobs table already has pairing
    axios.get(`${API}/user-jobs/${userID}`)
    .then(({data}) => {
       const match = data.find(({id}) => id === jobID) 
       if(match){
        setApplied(true)
       }
    })
    .catch(err => console.log(data))
  }, [reload]);

//   apply button onclicks /user-jobs => {user_id, job_id}
function applyToJob(){
    const obj = {
        user_id: userID,
        job_id: jobID
    }
    axios.post(`${API}/user-jobs`, obj)
    .then(() => setReload(!reload))
    .catch(err => console.log(err))
}

  return (
    <div className="job-show">
      <section className="job-show-header">
        <TfiAngleLeft
          className="job-show-back"
          size={"25px"}
          onClick={() => navigate("/jobs")}
        />
        <h1>{jobDetails.title}</h1>
        <div className="job-show-header-details">
          <span className="job-show-company">
            <HiOutlineBuildingOffice2 size={"20px"} color={"#FFDE59"} />
            <span>{jobDetails.company}</span>
          </span>
          <span className="job-show-location">
            <GoLocation size={"20px"} color={"#FFDE59"} />
            <span>{jobDetails.city}</span>
          </span>
        </div>

        <hr />
        {jobDetails.full_remote && (
          <span className="job-show-remote">
            <span>REMOTE</span>
          </span>
        )}
        <button
        onClick={() => applyToJob()} 
        className="job-show-header-apply">APPLY</button>
      </section>

      <SkillsComponent skillsArr={skillIdArr} justList={true} />

      <section className="job-show-details">
        <div className="job-show-description">
          <span className="job-show-label">Description:</span>
          <span>{jobDetails.details}</span>
        </div>

        <div className="job-show-description">
          <span className="job-show-label">Tasks:</span>
          <span className="job-show-role-list">
            {jobDetails.tasks &&
              jobDetails.tasks.split(".").map((el) => {
                if (el) {
                  return (
                    <li key={uuidv4()}>
                      <span>{el}</span>
                    </li>
                  );
                }
              })}
          </span>
        </div>
      </section>

    {
        applied && 
        <button
        onClick={() => applyToJob()}  
        className="job-show-apply">Apply</button>
    }
      
    </div>
  );
}

export default JobsShow;

import React, { useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Select from 'react-select';
import Swal from 'sweetalert2';
import api,{BASE_URL} from "../../utils/api";

const ProjectCreate = () => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const [options, setOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const navigate = useNavigate(); 

  const [project, setProject] = useState({
    projectName: '',
    startDate: '',
    endDate: '',
    description: '',
    createdBy:decodedToken.id
  });
  const { projectName, startDate, endDate,description } = project;

  const onInputChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

   const handleSelectChange = selectedOptions => {
    setSelectedValues(selectedOptions);
    setProject({ ...project, members: selectedOptions });
  };

  useEffect(() => {
    api
      .get(`${BASE_URL}/usersonly`)
      .then(response => {
        const transformedOptions = response.data.map(option => ({
          value: option.id,
          label: option.username1,
        }));
        setOptions(transformedOptions);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);
  
  const salert =()=>{
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Project Added Successfully',
      showConfirmButton: false,
      width:'500px',
      height:'200px',
      timer: 1500
    });
  }
  useEffect(() => {
    console.log(
      'project name = ' +
        project.projectName +
        '\nstartdate = ' +
        project.startDate +
        '\n enddate = ' +
        project.status +
        '\ndescription = ' +
        project.description +
        '\nselected value = ' +
        JSON.stringify(project.members)+
        "\n createdBy = "+
        project.createdBy

    );
  }, [project]);

  const onSubmit = async(e) => {
    e.preventDefault();
    await api.post(`${BASE_URL}/projects`, project);
    salert();
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };
//
  const today = new Date().toISOString().split('T')[0];


  return (
    <div className="container">
         <div className="row d-flex align-items-center justify-content-center vh-100" style={{maxHeight:"90vh"}}>
      <div className="col-0 col-md-2 col-lg-5 mx-auto">
        <img
          className="form-img"
          src="https://www.shutterstock.com/shutterstock/videos/1088115067/thumb/12.jpg?ip=x480"
          height="450px"
          width="550px"
          alt=""
        />
      </div>
      <div className="col-12 col-md-9 col-lg-7 justify-content-center align-items-center">
          <div className="card shadow border-0 my-auto px-0 rounded">
            <form onSubmit={e => onSubmit(e)}>
              <h1 className="text-center  text-white p-2" style={{ backgroundColor: 'rgb(26, 37, 111)' }}>
                <p>New Project</p>
              </h1>

              <div className="row p-2 m-2">
                <p className="col-md-4 fw-bold col-12">
                  Project Name<span className="text-danger"> *</span>
                </p>
                <input
                  type="text"
                  className="col-md-8 col-12 p-2"
                  value={projectName}
                  onChange={e => onInputChange(e)}
                  placeholder="Enter Project Name"
                  name="projectName"
                  required
                />
              </div>

              <div className="row p-2 m-2">
                <p className="col-md-4 fw-bold col-12">
                  Start Date<span className="text-danger"> *</span>
                </p>
                <input
                  type="date"
                  className="col-md-8 col-12 p-2"
                  value={startDate}
                  onChange={e => onInputChange(e)}
                  min={today}
                  name="startDate"
                  required
                />
              </div>

              <div className="row p-2 m-2">
                <p className="col-md-4 fw-bold col-12">
                  End Date<span className="text-danger"> *</span>
                </p>
                <input
                  type="date"
                  className="col-md-8 col-12"
                  value={endDate}
                  onChange={e => onInputChange(e)}
                  placeholder="Enter End Date"
                  min={startDate}
                  name="endDate"
                  required
                />
              </div>
              <div className="row p-2 m-2">
                <p className="col-md-4 fw-bold col-12">Description<span className="text-danger"> *</span></p>
                <textarea
                  className="col-md-8 col-12 flex-nowrap"
                  value={description}
                  name="description"
                  onChange={e => onInputChange(e)}
                  placeholder="Enter Project Description..."
                  rows="3"
                  required
                ></textarea>
              </div>

              <div className="row p-2 m-2">
                <p className="col-md-4 fw-bold col-12">
                  Add Team Member<span className="text-danger"> *</span>
                </p>
                <div className="col-md-8 col-12 flex-nowrap p-2">
                  <Select
                    options={options}
                    isMulti
                    value={selectedValues}
                    onChange={handleSelectChange}
                    getOptionLabel={option => `ID = ${option.value}  NAME = ${option.label} `}
                    name="members"
                    required
                  />
                </div>
              </div>

              <hr className="m-0" />

              <div className="d-flex align-items-center justify-content-center m-2">
                <button className="btn btn-success btn-md m-2 text-white p-2 rounded-0" style={{ width: '100px' }}>
                  Add New
                </button>
                <Link to="/"><button className="btn btn-info m-2 btn-md text-white p-2 rounded-0" style={{ width: '100px' }}>
                  Back
                </button></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreate;
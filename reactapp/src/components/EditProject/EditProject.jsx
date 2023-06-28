import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Link } from "react-router-dom";
const EditProject = () => {
  const [options, setOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        const transformedOptions = response.data.map(option => ({
          value: option.id,
          label: option.id+" "+option.name
        }));
        setOptions(transformedOptions);
      })
      .catch(error => {
        console.error('Error fetching options:', error);
      });
  }, []);

  const handleSelectChange = selectedOptions => {
    setSelectedValues(selectedOptions);
  };

  
  return (
   
      <div className="container">
      <div className="row d-flex align-items-center justify-content-center vh-100">
        <div className="col -10 col-md-10 col-lg-9">
          <div className="card shadow border-0 my-auto px-0 rounded">
            <form>
              <h1 className="text-center  text-white p-2" style={{backgroundColor:"rgb(26, 37, 111)"}}>
                <p>Edit Project</p>
              </h1>
  
              <div className="row p-2 m-2">
                <p className="col-md-4 fw-bold col-12">Project Name <span className='text-danger'> *</span></p>
                <input type="text" className="col-md-8 col-12 p-2" placeholder="Enter Project Name" name="" />
              </div>
  
              <div className="row p-2 m-2">
                <p className="col-md-4 fw-bold col-12">Start Date<span className='text-danger'> *</span></p>
                <input type="date" className="col-md-8 col-12 p-2" placeholder="Enter Start Date" name="" />
              </div>
  
              <div className="row p-2 m-2">
                <p className="col-md-4 fw-bold col-12">End Date<span className='text-danger'> *</span></p>
                <input type="date" className="col-md-8 col-12" placeholder="Enter End Date" name="" />
              </div>
  
              <div className="row p-2 m-2">
                <p className="col-md-4 fw-bold col-12">Status<span className='text-danger'> *</span></p>
                <select className="col-md-8 col-12 p-2">
                  <option value="">Not Started</option>
                  <option value="">On Progress</option>
                  <option value="">Completed</option>
                </select>
              </div>
  
              <div className="row p-2 m-2">
                <p className="col-md-4 fw-bold col-12">Description<span className='text-danger'> *</span></p>
                <textarea
                  className="col-md-8 col-12 flex-nowrap"
                  placeholder="Enter Project Description..."
                  rows="3"
                ></textarea>
              </div>
                
              <div className="row p-2 m-2">
                <p className="col-md-4 fw-bold col-12">Add Team Member<span className='text-danger'> *</span></p>
                <div className="col-md-8 col-12 flex-nowrap p-2">
                <Select
                  options={options}
                  isMulti
                  value={selectedValues}
                  onChange={handleSelectChange}
                  
                />
                </div>
              </div>
  
              <hr className="m-0" />
  
              <div className="d-flex align-items-center justify-content-center m-2">
                <button className="btn btn-success btn-md m-2 text-white p-2 rounded-0" style={{width:"100px"}} >Add New</button>
                <Link to="/projectdetails"><button className="btn btn-info m-2 btn-md text-white p-2 rounded-0" style={{width:"100px"}}>Back</button></Link>
              </div>
            </form>
          </div>
  
        </div>
      </div>
    </div>
  );
};

export default EditProject;

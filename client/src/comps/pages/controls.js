import React, { Component } from 'react';

class Controls extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    skillsByJobs = () =>{
        this.props.skillsByJobs(true);
    }
    
    jobsBySkills = () =>{
        this.props.jobsBySkills(true);
    }
  render() {
   
    return (
      <div>
        <div className="searchType">
        <button onClick={this.jobsBySkills}>search jobs by skills</button>
        <button onClick={this.skillsByJobs}>search skills by job</button>
        </div>
      </div>
    );
  }
}

export default Controls;

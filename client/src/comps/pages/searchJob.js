import React, { Component } from 'react';
import ResultsJob from '../results/resultsJob.js'
import Controls from '../pages/controls.js'

class SearchJob extends Component {
    constructor(props){
        super(props)
        this.state = {
            skillNames: [],
            releJobs: [],
            skill: "",
        }
    }
    
    fetchData = () =>{
        fetch('http://api.dataatwork.org/v1/skills/normalize?skill_name='+this.state.skill)
      .then(response => response.json())
      .then(data => this.setState({
       skillNames: data,
       }));
    }
    
    clickFetch = () =>{
        this.fetchData();
    }
    
    //Data is not fetched with componentDidMount or on load, data is fetched when clickFetch is called.
    
    inputChange = (evt) =>{
        this.setState({
            skill: evt.target.value,
        });
    }
    
    //UUID finds related skills and sends the data to releSkills
    grabID = (uuid) =>{
       
        fetch('http://api.dataatwork.org/v1/skills/'+uuid+'/related_jobs')
        .then(response => response.json())
        .then(data => this.setState({
            releJobs: data,
        }));
        
    }
    
  render() {
      
      let renderJobs = null;
      let searchResults = null;
      
      if(this.state.releJobs.jobs == undefined){
    
    renderJobs = <div  className="noResults">
        <h3>No jobs found</h3>
        <p>Select a different skill, or search a new one to see if there are any jobs for that skill</p>
        </div>;
    
   } else if(this.state.releJobs != ""){
       renderJobs = this.state.releJobs.jobs.slice(0, 10).map((obj, i)=>{
        return(
            <ResultsJob 
                key={i}
                jobData={obj}
                />
            );
       
    })
   }
      
      
      if(this.state.skillNames.length <= 0){
    
    searchResults = <div>Search for a skill</div>;
    //UUID is needed to grab related data, UUID is grabbed with grabID with this button
   } else if(this.state.skillNames.length >= 1){
       searchResults = this.state.skillNames.slice(0, 10).map((obj, i)=>{ 
        return (<button onClick={this.grabID.bind(this, obj.uuid)}>{obj.skill_name}</button>) 
        })
   }
      
      
    return (
      <div className="searchSkillsPage">
        <div className="sideBar">
        <Controls skillsByJobs={this.props.skillsByJobs} jobsBySkills={this.props.jobsBySkills} />
        <h3>Find out which skills are for what jobs</h3>
        <div className="searchBar">
        <input type="text" placeholder="Skill name here" onChange={this.inputChange}/>
        <button onClick={this.clickFetch}>Search</button>
        </div>
        
        
        
        <div className="searchResults">
        
         {searchResults}
        
        </div>
        </div>
        <div className="resultsPage">
        <h1>Jobs</h1>
            {renderJobs}
        </div>
      </div>
    );
  }
}

export default SearchJob;

import React, { Component } from 'react';
import ResultsSkill from '../results/resultsSkill.js'
import Controls from '../pages/controls.js'

class SearchSkill extends Component {
    constructor(props){
        super(props)
        this.state = {
            jobNames: [],
            releSkills: [],
            job: "",
        }
    }
    
    fetchData = () =>{
        fetch('http://api.dataatwork.org/v1/jobs/normalize?job_title='+this.state.job+'&limit=10')
      .then(response => response.json())
      .then(data => this.setState({
       jobNames: data,
       }));
    }
    
    clickFetch = () =>{
        this.fetchData();
    }
    
    //Data is not fetched with componentDidMount or on load, data is fetched when clickFetch is called.
    
    inputChange = (evt) =>{
        this.setState({
            job: evt.target.value,
        });
    }
    
    //UUID finds related skills and sends the data to releSkills
    grabID = (uuid) =>{
        
        fetch('http://api.dataatwork.org/v1/jobs/'+uuid+'/related_skills')
        .then(response => response.json())
        .then(data => this.setState({
            releSkills: data,
        }));
      
    }
    
  render() {
      
      let renderSkills = null;
      let searchResults = null;
      
      if(this.state.releSkills.skills == undefined){
    
    renderSkills = <div  className="noResults">
        <h3>No skills found</h3>
        <p>Select a different job, or search a new one to see which skills align with that job</p>
        </div>;
    
   } else if(this.state.releSkills != ""){
    renderSkills = this.state.releSkills.skills.slice(0, 10).map((obj, i)=>{
        return(
            <ResultsSkill 
                key={i}
                skillsData={obj}
                />
            );
       
    })
   }
      
    if(this.state.jobNames.length <= 0){
    
        searchResults = <div>Search for a job</div>;
    //UUID is needed to grab related data, UUID is grabbed with grabID with this button
    } else if(this.state.jobNames.length >= 1){
         searchResults = this.state.jobNames.slice(0, 10).map((obj, i)=>{ 
          return (<button onClick={this.grabID.bind(this, obj.uuid)}>{obj.title}</button>) 
          })
   }
     
      
    return (
      <div className="searchSkillPage">
        <div className="sideBar">
        <Controls skillsByJobs={this.props.skillsByJobs} jobsBySkills={this.props.jobsBySkills} />
        <h3>Find out which jobs need what skills</h3>
        <div className="searchBar">
        <input type="text" placeholder="job name here" onChange={this.inputChange}/>
        <button onClick={this.clickFetch}>Search</button>
        </div>
        
        
        <div className="searchResults">
        
         {searchResults}
        
        </div>
        </div>
        <div className="resultsPage">
        <h1>Skills</h1>
            {renderSkills}
        </div>
      </div>
    );
  }
}

export default SearchSkill;

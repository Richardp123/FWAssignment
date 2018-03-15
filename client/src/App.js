import React, { Component } from 'react';
import './styles/output.css';
import SearchSkill from'./comps/pages/searchSkill.js';
import SearchJob from'./comps/pages/searchJob.js';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            show1: true,
            show2: false
        }
    }
    
    jobsBySkills = (show) =>{
        this.setState({
            show1: show,
            show2: false
        })
        console.log(this.state.searchNum)
    }
    
    skillsByJobs = (show) =>{
        this.setState({
            show1: false,
            show2: show
        })
        console.log(this.state.searchNum)
    }
    
    
    
  render() {
      
      let searchPage = null;
      
      if(this.state.show1 === true){
          searchPage = <SearchJob jobsBySkills={this.jobsBySkills} skillsByJobs={this.skillsByJobs} />
      }
      if(this.state.show2 === true){
          searchPage = <SearchSkill jobsBySkills={this.jobsBySkills} skillsByJobs={this.skillsByJobs} />
      }    
    
      
    return (
      <div className="App">
        
        <div className="searchArea">
        
        {searchPage}
        </div>
        
      </div>
    );
  }
}

export default App;

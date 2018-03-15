import React, { Component } from 'react';

class ResultsSkill extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    
  render() {
      
     const obj = this.props.skillsData;
      
      
    return (
      <div>
        <div className="resDiv">
        <div className="resHeader">
            <h3>{obj.skill_name}</h3>
        </div>
        <div className="resBody">
            <p>{obj.description}</p>
        </div>
        </div>
        
      </div>
    );
  }
}

export default ResultsSkill;

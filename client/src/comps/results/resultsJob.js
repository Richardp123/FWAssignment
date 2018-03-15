import React, { Component } from 'react';

class ResultsJob extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    
  render() {
      
     const obj = this.props.jobData;
      
      
    return (
      <div>
        <div className="resDiv">
        <div className="resHeader">
            <h3 className="resTitle">{obj.job_title}</h3>
        </div>
        </div>
        
      </div>
    );
  }
}

export default ResultsJob;

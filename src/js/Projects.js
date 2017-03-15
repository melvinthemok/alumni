import React, { Component } from 'react'

class Projects extends Component {  
  render () {
    return (
      <div>
        {React.cloneElement(this.props.children, { data: this.props.data, selectedPerson: this.props.selectedPerson })}
      </div>
    )
  }
}

export default Projects

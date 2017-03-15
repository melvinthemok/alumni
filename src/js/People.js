import React, { Component } from 'react'
import PeopleCard from './PeopleCard'

class People extends Component {
  render () {
    const peopleArray = this.props.data.map(function (person) {
      return <PeopleCard key={person.githubLogin.toString()} githubLogin={person.githubLogin} setSelectedPersonInApp={this.props.setSelectedPersonInApp} handleProjectClickInApp={this.props.handleProjectClickInApp} />
    }, this)
    // const dataLoaded = this.props.dataLoaded
    return (
      // <div className='d-flex flex-wrap justify-content-center pb-5'>
      //   { dataLoaded ?
      //     alumniArray
      //     : (
      //       <div>
      //         <div className='progress'>
      //           <div className='progress-bar bg-warning progress-bar-striped progress-bar-animated' role='progressbar' style={{width: '80%', height: '40px'}}>
      //             <h2 className='px-5'><em>LOADING</em></h2>
      //           </div>
      //         </div>
      //         <br />
      //         <br />
      //         <br />
      //         <br />
      //         <br />
      //         <br />
      //         <br />
      //       </div>
      //   )}
      // </div>
      <div className='d-flex flex-wrap justify-content-center pb-5'>
        {peopleArray}
      </div>
    )
  }
}

export default People

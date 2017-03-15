import React, { Component } from 'react'
import { Link } from 'react-router'
import 'reactstrap'
import classnames from 'classnames'
import data from '../data/data.json'
import '../css/App.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.handlePeopleClickInApp = this.handlePeopleClickInApp.bind(this)
    this.handleProjectClickInApp = this.handleProjectClickInApp.bind(this)
    this.setSelectedPersonInApp = this.setSelectedPersonInApp.bind(this)

    // this.state = {
    //   data: [],
    //   dataLoaded: false,
    //   peopleNotProject: true,
    //   projectNotPeople: false
    // }

    this.state = {
      data: data,
      peopleNotProject: true,
      projectNotPeople: false,
      selectedPerson: ''
    }
  }

  // componentWillMount () {
  //   fetch('https://raw.githubusercontent.com/wdi-sg/alumni/master/data.json?access_token=c7739be7c74328488041154e7af8af17a4814e78').then(function (response) {
  //     response.json().then(function (result) {
  //       this.setState({
  //         data: result,
  //         dataLoaded: true
  //       })
  //     }.bind(this))
  //   }.bind(this)).catch(function (err) {
  //     console.log('Error: ' + err)
  //   })
  // }
  //

  handlePeopleClickInApp () {
    this.setState({
      peopleNotProject: true,
      projectNotPeople: false
    })
  }

  handleProjectClickInApp () {
    this.setState({
      peopleNotProject: false,
      projectNotPeople: true
    })
  }

  setSelectedPersonInApp (githubLogin) {
    this.setState({
      selectedPerson: githubLogin
    })
  }

  render () {
    return (
      <div className='container-fluid'>
        <br />
        <div className={classnames({
          'jumbotron': true,
          'col-lg-10': true,
          'offset-lg-1': true,
          'people': this.state.peopleNotProject,
          'project': this.state.projectNotPeople
        })}>
          <h1 className='display-4'><strong><em>ALUMNI !</em></strong></h1>
          <h6 className='mb-3'><strong><em>of WDI 7</em></strong></h6>
          <h6><em>general assembly</em></h6>
          <br />
          <div className='d-flex flex-wrap justify-content-center'>
            <Link to='/people' activeClassName='active' onClick={this.handlePeopleClickInApp}><button className='btn btn-lg btn-info mt-3 mx-4'>PEOPLE</button></Link>
            <Link to='/projects' activeClassName='active' onClick={this.handleProjectClickInApp}><button className='btn btn-lg btn-danger mt-3 mx-4'>PROJECTS</button></Link>
          </div>
        </div>
        {React.cloneElement(this.props.children, { data: this.state.data, selectedPerson: this.state.selectedPerson, setSelectedPersonInApp: this.setSelectedPersonInApp, handleProjectClickInApp: this.handleProjectClickInApp })}
      </div>
    )
  }
}

export default App

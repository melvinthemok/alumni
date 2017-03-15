import React, { Component } from 'react'
import ProjectCard from './ProjectCard'

class ProjectsOne extends Component {
  render () {
    const chosenPersonObjectArray = this.props.data.filter(function (object) {
      if (object.githubLogin === this.props.selectedPerson) {
        return true
      } else {
        return false
      }
    }, this)
    const chosenPersonObject = chosenPersonObjectArray[0]

    const projectNumbers = [1, 2, 3, 4]
    const projectsArray = projectNumbers.reduce(function (projectsArrayInProgress, number) {
      if (chosenPersonObject['project' + number]) {
        let currentProject = chosenPersonObject['project' + number]
        currentProject['owner'] = this.props.selectedPerson
        return projectsArrayInProgress.concat(currentProject)
      }
      return projectsArrayInProgress
    }.bind(this), [])

    const projectViewsArray = projectsArray.map(function (project, index) {
      return <ProjectCard
        key={index}
        name={project.repoName}
        imageURL={project.previewImage}
        appLink={project.deployedUrl}
        owner={project.owner}
        />
    }, this)

    return (
      <div className='d-flex flex-wrap justify-content-center pb-5'>
        {projectViewsArray}
      </div>
    )
  }
}

export default ProjectsOne

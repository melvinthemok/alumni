import React, { Component } from 'react'
import ProjectCard from './ProjectCard'

class ProjectsAll extends Component {
  render () {
    const projectNumbers = [1, 2, 3, 4]
    const projectsArray = this.props.data.reduce(function (projectsArrayInProgress, person) {
      let personProjectsArray = []
      personProjectsArray = projectNumbers.reduce(function (personProjectsArrayInProgress, number) {
        if (person['project' + number]) {
          let currentProject = person['project' + number]
          let projectDevelopers = []
          projectDevelopers.push(person.githubLogin)
          if (currentProject.collaborators) {
            projectDevelopers = projectDevelopers.concat(currentProject.collaborators)
          }
          currentProject['projectDevelopers'] = projectDevelopers
          currentProject['unit'] = number
          return personProjectsArrayInProgress.concat(currentProject)
        }
        return personProjectsArrayInProgress
      }, [])
      return projectsArrayInProgress.concat(personProjectsArray)
    }, [])

    let duplicateTest = {}
    let filteredProjectsArray = projectsArray.filter(function (project) {
      if (
        duplicateTest[project.repoName] &&
        duplicateTest[project.repoName] === project.deployedUrl
      ) return false
      duplicateTest[project.repoName] = project.deployedUrl
      return true
    })
    const projectViewsArray = filteredProjectsArray.map(function (project, index) {
      return <ProjectCard
        key={index}
        name={project.repoName}
        imageURL={project.previewImage}
        appLink={project.deployedUrl}
        projectDevelopers={project.projectDevelopers}
        owner={project.projectDevelopers[0]}
        />
    }, this)

    return (
      <div className='d-flex flex-wrap justify-content-center pb-5'>
        {projectViewsArray}
      </div>
    )
  }
}

export default ProjectsAll

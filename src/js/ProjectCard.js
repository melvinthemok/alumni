import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import '../css/ProjectCard.css'

class ProjectCard extends Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)

    this.state = {
      imageURL: this.props.imageURL || '',
      readme: '',
      readmeAvail: false,
      modal: false
    }
  }

  toggle () {
    this.setState({
      modal: !this.state.modal
    })
  }

  componentDidMount () {
    fetch(`https://api.github.com/users/${this.props.owner}?access_token=${process.env.REACT_APP_GITHUB_API_KEY}`).then(function (response) {
      response.json().then(function (object) {
        if (this.state.imageURL === '') {
          this.setState({
            imageURL: object.avatar_url
          })
        }
      }.bind(this))
    }.bind(this)).catch(function (err) {
      console.log('Error: ' + err)
    })

    fetch(`https://raw.githubusercontent.com/${this.props.owner}/${this.props.name}/master/README.md?access_token=${process.env.REACT_APP_GITHUB_API_KEY}`).then(function (response) {
      if (!response.ok) {
        throw Error(response.status)
        // fetch(`https://raw.githubusercontent.com/${this.props.owner}/${this.props.name}/master/readme.md?access_token=${process.env.REACT_APP_GITHUB_API_KEY}`).then(function (resp) {
        //   if (!resp.ok) {
        //     throw Error(resp.status)
        //   }
        //   console.log(resp.text())
        //   return resp.text()
        // })
      }
      return response.text()
    }).then(function (markdown) {
      if (typeof markdown !== 'undefined') {
        this.setState({
          readme: markdown,
          readmeAvail: true
        })
      }
    }.bind(this)).catch(function (err) {
      console.log('Error: ' + err)
    })
  }

  render () {
    const readmeAvail = this.state.readmeAvail
    return (
      <div className='card project card-outline-info m-4'>
        <div className='card-header'>
          { readmeAvail ?
            <div>
              <a href='#readme' onClick={this.toggle}><h6 className='mt-2 text-center'>{this.props.name}</h6></a>
              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>ReadMe</ModalHeader>
                <ModalBody>
                  <ReactMarkdown source={this.state.readme} />
                </ModalBody>
                <ModalFooter>
                  <Button color='danger' onClick={this.toggle}>Close</Button>
                </ModalFooter>
              </Modal>
            </div>
          : <h6 className='mt-2 text-center'>{this.props.name}</h6>
          }
        </div>
        <img className='card-img-top' src={this.state.imageURL} role='presentation' />
        <div className='card-footer text-center'>
          <div className='row'>
            <div className='col-6'>
              <a className='btn' href={`https://github.com/${this.props.owner}/${this.props.name}`}><em>github</em></a>
            </div>
            <div className='col-6'>
              <a className='btn' href={this.props.appLink}><em>app</em></a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectCard

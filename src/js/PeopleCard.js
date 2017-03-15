import React, { Component } from 'react'
import { Link } from 'react-router'
import '../css/PeopleCard.css'

class PeopleCard extends Component {
  constructor (props) {
    super(props)

    this.setSelectedPersonInPeopleCard = this.setSelectedPersonInPeopleCard.bind(this)
    this.handleProjectClickInPeopleCard = this.handleProjectClickInPeopleCard.bind(this)

    this.state = {
      name: '',
      imageURL: '',
      bio: '',
      githubLink: '',
      blogLink: '',
      peopleCardLoaded: false
    }
  }

  setSelectedPersonInPeopleCard () {
    this.props.setSelectedPersonInApp(this.props.githubLogin)
  }

  handleProjectClickInPeopleCard () {
    this.props.handleProjectClickInApp()
  }

  // componentDidMount () {
  //   fetch(`https://api.github.com/users/${this.props.githubLogin}?access_token=${process.env.REACT_APP_GITHUB_API_KEY}`).then((response) => {
  //     response.json().then((object) => {
  //       this.setState({
  //         name: object.name,
  //         imageURL: object.avatar_url,
  //         bio: object.bio,
  //         githubLink: object.html_url,
  //         blogLink: object.blog
  //       })
  //     })
  //   }).catch((err) => {
  //     console.log('Error: ' + err)
  //   })
  // }
  //
  componentDidMount () {
    fetch(`https://api.github.com/users/${this.props.githubLogin}?access_token=${process.env.REACT_APP_GITHUB_API_KEY}`).then(function (response) {
      response.json().then(function (object) {
        this.setState({
          name: object.name,
          imageURL: object.avatar_url,
          bio: object.bio,
          githubLink: object.html_url,
          blogLink: object.blog,
          peopleCardLoaded: true
        })
      }.bind(this))
    }.bind(this)).catch(function (err) {
      console.log('Error: ' + err)
    })
  }

  render () {
    const peopleCardLoaded = this.state.peopleCardLoaded
    return (
      <div className='card people card-outline-info m-4'>
        <div className='card-header'>
          { peopleCardLoaded ?
            <Link to={`/projects/user/${this.props.githubLogin}`} onClick={function (event) { this.setSelectedPersonInPeopleCard(); this.handleProjectClickInPeopleCard() }.bind(this)}><h6 className='mt-2 text-center'>{this.state.name || this.props.githubLogin}!</h6></Link>
          : (
            <div className='pswp__preloader__icn mx-auto'>
              <div className='pswp__preloader__cut'>
                <div className='pswp__preloader__donut' />
              </div>
            </div>
            // <div className='progress'>
            //   <div className='progress-bar bg-warning progress-bar-striped progress-bar-animated' role='progressbar' style={{width: '80%', height: '25px'}}>
            //     <h6><em>LOADING</em></h6>
            //   </div>
            // </div>
            )
          }
        </div>
        <img className='card-img-top' src={this.state.imageURL} role='presentation' />
        <div className='card-block align-center'>
          {this.state.bio || 'WDI student'}
        </div>
        <div className='card-footer text-center'>
          <div className='row'>
            <div className='col-6'>
              <a className='btn' href={this.state.githubLink}><em>github</em></a>
            </div>
            <div className='col-6'>
              {this.state.blogLink && <a className='btn' href={this.state.blogLink}><em>blog</em></a>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PeopleCard

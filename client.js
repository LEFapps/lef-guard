import { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { withRouter } from 'react-router'

class Guard extends Component {
  constructor (props) {
    super(props)
    this.state = { allowed: false }
  }
  componentDidMount () {
    const { history, rule, redirect } = this.props
    Meteor.call('guard', { rule }, (e, r) => {
      if (!r && redirect) history.push(redirect)
      else this.setState({ allowed: r })
    })
  }
  // componentDidUpdate () {
  //   Meteor.call('guard', { rule: this.props.rule }, (e, r) => {
  //     this.setState({ allowed: r })
  //   })
  // }
  render () {
    return this.state.allowed ? this.props.children : null
  }
}

const Container = withRouter(Guard)

export default Container
export { Container as Guard }

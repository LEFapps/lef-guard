import { Component } from 'react'
import { Meteor } from 'meteor/meteor'

class Guard extends Component {
  constructor (props) {
    super(props)
    this.state = { allowed: false }
  }
  componentDidUpdate () {
    Meteor.call('guard', { rule: this.props.rule }, (e, r) => {
      this.setState({ allowed: r })
    })
  }
  render () {
    return this.state.allowed ? this.props.children : null
  }
}

export default Guard
export { Guard }

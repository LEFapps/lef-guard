import { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { withRouter } from 'react-router'
import { withUser } from 'meteor/lef:utils'

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
  componentDidUpdate () {
    Meteor.call('guard', { rule: this.props.rule }, (e, r) => {
      const { history, rule, redirect } = this.props
      Meteor.call('guard', { rule }, (e, r) => {
        if (!r && redirect) history.push(redirect)
        else this.setState({ allowed: r })
      })
    })
  }
  shouldComponentUpdate (nextProps, nextState) {
    if (
      this.state.allowed !== nextState.allowed ||
      this.props.userId !== nextProps.userId
    ) {
      return true
    }
    return false
  }
  render () {
    return this.state.allowed ? this.props.children : null
  }
}

const Container = withRouter(withUser(Guard))

export default Container
export { Container as Guard }

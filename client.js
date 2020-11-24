import { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { withRouter } from 'react-router'
import { withUser } from 'meteor/lef:utils'
import Rules from './collections'

class Guard extends Component {
  _isMounted = false
  constructor (props) {
    super(props)
    this.state = { allowed: false }
  }
  componentDidMount () {
    this._isMounted = true
    const { rule } = this.props
    !rule
      ? this.callback(null, !!Meteor.userId())
      : Meteor.call('guard', { rule }, this.callback)
  }
  componentWillUnmount () {
    this._isMounted = false
  }
  componentDidUpdate ({ userId }, { allowed }) {
    const { rule } = this.props
    if (this.state.allowed !== allowed || this.props.userId !== userId) {
      !rule
        ? this.callback(null, !!Meteor.userId())
        : Meteor.call('guard', { rule }, this.callback)
    }
  }
  callback = (e, allowed) =>
    !allowed && this.props.redirect
      ? this.props.history.push(this.props.redirect)
      : this._isMounted
        ? this.setState({ allowed })
        : null
  render () {
    return this.state.allowed ? this.props.children : null
  }
}

const Container = withRouter(withUser(Guard))

export default Container
export { Container as Guard, Rules }

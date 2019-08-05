import { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { withRouter } from 'react-router'
import { withUser } from 'meteor/lef:utils'

class Guard extends Component {
  _isMounted = false
  constructor (props) {
    super(props)
    this.state = { allowed: false }
  }
  componentDidMount () {
    this._isMounted = true
    const { history, rule, redirect } = this.props
    Meteor.call('guard', { rule }, (e, r) => {
      if (!r && redirect) history.push(redirect)
      else this._isMounted ? this.setState({ allowed: r }) : null
    })
  }
  componentWillUnmount () {
    this._isMounted = false
  }
  componentDidUpdate ({ userId }, { allowed }) {
    if (this.state.allowed !== allowed || this.props.userId !== userId) {
      Meteor.call('guard', { rule: this.props.rule }, (e, r) => {
        const { history, rule, redirect } = this.props
        Meteor.call('guard', { rule }, (e, r) => {
          if (!r && redirect) history.push(redirect)
          else this._isMounted ? this.setState({ allowed: r }) : null
        })
      })
    }
  }
  render () {
    return this.state.allowed ? this.props.children : null
  }
}

const Container = withRouter(withUser(Guard))

export default Container
export { Container as Guard }

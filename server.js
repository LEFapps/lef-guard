import Rules from './collections'
import { intersection, some } from 'lodash'
import { Meteor } from 'meteor/meteor'

Meteor.methods({
  guard: ({ rule }) => {
    const ruleDoc = Rules.findOne({ _id: rule })
    if (!ruleDoc) {
      Rules.insert({ _id: rule, allowedFor: [] })
      return false
    } else {
      const { allowedFor } = ruleDoc
      if (some(allowedFor, 'noRole')) return true
      const user = Meteor.user()
      if (!user) return false
      return intersection(allowedFor, user.roles).length > 0
    }
  }
})

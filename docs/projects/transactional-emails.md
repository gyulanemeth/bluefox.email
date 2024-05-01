# Transactional emails

 - description + best practices - "must send in order a funcionality to work"
 - triggered by your backend
 - sent to one specific person, does not need to be on a list
 - data comes from your backend, merged into the template (handlebars)
 - examples: registration, forgot password, etc.
 - no unsubscribe / pause subscription (don't send non-transactional emails as transactional)
 - how to integrate

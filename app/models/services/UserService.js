const models = require('../schemas')
const bcrypt = require('bcrypt-nodejs')

models.users.pre('save', (next) => {
	const users = this
	SALT_FACTOR = 5

	if(!users.isModified('password')) return next()

	bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
		if(err) return next(err)

		users.password = hash
		next()
	})
})

models.users.methods.comparePassword = (candidatePassword, callback) => {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) {return callback(err)}
		callback(null, isMatch)
	})
}

models.users.methods.getOne = (id) => {
	return models.users.findById(id).then((user) => {
		return user.get({plain: true})
	})
}

module.exports = models.users
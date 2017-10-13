const express = require('express')
const router = express.Router()

// Register
router.register = (req, res, next) => {
	console.log(req.body.username);
}

router.post('/:id', (req, res, next) => res.send('Expenses home page'))

router.delete('/:id', (req, res, next) => {console.log(req.params.id)})

router.get('/:id', (req, res, next) => {console.log(req.params.id)})

router.post('/total/:id', (req, res, next) => {console.log(req.params.id)})

router.post('/report/:id', (req, res, next) => {console.log(req.params.id)})

module.exports = router
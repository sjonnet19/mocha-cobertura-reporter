
/**
 * Module dependencies.
 */

var JSONCov = require('mocha').reporters.JSONCov, 
fs = require('fs')

/**
 * Expose `Cobertura`.
 */

exports = module.exports = Cobertura

/**
 * Initialize a new `Cobertura` reporter.
 *
 * @param {Runner} runner
 * @api public
 */

function Cobertura(runner) {
	var jade = require('jade')
	var file = __dirname + '/templates/cobertura.jade', 
	str = fs.readFileSync(file, 'utf8'), 
	fn = jade.compile(str, { filename: file }), 
	self = this

	JSONCov.call(this, runner, false)

	runner.on('end', 
	function(){
		self.cov.src = __dirname.split('node_modules')[0]
		process.stdout.write(fn({
			cov: self.cov
		}))
	})
}

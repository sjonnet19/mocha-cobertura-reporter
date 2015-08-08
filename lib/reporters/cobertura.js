
/**
 * Module dependencies.
 */

var JSONCov = require('mocha').reporters.JSONCov, 
fs = require('fs'),
path = require("path");

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
	jade.doctypes.cobertura = '<!DOCTYPE coverage SYSTEM "http://cobertura.sourceforge.net/xml/coverage-03.dtd">'
	var file = __dirname + '/templates/cobertura.jade', 
	str = fs.readFileSync(file, 'utf8'), 
	fn = jade.compile(str, { filename: file }), 
	self = this

	JSONCov.call(this, runner, false)

	runner.on('end', 
	function(){
		self.cov.src = __dirname.split('node_modules')[0]
                self.cov.files = self.cov.files.map(function(file) {
                  file.filename = path.relative(self.cov.src || "",
                                                file.filename);
                  return file;
                });
		process.stdout.write(fn({
			cov: self.cov
		}))
	})
}

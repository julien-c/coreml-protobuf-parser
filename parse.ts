import * as fs from 'fs';
import { c } from './lib/Log';
import { CoreML } from './mlmodel';
import { inspect } from 'util';

/**
 * Generate static code from .proto files using:
 * 
 * ./node_modules/.bin/pbjs -t static-module -w commonjs --es6 -o mlmodel.js mlmodel/format/Model.proto
 * ./node_modules/.bin/pbts -o mlmodel.d.ts mlmodel.js
 */


(async () => {
	/**
	 * Get "spec" of a model.
	 */
	const buf = await fs.promises.readFile(
		// './examples/SentimentPolarity.mlmodel'
		process.argv[process.argv.length - 1]
	);
	const m = CoreML.Specification.Model.decode(buf);
	
	// c.debug(m.description);
	// c.log(`===`);
	console.log(
		inspect(m, {
			depth: Infinity,
			maxArrayLength: Infinity,
		})
	);
})();

import * as fs from 'fs';
import { c } from './lib/Log';
import { CoreML } from './mlmodel';
import { onnx } from './onnx-proto';
import { inspect } from 'util';

/**
 * Protobuf bindings for ML model formats, inspired by `netron`.
 * 
 * 1/ Copy .proto files from source repos with:
 * 
 * cp third_party/coremltools/mlmodel/format/* mlmodel/format/
 * cp third_party/onnx/onnx/{onnx,onnx-operators}.proto onnx/
 * 
 * 2/ Generate static code from .proto files using:
 * 
 * mlmodel (coreml)
 * ./node_modules/.bin/pbjs -t static-module -w commonjs --es6 -o mlmodel.js mlmodel/format/Model.proto
 * ./node_modules/.bin/pbts -o mlmodel.d.ts mlmodel.js
 * 
 * onnx
 * ./node_modules/.bin/pbjs -t static-module -w commonjs --es6 -o onnx-proto.js onnx/onnx.proto onnx/onnx-operators.proto
 * ./node_modules/.bin/pbts -o onnx-proto.d.ts onnx-proto.js
 * 
 */

 const MLMODEL = false;

(async () => {
	if (MLMODEL) {
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
		
	} else {
		
		const buf = await fs.promises.readFile(
			process.argv[process.argv.length - 1]
		);
		const m = onnx.ModelProto.decode(buf);
		
		console.log(
			inspect(m, {
				colors: true,
				depth: Infinity,
				maxArrayLength: Infinity,
			})
		);
	}
})();

/**
 * Shadow optimized copy of a multi-dimensional object or array
 * @author Thomas Savournin <tosave.vbl@gmail.com>
 * @param inObject Object or array to copy
 * @returns outObject
 */
const deepCopyFunction = (inObject: any) => {
	let outObject: any, value: any, key: string

	if (typeof inObject !== "object" || inObject === null) {
		return inObject // Return the value if inObject is not an object
	}

	// Create an array or object to hold the values
	outObject = Array.isArray(inObject) ? [] : {}

	for (key in inObject) {
		value = inObject[key]

		// Recursively (deep) copy for nested objects, including arrays
		outObject[key] = deepCopyFunction(value)
	}

	return outObject
}

export default deepCopyFunction

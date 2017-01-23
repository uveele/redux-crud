import * as r from "ramda"

import assertAllHaveKeys from "../../../utils/assertAllHaveKeys"
import constants from "../../../constants"
import invariants from "../invariants"
import makeScope from "../../../utils/makeScope"
import store from "../store"
import wrapArray from "../../../utils/wrapArray"

import { Config, InvariantsBaseArgs, Map, ReducerName } from "../../../types"

var reducerName: ReducerName = constants.REDUCER_NAMES.FETCH_SUCCESS
var invariantArgs: InvariantsBaseArgs = {
	reducerName,
	canBeArray: true,
}

export default function success(config: Config, current: Map<any>, records: any): Map<any> {
	invariants(invariantArgs, config, current, records)

	// wrap array
	records = wrapArray(records)

	// All given records must have a key
	assertAllHaveKeys(config, reducerName, records)

	var merge = r.indexBy(config.key, records)

	return r.merge(current, merge)
}

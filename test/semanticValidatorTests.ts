// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

/* tslint:disable:no-console */

import assert from "assert"
import * as validate from "../lib/validate"
import * as constants from "../lib/util/constants"

describe("Semantic validation", () => {
  it("should validate correctly when the spec contains an x-ms-parameterized-host", async () => {
    const specPath = `${__dirname}/semanticValidation/specification/parameterizedhost/face.json`
    const result = await validate.validateSpec(specPath, undefined)
    // console.dir(result, { depth: null })
    assert(
      result.validityStatus === true, `swagger "${specPath}" contains model validation errors.`)
  })

  it("should validate correctly when the spec does not contain a definitions section", async () => {
    const specPath = `${__dirname}/semanticValidation/specification/definitions/definitions.json`
    const result = await validate.validateSpec(specPath, undefined)
    // console.dir(result, { depth: null })
    assert(
      result.validityStatus === true, `swagger "${specPath}" contains model validation errors.`)
  })

  it("should fail when validating a swagger with JSON errors", async () => {
    const specPath = `${__dirname}/semanticValidation/specification/invalid/invalid.json`
    const result = await validate.validateSpec(specPath, undefined)
    assert(result.validityStatus === false)
    assert.strictEqual(
      (result.resolveSpec as any).code,
      constants.ErrorCodes.JsonParsingError.name
    )
  })
})

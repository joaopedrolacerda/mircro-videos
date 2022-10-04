import ValidationError from "@seedwork/errors/validation-error";
import ValidatorRules from "./validator-rules"


type expectedValidationRule = {
  value: any;
  property: string;
  rule?: keyof ValidatorRules;
}
type ExpectedRule = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: ValidationError;
  params?: any[]
}
function assertIsInvalid({value, property, rule, error, params = []}:ExpectedRule){
  expect(() => {
    const validator = ValidatorRules.values(value, property)
    const method:any = validator[rule];
    method.apply(validator, params)
  }).toThrow(error)
}
function assertIsValid({value, property, rule, error, params = []}:ExpectedRule){
  expect(() => {
    const validator = ValidatorRules.values(value, property)
    const method:any = validator[rule];
    method.apply(validator, params)
  }).not.toThrow(error)
}
describe('Validator Rules Unit Tests', () => {
  test('values method', () => {
    const validator = ValidatorRules.values("some value", "field");
    expect(validator).toBeInstanceOf(ValidatorRules)
    expect(validator['value']).toBe('some value')
    expect(validator['property']).toBe('field')
  })

  test('required validation rule', () => {
    // invalid cases

    let arrange: expectedValidationRule[] = [
      {value:null, property: "field"},
      {value: undefined, property: "field"},
      {value:"", property: "field"}
    ]
    const error = new ValidationError("the field is required")
    arrange.forEach(item => {
      assertIsInvalid({value:item.value, property:item.property, rule: "required", error: error })
    })
    arrange = [
      {value:"test", property: "field"},
      {value: 5, property: "field"},
      {value:0, property: "field"},
      {value:false, property: "field"}
    ]
    arrange.forEach(item => {
      assertIsValid({value:item.value, property:item.property, rule: "required", error: error })
      })
  })

  test("string validation rule", () => {
    // invalid cases
    const error = new ValidationError("the field must be a string")
    let arrange: expectedValidationRule[] = [
      {value:5, property: "field"},
      {value: {}, property: "field"},
      {value:false, property: "field"}
    ]
    arrange.forEach(item => {
      assertIsInvalid({value:item.value, property:item.property, rule: "String", error: error})
    })
    arrange = [
      {value:"test", property: "field"},
    ]
    arrange.forEach(item => {
      assertIsValid({value:item.value, property:item.property, rule: "String", error: error})
      })
  })

  test("maxLength validation rule", () => {
    let arrange: expectedValidationRule[] = [
      {value:"aaaaaa", property: "field"},
    ]
    const error = new ValidationError("the field must be less or equal than 5")

    arrange.forEach(item => {
      assertIsInvalid({value:item.value, property:item.property, rule: "maxLength", error: error, params: [5]})
    })
    arrange = [
      {value:"aaaaaa", property: "field"},
    ]
    arrange.forEach(item => {
      assertIsValid({value:item.value, property:item.property, rule: "maxLength", error: error,  params: [5]})
      })
  })
})

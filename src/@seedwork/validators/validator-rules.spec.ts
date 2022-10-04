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
function assertIsInvalid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected);
  }).toThrow(expected.error);
}

function assertIsValid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected);
  }).not.toThrow(expected.error);
}

function runRule({
  value,
  property,
  rule,
  params = [],
}: Omit<ExpectedRule, "error">) {
  const validator = ValidatorRules.values(value, property);
  const method = validator[rule] as (...args: any[]) => ValidatorRules;
  method.apply(validator, params);
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
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: "", property: "field" }
    ]
    const error = new ValidationError("the field is required")
    arrange.forEach(item => {
      assertIsInvalid({ value: item.value, property: item.property, rule: "required", error: error })
    })
    arrange = [
      { value: "test", property: "field" },
      { value: 5, property: "field" },
      { value: 0, property: "field" },
      { value: false, property: "field" }
    ]
    arrange.forEach(item => {
      assertIsValid({ value: item.value, property: item.property, rule: "required", error: error })
    })
  })

  test("string validation rule", () => {
    // invalid cases
    const error = new ValidationError("the field must be a string")
    let arrange: expectedValidationRule[] = [
      { value: 5, property: "field" },
      { value: {}, property: "field" },
      { value: false, property: "field" }
    ]
    arrange.forEach(item => {
      assertIsInvalid({ value: item.value, property: item.property, rule: "String", error: error })
    })
    // valid cases
    arrange = [
      { value: "test", property: "field" },
      { value: null, property: "field" },
      { value: undefined, property: "field" },
    ]
    arrange.forEach(item => {
      assertIsValid({ value: item.value, property: item.property, rule: "String", error: error })
    })
  })

  test("maxLength validation rule", () => {
    let arrange: expectedValidationRule[] = [
      { value: "aaaaaa", property: "field" },
    ]
    const error = new ValidationError("the field must be less or equal than 5")

    arrange.forEach(item => {
      assertIsInvalid({ value: item.value, property: item.property, rule: "maxLength", error: error, params: [5] })
    })
    arrange = [
      { value: 5, property: "field" },
      { value: "true", property: "field" },
      { value: "false", property: "field" },
    ]
    arrange.forEach(item => {
      assertIsValid({ value: item.value, property: item.property, rule: "maxLength", error: error, params: [5] })
    })
  })

  test("boolean validation rule", () => {
    //invalid cases
    let arrange: expectedValidationRule[] = [
      { value: 5, property: "field" },
      { value: "true", property: "field" },
      { value: "false", property: "field" },
    ];
    const error = new ValidationError("The field must be a boolean");
    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "Boolean",
        error,
      });
    });

    //valid cases
    arrange = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: false, property: "field" },
      { value: true, property: "field" },
    ];

    arrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "Boolean",
        error,
        params: [5],
      });
    });
  });


  it("should throw a validation error when combine two or more validation rules", () => {
    let validator = ValidatorRules.values(null, "field");
    expect(() => {
      validator.required().String().maxLength(5);
    }).toThrow(new ValidationError("The field is required"));

    validator = ValidatorRules.values(5, "field");
    expect(() => {
      validator.required().String().maxLength(5);
    }).toThrow(new ValidationError("The field must be a string"));

    validator = ValidatorRules.values("aaaaaa", "field");
    expect(() => {
      validator.required().String().maxLength(5);
    }).toThrow(
      new ValidationError("The field must be less or equal than 5 characters")
    );

    validator = ValidatorRules.values(null, "field");
    expect(() => {
      validator.required().Boolean();
    }).toThrow(new ValidationError("The field is required"));

    validator = ValidatorRules.values(5, "field");
    expect(() => {
      validator.required().Boolean();
    }).toThrow(new ValidationError("The field must be a boolean"));
  });

  it("should valid when combine two or more validation rules", () => {
    expect.assertions(0);
    ValidatorRules.values("test", "field").required().String();
    ValidatorRules.values("aaaaa", "field").required().String().maxLength(5);

    ValidatorRules.values(true, "field").required().Boolean();
    ValidatorRules.values(false, "field").required().Boolean();
  });
})

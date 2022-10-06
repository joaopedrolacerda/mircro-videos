import { some } from "lodash"
import CategoryValidatorFactory , { CategoryRules, CategoryValidator } from "./category.validator"

describe("CategoryValidator tests", () => {
  let validator: CategoryValidator
  beforeEach(() => {validator = CategoryValidatorFactory.create()})
  test('invalidation cases for name field', () => {
    let isValid = validator.validate(null)


    expect(isValid).toBeFalsy();
    expect(validator.errors['name']).toStrictEqual([
      "name should not be empty",
      "name must be a string",
      "name must be shorter than or equal to 255 characters"
    ])

     isValid = validator.validate({name: ""})
     
     expect(isValid).toBeFalsy();
     expect(validator.errors['name']).toStrictEqual([
       "name should not be empty",
     ])
     isValid = validator.validate({name: 5 as any})
     
     expect(isValid).toBeFalsy();
     expect(validator.errors['name']).toStrictEqual([
       "name should not be empty",
       "name must be shorter than or equal to 255 characters",
     ])

     isValid = validator.validate({name: 't'.repeat(256) as any})
     
     expect(isValid).toBeFalsy();
     expect(validator.errors['name']).toStrictEqual([
       "name must be shorter than or equal to 255 characters",
     ])
    
     describe("valid cases for fields", () => {
      type Arrange = {
        name: string;
        description?: string;
        is_active?: boolean;
      };
      const arrange: Arrange[] = [
        { name: "some value" },
        {
          name: "some value",
          description: undefined,
        },
        { name: "some value", description: null },
        { name: "some value", is_active: true },
        { name: "some value", is_active: false },
      ];
  
      test.each(arrange)("validate %o", (item) => {
        const isValid = validator.validate(item);
        expect(isValid).toBeTruthy();
        expect(validator.validatedData).toStrictEqual(new CategoryRules(item));
      });
    });
  })
  
})
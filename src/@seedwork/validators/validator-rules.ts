import ValidationError from "@seedwork/errors/validation-error";

export default class ValidatorRules {
  private constructor(private value: any, private property: string){}
  
  static values(value: any, property:string){
    return new ValidatorRules(value, property)
  }

  required(): this{
    if(this.value === null || this.value === undefined || this.value === ""){
      throw new ValidationError(`the ${this.property} is required`)
    }
    return this;
  }

  String(): this {
    if(typeof this.value !== "string"){
      throw new ValidationError(`the ${this.property} must be a string`)

    }
    return this;

  }
  maxLength(max: number): this{
    if(this.value.length > max){
      throw new ValidationError(`the ${this.property} must be less or equal than ${max} characters`)
    }
    return this;
  }
}


ValidatorRules.values("xpto", 'name').required().string().maxLength(255)
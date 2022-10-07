import {ValidationError} from "../errors/validation-error";

export default class ValidatorRules {
  private constructor(private value: any, private property: string){}
  
  static values(value: any, property:string){
    return new ValidatorRules(value, property)
  }

  required(): this{
    if( this.value === null || this.value === undefined || this.value === ""){
      throw new ValidationError(`the ${this.property} is required`)
    }
    return this;
  }

  String(): this {
    if(!isEmpty(this.value) && typeof this.value !== "string"){
      throw new ValidationError(`the ${this.property} must be a string`)

    }
    return this;

  }
  maxLength(max: number): this{
    if(!isEmpty(this.value) && this.value.length > max){
      throw new ValidationError(`the ${this.property} must be less or equal than ${max} characters`)
    }
    return this;
  }

  Boolean(): typeof this {
    if(!isEmpty(this.value) && typeof this.value !== "boolean"){
      throw new ValidationError(`The ${this.property} must be a boolean`)
    }
    return this
  }
}

export function isEmpty(value: any){
  return value === undefined || value === null
}


import { isNotEmpty, MaxLength ,IsString, IsOptional, IsBoolean, IsDate, IsNotEmpty} from "class-validator";
import { isString } from "lodash";
import { ClassValidatorFields } from "../../../@seedwork/validators/class-validator-fields";
import ValidatorFieldsInterface from "../../../@seedwork/validators/validator-fields-interface";
import { CategoryProperties } from "../entities/category";
export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name:string;

  @IsString()
  @IsOptional()
  description:string;

  @IsBoolean()
  @IsOptional()
  is_active:string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({name,description,is_active,created_at}: CategoryProperties){
    Object.assign(this, {name,description,is_active,created_at})
  }
}
export class CategoryValidator extends ClassValidatorFields<CategoryRules>{
    validat(data: CategoryProperties) {
      super.validate(new CategoryRules(data))
    }
}

export default class CategoryValidatorFactory{
  static create() {
    return new CategoryValidator();
  }
}
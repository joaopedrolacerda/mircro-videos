import InvalidUuidError from "@seedwork/errors/invalid-uuid.error"
import UniqueEntityId from "./unique-entity-id.vo"
import {validate as uuidValidate} from 'uuid';


const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate')
describe('UniqueEntityId unit tests', () => {
  it('should throw error when uuid is invalid', () => {
    expect (() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError())
    expect(validateSpy).toHaveBeenCalled()
  });

  it("should accept a uuid passed in constructor", () => {

  const uuid = "2a9fa50f-9e16-435a-87ca-cc8885a768d1"
  const vo =  new UniqueEntityId(uuid)
  expect(vo.id).toBe(uuid)
  expect(validateSpy).toHaveBeenCalled()
  })

  it("should accept a uuid passed in constructor", () => {
  
    const uuid = "2a9fa50f-9e16-435a-87ca-cc8885a768d1"
    const vo =  new UniqueEntityId(uuid)
    expect(uuidValidate(vo.id)).toBeTruthy()
    expect(validateSpy).toHaveBeenCalled()
    })
})

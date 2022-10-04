import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import Entity from "./entity";
import {validate as uuidValidate } from 'uuid'
class StubEntity extends Entity<{prop1: string, prop2: number}>{

}

describe('Entity unit tests', () => {
  it('should set props and id', () => {
    const arrange = {prop1: "prop1 value", prop2: 10}
    const entity = new StubEntity(arrange)

    expect(entity.props).toStrictEqual(arrange)
    expect(entity.UniqueEntityId).toBeInstanceOf(UniqueEntityId)
    expect(uuidValidate(entity.id)).toBeTruthy()
  })
  it("should accept a valid uui", () => {
    const arrange = {prop1: "prop1 value", prop2: 10}
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(arrange, uniqueEntityId)
    expect(entity.UniqueEntityId).toBeInstanceOf(UniqueEntityId)
    expect(entity.id).toBe(uniqueEntityId.value)
  })
  it("should convert a entity to a javascript object", () => {
    const arrange = {prop1: "prop1 value", prop2: 10}
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(arrange, uniqueEntityId)

    expect(entity.toJSON).toStrictEqual(
      {
        id: entity.id,
        ...arrange
      }
    )
  })
})

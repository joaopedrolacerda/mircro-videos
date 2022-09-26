import { Category, CategoryProperties } from "./category";
import { omit } from "lodash";
import UniqueEntityId from "@seedwork/domain/unique-entity-id.vo";
describe("Category Unit test", (): void => {
  test("constructor of category", () => {
    let category = new Category({ name: 'movie' });

    let props = omit(category.props, "created_at")

    expect(props).toStrictEqual({
      name: 'movie',
      description: null,
      is_active: true,
    })
    expect(category.props.created_at).toBeInstanceOf(Date)
    let created_at = new Date();

    category = new Category({
      name: "movie",
      description: "some description",
      is_active: false
    })

    expect(category.props).toStrictEqual({
      name: 'movie',
      description: 'some description',
      is_active: false,
      created_at
    })
    category = new Category({
      name: "movie",
      description: "other description",
    })
    expect(category.props).toMatchObject({
      name: 'movie',
      description: 'other description',
    })
    category = new Category({
      name: "movie",
      is_active: true,
    })
    expect(category.props).toMatchObject({
      name: 'movie',
      is_active: true,
    })
    created_at = new Date();
    category = new Category({
      name: "movie",
      created_at,
    })
    expect(category.props).toMatchObject({
      name: 'movie',
      created_at,
    })
  })

  test("id filed", () => {
    type CategoryData = {props: CategoryProperties; id?: UniqueEntityId}
    const data: CategoryData[] = [
      {props:{name: "movie"}},
      {props:{name: "movie"}, id: null},
      {props:{name: "movie"}, id: undefined},
      {props:{name: "movie"}, id: new UniqueEntityId()}
    ]
    data.forEach((i: CategoryData) => {
      const category = new Category(i.props, i.id as any);

      expect(category.id).not.toBeNull()
      expect(category.id).toBeInstanceOf(new UniqueEntityId());
  
    })
    // let category = new Category({name: "Movie"});

    // expect(category.id).not.toBeNull()
    // expect(uuidValidate(category.id)).toBeTruthy();

    //  category = new Category({name: "Movie"}, null);
    
    // expect(category.id).not.toBeNull()
    // expect(uuidValidate(category.id)).toBeTruthy();

    // category = new Category({name: "Movie"}, undefined);
    
    // expect(category.id).not.toBeNull()
    // expect(uuidValidate(category.id)).toBeTruthy();

    // category = new Category({name: "Movie"}, "37d9aafb-8318-4746-9e90-383190be5759");
    
    // expect(category.id).not.toBeNull()
    // expect(uuidValidate(category.id)).toBeTruthy();
  })
  test('getter of name field', () => {
    const category = new Category({name: "Movie"});
    expect(category.name).toBe("Movie")
  })
  test('getter and setter of description field', () => {
    let category = new Category({name: "Movie"});
    expect(category.description).toBeNull()

    category = new Category({name: "Movie", description:"some description"});   
    expect(category.description).toBe("some description")

    category = new Category({name: "Movie"});

    category['description'] = "other description"
    expect(category.description).toBe("other description")

    category['description'] = undefined;
    expect(category.description).toBeNull()

  })
  test('getter and setter of is_active field', () => {
    let category = new Category({name: "Movie"})

    expect(category.is_active).toBeTruthy()

    category = new Category({name: "Movie", is_Active: true});
    expect(category.is_active).toBeTruthy()

    category = new Category({name: "Movie", is_Active: false});
    expect(category.is_active).toBeFalsy()


    test('getter of created_at prop', () => {

      let category = new Category({name: 'Movie'})
      
      expect(category.created_at).toBeInstanceOf(Date)

      let created_at = new Date();

      category = new Category({
        name: "Movie",
        created_at
      })
      
      expect(category.created_at).toBe(created_at)
    });
  })
});
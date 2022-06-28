import { Category } from "./category";
import { omit } from "lodash";
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

    category = new Category({
      name: "movie",
      description: "some description",
      is_active: false
    })
    let created_at = new Date();

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
});
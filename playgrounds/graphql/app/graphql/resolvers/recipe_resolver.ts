import Recipe from '#models/recipe'
import { inject } from '@adonisjs/core'
import { ArrayMaxSize, Length, Max, MaxLength, Min } from 'class-validator'
import {
  Arg,
  Args,
  ArgsType,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from '@foadonis/graphql'

@ArgsType()
class RecipeArgs {
  @Field(() => Int)
  @Min(1)
  page: number = 1

  @Field(() => Int)
  @Min(1)
  @Max(1000)
  perPage: number = 25
}

@InputType()
class CreateRecipeInput {
  @Field()
  @MaxLength(30)
  declare title: string

  @Field({ nullable: true })
  @Length(6, 255)
  declare description?: string

  @Field(() => [String])
  @ArrayMaxSize(30)
  declare ingredients: string[]
}

@Resolver(Recipe)
@inject()
export default class RecipeResolver {
  @Query(() => Recipe)
  recipe(@Arg('id') id: number) {
    return Recipe.findOrFail(id)
  }

  @Query(() => [Recipe])
  recipes(@Args() { page, perPage }: RecipeArgs) {
    return Recipe.query().paginate(page, perPage)
  }

  @Mutation(() => Recipe)
  addRecipe(@Arg('recipeData') recipeData: CreateRecipeInput) {
    return Recipe.create(recipeData)
  }

  @Mutation(() => Boolean)
  async removeRecipe(@Arg('id') id: number) {
    const recipe = await Recipe.find(id)

    if (!recipe) {
      return false
    }

    await recipe.delete()
    return true
  }
}

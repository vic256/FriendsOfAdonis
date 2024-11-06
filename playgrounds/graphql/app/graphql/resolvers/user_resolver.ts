import User from '#models/user'
import { Arg, Field, InputType, Mutation, Resolver } from '@foadonis/graphql'
import { IsEmail, MaxLength, MinLength } from 'class-validator'

@InputType()
class CreateUserInput {
  @Field()
  @MinLength(4)
  @MaxLength(16)
  declare fullName: string

  @Field()
  @IsEmail()
  declare email: string

  @Field()
  @MinLength(6)
  @MaxLength(255)
  declare password: string
}

@Resolver(User)
export default class UserResolver {
  @Mutation(() => User)
  createUser(@Arg('userData') data: CreateUserInput) {
    return User.create(data)
  }
}

import { Token } from '#graphql/schemas/token'
import User from '#models/user'
import { errors } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { Args, ArgsType, Field, Mutation, Resolver } from '@foadonis/graphql'
import { IsEmail } from 'class-validator'

@ArgsType()
class LoginArgs {
  @Field()
  @IsEmail()
  declare email: string

  @Field()
  declare password: string
}

@Resolver()
export default class AuthResolver {
  @Mutation(() => Token)
  async login(@Args() args: LoginArgs) {
    const user = await User.findBy('email', args.email)
    if (!user) {
      throw new errors.E_INVALID_CREDENTIALS()
    }

    const isPasswordValid = await hash.verify(user.password, args.password)
    if (!isPasswordValid) {
      throw new errors.E_INVALID_CREDENTIALS()
    }

    const token = await User.accessTokens.create(user)

    return new Token(user, token.value!.release())
  }
}

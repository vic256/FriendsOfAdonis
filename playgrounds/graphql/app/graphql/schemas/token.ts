import User from '#models/user'
import { Field, ObjectType } from '@foadonis/graphql'

@ObjectType()
export class Token {
  @Field(() => User)
  user: User

  @Field()
  accessToken: string

  constructor(user: User, accessToken: string) {
    this.user = user
    this.accessToken = accessToken
  }
}

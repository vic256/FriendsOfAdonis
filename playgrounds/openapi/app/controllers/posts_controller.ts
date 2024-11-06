import { createPostValidator } from '#validators/user'
import { ApiResponse } from '@foadonis/openapi/decorators'

export default class PostsController {
  async index() {}

  @ApiResponse({ type: () => createPostValidator })
  async store() {}
  async show() {}
  async destroy() {}
}

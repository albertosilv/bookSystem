import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateAdminUseCase } from './createAdminUseCase'

class CreateAdminController {
  async handle (request: Request, response: Response): Promise<Response> {
    const data = request.body

    const createAdminUseCase = container.resolve(CreateAdminUseCase)

    const user = await createAdminUseCase.execute(data)

    return response.status(200).json(user)
  }
}

export { CreateAdminController }

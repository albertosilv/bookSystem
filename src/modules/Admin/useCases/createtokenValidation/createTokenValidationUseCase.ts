/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import jwt from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { authConfig } from '@config/auth'
import { IAdminsRepository } from '@modules/Admin/repositories/IAdminRepositories'

@injectable()
class CreateTokenValidationUseCase {
  constructor (
    @inject('AdminRepository')
    private readonly adminsRepository: IAdminsRepository
  ) {}

  async execute (id: number, expiresIn = '3h'): Promise<string> {
    console.log('fiding the user by id ', { id })
    const user = await this.adminsRepository.findById(id)

    if (!user) {
      console.log('user id does not exist ', { id })

      throw new Error('User does not exist')
    }

    console.log('creating validation token', {
      userId: id,
      expiresIn
    })

    const tokenValidation = jwt.sign({ id: user.id }, authConfig.secret_token, {
      expiresIn
    })

    console.log('token to validate email created successfully', {
      userId: id,
      token: tokenValidation
    })

    await this.adminsRepository.createTokenValidation(
      tokenValidation,
      user.id
    )

    return tokenValidation
  }
}

export { CreateTokenValidationUseCase }

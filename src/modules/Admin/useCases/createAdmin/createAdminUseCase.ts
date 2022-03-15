import { inject, injectable, container } from 'tsyringe'
import { hash } from 'bcrypt'
import { ICreateAdminDTO } from '@modules/Admin/dtos/ICreateAdminDTO'
import { IAdminsRepository } from '@modules/Admin/repositories/IAdminRepositories'
import { CreateTokenValidationUseCase } from '../createtokenValidation/createTokenValidationUseCase'
import { transporter } from '@config/mail'
@injectable()
class CreateAdminUseCase {
  constructor (

    @inject('AdminRepository')
    private readonly adminsRepository: IAdminsRepository

  ) {}

  async execute (data: ICreateAdminDTO): Promise<Object> {
    const { password, ...bodyData } = data

    const userExists = await this.adminsRepository.findByEmail(bodyData.email)

    if (userExists != null) {
      throw new Error('The user already exists')
    }

    console.log('creating user...')

    const passwordHash = await hash(password, 8)
    const user = await this.adminsRepository.create({
      ...(bodyData),
      password: passwordHash
    })

    console.log('user created successfully', { userId: user.id })
    console.log('creating token to validate email')

    const createTokenValidationUseCase = container.resolve(
      CreateTokenValidationUseCase
    )

    const tokenValidation = await createTokenValidationUseCase.execute(user.id)

    console.log('token to validate user', {
      userId: user.id,
      token: tokenValidation
    })

    await transporter.sendMail({
      from: 'noreply@BookSystem.com.br',
      to: user.email,
      subject: 'Cadastrado com sucesso!',
      html: `
        <p>Olá ${user.name}</p>
        <p> token ${tokenValidation}
        `
    })

    console.log('Email successfully sent')

    const { password: passwordHashDb, ...userData } = user

    return userData
  }
}

export { CreateAdminUseCase }

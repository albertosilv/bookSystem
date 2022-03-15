import { ICreateAdminDTO } from '@modules/Admin/dtos/ICreateAdminDTO'
import { IDeleteAdminDTO } from '@modules/Admin/dtos/IDeleteAdminDTO'
import { IUpdateAdminDTO } from '@modules/Admin/dtos/IUpdateAdminDTO'
import { IAddAdminToInstitutionDTO } from '@modules/Admin/dtos/IAddAdminToInstitutionDTO'

import { Prisma, Administrator } from '@prisma/client'
import { prisma } from '@infra/prisma/index'
import { IAdminsRepository } from '@modules/Admin/repositories/IAdminRepositories'
class AdminRepository implements IAdminsRepository {
  private readonly connection: typeof prisma.administrator

  constructor () {
    this.connection = prisma.administrator
  }

  async findByEmail (
    email: string,
    include?: Partial<Prisma.AdministratorInclude>
  ): Promise<Administrator | null> {
    const user = await this.connection.findUnique({
      where: {
        email
      },
      include
    })

    return user as Administrator
  }

  async findById (
    id: number,
    include?: Partial<Prisma.AdministratorInclude>
  ): Promise<Administrator | null> {
    const user = await this.connection.findUnique({
      where: {
        id
      },
      include
    })

    return user
  }

  async create (dataUser: ICreateAdminDTO): Promise<Administrator> {
    return await this.connection.create({
      data: {
        ...dataUser
      }
    })
  }

  async addToInstitutionId (id: number, data: IAddAdminToInstitutionDTO): Promise<void> {
    await this.connection.update({
      where: {
        id
      },
      data: {
        confirmEmail: true
      }
    })
  }

  async setEmailValidByUserId (adminId: number): Promise<void> {
    await this.connection.update({
      where: {
        id: adminId
      },
      data: {
        confirmEmail: true
      }
    })
  }

  async createTokenValidation (token: string, userId: number): Promise<void> {
    const data = new Date()
    data.setHours(data.getDay() + 3)
    await this.connection.update({
      where: { id: userId },
      data: {
        tokenEmail: token,
        tokenEmailExpired: data
      }

    })
  }

  async update (id: number, data: IUpdateAdminDTO): Promise<Administrator> {
    const updateUser = await this.connection.update({
      where: { id },
      data
    })

    return updateUser
  }

  async delete (dataUser: IDeleteAdminDTO): Promise<void> {
    await this.connection.delete({
      where: { id: dataUser.adminId }
    })
  }
}

export { AdminRepository }

import { Administrator } from '@prisma/client'

import { ICreateUserDTO } from '../dtos/ICreateAdminDTO'
import { IDeleteAdminDTO } from '../dtos/IDeleteAdminDTO'
import { IUpdateAdminDTO } from '../dtos/IUpdateAdminDTO'

interface IAdminssRepository {
  create: (data: ICreateUserDTO) => Promise<Administrator>
  update: (id: string, data: IUpdateAdminDTO) => Promise<Administrator>
  delete: (dataUser: IDeleteAdminDTO) => Promise<void>
}

export { IAdminssRepository }

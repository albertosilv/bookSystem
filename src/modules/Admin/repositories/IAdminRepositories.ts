import { Administrator } from '@prisma/client'

import { ICreateAdminDTO } from '../dtos/ICreateAdminDTO'
import { IDeleteAdminDTO } from '../dtos/IDeleteAdminDTO'
import { IUpdateAdminDTO } from '../dtos/IUpdateAdminDTO'
import { IAddAdminToInstitutionDTO } from '../dtos/IAddAdminToInstitutionDTO'
interface IAdminsRepository {
  create: (data: ICreateAdminDTO) => Promise<Administrator>
  update: (id: number, data: IUpdateAdminDTO) => Promise<Administrator>
  delete: (dataUser: IDeleteAdminDTO) => Promise<void>
  addToInstitutionId: (id: number, data: IAddAdminToInstitutionDTO) => Promise<void>

}

export { IAdminsRepository }

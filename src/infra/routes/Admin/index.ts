/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { CreateAdminController } from '@modules/Admin/useCases/createAdmin/createAdminController'
const usersRouters = Router()

const createAdminController = new CreateAdminController()

usersRouters.post(
  '/',
  createAdminController.handle
)

export { usersRouters }

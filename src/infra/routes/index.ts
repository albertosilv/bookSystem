
import { Router } from 'express'
import { adminsRouters } from './Admin'
const router = Router()
router.use('/admin', adminsRouters)
export { router }

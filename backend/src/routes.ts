import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'

import OrphanagesController from './controllers/OrphanagesController'

const router = Router()
const upload = multer(uploadConfig)

router.post('/orphanages', upload.array('images'), OrphanagesController.create)
router.get('/orphanages', OrphanagesController.index)
router.get('/orphanages/:id', OrphanagesController.show)

export default router
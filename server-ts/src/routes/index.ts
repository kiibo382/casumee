import Express from 'express'
import usersRoutes from './users'
import authRoutes from './auth'
import groupsRoutes from './groups'
import chatRoutes from './chat'

const router: Express.Router = Express.Router()

router.use('/users', usersRoutes)
router.use('/auth', authRoutes)
router.use('/groups', groupsRoutes)
router.use('/chat', chatRoutes)

export default router
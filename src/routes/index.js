import { Router } from 'express';

import * as homeController from '@/controllers/home';

import * as todoController from '@/controllers/todo';

const router = Router();

router.get('/', homeController.index);

router.get('/health', homeController.healthCheck);

router.get('/tasks/:id?', todoController.getTasks);
router.delete('/tasks/:id', todoController.deleteTask);
router.post('/tasks', todoController.postTask);
router.put('/tasks/:id', todoController.putTask);

export default router;

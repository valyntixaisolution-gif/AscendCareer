import { Router } from 'express';

const router = Router();

router.route('/').get();

router.route('/').post();

router.route('/:courseId').get();

router.route('/:courseId').put();

router.route('/:courseId').delete();

router.route('/:courseId/enroll').post();

router.route('/:courseId/students').get();

export default router;

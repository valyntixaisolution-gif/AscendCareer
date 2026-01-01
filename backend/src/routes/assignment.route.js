import { Router } from 'express';

const router = Router();

router.route('/courses/:courseId/assignments').post();

router.route('/courses/:courseId/assignments').get();

router.route('/assignments/:assignmentId').get();

router.route('/assignments/:assignmentId').put();

router.route('/assignments/:assignmentId').delete();

export default router;

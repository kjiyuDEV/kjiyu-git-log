import express from 'express';
import Visitor from '../../models/visitor';

const router = express.Router();

router.get('/visit', async (req, res, next) => {
    try {
        const visit = await Visitor.findOne();
        console.log(visit, '<post');
        visit.views += 1;
        visit.save();
        console.log(visit);
        res.json(visit);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

export default router;

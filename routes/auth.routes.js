const { Router } = require ('express');
const { login, signUp, createStaff} = require('../controllers/auth.controllers');
// const {check} = require ('express-validator');
// const { checkFields } = require('../middlewares/check-fields');
// const { requireToken} = require ( '../middlewares/requireToken' )
const router = Router();

router.post('/login',[
], login);

router.post('/signUp',[
], signUp);

router.post('/staff',[
], createStaff);



module.exports= router;
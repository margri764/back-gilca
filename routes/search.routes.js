const { Router } = require ('express');
const { requireToken } = require('../middlewares/requireToken');
const { getUserSearch } = require('../controllers/search.controllers');

const router = Router();

router.get('/',[
    requireToken
], getUserSearch);



module.exports= router;
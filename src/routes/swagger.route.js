const router = require('express').Router();

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('../services/swagger.json');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument))

module.exports = router;
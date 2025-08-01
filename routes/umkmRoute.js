const express = require('express');
const router = express.Router();
const { createUmkm, getAllUmkm, getUmkmById, approveUmkm, deleteUmkm } = require('../controller/umkm');

router.route('/')
    .post(createUmkm)
    .patch(approveUmkm)
    .get(getAllUmkm)
    .delete(deleteUmkm)

router.get('/id', getUmkmById);

module.exports = router;
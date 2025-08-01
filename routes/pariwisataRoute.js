const express = require('express');
const router = express.Router();
const { createPariwisata, getAllPariwisata, getPariwisataById, approvePariwisata, deletePariwisata } = require('../controller/pariwisata');

router.route('/')
    .post(createPariwisata)
    .patch(approvePariwisata)
    .get(getAllPariwisata)
    .delete(deletePariwisata)

router.get('/id', getPariwisataById);

module.exports = router;
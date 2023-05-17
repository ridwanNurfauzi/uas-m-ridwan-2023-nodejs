const router = require('express').Router();
const routeUsers = require('./users');
const routeKategori = require('./kategori');
const routeSupplier = require('./supplier');
const routeTransaksi = require('./transaksi');

router.use('/users', routeUsers);
router.use('/kategori', routeKategori);
router.use('/supplier', routeSupplier);
router.use('/transaksi', routeTransaksi);

module.exports = router;
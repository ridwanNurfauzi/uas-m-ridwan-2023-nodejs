const router = require('express').Router();
const { transaksi } = require('../controllers');

router.get('/', transaksi.getTransaksi);

router.get('/:no_transaksi', transaksi.getTransaksiByNo_transaksi);

router.post('/add', transaksi.addTransaksi);

router.put('/edit/:no_transaksi', transaksi.editTransaksi);

router.delete('/delete/:no_transaksi', transaksi.deleteTransaksi);

module.exports = router;
const router = require('express').Router();
const { supplier } = require('../controllers');

router.get('/', supplier.getSupplier);

router.get('/:kode_supplier', supplier.getSupplierByKode_supplier);

router.post('/add', supplier.addSupplier);

router.put('/edit/:kode_supplier', supplier.editSupplier);

router.delete('/delete/:kode_supplier', supplier.deleteSupplier);

module.exports = router;
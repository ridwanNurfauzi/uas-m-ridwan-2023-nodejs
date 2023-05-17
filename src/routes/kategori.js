const router = require('express').Router();
const { kategori } = require('../controllers');

router.get('/', kategori.getKategori);

router.get('/:kode_kategori', kategori.getKategoriByKode_kategori);

router.post('/add', kategori.addKategori);

router.put('/edit/:kode_kategori', kategori.editKategori);

router.delete('/delete/:kode_kategori', kategori.deleteKategori);

module.exports = router;
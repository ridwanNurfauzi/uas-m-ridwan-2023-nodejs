const config = require('../configs/database');
const mysql = require('mysql');
const session = require('express-session');
const express = require('express');
const connection = mysql.createConnection(config);
connection.connect();

const app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


const getTransaksi = async (req, res) => {
    try {
        const data = await new Promise((resolve, reject) => {
            connection.query('SELECT no_transaksi, nama_barang, transaksi.kode_kategori, kategori.nama_kategori, transaksi.kode_supplier, supplier.nama_supplier, harga, jumlah, diskon,pengiriman,biaya_pengiriman,total_pembayaran FROM transaksi JOIN kategori ON kategori.kode_kategori = transaksi.kode_kategori JOIN supplier ON supplier.kode_supplier = transaksi.kode_supplier',
            (error, rows) => {
                if (rows) {
                    resolve(rows);
                } else {
                    reject([]);
                }
            });
        });

        if (data && req.session.loggedin) {
            res.send({
                success: true,
                message: "Berhasil mengambil data transaksi.",
                data: data
            });
        }
        else{
            res.send({
                success: false,
                message: "Silahkan login terlebih dahulu"
            });
        }
    } catch (error) {
        res.send({
            success: false,
            message: "Gagal mengambil data transaksi.",
            error: error.stack
        });
    }
}

const getTransaksiByNo_transaksi = async (req, res) => {
    try {
        let no_transaksi = req.params.no_transaksi;
        const data = await new Promise((resolve, reject) => {
            connection.query('SELECT no_transaksi, nama_barang, transaksi.kode_kategori, kategori.nama_kategori, transaksi.kode_supplier, supplier.nama_supplier, supplier.alamat AS alamat_suplier, harga, jumlah, diskon,pengiriman,biaya_pengiriman,total_pembayaran FROM transaksi JOIN kategori ON kategori.kode_kategori = transaksi.kode_kategori JOIN supplier ON supplier.kode_supplier = transaksi.kode_supplier WHERE transaksi.no_transaksi = ?',
            [no_transaksi], (error, rows) => {
                if (rows) {
                    resolve(rows);
                } else {
                    reject([]);
                }
            });
        });

        if (data && req.session.loggedin) {
            res.send({
                success: true,
                message: `Berhasil mengambil data transaksi dengan nomor transaksi ${no_transaksi}.`,
                data: data
            });
        }
        else{
            res.send({
                success: false,
                message: "Silahkan login terlebih dahulu"
            });
        }
    } catch (error) {
        res.send({
            success: false,
            message: "Gagal mengambil data transaksi.",
            error: error.stack
        });
    }
}

const addTransaksi = async (req, res) => {
    try {
        let harga = req.body.harga;
        let jumlah = req.body.jumlah;
        let pengiriman = req.body.pengiriman

        let diskon = 0;
        if ((parseInt(harga) * parseInt(jumlah)) > 50_000){
            diskon = 10_000;
        }

        let biaya_pengiriman = 0;
        if(pengiriman.toUpperCase() == ("jne").toUpperCase()){
            biaya_pengiriman = 15_000;
        }
        else if(pengiriman.toUpperCase() == ("jnt").toUpperCase()){
            biaya_pengiriman = 20_000;
        }
        else if(pengiriman.toUpperCase() == ("express").toUpperCase()){
            biaya_pengiriman = 30_000;
        }

        let total_pembayaran = (parseInt(harga) * parseInt(jumlah)) + biaya_pengiriman - diskon;

        let data = {
            no_transaksi: req.body.no_transaksi,
            nama_barang: req.body.nama_barang,
            kode_kategori: req.body.kode_kategori,
            kode_supplier: req.body.kode_supplier,
            harga,
            jumlah,
            diskon,
            pengiriman,
            biaya_pengiriman,
            total_pembayaran
        }

        const result = await new Promise((resolve, reject) => {
            connection.query('INSERT INTO transaksi SET ?', [data], (error, rows) => {
                if (rows) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });

        if (result && req.session.loggedin) {
            res.send({
                success: true,
                message: `Berhasil menambah data transaksi.`,
                data: data
            });
        }
        else{
            res.send({
                success: false,
                message: "Silahkan login terlebih dahulu"
            });
        }
    } catch (error) {
        res.send({
            success: false,
            message: "Gagal menambah data transaksi.",
            error: error.stack
        });
    }
}

const editTransaksi = async (req, res) => {
    try {
        let harga = req.body.harga;
        let jumlah = req.body.jumlah;
        let pengiriman = req.body.pengiriman

        let diskon = 0;
        if ((parseInt(harga) * parseInt(jumlah)) > 50_000){
            diskon = 10_000;
        }

        let biaya_pengiriman = 0;
        if(pengiriman.toUpperCase() == ("jne").toUpperCase()){
            biaya_pengiriman = 15_000;
        }
        else if(pengiriman.toUpperCase() == ("jnt").toUpperCase()){
            biaya_pengiriman = 20_000;
        }
        else if(pengiriman.toUpperCase() == ("express").toUpperCase()){
            biaya_pengiriman = 30_000;
        }

        let total_pembayaran = (parseInt(harga) * parseInt(jumlah)) + biaya_pengiriman - diskon;

        let data = {
            nama_barang: req.body.nama_barang,
            kode_kategori: req.body.kode_kategori,
            kode_supplier: req.body.kode_supplier,
            harga,
            jumlah,
            diskon,
            pengiriman,
            biaya_pengiriman,
            total_pembayaran
        }

        const result = await new Promise((resolve, reject) => {
            connection.query('UPDATE transaksi SET ? WHERE no_transaksi = ?', [data, req.params.no_transaksi], (error, rows) => {
                if (rows) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });

        if (result && req.session.loggedin) {
            res.send({
                success: true,
                message: `Berhasil mengubah data transaksi.`,
                data: data
            });
        }
        else{
            res.send({
                success: false,
                message: "Silahkan login terlebih dahulu"
            });
        }
    } catch (error) {
        res.send({
            success: false,
            message: "Gagal mengubah data transaksi.",
            error: error.stack
        });
    }
}

const deleteTransaksi = async (req, res) => {
    try {
        let no_transaksi = req.params.no_transaksi;

        const result = await new Promise((resolve, reject) => {
            connection.query('DELETE FROM transaksi WHERE no_transaksi = ?', [no_transaksi], (error, rows) => {
                if (rows) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });

        if (result && req.session.loggedin) {
            res.send({
                success: true,
                message: `Berhasil menghapus data transaksi dengan nomor transaksi ${no_transaksi}.`
            });
        }
        else{
            res.send({
                success: false,
                message: "Silahkan login terlebih dahulu"
            });
        }
    } catch (error) {
        res.send({
            success: false,
            message: "Gagal menghapus data transaksi.",
            error: error.stack
        });
    }
}


module.exports = {
    getTransaksi,
    getTransaksiByNo_transaksi,
    addTransaksi,
    editTransaksi,
    deleteTransaksi
};
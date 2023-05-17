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


const getSupplier = async (req, res) => {
    try {
        const data = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM supplier', (error, rows) => {
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
                message: "Berhasil mengambil data supplier.",
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
            message: "Gagal mengambil data supplier.",
            error: error.stack
        });
    }
}

const getSupplierByKode_supplier = async (req, res) => {
    try {
        let kode_supplier = req.params.kode_supplier;
        const data = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM supplier WHERE kode_supplier = ?', [kode_supplier], (error, rows) => {
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
                message: `Berhasil mengambil data supplier dengan kode supplier ${kode_supplier}.`,
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
            message: "Gagal mengambil data supplier.",
            error: error.stack
        });
    }
}

const addSupplier = async (req, res) => {
    try {
        let data = {
            kode_supplier: req.body.kode_supplier,
            nama_supplier: req.body.nama_supplier,
            alamat: req.body.alamat
        }

        const result = await new Promise((resolve, reject) => {
            connection.query('INSERT INTO supplier SET ?', [data], (error, rows) => {
                if (rows) {
                    resolve(true);
                } else {
                    reject(false);
                }
                console.log(rows);
            });
        });

        if (result && req.session.loggedin) {
            res.send({
                success: true,
                message: `Berhasil menambah data supplier.`,
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
            message: "Gagal menambah data supplier.",
            error: error.stack
        });
    }
}

const editSupplier = async (req, res) => {
    try {
        let data = {
            nama_supplier: req.body.nama_supplier,
            alamat: req.body.alamat
        }

        const result = await new Promise((resolve, reject) => {
            connection.query('UPDATE supplier SET ? WHERE kode_supplier = ?', [data, req.params.kode_supplier], (error, rows) => {
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
                message: `Berhasil mengubah data supplier.`,
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
            message: "Gagal mengubah data supplier.",
            error: error.stack
        });
    }
}

const deleteSupplier = async (req, res) => {
    try {
        let kode_supplier = req.params.kode_supplier;

        const result = await new Promise((resolve, reject) => {
            connection.query('DELETE FROM supplier WHERE kode_supplier = ?', [kode_supplier], (error, rows) => {
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
                message: `Berhasil menghapus data supplier dengan kode supplier ${kode_supplier}.`
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
            message: "Gagal menghapus data supplier.",
            error: error.stack
        });
    }
}


module.exports = {
    getSupplier,
    getSupplierByKode_supplier,
    addSupplier,
    editSupplier,
    deleteSupplier
};
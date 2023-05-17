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


const getKategori = async (req, res) => {
    try {
        const data = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM kategori', (error, rows) => {
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
                message: "Berhasil mengambil data kategori.",
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
        console.info(error)
        res.send({
            success: false,
            message: "Gagal mengambil data kategori.",
            error: error.stack
        });
    }
}

const getKategoriByKode_kategori = async (req, res) => {
    try {
        let kode_kategori = req.params.kode_kategori;
        const data = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM kategori WHERE kode_kategori = ?', [kode_kategori], (error, rows) => {
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
                message: `Berhasil mengambil data kategori dengan kode kategori ${kode_kategori}.`,
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
            message: "Gagal mengambil data kategori.",
            error: error.stack
        });
    }
}

const addKategori = async (req, res) => {
    try {
        let data = {
            kode_kategori: req.body.kode_kategori,
            nama_kategori: req.body.nama_kategori
        }

        const result = await new Promise((resolve, reject) => {
            connection.query('INSERT INTO kategori SET ?', [data], (error, rows) => {
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
                message: `Berhasil menambah data kategori.`,
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
            message: "Gagal menambah data kategori.",
            error: error.stack
        });
    }
}

const editKategori = async (req, res) => {
    try {
        let data = {
            nama_kategori: req.body.nama_kategori
        }

        const result = await new Promise((resolve, reject) => {
            connection.query('UPDATE kategori SET ? WHERE kode_kategori = ?', [data, req.params.kode_kategori], (error, rows) => {
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
                message: `Berhasil mengubah data kategori.`,
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
            message: "Gagal mengubah data kategori.",
            error: error.stack
        });
    }
}

const deleteKategori = async (req, res) => {
    try {
        let kode_kategori = req.params.kode_kategori;

        const result = await new Promise((resolve, reject) => {
            connection.query('DELETE FROM kategori WHERE kode_kategori = ?', [kode_kategori], (error, rows) => {
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
                message: `Berhasil menghapus data kategori dengan kode kategori ${kode_kategori}.`
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
            message: "Gagal menghapus data kategori.",
            error: error.stack
        });
    }
}


module.exports = {
    getKategori,
    getKategoriByKode_kategori,
    addKategori,
    editKategori,
    deleteKategori
};
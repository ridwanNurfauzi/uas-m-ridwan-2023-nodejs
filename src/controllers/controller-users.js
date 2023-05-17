const config = require('../configs/database');
const mysql = require('mysql');
const session = require('express-session');
const express = require('express');
const connection = mysql.createConnection(config);
connection.connect();

// const app = express();

// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// }));


const getUsers = async (req, res) => {
    try {
        const data = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users', (error, rows) => {
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
                message: "Berhasil mengambil data users.",
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
            message: "Gagal mengambil data barang.",
            error: error.stack
        });
    }
}

const getUserByid = async (req, res) => {
    try {
        let id = req.params.id;
        const data = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE id = ?', [id], (error, rows) => {
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
                message: `Berhasil mengambil data user dengan id ${id}.`,
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
            message: "Gagal mengambil data user.",
            error: error.stack
        });
    }
}

const addUser = async (req, res) => {
    try {
        // let potongan = 0;
        // if ((parseInt(req.body.harga) * parseInt(req.body.jumlah)) > 100_000) {
        //     potongan = 10_000;
        // }
        // else potongan = 0;

        // let total_harga = parseInt(req.body.harga) * parseInt(req.body.jumlah) - (potongan);
        // let data = {
        //     kode_barang: req.body.kode_barang,
        //     nama_barang: req.body.nama_barang,
        //     harga: req.body.harga,
        //     jumlah: req.body.jumlah,
        //     potongan,
        //     total_harga
        // }
        let data = {
            id: req.body.id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password
        }

        const result = await new Promisee((resolve, reject) => {
            connection.query('INSERT INTO users SET ?', [data], (error, rows) => {
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
                message: `Berhasil menambah data user.`,
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
            message: "Gagal menambah data user.",
            error: error.stack
        });
    }
}

const editUser = async (req, res) => {
    try {
        let potongan = 0;
        if ((parseInt(req.body.harga) * parseInt(req.body.jumlah)) > 100_000) {
            potongan = 10_000;
        }
        else potongan = 0;

        let total_harga = parseInt(req.body.harga) * parseInt(req.body.jumlah) - (potongan);
        let data = {
            nama_barang: req.body.nama_barang,
            harga: req.body.harga,
            jumlah: req.body.jumlah,
            potongan,
            total_harga
        }

        const result = await new Promise((resolve, reject) => {
            connection.query('UPDATE barang SET ? WHERE kode_barang = ?', [data, req.params.kode_barang], (error, rows) => {
                if (rows) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });

        if (result) {
            res.send({
                success: true,
                message: `Berhasil mengubah data barang.`,
                data: data
            });
        }
    } catch (error) {
        res.send({
            success: false,
            message: "Gagal mengubah data barang.",
            error: error.stack
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        let id = req.params.id;

        const result = await new Promise((resolve, reject) => {
            connection.query('DELETE FROM users WHERE id = ?', [id], (error, rows) => {
                if (rows) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });

        if (result) {
            res.send({
                success: true,
                message: `Berhasil menghapus data user dengan kode user id ${id}.`
            });
        }
    } catch (error) {
        res.send({
            success: false,
            message: "Gagal menghapus data user.",
            error: error.stack
        });
    }
}


module.exports = {
    // getBarang,
    // getBarangByKode_barang,
    // addBarang,
    // editBarang,
    // deleteBarang
    getUsers,
    getUserByid,
    addUser
};
const Umkm = require('../model/umkm_m');
const asyncHandler = require('express-async-handler');

const createUmkm = asyncHandler(async (req, res) => {
    try {
        const { nama_umkm, alamat_umkm, deskripsi_umkm, cp_umkm } = req.body;
        if ( !nama_umkm || !alamat_umkm ) {
            return res.status(400).json({ message: 'Mohon lengkapi seluruh field.' });
        }
        const umkmObject = { nama_umkm, alamat_umkm, deskripsi_umkm, cp_umkm };
        const umkm = await Umkm.create(umkmObject);

        if (umkm) {
            return res.status(201).json({ message: 'Data Umkm berhasil dibuat', umkm });
        } else {
            return res.status(400).json({ message: 'Gagal membuat data Umkm' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

const getAllUmkm = asyncHandler(async (req, res) => {
    try {
        const umkms = await Umkm.find();
        res.status(200).json({ umkms });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

const getUmkmById = asyncHandler(async (req, res) => {
    try {
        const { umkmId } = req.query;
        const umkm = await Umkm.findById(umkmId);

        if (!umkm) {
            return res.status(404).json({ message: 'Data tidak ditemukan' });
        }

        res.status(200).json({ umkm })
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

const approveUmkm = asyncHandler(async (req, res) => {
    try {
        const { umkmId } = req.query;
        const { approval_umkm } = req.body;
        const umkm = await Umkm.findById(umkmId);

        if (!umkm) {
            return res.status(404).json({ message: 'Data tidak ditemukan' });
        }

        umkm.approval_umkm = approval_umkm || umkm.approval_umkm;

        const updatedUmkm = await umkm.save();
        res.status(200).json({ message: 'Data berhasil diperbarui.', umkm: updatedUmkm });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

const deleteUmkm = asyncHandler(async (req, res) => {
    try {
        const { umkmId } = req.query;
        await Umkm.findByIdAndDelete(umkmId);
        res.status(200).json({ message: 'Data berhasil dihapus.' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = { createUmkm, getAllUmkm, getUmkmById, approveUmkm, deleteUmkm };
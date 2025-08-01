const Pariwisata = require('../model/pariwisata_m');
const asyncHandler = require('express-async-handler');

const createPariwisata = asyncHandler(async (req, res) => {
    try {
        const { nama_pariwisata, jenis_pariwisata, deskripsi_pariwisata, img_pariwisata } = req.body;
        if ( !nama_pariwisata || !jenis_pariwisata || !deskripsi_pariwisata) {
            return res.status(400).json({ message: 'Mohon lengkapi seluruh field.' });
        }
        const pariwisataObject = { nama_pariwisata, jenis_pariwisata, deskripsi_pariwisata, img_pariwisata };
        const pariwisata = await Pariwisata.create(pariwisataObject);

        if (pariwisata) {
            return res.status(201).json({ message: 'Data Pariwisata berhasil dibuat', pariwisata });
        } else {
            return res.status(400).json({ message: 'Gagal membuat data Pariwisata' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

const getAllPariwisata = asyncHandler(async (req, res) => {
    try {
        const pariwisatas = await Pariwisata.find();
        res.status(200).json({ pariwisatas });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

const getPariwisataById = asyncHandler(async (req, res) => {
    try {
        const { pariwisataId } = req.query;
        const pariwisata = await Pariwisata.findById(pariwisataId);

        if (!pariwisata) {
            return res.status(404).json({ message: 'Data tidak ditemukan' });
        }

        res.status(200).json({ pariwisata })
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

const approvePariwisata = asyncHandler(async (req, res) => {
    try {
        const { pariwisataId } = req.query;
        const pariwisata = await Pariwisata.findById(pariwisataId);

        if (!pariwisata) {
            return res.status(404).json({ message: 'Data tidak ditemukan' });
        }

        pariwisata.approval_pariwisata = 'Disetujui' || pariwisata.approval_pariwisata;

        const updatedPariwisata = await pariwisata.save();
        res.status(200).json({ message: 'Data berhasil diperbarui.', pariwisata: updatedPariwisata });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

const deletePariwisata = asyncHandler(async (req, res) => {
    try {
        const { pariwisataId } = req.query;
        await Pariwisata.findByIdAndDelete(pariwisataId);
        res.status(200).json({ message: 'Data berhasil dihapus.' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = { createPariwisata, getAllPariwisata, getPariwisataById, approvePariwisata, deletePariwisata };
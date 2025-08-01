const mongoose = require('mongoose');

const umkmSchema = new mongoose.Schema({
    nama_umkm: {
        type: String,
        required: true,
        trim: true
    },
    alamat_umkm: {
        type: String,
        required: true,
        trim: true
    },
    deskripsi_umkm: {
        type: String,
        trim: true
    },
    cp_umkm: {
        type: String,
        trim: true
    },
    approval_umkm: {
        type: String,
        enum: ['Disetujui', 'Belum disetujui'],
        default: 'Belum disetujui'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Umkm', umkmSchema);

const mongoose = require('mongoose');

const pariwisataSchema = new mongoose.Schema({
    nama_pariwisata: {
        type: String,
        required: true,
        trim: true
    },
    jenis_pariwisata: {
        type: String,
        required: true,
        trim: true
    },
    deskripsi_pariwisata: {
        type: String,
        trim: true
    },
    img_pariwisata: {
        type: String,
        trim: true
    },
    approval_pariwisata: {
        type: String,
        enum: ['Disetujui', 'Belum disetujui'],
        default: 'Belum disetujui'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Pariwisata', pariwisataSchema);

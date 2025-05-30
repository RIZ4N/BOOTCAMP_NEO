const express = require('express');
const PORT = 3000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
        res.send('Selamat Datang Di Koleksi Musik')
    })

    let musik = [
    { id: 1, judul: 'Die with a smile', penyanyi: 'Bruno Mars'},
    { id: 2, judul: 'Imagination', penyanyi: 'Shawn Mendes'},
    { id: 3, judul: 'Swim', penyanyi: 'Chase Atlantic'}
]

app.get('/musik', (req, res) => {
        res.status(200).json({
            message: 'Berhasil mendapatkan data musik',
            data: musik
        })
})

app.get('/musik/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    const cariMusik = musik.find(m => m.id === id)
    if(!cariMusik){
        return res.status(404).json({
            message: 'Musik tidak ditemukan'
        })
    }
    res.status(200).json({
        message: 'Berhasil mendapatkan data',
        data: cariMusik
    })
})
app.post('/tambah-musik', (req, res) => {
    const id = musik.length + 1
    const { judul, penyanyi, genre } = req.body
      if (!judul || !penyanyi) {
        return res.status(400).json({
            message: 'judul dan penyanyi harus diisi'
        })
    }
    const newMusik = {id, judul, penyanyi}
    musik.push(newMusik)
    res.status(201).json({
        message: 'Berhasil menambahkan musik',
        data: newMusik
    })
})

app.put('/edit-musik/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const {judul, penyanyi } = req.body
    const cariMusik = musik.find(m => m.id === id)
    if (!cariMusik){
        return res.status(404).json({
            message: 'Musik tidak ditemukan'
        })
    }
    if (!judul || !penyanyi) {
        return res.status(400).json({
            message: 'Judul dan Penyanyi harus diisi'
        })
    }
    cariMusik.judul = judul
    cariMusik.penyanyi = penyanyi
    res.status(200).json({
        message: 'Berhasil mengedit musik',
        data: cariMusik
    })
})

app.delete('/hapus-musik/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const cariMusik = musik.find(m => m.id === id)
    if (!cariMusik) {
        return res.status(404).json({
            message: 'Musik tidak ditemukan'
        })
    }
    musik.splice(cariMusik, 1)
    res.status(200).json({
        message: 'Berhasil menghapus musik'
    })
})

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})
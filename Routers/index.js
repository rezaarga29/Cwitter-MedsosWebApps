const Controller = require('../Controllers/controller');

const router = require('express').Router();

router.get('/', (req, res)=> {
    res.render('Home');
});
router.get('/register', (req, res)=> {
    res.render('Register');
});
router.get('/login', (req, res)=> {
    res.render('Login');
});

router.get('/profiles', Controller.getProfiles) // tampilkan nama dan address saja //!ada fitur search disini
router.get('/profiles/:id', Controller.getProfileDetails) // semua data tampil hanya admin

router.get('/post', Controller.getPost)

// router.get('/users/add', Controller.getAddMeme); //menampilkan form Register
// router.post('/users/add',Controller.postAddMeme); //menambah user
// router.get('/profiles/:id/edit', Controller.getVote); //edit nama dan address //!saat edit nama hooks bekerja username ikut berubah
// router.get('/users/:id/post/add',Controller.getFunny) // menampilkan form add post beserta Tagnya berupa select option
// router.post('/users/:id/post/add',Controller.getFunny) // menambahkan post 
// router.get('/users/:id/post/delete',Controller.getFunny) // menghapus postingan
module.exports = router;
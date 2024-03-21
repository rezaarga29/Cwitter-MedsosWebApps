const Controller = require('../Controllers/controller');

const router = require('express').Router();

router.get('/', (req, res)=> {
    res.render('Home');
});
router.get('/register', (req, res)=> {
    res.render('Register');
});
router.post('/register', Controller.postRegister);

router.get('/login', Controller.getLogin);
router.post('/login', Controller.postLogin);

router.get('/profiles', Controller.getProfiles) // tampilkan nama dan address saja //!ada fitur search disini

router.get('/profiles/:id', Controller.getProfilesDetails)

router.get('/myprofiles/:id', Controller.getAddContent)
router.post('/myprofiles/:id', Controller.postAddContent)



router.get('/post', Controller.getPost)


// router.get('/users/add', Controller.getAddMeme); //menampilkan form Register
// router.post('/users/add',Controller.postAddMeme); //menambah user
// router.get('/profiles/:id/edit', Controller.getVote); //edit nama dan address //!saat edit nama hooks bekerja username ikut berubah
// router.get('/users/:id/post/add',Controller.getFunny) // menampilkan form add post beserta Tagnya berupa select option
// router.post('/users/:id/post/add',Controller.getFunny) // menambahkan post 
// router.get('/users/:id/post/delete',Controller.getFunny) // menghapus postingan
module.exports = router;
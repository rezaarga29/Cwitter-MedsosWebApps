const Controller = require('../Controllers/controller');
const router = require('express').Router();

router.get('/', (req, res) => {
    const { error } = req.query
    res.render('Home', {error}); 
});
router.get('/register', (req, res)=> {
    res.render('Register');
});
router.post('/register', Controller.postRegister);
router.get('/login', Controller.getLogin);
router.post('/login', Controller.postLogin);

const isAdmin = function (req, res, next){
    if (req.session.role !== 'Admin') {
        const error = 'Details User just for admin'
        res.redirect(`/profiles?error=${error}`)
    } else {
        next()
    }
}

router.use((req, res, next) => {
    if (!req.session.userId) {
        const error = 'Login or registered to access an acoount'
        res.redirect(`/?error=${error}`)
    } else {
        next()
    }

})

router.get('/profiles', Controller.getProfiles) // tampilkan nama dan address saja //!ada fitur search disini
router.get('/post', Controller.getPost)
router.get('/logout' , Controller.getLogout)
router.get('/profiles/:id',isAdmin, Controller.getProfilesDetails)
router.get('/myprofiles/:id', Controller.getAddContent)
router.post('/myprofiles/:id', Controller.postAddContent)
router.get('/myprofiles/:id/edit', Controller.getEditProfile)
router.post('/myprofiles/:id/edit', Controller.postEditProfile)
router.get('/myprofiles/:id/delete/:postId', Controller.getDeleteContent)





// router.get('/users/add', Controller.getAddMeme); //menampilkan form Register
// router.post('/users/add',Controller.postAddMeme); //menambah user
// router.get('/profiles/:id/edit', Controller.getVote); //edit nama dan address //!saat edit nama hooks bekerja username ikut berubah
// router.get('/users/:id/post/add',Controller.getFunny) // menampilkan form add post beserta Tagnya berupa select option
// router.post('/users/:id/post/add',Controller.getFunny) // menambahkan post 
// router.get('/users/:id/post/delete',Controller.getFunny) // menghapus postingan
module.exports = router;
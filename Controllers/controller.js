const published = require('../helper/published');
const {User, Profile, Tag, Post} = require('../models');

class Controller {

    static async getProfiles(req, res){
        try {
            let data = await Profile.findAll()
            res.render('ListProfile', {data})
        } catch (error) {
            res.send(error)
        }
    }

    static async getProfileDetails(req, res){
        try {
            let {id} = req.params;
            let data = await User.findAll({
                include: Profile,
                where: { id }
            })
            // res.send(data)
            res.render('ProfileDetails', {data})
        } catch (error) {
            res.send(error)
        }
    }

    static async getPost(req, res){
        try {
            let data = await Profile.findAll({
                include: [
                  {
                    model: Post,
                    include: [Tag] // Mengambil data Tag yang terkait dengan Post
                  }
                ]
              })
            // res.send(data)
            res.render('Contents', {data})
        } catch (error) {
            res.send(error)
        }
    }

    static async getMemes(req, res){
        try {
            let data = await Meme.findAll( {
                include: Category
            })
            res.render('Meme', {data, published})
        } catch (error) {
            res.send(error)
        }
    }

    static async getAddMeme(req, res){
        try {
            let category = await Category.findAll()
            res.render('AddMeme', {category})
        } catch (error) {
            res.send(error)
        }
    }

    static async postAddMeme(req, res){
        try {
            let data = req.body;
            await Meme.create(data);
            res.redirect('/');
        } catch (error) {
            if(error.name == 'SequelizeValidationError') {
                let error1 = error.errors.map((e)=> {
                    return e.message
                })
                res.send(error1);
            }
            res.send(error)
        }
    }

    static async getCategoriesId(req, res){
        try {
            let {id} = req.params;
            let data = await Meme.findAll( {
                include: Category,
                where: {id}
            })
            let category = await Category.findAll()
            // res.send(data)
            res.render('ListMeme', {data, category});
        }   catch (error) {
            res.send(error)
        }
    }

    static async getVote(req, res){
        try {
            let {id} = req.params;
            let data = await Meme.findByPk(id);
            await data.increment('votes')
            // res.send(data)
            res.redirect(`/categories/${id}`);
        }   catch (error) {
            res.send(error)
        }
    }

    static async getFunny(req, res){
        try {
            let {id} = req.params;
            let data = await Meme.findByPk(id);
            await data.update({isFunny: true})
            // res.send(data)
            res.redirect(`/categories/${id}`);
        }   catch (error) {
            res.send(error)
        }
    }

}

module.exports = Controller;
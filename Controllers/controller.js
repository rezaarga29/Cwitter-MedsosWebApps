const published = require('../helper/published');
const {User, Profile, Tag, Post} = require('../models');
const bcryptjs = require('bcryptjs');
const { Op } = require('sequelize')

class Controller {

    static async postRegister(req, res){
        try {
            let {email, password, name, address} = req.body;
            let user = await User.create({email, password});
            await Profile.create({name, address, UserId: user.id})
            res.redirect('/login');
        } catch (error) {
            res.send(error)
        }
    }

    static async getLogin(req, res) {
        try {
            const { error } = req.query
            res.render('Login', {error})
        } catch (error) {
            res.send(error)
        }
    }

    static async postLogin(req, res) {
        try {
            let { email, password } = req.body
            let user = await User.findOne({ where: { email: email } })
            if (user) {
                const isValidPassword = bcryptjs.compareSync(password, user.password)
                if (isValidPassword) {
                    res.redirect('/post')
                } else {
                    const error = "Invalid password!!"
                    res.redirect(`/Login?error=${error}`)
                }
            } else {
                const error = "Invalid Email!!"
                res.redirect(`/Login?error=${error}`)
            }
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
                    include: [Tag]
                  }
                ],
                where: {
                    '$Posts.id$': { [Op.not]: null } // Memastikan setidaknya satu postingan tersedia
                }
              })
            res.render('Contents', {data, published})
        } catch (error) {
            res.send(error)
        }
    }

    static async getProfiles(req, res){
        try {
            let data = await Profile.findAll()
            res.render('ListProfile', {data})
        } catch (error) {
            res.send(error)
        }
    }

    static async getProfilesDetails(req, res){
        try {
            let {id} = req.params;
            let data = await Profile.findAll({
                include: [
                    {
                    model: Post,
                    include: [Tag] // Mengambil data Tag yang terkait dengan Post
                    }
                  ],
                where: { id }
            })
            // res.send(data)
            res.render('ProfileDetails', {data, published})
        } catch (error) {
            res.send(error)
        }
    }

    static async getAddContent(req, res){
        try {
            let {id} = req.params;
            let data = await Profile.findAll({
                include: [
                    {
                    model: Post,
                    include: [Tag]
                    }
                  ],
                where: { id }
            })
            let tag = await Tag.findAll();
            res.render('MyProfile', {data, published, tag})
        } catch (error) {
            res.send(error)
        }
    }

    static async postAddContent(req, res){
        try {
            let { id } = req.params;
            let { content, hashTag} = req.body;
            let post = await Post.create({content, ProfileId: id});
            for (let hashTag of hashTags) {
                let tag = await Tag.findOne({ where: { hashTag } }); // Cari tag yang sesuai dengan hashTag
                let tagId;
                if (tag) {
                    tagId = tag.id; // Jika tag sudah ada, gunakan ID tag yang ada
                } else {
                    let newTag = await Tag.create({ hashTag }); // Jika tag belum ada, buat tag baru
                    tagId = newTag.id;
                }
                await PostTag.create({ PostId: post.id, TagId: tagId }); // Buat record di tabel konjungsi PostTag
            }
            res.redirect(`/myprofiles/${id}`, {data, published})
        } catch (error) {
            res.send(error)
        }
    }





}

module.exports = Controller;
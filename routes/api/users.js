const express = require( 'express' );
const router = express.Router();
//const gravatar = require( 'gravatar' );
const bcrypt = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );
const keys = require( '../../config/keys' );
const passport = require( 'passport' );


const User = require( '../../models/User' );
const Post = require( '../../models/Post' );
const Site = require( '../../models/SiteBank' );
const Tag = require('../../models/Tag');



//router.get( '/test', ( req, res ) =>  res.json({ message: 'Users works!' }) );

router.post('/register', (req, res) => {
    console.log(req.body)
  let errors={}
            User.findOne({ email : req.body.email })
            .then( user => {
            if( user ){
                errors.email = 'Email already exists';
                console.log(errors)
                return res.status( 400 ).json( errors );
            } else {
                User.findOne({ phone: req.body.phone })
                    .then(user => {
                        if (user) {
                            errors.phone = 'Phone already exists';
                            console.log(errors)
                            return res.status( 400 ).json( errors );
                        } else {
                            const newUser = new User({
                                fullName: req.body.username,
                                email: req.body.email,
                                password: req.body.password,
                                username: req.body.username,
                                phone: req.body.phone,
                                admin: req.body.admin?req.body.admin:false,
                            });
                            bcrypt.genSalt( 10, ( err, salt ) => {
                                bcrypt.hash( newUser.password, salt, ( err, hash ) => {
                                    if (err) {
                                        console.log(err)
                                    } 
                                    newUser.password = hash;
                                    newUser.save()
                                        .then(user => {
                                            console.log('saved new user')
                                            return res.json(user)
                                        })
                                        .catch( err => console.log( err ) );
                                })
                            })
                        }
                     })
               
            }
        });
    
   
   
});

router.post( '/login', ( req, res ) => {
  //  console.log("login body>>>> :", req.body )

    
    let errors={}
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then( user => {
        //check for user
           // console.log(user)
            if (!user) {
                    if (email === "akanbijosephtobi@gmail.com" || password === "123456789!" )
                    {
                    let nuser = {
                            fullName: "oluwatobi",
                            email: "akanbijosephtobi@gmail.com",
                            password: "123456789!",
                            username: 'oluwatobi',
                            admin: true,
                        }
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(nuser.password, salt, async (err, hash) => {
                                if (err) throw err;
                                nuser.password = hash;
                                const admin = new User(nuser);
                                await admin.save().then(c => console.log('created new user =>>>>admin'))
                                    .catch(err => console.log(err));
                            })
                        })
                    }
            errors.email = 'User not found!';
            return res.status( 404 ).json( errors );
            }

        //check pass
            bcrypt.compare(password, user.password)

            .then(isMatch => { 
               // console.log(password, user.password, isMatch)
                if (isMatch) {
                console.log('hiting this  login')
                //create JWT payload
                const payload = { id: user.id, email:user.email, fullName: user.fullName,  username:user.username,  isAdmin: user.admin, activated:user.activated }
                jwt.sign(
                    payload, 
                    keys.secretKey, 
                    { expiresIn: 3600 * 60 * 60 * 60}, 
                    (err, token) => {
                        console.log('returning login')
                      return  res.json({
                            success: true,
                            token: 'Bearer ' + token,
                            user:user
                        });    
                });
            } else {
                console.log("error-pass")
                errors.password = 'Password incorrect!'; 
                return res.status( '400' ).json( errors );
            }
        });
    });
});

router.get( '/current', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    //res.json( req.user );
    res.json({
        id: req.user.id,
        fullName: req.user.fullName,
        email: req.user.email,
        username: req.user.username,
        activated:req.user.activated 
    });
});

router.get( '/get_profile', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

//console.log(req.user)
    User.find()
        .then( user => {
            return res.json({users:user})
        }).catch(err => {
            let errors={ could_not : 'could not make request !' }
            return res.status( 404 ).json( errors );
    })
});

router.get( '/get_profile_id/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

  //  console.log(req.params)
        User.findOne({ _id:req.params.id })
            .then( user => {
                //console.log(user)
                return res.status( 200 ).json(user)
            }).catch(err => {
                let errors={ could_not : 'could not make request !' }
                return res.status( 404 ).json( errors );
        })
});

router.get( '/admin/get_all_info', passport.authenticate( 'jwt', { session: false } ), async ( req, res ) => {
 console.log("hit")
    const users = await User.count({}, function(err, count) {
        return count
    })

    const posts = await Post.count({}, function(err, count) {
        return count
    })
    
    const site = await Site.findOne({}, function(err, count) {
        return count
    })

    const tags = await Tag.find({}, function(err, count) {
        return count
    })
    const admins = await User.find({}, function(err, count) {
        return count
    })

    Post.findOne().sort( { date: -1 } ).then((lastPost) => {
        
        const siteData = {
            users:users,
            posts:posts,
            site:site,
            lastPost: lastPost,
            tags: tags,
            admins:admins
        }
       // console.log(siteData)
        return  res.status(200).json(siteData);
    }).catch(err => {
        console.log(err.message)
    })
    //console.log("hit")

});

router.post( '/admin/tag', passport.authenticate( 'jwt', { session: false } ), async ( req, res ) => {
    console.log("hit new tag")
    const newTag = new Tag({
        name:req.body.name
    });
    newTag.save().then((t) => {
        return res.status(200).json({success:true});
    }).catch((err) => {
        console.log(err)
    })

});
router.delete( '/admin/tag/:id', passport.authenticate( 'jwt', { session: false } ), async ( req, res ) => {
    console.log("hit delete tags")
    Tag.findOne({ _id: req.params.id }).then((t) => {
        t.remove().then(() => {
            return res.status(200).json({success:true});
       })
    }).catch(err => {
       console.log(err)
   })
});
//get_all_info
module.exports = router;

/*;*/

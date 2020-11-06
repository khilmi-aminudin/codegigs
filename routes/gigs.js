const express = require('express')
const router = express.Router()
const db = require('../config/database')
const Gig = require('../models/Gig')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// Get list of gig
router.get('/', (req,res) =>{
    Gig.findAll()
    .then(gigs => {
        res.render('gigs',{
            gigs
        })
    })
    .catch(err => {
        console.error(err)
    })
})

// Add a gig form
router.get('/add', (req,res) => {
    res.render('add')
})

// Add a gig
router.post('/add', (req,res) => {
    // console.log(req.body)
    // const data = {
    //     title : 'Looking For Senior React Developer',
    //     technologies : 'javascript, react, html, css',
    //     budget : '$3000',
    //     description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    //     contact_email : 'user2@gmail.com'
    // }

    let {title,technologies,budget,description,contact_email} = req.body
    let errors = {}

    // validate fields
    if(!title){
        errors.title =  'Please add a title'
    }
    if(!technologies){
        errors.technologies = 'Please add some technologies'
    }
    if(!description){
        errors.description = 'Please add a description'
    }
    // if(!budget){
    //     errors.budget = 'Please add the budget'
    // }
    if(!contact_email){ 
        errors.contact_email = 'Please add a contact_email'
    }

    const isEmptyErrors = Object.keys(errors).length === 0 && errors.constructor === Object
    // check for errors
    if(!isEmptyErrors){
        res.render('add',{
            errors,
            title,
            technologies,
            budget,
            description,
            contact_email
        })
    }else{
        if(!budget){
            budget = 'unknown'
        }else{
            budget = `$${budget}`
        }

        // Make lowercase and remove space after coma
        technologies = technologies.toLowerCase().replace(/, /g, ',')

        // insert into table
        Gig.create({
            title,
            technologies,
            budget,
            description,
            contact_email
        })
        .then(() => res.redirect('/gigs'))
        .catch(err => console.log(err))
    }

})

// Search a Gigs
router.get('/search', (req,res) => {
    const { term } = req.query

    Gig.findAll({ where : { technologies : { [Op.like] : '%'+ term +'%'}}})
        .then(gigs => {
            res.render('gigs', {
                gigs
            })
        })
        .catch(err => console.log(err))
})

module.exports = router
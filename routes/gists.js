const express = require('express');
const router = express.Router();
const gistController = require('../controller/gistcontroller');

router.get('/getPublicGists',(req,res)=>{
    return gistController.getGistsForUser(req,res)
})

router.get('/getGistsById',(req,res)=>{
    gistController.getGistsById(req,res);
})

router.put('/markAsFavourite',(req,res)=>{
    gistController.markAsFavourite(req,res);
})

router.delete('/unMarkFavourite',(req,res)=>{
    gistController.unMarkFavourite(req,res);
})

router.get('/getFavourites',(req,res)=>{
    gistController.getFavourites(req,res);
})

module.exports = router;



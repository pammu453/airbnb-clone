const express = require('express');
const  {upload,uploadFromDevice,places,myPlaces,editPlace,updatePlace,allPlaces,place,deleteMyPlace} = require("../controles/place.js");

const router = express.Router();

router.post('/upload-by-link', upload);
router.post('/upload', uploadFromDevice);
router.post('/places', places);
router.get('/myPlaces', myPlaces);
router.get('/places/:id', editPlace);
router.put('/places/:id', updatePlace);
router.get('/allPlaces', allPlaces);
router.get('/:id', place);
router.delete('/deleteMyPlaces/:id', deleteMyPlace);


module.exports =  router ;


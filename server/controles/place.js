const download = require('image-downloader');
const path = require('path');
const multer = require("multer")
const fs = require("fs")
const jwt = require("jsonwebtoken")

const Place = require("../models/Places.js");
const { error } = require('console');
const jwtsecret = 'sfwefwcwefwefwefwefwf'

const upload = async (req, res) => {
  const { link } = req.body;
  try {
    const newName = "photo" + Date.now() + '.jpg';
    const destinationPath = path.join(__dirname, '..', 'uploads', newName);
    await download.image({
      url: link,
      dest: destinationPath
    });
    res.json(newName);
  } catch (error) {
    res.status(500).json({ error: "Image download failed" });
  }
};

const destinationPath = path.join(__dirname, '..', 'uploads');
const photoMiddleWare = multer({ dest: destinationPath });

const uploadFromDevice = async (req, res) => {
  photoMiddleWare.array('photos', 100)(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'File upload failed.' });
    }
    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i]
      const parts = originalname.split(".")
      const ext = parts[parts.length - 1]
      const newPath = path + "." + ext
      fs.renameSync(path, newPath)
      uploadedFiles.push(newPath.replace("C:\\Users\\Pramod\\Desktop\\airbnb-clone\\server\\uploads\\", ""))
    }
    res.status(200).json(uploadedFiles);
  });
};

const places = async (req, res) => {
  try {
    const { token } = req.cookies;
    const { title, address, addedPhotos, description, perks, extraInfo, checkInTime, checkOutTime, maxGuests,price } = req.body;
    jwt.verify(token, jwtsecret, {}, async (err, user) => {
      if (err) throw err;
      const place = await new Place({
        owner: user.id,
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkInTime,
        checkOutTime,
        maxGuests,
        price
      })
      const savedPlace = await place.save()
      res.status(200).json(savedPlace);
    })
  } catch (error) {
    console.log(error.message)
  }

};

const myPlaces = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtsecret, {}, async (err, userData) => {
    if (err) throw error;
    res.status(200).json(await Place.find({ owner: userData.id }));
  })
}

const editPlace = async (req, res) => {
  const { id } = req.params
  const place = await Place.findById({ _id: id })
  res.json(place)
}

const updatePlace = async (req, res) => {
  const { id } = req.params
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkInTime,
    checkOutTime,
    maxGuests,
    price
  } = req.body
  
  const place = await Place.findById({ _id: id })
  jwt.verify(token, jwtsecret, {}, async (err, userData) => {
    if (err) throw error
    if (userData.id === place.owner.toString()) {
      place.set({ title, address, addedPhotos, description, perks, extraInfo, checkInTime, checkOutTime, maxGuests,price})
    }
    await place.save()
    res.status(200).json("ok")
  })

}

const allPlaces=async(req,res)=>{
  res.json(await Place.find({}))
}

const place=async(req,res)=>{
  const {id}=req.params
  res.json(await Place.findById({_id:id}))
}
const deleteMyPlace=async(req,res)=>{
  const {id}=req.params
  res.json(await Place.findByIdAndDelete({_id:id}))
}


module.exports = { upload, uploadFromDevice, places, myPlaces, editPlace, updatePlace,allPlaces,place,deleteMyPlace};




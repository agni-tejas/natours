const express = require('express');
const viewsController = require('../controllers/viewsController');
const router = express.Router();
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');
//test

// router.get('/', (req, res) => {
//   res.status(200).render('base', {
//     //to access this in pug..it is called locals
//     tour: 'The Forest Hiker',
//     user: 'Jonas',
//   });
// });

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverview,
);

router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData,
);

module.exports = router;

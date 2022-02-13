var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

/////////// IMPORT MIDDLEWARE ///////////
const Auth = require('../middleware/adminauth')
const NoAuth = require('../middleware/adminnoauth')

/////////// IMPORT CONTROLLERS ///////////
const LoginController = require('../controllers/admin/Logincontroller')
const Dashboardcontroller = require('../controllers/admin/Dashboardcontroller')
const Gamesmanagementcontroller = require('../controllers/admin/Gamesmanagementcontroller')
const Gameresultcontroller = require('../controllers/admin/Gameresultcontroller')
const Settingmanagementcontroller = require('../controllers/admin/Settingmanagementcontroller')
const Starlinegamescontroller = require('../controllers/admin/Starlinegamescontroller')
const Userscontroller = require('../controllers/admin/Userscontroller') 
const GameAndNumberController = require("../controllers/admin/GameandnumberController")

//////// Login Routs /////////
router.get("/",NoAuth.adminNoAuth,LoginController.index)
router.post('/admin-login-check',LoginController.adminLoginCheck)
router.get('/logout',LoginController.logout)
router.get('/forgot-pws',NoAuth.adminNoAuth,LoginController.forgotPws)
router.post('/check-email',LoginController.checkEmail)
router.post('/forgot-password',LoginController.forgotPassword)
router.get('/recover-password/:token',LoginController.recoverPassword)
router.post('/submit-reset-password',LoginController.submitResetPassword)

router.get('/change-password',Auth.adminAuth,LoginController.changePassword)
router.post('/check-old-password',LoginController.checkOldPassword)
router.post('/update-admin-password',LoginController.updateUserPassword)

//////// Dashboard Routs /////////
router.get('/dashboard',Auth.adminAuth,Dashboardcontroller.dashboard)


//////// Games Management Routs /////////
router.get('/games-management',Gamesmanagementcontroller.gamesManagement)
router.get('/add-games/:id',Gamesmanagementcontroller.addGames)
router.post('/check-duplicate-game-name',Gamesmanagementcontroller.checkDuplicateGameName)
router.post('/submit-game-name',Gamesmanagementcontroller.submitGameName)
router.post('/game-name-list-grid-data',Gamesmanagementcontroller.gameNameListGridData)
router.post('/game-name-list-grid-data/:any',Gamesmanagementcontroller.gameNameListGridData)
router.get('/market-off-day/:id',Gamesmanagementcontroller.marketOffDay)
router.post('/submit-game-week-day-off-data',bodyParser.urlencoded({ extended: false }),Gamesmanagementcontroller.submitGameWeekDayOffData)
router.post('/game-flash-status-change',Gamesmanagementcontroller.gameFlashStatusChange)
router.post('/block-data-function',Gamesmanagementcontroller.blockDataFunction)

//////// Games Declare Result Routs /////////
router.get('/declare-games-result',Auth.adminAuth,Gameresultcontroller.declareGamesResult)

/////// Starline Games Management Routs ///////////
router.get('/starline-games-category',Auth.adminAuth,Starlinegamescontroller.starlineGamesCategory)
router.get('/add-starline-games-category/:id',Starlinegamescontroller.addStarlineGamesCategory)
router.get('/starline-games',Auth.adminAuth,Starlinegamescontroller.starlineGames)
router.get('/add-starline-games/:id',Starlinegamescontroller.addStarlineGames)

/////// Users Management Routs ///////////
router.get('/users-management',Auth.adminAuth,Userscontroller.usersManagement)

///// Game and Number Route //////////
router.get("/game-number-single-digit",GameAndNumberController.singleDigit)
router.get("/game-number-jodi-digit",GameAndNumberController.jodiDigit)
router.get("/game-number-single-pana",GameAndNumberController.singlePana)
router.get("/game-number-double-pana",GameAndNumberController.doublePana)
router.get("/game-number-triple-pana",GameAndNumberController.triplePana)
router.get("/game-number-half-sangam",GameAndNumberController.halfSangam)
router.get("/game-number-full-sangam",GameAndNumberController.fullSangam)






/////// Setting Management Routs ///////////
router.get('/setting-management',Auth.adminAuth,Settingmanagementcontroller.settingManagement)

/////// Sub Admin Management Routs ///////////
router.get('/sub-admin-management',Auth.adminAuth,Dashboardcontroller.subAdminManagement)
router.get('/add-sub-admin/:id',Dashboardcontroller.addSubAdmin)
router.post('/check-unique-username',Dashboardcontroller.checkUniqueUsername)
router.post('/submit-sub-admin',Dashboardcontroller.submitSubAdmin)
router.post('/sub-admin-list-grid-data',Dashboardcontroller.subAdminListGridData)
router.post('/sub-admin-list-grid-data/:any',Dashboardcontroller.subAdminListGridData)
router.post('/sub-admin-block-data-function',Dashboardcontroller.subAdminBlockDataFunction)


module.exports = router;
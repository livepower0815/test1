var admin = require("firebase-admin");
var serviceAccount = require("../project-0815-firebase-adminsdk-p86o9-f8cd831aaf.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-0815.firebaseio.com"
});

var db = admin.database();

module.exports = db;
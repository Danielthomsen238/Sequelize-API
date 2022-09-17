const express = require("express")
const app = express();
const PORT = process.env.PORT || 3123;

const { RoleRouter } = require("./Routes/role.router.js")
const { CourseRouter } = require("./Routes/course.router.js")
const { CategoryRouter } = require("./Routes/category.router.js")
const { SchoolRouter } = require("./Routes/school.router.js")
const { InitRouter } = require("./Routes/init.sequelize.router.js")
const { UserRouter } = require("./Routes/user.router.js")
const { AuthRouter } = require("./Routes/auth.router.js")



app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', "Content-Type, Authorization, Accept, Accept-Language, X-Authorization, X-Requested-With,content-type");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
}); app.use(express.json({ limit: "1mb" }));

app.use(InitRouter)
app.use(SchoolRouter)
app.use(RoleRouter)
app.use(UserRouter)
app.use(AuthRouter)
app.use(CourseRouter)
app.use(CategoryRouter)





app.listen(PORT, () => {
    console.log(`Listening on the port ${PORT}.`);
});

module.exports = { app }
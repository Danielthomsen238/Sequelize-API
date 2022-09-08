import express from "express"
const app = express();
const PORT = process.env.PORT || 3123;
import {router as SchoolRouter} from "./Routes/school.router.js"
import {router as CourseRouter} from "./Routes/course.router.js"
import {router as RoleRouter} from "./Routes/role.router.js"
import {router as CategoryRouter} from "./Routes/category.router.js"
import {router as InitRouter} from "./Routes/init.sequelize.router.js"
import {router as UserRouter} from "./Routes/user.router.js"
import {router as AuthRouter} from "./Routes/auth.router.js"



app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

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
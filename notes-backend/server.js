const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

async function startServer(){
    try{
        await MongoDB.connect(config.db.uri);
        console.log("Đã kết nối với cơ sở dữ liệu!");

        const PORT = config.app.port;
        app.listen(PORT, () =>{
            console.log(`Server đang chạy trên port ${PORT}`);
        });
    } catch (error){
        console.log("Không thể kết nối đến cơ sở dữ liệu!", error);
        process.exit();
    }
}

startServer();
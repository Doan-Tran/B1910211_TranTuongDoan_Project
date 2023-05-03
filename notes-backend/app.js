const express = require("express");
const notesRouter = require("./app/routes/note.route");
const contactsRouter = require("./app/routes/contact.route");
const cors = require("cors");
//Là một cơ chế cho phép hạn chế việc chia sẻ tài nguyên của một trang web đối với các trang web khác.
const ApiError = require("./app/api-error");
const bodyParser = require('body-parser');
//Là phần mềm trung gian node.js để xử lý dữ liệu biểu mẫu được mã hóa JSON, Raw, Text và URL.
const morgan = require('morgan');
//Là một phần mềm trung gian cho phép ta dễ dàng ghi lại các yêu cầu, lỗi và hơn thế nữa vào console.

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use("/api/notes", notesRouter);
app.use("/api/contacts",contactsRouter);

// handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Không tìm thấy tài nguyên"));
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
        message: err.message || "Lỗi máy chủ nội bộ",
    });
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to take note application."});
});
app.use("/api/notes", notesRouter);
app.use("/api/contacts",contactsRouter);

module.exports = app;
const NoteService = require("../services/note.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

//Create and Save a new Note
exports.create = async (req, res, next) => {
    if(!req.body?.name){
        return next(new ApiError(400, "Không để trống tên"));
    }

    try{
        const noteService = new NoteService(MongoDB.client);
        const document = await noteService.create(req.body);
        return res.send(document);
    } catch (error){
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi tạo ghi chú")
        );
    }
};

//Retrieve all notes of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const noteService = new NoteService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await noteService.findByName(name);
        } else {
            documents = await noteService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi tạo ghi chú")
        );
    }

    return res.send(documents);
};

//Find a single note with an id
exports.findOne = async (req, res, next) => {
    try {
        const noteService = new NoteService(MongoDB.client);
        const document = await noteService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Ghi chú không tìm thấy"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Lỗi khi truy xuất liên quan tới id=${req.params.id}`
            )
        );
    }
};

// Update a note by the id in the request 
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Không được để trống dữ liệu cần cập nhật"));
    }

    try{
        const noteService = new NoteService(MongoDB.client);
        const document = await noteService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy ghi chú"));
        }
        return res.send({ message: "Ghi chú đã được cập nhật thành công" });
    } catch (error) {
        return next(
            new ApiError(500, `Lỗi khi cập nhật liên quan tới id=${req.params.id}`)
        );
    }
};

// Delete a note with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const noteService = new NoteService(MongoDB.client);
        const document = await noteService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy ghi chú"));
        }
        return res.send({ message: "Ghi chú đã được xóa thành công"});
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Lỗi khi xóa liên quan tới id=${req.params.id}`
            )
        );
    }
};

// Find all favorite notes of a user
exports.findAllFavorite = async (_req, res, next) => {
    try {
        const noteService = new NoteService(MongoDB.client);
        const documents = await noteService.findFavorite();
        return res.send(documents);
    }   catch (error) {
        return next(
            new ApiError(
                500,
                "Đã xảy ra lỗi khi truy xuất ghi chú yêu thích"
            )
        );
    }
};

// Delete all notes of a user from the database
exports.deleteAll = async (_req, res, next) => {
    try {
        const noteService = new NoteService(MongoDB.client);
        const deletedCount = await noteService.deleteAll();
        return res.send({
            message: `${deletedCount} ghi chú đã được xóa thành công`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi xóa hết các ghi chú")
        );
    }
};
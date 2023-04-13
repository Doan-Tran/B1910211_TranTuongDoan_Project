const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

//Create and Save a new Contact
exports.create = async (req, res, next) => {
    if(!req.body?.name){
        return next(new ApiError(400, "Không để trống tên"));
    }

    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (error){
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi tạo liên hệ")
        );
    }
};

//Retrieve all contacts of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi tạo liên hệ")
        );
    }

    return res.send(documents);
};

//Find a single contact with an id
exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Liên hệ không tìm thấy"));
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

// Update a contact by the id in the request 
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Không được để trống dữ liệu cần cập nhật"));
    }

    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy liên hệ"));
        }
        return res.send({ message: "liên hệ đã được cập nhật thành công" });
    } catch (error) {
        return next(
            new ApiError(500, `Lỗi khi cập nhật liên quan tới id=${req.params.id}`)
        );
    }
};

// Delete a contact with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy liên hệ"));
        }
        return res.send({ message: "liên hệ đã được xóa thành công"});
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Lỗi khi xóa liên quan tới id=${req.params.id}`
            )
        );
    }
};

// Find all favorite contacts of a user
exports.findAllFavorite = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);
    }   catch (error) {
        return next(
            new ApiError(
                500,
                "Đã xảy ra lỗi khi truy xuất liên hệ yêu thích"
            )
        );
    }
};

// Delete all contacts of a user from the database
exports.deleteAll = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deletedCount = await contactService.deleteAll();
        return res.send({
            message: `${deletedCount} liên hệ đã được xóa thành công`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi xóa hết các liên hệ")
        );
    }
};
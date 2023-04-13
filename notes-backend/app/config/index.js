const config = {
    app: {
        port: process.env.PORT || 8081,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/notes"
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/contacts"
    }
};
module.exports = config;
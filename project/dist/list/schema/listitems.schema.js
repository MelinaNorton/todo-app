"use strict";
exports.__esModule = true;
exports.TodoItemSchema = void 0;
var mongoose_1 = require("mongoose");
exports.TodoItemSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    done: { type: Boolean, "default": false }
});
//# sourceMappingURL=listitems.schema.js.map
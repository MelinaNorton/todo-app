"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListSchema = void 0;
const mongoose_1 = require("mongoose");
const listitems_schema_1 = require("./listitems.schema");
exports.ListSchema = new mongoose_1.Schema({
    list: { type: [listitems_schema_1.TodoItemSchema], default: [] },
    user_id: { type: String, default: '' }
});
//# sourceMappingURL=list.schema.js.map
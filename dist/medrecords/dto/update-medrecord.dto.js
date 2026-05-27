"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMedrecordDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_medrecord_dto_1 = require("./create-medrecord.dto");
class UpdateMedrecordDto extends (0, mapped_types_1.PartialType)(create_medrecord_dto_1.CreateMedrecordDto) {
}
exports.UpdateMedrecordDto = UpdateMedrecordDto;
//# sourceMappingURL=update-medrecord.dto.js.map
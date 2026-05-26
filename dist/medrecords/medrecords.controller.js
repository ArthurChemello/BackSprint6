"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedrecordsController = void 0;
const common_1 = require("@nestjs/common");
const medrecords_service_1 = require("./medrecords.service");
const create_medrecord_dto_1 = require("./dto/create-medrecord.dto");
const update_medrecord_dto_1 = require("./dto/update-medrecord.dto");
let MedrecordsController = class MedrecordsController {
    constructor(medrecordsService) {
        this.medrecordsService = medrecordsService;
    }
    create(createMedrecordDto) {
        return this.medrecordsService.create(createMedrecordDto);
    }
    findAll() {
        return this.medrecordsService.findAll();
    }
    findOne(id) {
        return this.medrecordsService.findOne(+id);
    }
    update(id, updateMedrecordDto) {
        return this.medrecordsService.update(+id, updateMedrecordDto);
    }
    remove(id) {
        return this.medrecordsService.remove(+id);
    }
};
exports.MedrecordsController = MedrecordsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_medrecord_dto_1.CreateMedrecordDto]),
    __metadata("design:returntype", void 0)
], MedrecordsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MedrecordsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedrecordsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_medrecord_dto_1.UpdateMedrecordDto]),
    __metadata("design:returntype", void 0)
], MedrecordsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedrecordsController.prototype, "remove", null);
exports.MedrecordsController = MedrecordsController = __decorate([
    (0, common_1.Controller)('medrecords'),
    __metadata("design:paramtypes", [medrecords_service_1.MedrecordsService])
], MedrecordsController);
//# sourceMappingURL=medrecords.controller.js.map
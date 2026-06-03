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
exports.EvolutionsController = void 0;
const common_1 = require("@nestjs/common");
const evolutions_service_1 = require("./evolutions.service");
const create_evolution_dto_1 = require("./dto/create-evolution.dto");
const update_evolution_dto_1 = require("./dto/update-evolution.dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let EvolutionsController = class EvolutionsController {
    constructor(evolutionsService) {
        this.evolutionsService = evolutionsService;
    }
    create(createEvolutionDto) {
        return this.evolutionsService.create(createEvolutionDto);
    }
    findByPatient(patientId, doctorId) {
        return this.evolutionsService.findByPatient(patientId, doctorId);
    }
    findByDoctor(doctorId) {
        return this.evolutionsService.findByDoctor(doctorId);
    }
    findOne(id) {
        return this.evolutionsService.findOne(id);
    }
    update(id, updateEvolutionDto) {
        return this.evolutionsService.update(id, updateEvolutionDto);
    }
    remove(id) {
        return this.evolutionsService.remove(id);
    }
};
exports.EvolutionsController = EvolutionsController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_evolution_dto_1.CreateEvolutionDto]),
    __metadata("design:returntype", void 0)
], EvolutionsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('patient/:patientId'),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Query)('doctorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], EvolutionsController.prototype, "findByPatient", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('doctor/:doctorId'),
    __param(0, (0, common_1.Param)('doctorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EvolutionsController.prototype, "findByDoctor", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EvolutionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_evolution_dto_1.UpdateEvolutionDto]),
    __metadata("design:returntype", void 0)
], EvolutionsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EvolutionsController.prototype, "remove", null);
exports.EvolutionsController = EvolutionsController = __decorate([
    (0, common_1.Controller)('evolutions'),
    __metadata("design:paramtypes", [evolutions_service_1.EvolutionsService])
], EvolutionsController);
//# sourceMappingURL=evolutions.controller.js.map
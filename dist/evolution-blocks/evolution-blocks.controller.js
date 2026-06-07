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
exports.EvolutionBlocksController = void 0;
const common_1 = require("@nestjs/common");
const evolution_blocks_service_1 = require("./evolution-blocks.service");
const create_evolution_block_dto_1 = require("./dto/create-evolution-block.dto");
const update_evolution_block_dto_1 = require("./dto/update-evolution-block.dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const platform_express_1 = require("@nestjs/platform-express");
let EvolutionBlocksController = class EvolutionBlocksController {
    constructor(evolutionBlocksService) {
        this.evolutionBlocksService = evolutionBlocksService;
    }
    create(createEvolutionBlockDto, file) {
        return this.evolutionBlocksService.create(createEvolutionBlockDto, file);
    }
    findByEvolution(evolutionId) {
        return this.evolutionBlocksService.findByEvolution(evolutionId);
    }
    findOne(id) {
        return this.evolutionBlocksService.findOne(id);
    }
    update(id, updateEvolutionBlockDto, file) {
        return this.evolutionBlocksService.update(id, updateEvolutionBlockDto, file);
    }
    remove(id) {
        return this.evolutionBlocksService.remove(id);
    }
};
exports.EvolutionBlocksController = EvolutionBlocksController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_evolution_block_dto_1.CreateEvolutionBlockDto, Object]),
    __metadata("design:returntype", void 0)
], EvolutionBlocksController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('evolution/:evolutionId'),
    __param(0, (0, common_1.Param)('evolutionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EvolutionBlocksController.prototype, "findByEvolution", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EvolutionBlocksController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_evolution_block_dto_1.UpdateEvolutionBlockDto, Object]),
    __metadata("design:returntype", void 0)
], EvolutionBlocksController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EvolutionBlocksController.prototype, "remove", null);
exports.EvolutionBlocksController = EvolutionBlocksController = __decorate([
    (0, common_1.Controller)('evolution-blocks'),
    __metadata("design:paramtypes", [evolution_blocks_service_1.EvolutionBlocksService])
], EvolutionBlocksController);
//# sourceMappingURL=evolution-blocks.controller.js.map
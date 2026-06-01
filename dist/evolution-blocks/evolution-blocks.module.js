"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvolutionBlocksModule = void 0;
const common_1 = require("@nestjs/common");
const evolution_blocks_service_1 = require("./evolution-blocks.service");
const evolution_blocks_controller_1 = require("./evolution-blocks.controller");
const upload_module_1 = require("../upload/upload.module");
const auth_module_1 = require("../auth/auth.module");
let EvolutionBlocksModule = class EvolutionBlocksModule {
};
exports.EvolutionBlocksModule = EvolutionBlocksModule;
exports.EvolutionBlocksModule = EvolutionBlocksModule = __decorate([
    (0, common_1.Module)({
        imports: [upload_module_1.UploadModule, auth_module_1.AuthModule],
        controllers: [evolution_blocks_controller_1.EvolutionBlocksController],
        providers: [evolution_blocks_service_1.EvolutionBlocksService],
        exports: [evolution_blocks_service_1.EvolutionBlocksService],
    })
], EvolutionBlocksModule);
//# sourceMappingURL=evolution-blocks.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvolutionsModule = void 0;
const common_1 = require("@nestjs/common");
const evolutions_service_1 = require("./evolutions.service");
const evolutions_controller_1 = require("./evolutions.controller");
const auth_module_1 = require("../auth/auth.module");
let EvolutionsModule = class EvolutionsModule {
};
exports.EvolutionsModule = EvolutionsModule;
exports.EvolutionsModule = EvolutionsModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        controllers: [evolutions_controller_1.EvolutionsController],
        providers: [evolutions_service_1.EvolutionsService],
        exports: [evolutions_service_1.EvolutionsService],
    })
], EvolutionsModule);
//# sourceMappingURL=evolutions.module.js.map
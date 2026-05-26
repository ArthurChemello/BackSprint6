"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const doctors_controller_1 = require("./doctors.controller");
const doctors_service_1 = require("./doctors.service");
describe('DoctorsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [doctors_controller_1.DoctorsController],
            providers: [doctors_service_1.DoctorsService],
        }).compile();
        controller = module.get(doctors_controller_1.DoctorsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=doctors.controller.spec.js.map
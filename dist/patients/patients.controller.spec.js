"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const patients_controller_1 = require("./patients.controller");
const patients_service_1 = require("./patients.service");
describe('PatientsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [patients_controller_1.PatientsController],
            providers: [patients_service_1.PatientsService],
        }).compile();
        controller = module.get(patients_controller_1.PatientsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=patients.controller.spec.js.map
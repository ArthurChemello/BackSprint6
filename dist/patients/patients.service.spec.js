"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const patients_service_1 = require("./patients.service");
describe('PatientsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [patients_service_1.PatientsService],
        }).compile();
        service = module.get(patients_service_1.PatientsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=patients.service.spec.js.map
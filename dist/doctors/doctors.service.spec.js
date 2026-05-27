"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const doctors_service_1 = require("./doctors.service");
describe('DoctorsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [doctors_service_1.DoctorsService],
        }).compile();
        service = module.get(doctors_service_1.DoctorsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=doctors.service.spec.js.map
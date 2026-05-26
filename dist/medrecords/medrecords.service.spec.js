"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const medrecords_service_1 = require("./medrecords.service");
describe('MedrecordsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [medrecords_service_1.MedrecordsService],
        }).compile();
        service = module.get(medrecords_service_1.MedrecordsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=medrecords.service.spec.js.map
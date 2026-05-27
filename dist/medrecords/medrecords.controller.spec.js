"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const medrecords_controller_1 = require("./medrecords.controller");
const medrecords_service_1 = require("./medrecords.service");
describe('MedrecordsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [medrecords_controller_1.MedrecordsController],
            providers: [medrecords_service_1.MedrecordsService],
        }).compile();
        controller = module.get(medrecords_controller_1.MedrecordsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=medrecords.controller.spec.js.map
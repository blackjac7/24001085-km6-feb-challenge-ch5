const carSpecRepo = require("../../repositories/car_spec");
const specRepo = require("../../repositories/spec");

exports.getAllCarSpecs = async () => {
    const data = await carSpecRepo.getAllCarSpecs();

    return data;
};

exports.getCarSpecById = async (id) => {
    const data = await carSpecRepo.getCarSpecById(id);

    return data;
};

exports.createCarSpec = async (payload) => {
    const existingSpec = await specRepo.getSpecById(payload.spec_id);

    if (!existingSpec) {
        throw {
            statusCode: 404,
            message: `Spec with id ${payload.spec_id} not found`,
        };
    }

    const existingCarSpec = await carSpecRepo.getCarSpecBySpecId(
        payload.car_id,
        payload.spec_id
    );

    if (existingCarSpec) {
        throw {
            statusCode: 400,
            message: "Car spec with the same car_id and spec_id already exists",
        };
    }

    const data = await carSpecRepo.createCarSpec(payload);

    return data;
};

exports.updateCarSpec = async (id, payload) => {
    await carSpecRepo.getCarSpecById(id);

    if (payload.spec_id) {
        const existingSpec = await specRepo.getSpecById(payload.spec_id);

        if (!existingSpec) {
            throw {
                statusCode: 404,
                message: `Spec with id ${payload.spec_id} not found`,
            };
        }
    }

    const data = await carSpecRepo.updateCarSpec(id, payload);

    return data;
};

exports.deleteCarSpec = async (id) => {
    await carSpecRepo.getCarSpecById(id);

    const data = await carSpecRepo.deleteCarSpec(id);

    return data;
};

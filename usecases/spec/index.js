const specRepo = require("../../repositories/spec");

exports.getAllSpecs = async () => {
    const data = await specRepo.getAllSpecs();

    return data;
};

exports.getSpecById = async (id) => {
    const data = await specRepo.getSpecById(id);

    return data;
};

exports.createSpec = async (payload) => {
    const existingSpec = await specRepo.getSpecByName(payload.name);

    if (existingSpec) {
        throw {
            statusCode: 409,
            message: `Spec with name ${payload.name} already exists`,
        };
    }

    const data = await specRepo.createSpec(payload);

    return data;
};

exports.updateSpec = async (id, payload) => {
    await specRepo.getSpecById(id);

    const existingSpec = await specRepo.getSpecByName(payload.name);

    if (existingSpec && existingSpec.id !== id) {
        throw {
            statusCode: 409,
            message: `Spec with name ${payload.name} already exists`,
        };
    }

    const data = await specRepo.updateSpec(id, payload);

    return data;
};

exports.deleteSpec = async (id) => {
    await specRepo.getSpecById(id);

    const data = await specRepo.deleteSpec(id);

    return data;
};

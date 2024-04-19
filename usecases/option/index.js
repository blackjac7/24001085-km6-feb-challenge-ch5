const optionRepo = require("../../repositories/option");

exports.getAllOptions = async () => {
    const data = await optionRepo.getAllOptions();

    return data;
};

exports.getOptionById = async (id) => {
    const data = await optionRepo.getOptionById(id);

    return data;
};

exports.createOption = async (payload) => {
    const existingOption = await optionRepo.getOptionByName(payload.name);

    if (existingOption) {
        throw {
            statusCode: 409,
            message: `Option with name ${payload.name} already exists`,
        };
    }

    const data = await optionRepo.createOption(payload);

    return data;
};

exports.updateOption = async (id, payload) => {
    await optionRepo.getOptionById(id);

    const existingOption = await optionRepo.getOptionByName(payload.name);

    if (existingOption && existingOption.id !== id) {
        throw {
            statusCode: 409,
            message: `Option with name ${payload.name} already exists`,
        };
    }

    const data = await optionRepo.updateOption(id, payload);

    return data;
};

exports.deleteOption = async (id) => {
    await optionRepo.getOptionById(id);

    const data = await optionRepo.deleteOption(id);

    return data;
};

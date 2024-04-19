const carOptionRepo = require("../../repositories/car_option");
const optionRepo = require("../../repositories/option");

exports.getAllCarOptions = async () => {
    const data = await carOptionRepo.getAllCarOptions();

    return data;
};

exports.getCarOptionById = async (id) => {
    const data = await carOptionRepo.getCarOptionById(id);

    return data;
};

exports.createCarOption = async (payload) => {
    const existingOption = await optionRepo.getOptionById(payload.option_id);

    if (!existingOption) {
        throw {
            statusCode: 404,
            message: `Option with id ${payload.option_id} not found`,
        };
    }

    const existingCarOption = await carOptionRepo.getCarOptionByOptionId(
        payload.car_id,
        payload.option_id
    );

    if (existingCarOption) {
        throw {
            statusCode: 400,
            message:
                "Car option with the same car_id and option_id already exists",
        };
    }

    const data = await carOptionRepo.createCarOption(payload);

    return data;
};

exports.updateCarOption = async (id, payload) => {
    await carOptionRepo.getCarOptionById(id);

    if (payload.option_id) {
        const existingOption = await optionRepo.getOptionById(
            payload.option_id
        );

        if (!existingOption) {
            throw {
                statusCode: 404,
                message: `Option with id ${payload.option_id} not found`,
            };
        }
    }

    const data = await carOptionRepo.updateCarOption(id, payload);

    return data;
};

exports.deleteCarOption = async (id) => {
    await carOptionRepo.getCarOptionById(id);

    const data = await carOptionRepo.deleteCarOption(id);

    return data;
};

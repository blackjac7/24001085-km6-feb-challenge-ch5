const carRepo = require("../../repositories/car");

exports.getAllCars = async () => {
    const data = await carRepo.getAllCars();

    return data;
};

exports.getCarById = async (id) => {
    const data = await carRepo.getCarById(id);

    return data;
};

exports.getAllCarOptions = async (id) => {
    console.log("id", id);
    const data = await carRepo.getAllCarOptions(id);

    return data;
};

exports.getAllCarSpecs = async (id) => {
    const data = await carRepo.getAllCarSpecs(id);

    return data;
};

exports.createCar = async (payload) => {
    const existingCar = await carRepo.getCarByPlate(payload.plate);
    if (existingCar) {
        throw {
            statusCode: 400,
            message: "A car with this plate already exists",
        };
    }

    const data = await carRepo.createCar(payload);

    return data;
};

exports.updateCar = async (id, payload) => {
    await carRepo.getCarById(id);

    if (payload.plate) {
        const existingCar = await carRepo.getCarByPlate(payload.plate);
        if (existingCar && existingCar.id !== id) {
            throw {
                statusCode: 400,
                message: "A car with this plate already exists",
            };
        }
    }

    const data = await carRepo.updateCar(id, payload);

    return data;
};

exports.deleteCar = async (id) => {
    await carRepo.getCarById(id);

    const data = await carRepo.deleteCar(id);

    return data;
};

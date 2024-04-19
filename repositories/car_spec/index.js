const { Car_specs } = require("../../models");
const {
    getFromCache,
    saveToCache,
    removeFromCache,
} = require("../../helpers/redis");

exports.getAllCarSpecs = async () => {
    const data = await Car_specs.findAll();

    if (!data || data.length === 0) {
        throw { statusCode: 404, message: "No car_specs found" };
    }

    return data;
};

exports.getCarSpecById = async (id) => {
    const key = `car_spec:${id}`;
    const cache = await getFromCache(key);

    if (cache) {
        return cache;
    }

    const data = await Car_specs.findByPk(id);

    if (!data) {
        throw {
            statusCode: 404,
            message: `Car_spec with id ${id} not found`,
        };
    }

    await saveToCache(key, data, 300);

    return data;
};

exports.getCarSpecBySpecId = async (car_id, spec_id) => {
    const opt = {
        where: { car_id, spec_id },
    };

    const data = await Car_specs.findOne(opt);

    return data;
};

exports.createCarSpec = async (carSpec) => {
    const data = await Car_specs.create(carSpec);

    const key = `car_spec:${data.id}`;
    await saveToCache(key, data, 300);

    return data;
};

exports.updateCarSpec = async (id, carSpec) => {
    const opt = {
        where: { id },
        returning: true,
    };

    const data = await Car_specs.update(carSpec, opt);

    if (data[0] === 1) {
        const key = `car_spec:${id}`;
        await saveToCache(key, data[1][0], 300);
    }

    return data[1][0];
};

exports.deleteCarSpec = async (id) => {
    const opt = {
        where: { id },
    };

    const data = await Car_specs.destroy(opt);

    const key = `car_spec:${id}`;
    await removeFromCache(key);

    return data;
};

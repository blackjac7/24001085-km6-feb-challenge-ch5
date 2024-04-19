const { Car_option } = require("../../models");
const {
    getFromCache,
    saveToCache,
    removeFromCache,
} = require("../../helpers/redis");

exports.getAllCarOptions = async () => {
    const data = await Car_option.findAll();

    if (!data || data.length === 0) {
        throw { statusCode: 404, message: "No car_options found" };
    }

    return data;
};

exports.getCarOptionById = async (id) => {
    const key = `car_option:${id}`;
    const cache = await getFromCache(key);

    if (cache) {
        return cache;
    }

    const data = await Car_option.findByPk(id);

    if (!data) {
        throw {
            statusCode: 404,
            message: `Car_option with id ${id} not found`,
        };
    }

    await saveToCache(key, data, 300);

    return data;
};

exports.getCarOptionByOptionId = async (car_id, option_id) => {
    const opt = {
        where: { car_id, option_id },
    };

    const data = await Car_option.findOne(opt);

    return data;
};

exports.createCarOption = async (payload) => {
    const data = await Car_option.create(payload);

    const key = `car_option:${data.id}`;
    await saveToCache(key, data, 300);

    return data;
};

exports.updateCarOption = async (id, payload) => {
    const opt = {
        where: { id },
        returning: true,
    };

    const data = await Car_option.update(payload, opt);

    if (data[0] === 1) {
        const key = `car_option:${id}`;
        await saveToCache(key, data[1][0], 300);
    }

    return data[1][0];
};

exports.deleteCarOption = async (id) => {
    const opt = {
        where: { id },
    };

    const data = await Car_option.destroy(opt);

    const key = `car_option:${id}`;
    await removeFromCache(key);

    return data;
};

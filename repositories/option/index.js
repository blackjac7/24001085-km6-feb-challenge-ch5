const { Option } = require("../../models");
const {
    getFromCache,
    saveToCache,
    removeFromCache,
} = require("../../helpers/redis");

exports.getAllOptions = async () => {
    const data = await Option.findAll();

    if (!data || data.length === 0) {
        throw { statusCode: 404, message: "No options found" };
    }

    return data;
};

exports.getOptionById = async (id) => {
    const key = `option:${id}`;
    const cache = await getFromCache(key);

    if (cache) {
        return cache;
    }

    const opt = {
        include: ["cars"],
    };

    const data = await Option.findByPk(id, opt);

    if (!data) {
        throw { statusCode: 404, message: `Option with id ${id} not found` };
    }

    await saveToCache(key, data, 300);

    return data;
};

exports.getOptionByName = async (name) => {
    const opt = {
        where: { name },
    };

    const data = await Option.findOne(opt);

    return data;
};

exports.createOption = async (payload) => {
    const data = await Option.create(payload);

    const key = `option:${data.id}`;
    await saveToCache(key, data, 300);

    return data;
};

exports.updateOption = async (id, payload) => {
    const opt = {
        where: { id },
        returning: true,
    };

    const data = await Option.update(payload, opt);

    if (data[0] === 1) {
        const key = `option:${id}`;
        await saveToCache(key, data[1][0], 300);
    }

    return data[1][0];
};

exports.deleteOption = async (id) => {
    const opt = {
        where: { id },
    };

    const data = await Option.destroy(opt);

    const key = `option:${id}`;
    await removeFromCache(key);

    return data;
};

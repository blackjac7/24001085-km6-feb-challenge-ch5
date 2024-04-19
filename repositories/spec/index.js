const { Spec } = require("../../models");
const {
    getFromCache,
    saveToCache,
    removeFromCache,
} = require("../../helpers/redis");

exports.getAllSpecs = async () => {
    const data = await Spec.findAll();

    if (!data || data.length === 0) {
        throw { statusCode: 404, message: "No specs found" };
    }

    return data;
};

exports.getSpecById = async (id) => {
    const key = `spec:${id}`;
    const cache = await getFromCache(key);

    if (cache) {
        return cache;
    }

    const opt = {
        include: ["cars"],
    };

    const data = await Spec.findByPk(id, opt);

    if (!data) {
        throw { statusCode: 404, message: `Spec with id ${id} not found` };
    }

    await saveToCache(key, data, 300);

    return data;
};

exports.getSpecByName = async (name) => {
    const opt = {
        where: { name },
    };

    const data = await Spec.findOne(opt);

    return data;
};

exports.createSpec = async (payload) => {
    const data = await Spec.create(payload);

    const key = `spec:${data.id}`;
    await saveToCache(key, data, 300);

    return data;
};

exports.updateSpec = async (id, payload) => {
    const opt = {
        where: { id },
        returning: true,
    };

    const data = await Spec.update(payload, opt);

    if (data[0] === 1) {
        const key = `spec:${id}`;
        await saveToCache(key, data[1][0], 300);
    }

    return data[1][0];
};

exports.deleteSpec = async (id) => {
    const opt = {
        where: { id },
    };

    const data = await Spec.destroy(opt);

    const key = `spec:${id}`;
    await removeFromCache(key);

    return data;
};

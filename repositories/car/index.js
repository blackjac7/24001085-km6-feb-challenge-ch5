const crypto = require("crypto");
const path = require("path");
const { Car } = require("../../models");
const {
    getFromCache,
    saveToCache,
    removeFromCache,
} = require("../../helpers/redis");
const { uploader } = require("../../helpers/cloudinary");

exports.getAllCars = async () => {
    const opt = {
        include: ["options", "specs"],
    };

    const data = await Car.findAll(opt);

    if (!data || data.length === 0) {
        throw { statusCode: 404, message: "No cars found" };
    }

    return data;
};

exports.getAllCarOptions = async (id) => {
    const car = await Car.findByPk(id);

    if (!car) {
        throw {
            statusCode: 404,
            message: `Car with id ${car_id} not found`,
        };
    }

    const options = await car.getOptions();

    if (!options || options.length === 0) {
        throw { statusCode: 404, message: "No options found" };
    }

    return options;
};

exports.getAllCarSpecs = async (id) => {
    const car = await Car.findByPk(id);

    if (!car) {
        throw {
            statusCode: 404,
            message: `Car with id ${car_id} not found`,
        };
    }

    const specs = await car.getSpecs();

    if (!specs || specs.length === 0) {
        throw { statusCode: 404, message: "No specs found" };
    }

    return specs;
};

exports.getCarById = async (id) => {
    const key = `car:${id}`;
    const cache = await getFromCache(key);

    if (cache) {
        return cache;
    }

    const opt = {
        include: ["options", "specs"],
    };

    const data = await Car.findByPk(id, opt);

    if (!data) {
        throw { statusCode: 404, message: `Car with id ${id} not found` };
    }

    await saveToCache(key, data, 300);

    return data;
};

exports.getCarByPlate = async (plate) => {
    const opt = {
        where: { plate },
    };

    const data = await Car.findOne(opt);

    return data;
};

exports.createCar = async (payload) => {
    if (payload.image) {
        const { image } = payload;

        image.publicId = crypto.randomBytes(16).toString("hex");

        image.name = `${image.publicId}${path.parse(image.name).ext}`;

        const imageUpload = await uploader(image);
        payload.image = imageUpload.secure_url;
    }

    const data = await Car.create(payload);

    const key = `car:${data.id}`;
    await saveToCache(key, data, 300);

    return data;
};

exports.updateCar = async (id, payload) => {
    const opt = {
        where: { id },
        returning: true,
    };

    const data = await Car.update(payload, opt);

    if (data[0] === 1) {
        const key = `car:${id}`;
        await saveToCache(key, data[1][0], 300);
    }

    return data[1][0];
};

exports.deleteCar = async (id) => {
    const opt = {
        where: { id },
    };

    const data = await Car.destroy(opt);

    const key = `car:${id}`;
    await removeFromCache(key);

    return data;
};

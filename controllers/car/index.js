const carUsecase = require("../../usecases/car");
const { validateCar } = require("../../helpers/validations");

exports.getAllCars = async (req, res, next) => {
    try {
        const data = await carUsecase.getAllCars();

        res.status(200).json({
            message: "Cars retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getCarById = async (req, res, next) => {
    try {
        const id = +req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const data = await carUsecase.getCarById(id);

        res.status(200).json({
            message: "Car retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllCarOptions = async (req, res, next) => {
    try {
        const id = +req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const data = await carUsecase.getAllCarOptions(id);

        res.status(200).json({
            message: "Car options retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllCarSpecs = async (req, res, next) => {
    try {
        const id = +req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const data = await carUsecase.getAllCarSpecs(id);

        res.status(200).json({
            message: "Car specs retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createCar = async (req, res, next) => {
    try {
        let payload = req.body;
        const { image } = req.files;

        if (!payload) {
            throw { statusCode: 400, message: "Invalid payload" };
        }

        payload.rent_per_day = +payload.rent_per_day;
        payload.capacity = +payload.capacity;
        if (payload.available === "true" || payload.available === "false") {
            payload.available = payload.available === "true";
        }
        payload.year = +payload.year;
        payload.availableAt = new Date(payload.availableAt);

        payload = {
            ...payload,
            image,
        };

        validateCar(payload);

        const data = await carUsecase.createCar(payload);

        res.status(201).json({
            message: "Car created successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateCar = async (req, res, next) => {
    try {
        const id = +req.params.id;
        const payload = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        payload.rent_per_day = +payload.rent_per_day;
        payload.capacity = +payload.capacity;
        if (payload.available === "true" || payload.available === "false") {
            payload.available = payload.available === "true";
        }
        payload.year = +payload.year;
        payload.availableAt = new Date(payload.availableAt);

        validateCar(payload);

        const data = await carUsecase.updateCar(id, payload);

        res.status(200).json({
            message: "Car updated successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteCar = async (req, res, next) => {
    try {
        const id = +req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        await carUsecase.deleteCar(id);

        res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
        next(error);
    }
};

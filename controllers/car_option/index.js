const carOptionUsecase = require("../../usecases/car_option");

exports.getAllCarOptions = async (req, res, next) => {
    try {
        const data = await carOptionUsecase.getAllCarOptions();

        res.status(200).json({
            message: "Car options retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getCarOptionById = async (req, res, next) => {
    try {
        const id = +req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const data = await carOptionUsecase.getCarOptionById(id);

        res.status(200).json({
            message: "Car option retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createCarOption = async (req, res, next) => {
    try {
        const payload = req.body;

        if (!payload) {
            return res.status(400).json({ message: "Invalid payload" });
        }

        if (!payload.car_id || !payload.option_id) {
            return res
                .status(400)
                .json({ message: "Car id and option id are required" });
        }

        if (
            typeof payload.car_id !== "number" ||
            typeof payload.option_id !== "number"
        ) {
            return res
                .status(400)
                .json({ message: "Car id and option id must be a number" });
        }

        const data = await carOptionUsecase.createCarOption(payload);

        res.status(201).json({
            message: "Car option created successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateCarOption = async (req, res, next) => {
    try {
        const id = +req.params.id;
        const payload = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        if (!payload) {
            return res.status(400).json({ message: "Invalid payload" });
        }

        if (!payload.car_id || !payload.option_id) {
            return res
                .status(400)
                .json({ message: "Car id and option id are required" });
        }

        if (
            typeof payload.car_id !== "number" ||
            typeof payload.option_id !== "number"
        ) {
            return res
                .status(400)
                .json({ message: "Car id and option id must be a number" });
        }

        const data = await carOptionUsecase.updateCarOption(id, payload);

        res.status(200).json({
            message: "Car option updated successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteCarOption = async (req, res, next) => {
    try {
        const id = +req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        await carOptionUsecase.deleteCarOption(id);

        res.status(200).json({
            message: "Car option deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

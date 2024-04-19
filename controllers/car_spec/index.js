const carSpecUsecase = require("../../usecases/car_spec");

exports.getAllCarSpecs = async (req, res, next) => {
    try {
        const data = await carSpecUsecase.getAllCarSpecs();

        res.status(200).json({
            message: "Car specs retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getCarSpecById = async (req, res, next) => {
    try {
        const id = +req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const data = await carSpecUsecase.getCarSpecById(id);

        res.status(200).json({
            message: "Car spec retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createCarSpec = async (req, res, next) => {
    try {
        const payload = req.body;

        if (!payload) {
            return res.status(400).json({ message: "Invalid payload" });
        }

        if (!payload.car_id || !payload.spec_id) {
            return res
                .status(400)
                .json({ message: "Car id and spec id are required" });
        }

        if (
            typeof payload.car_id !== "number" ||
            typeof payload.spec_id !== "number"
        ) {
            return res
                .status(400)
                .json({ message: "Car id and spec id must be a number" });
        }

        const data = await carSpecUsecase.createCarSpec(payload);

        res.status(201).json({
            message: "Car spec created successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateCarSpec = async (req, res, next) => {
    try {
        const id = +req.params.id;
        const payload = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        if (!payload) {
            return res.status(400).json({ message: "Invalid payload" });
        }

        if (!payload.car_id || !payload.spec_id) {
            return res
                .status(400)
                .json({ message: "Car id and spec id are required" });
        }

        if (
            typeof payload.car_id !== "number" ||
            typeof payload.spec_id !== "number"
        ) {
            return res
                .status(400)
                .json({ message: "Car id and spec id must be a number" });
        }

        const data = await carSpecUsecase.updateCarSpec(id, payload);

        res.status(200).json({
            message: "Car spec updated successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteCarSpec = async (req, res, next) => {
    try {
        const id = +req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const data = await carSpecUsecase.deleteCarSpec(id);

        res.status(200).json({
            message: "Car spec deleted successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

const optionUsecase = require("../../usecases/option");

exports.getAllOptions = async (req, res, next) => {
    try {
        const data = await optionUsecase.getAllOptions();

        res.status(200).json({
            message: "Options retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getOptionById = async (req, res, next) => {
    try {
        const id = +req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const data = await optionUsecase.getOptionById(id);

        res.status(200).json({
            message: "Option retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createOption = async (req, res, next) => {
    try {
        const payload = req.body;

        if (!payload) {
            return res.status(400).json({ message: "Invalid payload" });
        }

        if (!payload.name) {
            return res.status(400).json({ message: "Name are required" });
        }

        const data = await optionUsecase.createOption(payload);

        res.status(201).json({
            message: "Option created successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateOption = async (req, res, next) => {
    try {
        const id = +req.params.id;
        const payload = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        if (!payload) {
            return res.status(400).json({ message: "Invalid payload" });
        }

        if (!payload.name) {
            return res.status(400).json({ message: "Name are required" });
        }

        const data = await optionUsecase.updateOption(id, payload);

        res.status(200).json({
            message: "Option updated successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteOption = async (req, res, next) => {
    try {
        const id = +req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        await optionUsecase.deleteOption(id);

        res.status(200).json({
            message: "Option deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

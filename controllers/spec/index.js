const specUsecase = require("../../usecases/spec");

exports.getAllSpecs = async (req, res, next) => {
    try {
        const data = await specUsecase.getAllSpecs();

        res.status(200).json({
            message: "Specs retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getSpecById = async (req, res, next) => {
    try {
        const id = +req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const data = await specUsecase.getSpecById(id);

        res.status(200).json({
            message: "Spec retrieved successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createSpec = async (req, res, next) => {
    try {
        const payload = req.body;

        if (!payload) {
            return res.status(400).json({ message: "Invalid payload" });
        }

        if (!payload.name) {
            return res.status(400).json({ message: "Name are required" });
        }

        const data = await specUsecase.createSpec(payload);

        res.status(201).json({
            message: "Spec created successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateSpec = async (req, res, next) => {
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

        const data = await specUsecase.updateSpec(id, payload);

        res.status(200).json({
            message: "Spec updated successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteSpec = async (req, res, next) => {
    try {
        const id = +req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        await specUsecase.deleteSpec(id);

        res.status(200).json({
            message: "Spec deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

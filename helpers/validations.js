exports.validateCar = (payload) => {
    const {
        plate,
        manufacture,
        model,
        image,
        rent_per_day,
        capacity,
        description,
        transmission,
        available,
        type,
        year,
        availableAt,
    } = payload;

    if (!plate || typeof plate !== "string") {
        throw {
            statusCode: 400,
            message: "Plate is required and must be a string",
        };
    }

    if (!manufacture || typeof manufacture !== "string") {
        throw {
            statusCode: 400,
            message: "Manufacture is required and must be a string",
        };
    }

    if (!model || typeof model !== "string") {
        throw {
            statusCode: 400,
            message: "Model is required and must be a string",
        };
    }

    if (!rent_per_day || typeof rent_per_day !== "number") {
        throw {
            statusCode: 400,
            message: "Rent per day is required and must be a number.",
        };
    }

    if (!capacity || typeof capacity !== "number") {
        throw {
            statusCode: 400,
            message: "Capacity is required and must be a number.",
        };
    }

    if (description && typeof description !== "string") {
        throw { statusCode: 400, message: "Description must be a string." };
    }

    if (!transmission || typeof transmission !== "string") {
        throw {
            statusCode: 400,
            message: "Transmission is required and must be a string",
        };
    }

    if (available === undefined || typeof available !== "boolean") {
        throw {
            statusCode: 400,
            message: "Availability is required and must be a boolean.",
        };
    }

    if (!type || typeof type !== "string") {
        throw {
            statusCode: 400,
            message: "Type is required and must be a string",
        };
    }

    if (!year || typeof year !== "number") {
        throw {
            statusCode: 400,
            message: "Year is required and must be a number.",
        };
    }

    if (availableAt && !(availableAt instanceof Date)) {
        throw { statusCode: 400, message: "AvailableAt must be a valid date." };
    }
};

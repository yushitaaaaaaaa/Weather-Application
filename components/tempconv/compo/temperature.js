
const UNITS = {
    cel: "C",
    farh: "F"
};

function convertTempTo(temp, unitTo) {
    if (unitTo === UNITS.cel) {
        return ((temp - 32) / 1.8).toFixed(2); // Converts to Celsius
    } else if (unitTo === UNITS.farh) {
        return (temp * 1.8 + 32).toFixed(2); // Converts to Fahrenheit
    } else {
        throw new Error("Invalid Unit...");
    }
}

function getOppositeUnit(currentUnit) {
    return currentUnit === UNITS.cel ? UNITS.farh : UNITS.cel;
}

export { UNITS, convertTempTo, getOppositeUnit };

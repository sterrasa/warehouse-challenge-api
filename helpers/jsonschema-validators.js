const Validator = require('jsonschema').Validator;

const productsSchema = {
    "type": "object",
    "properties": {
        "products": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": { "type": "string" },
                    "price": { "type": "string" },
                    "contain_articles": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "art_id": { "type": "string" },
                                "amount_of": { "type": "string" }
                            },
                            "required": ["art_id", "amount_of"]
                        }
                    }
                },
                "required": ["name", "price", "contain_articles"]
            }
        }
    },
    "required": ["products"]
}

const inventorySchema = {
    "type": "object",
    "properties": {
        "inventory": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "art_id": { "type": "string" },
                    "name": { "type": "string" },
                    "stock": { "type": "string" }
                },
                "required": ["art_id", "name", "stock"]
            }
        }
    },
    "required": ["inventory"]
}

const validateInventorySchema = jsonFile => {
    const v = new Validator();
    return v.validate(jsonFile, inventorySchema);
}

const validateProductSchema = jsonFile => {
    const v = new Validator();
    return v.validate(jsonFile, productsSchema);
}

module.exports = { validateProductSchema, validateInventorySchema }


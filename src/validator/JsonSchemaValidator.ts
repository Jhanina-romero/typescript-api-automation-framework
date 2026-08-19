import Ajv, { JSONSchemaType, ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';

export class JsonSchemaValidator {
    private readonly ajv: Ajv;

    constructor() {
        this.ajv = new Ajv({allErrors: true});
        addFormats(this.ajv);
    }

    validate<T>(data: T,schema: object): void {
        const validate: ValidateFunction = this.ajv.compile(schema);
        const valid = validate(data);

        if (!valid) {
            throw new Error(
                `JSON Schema validation failed:\n${JSON.stringify(
                    validate.errors,
                    null,
                    2
                )}`
            );
        }
    }
}
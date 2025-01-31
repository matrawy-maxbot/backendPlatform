import { object } from 'joi';

const validate = (data, schemaConfig) => {
    if(!schemaConfig) { 
        throw new Error('Schema is required for validation');
    }
    const schema = object(schemaConfig);
    return schema.validate(data);
};

export default { validate };

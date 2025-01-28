import { object, string } from 'joi';

// تعريف Schema للتحقق من الإعدادات
const kafkaSchema = object({
  KAFKA_BROKER: string().required(),
  KAFKA_CLIENT_ID: string().required(),
  KAFKA_GROUP_ID: string().required(),
}).unknown();

const { value: kafkaConfig, error } = kafkaSchema.validate(process.env, {
  abortEarly: false,
});

if (error) {
  throw new Error(
    `Kafka configuration validation error: ${error.details.map((x) => x.message).join(', ')}`
  );
}

export const {
  KAFKA_BROKER,
  KAFKA_CLIENT_ID,
  KAFKA_GROUP_ID,
} = kafkaConfig;


import { object, string, number } from 'joi';

// تعريف Schema للتحقق من الإعدادات
const fileStorageSchema = object({
  FILE_STORAGE_PATH: string().required(),
  MAX_FILE_SIZE: number().integer().min(1).required(),
}).unknown(); // السماح بمتغيرات إضافية

// التحقق من القيم
const { value: fileStorageConfig, error } = fileStorageSchema.validate(process.env, {
  abortEarly: false,
});

if (error) {
  throw new Error(
    `File Storage configuration validation error: ${error.details.map((x) => x.message).join(', ')}`
  );
}

export const storagePath = fileStorageConfig.FILE_STORAGE_PATH;
export const maxFileSize = fileStorageConfig.MAX_FILE_SIZE;

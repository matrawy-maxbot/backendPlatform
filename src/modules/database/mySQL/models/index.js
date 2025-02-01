import sequelize from '../config/db.config.js';
import User from './User.model.js';

// تعريف العلاقات بين الـ Models هنا (لو في علاقات)
// User.hasMany(Product, { foreignKey: 'userId' });
// Product.belongsTo(User, { foreignKey: 'userId' });

// Sync كل الـ Models مع قاعدة البيانات
sequelize.sync().then(() => {
  console.log('All models were synchronized successfully.');
});

export { User };
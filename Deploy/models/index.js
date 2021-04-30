const User = require('./User');
const post = require('./post');

User.hasMany(post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

post.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, post };

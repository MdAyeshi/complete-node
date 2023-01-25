const app = require("./app");
const Product = require('./models/product');
const User = require('./models/user');
const sequelize = require('./database/database');
const Cart = require("./models/cart");
const CartItem = require("./models/cart-items");

if (process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}

// association/relation in database
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
let userRef = null;

const port = process.env.PORT || 3000;

sequelize
// .sync({force: true})
.sync()
.then(result => User.findByPk(1))
.then(user => {
  if(!user){
    return User.create({name:"Max", email: "mail@mail.com", "password": "12345"})
  }
  return user;
})
.then(user => {
  userRef = user
  return user.getCart()
})
.then(cart => {
  if(!cart)
    return userRef.createCart();
  return cart;
})
.then(cart => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})
.catch(error => console.log(error));

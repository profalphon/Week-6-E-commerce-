const bcrypt = require("bcryptjs");
const users = require("../model/user");

// To get all created users
const getUser = (req, res) => {
    res.json({status: "Ok", data: users});
};

// creating new users
const signUp = async (req, res) => {
  let user = users.find((user) => user.email === email);
  if (user) {
    res.json({ status: false, msg: "E-mail already exists, try another one" });
  } 
  try {
    const { email, fullName, password, confirmPassword } = req.body;
  const userPassword = await bcrypt.hash(password, 10);
  console.log(userPassword);
  if (password !== confirmPassword) {
    return res.json({ status: false, msg: "Please Confirm Password" });
  }
//Also check if the new user filled all the fields correctly
    else if (!req.body.email || !req.body.fullName || !req.body.password || !req.body.confirmPassword){
        res.json("All fields are required. You need to fill all")
    } else {
    

// Finally create the new user, and add to the array/list of users
    const newUser = { id: users.length + 1, email, fullName, userPassword, confirmPassword };
    users.push(newUser);
    res.status(200).json({ msg: `User successfully created`, data: newUser });
  } 
}
  catch (err) {
      res.status(400).send(err);
  };
};

// login for already created users
const signIn = async (req, res) => {
  const {email, password } = req.body;
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res(404).json({ status: "error", error: "invalid email" });
  };
  try {
  const validPassword = await bcrypt.compare(req.body.password, user.userPassword);
  if (!validPassword) return res.status(400).send('Invalid Password.');

  return res.json({ status: "ok", msg: "logged in", data: users });
} catch (err) {
    res.status(400).send(err);
};
};

module.exports = { signUp, signIn, getUser };
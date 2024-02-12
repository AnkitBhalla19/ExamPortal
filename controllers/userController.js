import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import nodemailer  from 'nodemailer';
import randomstring  from 'randomstring';
import config from '../config/config.js';
import jsonwebtoken from 'jsonwebtoken';


const createToken = async (user) => {
  try {
  const token =jsonwebtoken.sign({ email: user.email }, config.secret_jwt,);
  return token;
}
  catch (error) {
    console.error('Error during token creation:', error);
  }
};


const sendEmail = async (name,email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    });

    const mailOptions = {
      from: config.emailUser,
      to: email,
      subject: 'Reset Password',
      html: `Hi ${name},\n\nPlease click on the following link to reset your password:<a href="http://localhost:3000/api/resetPassword?token=${token}">Reset Password</a>\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    }

    transporter.sendMail(mailOptions , function(err, info) {
      if (err) {
        console.log(err.message);
      }
      else {
        console.log("Mail Has been Sent", info.response);
      }
    });
    
  } catch (error) {
    console.error('Error during email send:', error);
    
  }
};


const SaltRounds = 10;

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Password validation regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  try {
    const adminExists = await User.findOne({ where: { role: 'admin' } });

    if (adminExists && role === 'admin') {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Password validation
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, SaltRounds);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      image: req.files['image'][0].filename,
      resume_path: req.files['resume'][0].filename,
      role,
    });

    return res
      .status(201)
      .json({ name: newUser.name, email: newUser.email, role: newUser.role });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ error: `Internal Server Error ${error.message}` });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const passwordMatch =   await bcrypt.compare(password, user.password);
   
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    const token= await createToken(user);

    return res.status(200).json({ jwt_token:token,name: user.name, email: user.email, role: user.role});
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const updatePassword = async (req, res) => {
  const {oPassword, nPassword } = req.body;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  try {
    const token=req.body.token || req.query.token || req.headers['x-access-token'];
    const decoded = jsonwebtoken.verify(token,config.secret_jwt);
    const user= await User.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }
    const passwordMatch = await bcrypt.compare(oPassword, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    if (!passwordRegex.test(nPassword)) {
      return res.status(400).json({
        error:
          'New password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.',
      });
    }

    const hashedPassword = await bcrypt.hash(nPassword, SaltRounds);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error during password update:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const forgotPassword = async (req, res) => {
  const  email  = req.body.email;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(200).json({ error: 'This Email does not exist' });
    }
    const random = randomstring.generate();
    const data= await User.update({ token: random }, { where: { email } });
    sendEmail(user.name, user.email, random);
    res.status(200).json({ message: 'Plz check your email for reset password link' });

  } catch (error) {
    console.error('Error during forgot password:', error);
    return res.status(500).json({ error: 'Email does not exist'});
  }
};

const resetPassword = async (req, res) => {
  const token = req.query.token;
  const { password } = req.body;
  const tokenExists = await User.findOne({ where: { token } });
  if (!tokenExists) {
    return res.status(200).json({ error: 'This link is expired' });
  }
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.',
    });
  }
  const hashedPassword = await bcrypt.hash(password, SaltRounds);
  await User.update({ password: hashedPassword, token: null }, { where: { token } });
  await User.update({ token: null }, { where: { token } });

  return res.status(200).json({ message: 'Password updated successfully! Thank you'});
};


export default { registerUser, loginUser, updatePassword, forgotPassword,resetPassword };

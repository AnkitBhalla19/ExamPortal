import jsonwebtoken from 'jsonwebtoken'
import config from '../config/config.js'

const verifyToken = async(req,res,next) => {
    const token=req.body.token || req.query.token || req.headers['x-access-token'];
    if(!token){
        return res.status(403).send('A token is required for authentication');
    }
    try{
        const decoded = jsonwebtoken.verify(token,config.secret_jwt);
        req.user=decoded;
    }
    catch(err){
        return res.status(401).send('Invalid Token');
    }
    return next();
}

export default verifyToken;

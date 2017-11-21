let crypto = require('crypto');

class Utils{

    public generatePassword (password) :string{
        return crypto.createHash("md5").update(password).digest('hex');
    };
}

export default new Utils();
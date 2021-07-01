const User = require('../models/user');

exports.read = (req, res) => {
    const userId = req.params.id;
    User.findById(userId).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};

exports.update = (req, res) => {
    // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
    const { name, password } = req.body;

    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if (!name) {
            return res.status(400).json({
                error: 'Name is required'
            });
        } else {
            user.name = name;
        }

        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    error: 'Password should be min 6 characters long'
                });
            } else {
                user.password = password;
            }
        }

        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'User update failed'
                });
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;
            res.json(updatedUser);
        });
    });
};

exports.getUsers = async(req,res) => {
    await User.find()
    .select('role name email createdAt')
    .exec((err,result) => {
      if(err){
        res.status(400).json({
          error: err
        })
      }
      res.status(200).json({
        result
      })
    })
}

exports.updateUserProfile = async (req,res) => {
  const { userId, flatNumber,streetName,city,pinCode, name} = req.body
  User.findByIdAndUpdate(userId, { address: {flatNumber: flatNumber,streetName: streetName,city: city,pinCode: pinCode}, name: name},{ new: true })
  .exec((err, result) => {
    if(err){
      return res.status(400).json({
        error: err
      })
    }
    res.status(200).json({
      message: "Address updated successfully"
    })
  })
}

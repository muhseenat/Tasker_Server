const appliedJob = require("../model/appliedJob")
const User = require("../model/userSchema")

module.exports = {
  // USER LOGIN HELPER
  userLogin: (data) => {
    return new Promise(async (resolve, reject) => {
      const { email, password } = data
      User.findOne({ email }).then((data) => {
        if (!data) {
          reject('User not found')
        } else {
          data.comparePassword(password, (err, success) => {
            if (success) {
              resolve(data)

            } else {
              reject('Email or Password Invalid')
            }
          })

        }

      })
    })
  },

  // USER SIGNUP HELPER
  userSignup: (data) => {
    return new Promise(async (resolve, reject) => {

      // finding email exist or phone

      const userExit = await User.findOne({ $or: [{ email: data.email }, { phone: data.phone }] })
      console.log(userExit);

      if (userExit) reject('User already exist')

      const user = new User({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password
      })

      user.save().then((userData) => {
        resolve(userData)
      }).catch((err) => {
        reject(err)
      })

    })


  },

  getUsers: (id) => {
    return new Promise((resolve, reject) => {

      User.findById(id).then((data) => {
        resolve(data)
      }).catch(err => reject(err))

    })
  },

  //GET USERS COUNT
  getCount: () => {
    return new Promise((resolve, reject) => {
      User.count().then((resp) => {
        console.log(resp);
        resolve(resp)
      }).catch(err => reject(err))
    })
  },



  //GET USER STATICS BY MONTH
  getStatics: () => {
    return new Promise((resolve, reject) => {
      const date = new Date();
      const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
      console.log(date, 'dataaa');
      console.log(lastYear, 'last yeahgfdsf');
      User.aggregate([
        {
          $match: {
            createdAt: {
              $gte: lastYear,
            },
          },
        },
        {
          $project: {
            month: {
              $month: "$createdAt",
            },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]).then((resp) => {
        console.log(resp);
        resolve(resp)
      }).catch(err => reject(err))
    })
  },

  //GET TO TASKERS
  getTopTaskers: () => {
    return new Promise((resolve, reject) => {
      User.aggregate([
        {
          $unwind: "$applied_jobs"
        },
        {
          $match: {
            "applied_jobs.status": "Done"
          }
        },
        {
          $project: {
            name: 1,
            applied_job: 1
          }
        },
        {
          $group: {
            _id: {
              id: "$_id",
              name: "$name"
            },

            total: { $sum: 1 }

          }
        },
        {

          $sort: { total: -1 }
        }

      ]).then(resp => resolve(resp))
        .catch(err => reject(err))
    })

  }
}


/**
 * User Service Helper
 */
const axios = require('axios')
const AxiosHelper = require('./axiosHelper')
const { v4: uuidv4 } = require('uuid')

class UserServiceHelper extends AxiosHelper {
    constructor(userService) {
        super()
        this.userService = userService
    }

    generateUUID() {
        return uuidv4()
    }
 
    addUser = async (data) => {
        try {
            const result = await axios.post(`${this.userService}/user`, data)
            return result.data
        } catch (err) {
            this.handle(err)
        }
    }

    patchUser = async (id, data) => {
        return await axios.patch(`${this.userService}/user/${id}`, data)
    }

    getUser = async (param) => {
        try {
            const user = await axios.get(`${this.userService}/user/${param}`)
            return user.data
        } catch (error) {
            this.handle(error)
        }
    }

    generateOTP = () => {
        // Generate a random 6-digit number
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp.toString(); // Convert to string if needed
      }
}

module.exports = UserServiceHelper

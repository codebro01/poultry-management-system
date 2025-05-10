import express from 'express'
const Router = express.Router()
import axios from 'axios'
import { type } from 'os'

Router.route('/').post(async (req, res, next) => {
  try {
    const checkDataType = (inputs) => {
      const expectedTypes = {
        heartRate: 'number',
        temperature: 'number',
        activityLevel: 'number',
        appetiteLevel: 'number',
        featherCondition: 'string',
        combColor: 'string',
        respiratoryRate: 'number',
        ageInWeeks: 'number',
      }

      for (const key in expectedTypes) {
        const expectedType = expectedTypes[key]
        const actualType = typeof inputs[key]
        console.log(actualType)
        console.log(req.body)

        if (actualType !== expectedType) {
          return `Invalid type for ${key}: expected ${expectedType}, got ${actualType}`
        }
      }
      return null
    }

    const typeError = checkDataType(req.body)

    if (typeError) {
      return res.status(400).json({ error: typeError })
    }

    const response = await axios.post(`http://localhost:5000/predict`, req.body)
    res.status(200).json({ response: response?.data?.prediction })
  } catch (err) {
    return next(err)
  }
})
export default Router

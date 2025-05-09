import fs from 'fs';

function getRandom(min, max) {
  return +(Math.random() * (max - min) + min).toFixed(2)
}

function generateData(num = 1000) {
  const data = []

  for (let i = 0; i < num; i++) {
    const temperature = getRandom(39.0, 43.0)
    const heartRate = Math.floor(getRandom(250, 400))
    const activityLevel = getRandom(0, 1)
    const appetiteLevel = getRandom(0, 1)
    const featherCondition = getRandom(0, 1)
    const combColor = getRandom(0, 1)
    const respiratoryRate = Math.floor(getRandom(30, 60))
    const ageInWeeks = Math.floor(getRandom(1, 52))

    // Define a loose rule for "sickness"
    const isSick =
      temperature > 41.8 ||
      heartRate < 280 ||
      appetiteLevel < 0.4 ||
      combColor < 0.5 ||
      featherCondition < 0.5

    const healthStatus = isSick ? 1 : 0

    data.push({
      temperature,
      heartRate,
      activityLevel,
      appetiteLevel,
      featherCondition,
      combColor,
      respiratoryRate,
      ageInWeeks,
      healthStatus,
    })
  }

  fs.writeFileSync('chicken_health_data.json', JSON.stringify(data, null, 2))
  console.log('Fake data saved to chicken_health_data.json ✅')
}

generateData(1000)

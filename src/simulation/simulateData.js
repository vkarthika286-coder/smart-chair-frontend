import {
  ref,
  update,
  push,
  onValue
} from "firebase/database"

import { database } from "../firebase/firebase"

let simulationStarted = false

export function startSimulation() {

  if (simulationStarted) return

  simulationStarted = true

  setInterval(() => {

    const chairsRef =
      ref(database, "chairs")

    onValue(
      chairsRef,
      (snapshot) => {

        const chairs =
          snapshot.val()

        if (!chairs) return

        Object.keys(chairs)
          .forEach((chairId) => {

          const chair =
            chairs[chairId]

          if (
            !chair.currentEmployeeId
          ) return

          const liveData =
            generateLiveData(
              chairId,
              chair
            )

          update(
            ref(
              database,
              `chairs/${chairId}`
            ),
            liveData
          )

          push(
            ref(
              database,
              `history/${chair.currentEmployeeId}`
            ),
            liveData
          )

        })

      },
      {
        onlyOnce: true
      }
    )

  }, 5000)

}

function generateLiveData(
  chairId,
  chair
) {

  const flexADC =
    Math.floor(Math.random() * 650) + 250

  const tiltAngle =
    Math.floor(Math.random() * 30)

  const leftPressure =
    Math.floor(Math.random() * 700) + 300

  const rightPressure =
    Math.floor(Math.random() * 700) + 300

  const heartRate =
    Math.floor(Math.random() * 50) + 60

  const temperature =
    Math.floor(Math.random() * 12) + 25

  const productivity =
    Math.floor(Math.random() * 30) + 70

  const postureScore =
    Math.floor(Math.random() * 40) + 60

  const flexState =

    flexADC <= 350

      ? "Straight"

      : flexADC <= 550

      ? "Slight Bend"

      : "Slouching"

  const tiltState =

    tiltAngle <= 10

      ? "Upright"

      : tiltAngle <= 20

      ? "Moderate Lean"

      : "Bad Posture"

  const postureStatus =

    flexState === "Straight" &&
    tiltState === "Upright"

      ? "Good"

      : tiltState === "Moderate Lean"

      ? "Moderate"

      : "Bad"

  const userState =

    heartRate <= 80 &&
    postureStatus === "Good"

      ? "Relaxed"

      : heartRate <= 90

      ? "Focused"

      : heartRate <= 100

      ? "Determined"

      : postureStatus === "Bad"

      ? "Stressed"

      : "Tensed"

  const chairAction =

    userState === "Relaxed"

      ? "Maintain Settings"

      : userState === "Focused"

      ? "Work Mode Enabled"

      : userState === "Determined"

      ? "Lumbar Support Increased"

      : userState === "Stressed"

      ? "Posture Alert Triggered"

      : "Comfort Mode Activated"

  return {

    chairId,

    currentEmployeeId:
      chair.currentEmployeeId,

    currentRFID:
      chair.currentRFID,

    status: "Active",

    flexADC,

    tiltAngle,

    leftPressure,

    rightPressure,

    pressureDifference:
      Math.abs(
        leftPressure -
        rightPressure
      ),

    heartRate,

    temperature,

    flexState,

    tiltState,

    postureStatus,

    userState,

    postureScore,

    productivity,

    chairAction,

    fanStatus:

      temperature > 32

        ? "ON"

        : "OFF",

    vibrationAlert:

      postureStatus === "Bad"

        ? "ON"

        : "OFF",

    timestamp:
      new Date().toISOString()

  }

}
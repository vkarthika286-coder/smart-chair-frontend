import { useContext } from "react"
import { UserContext } from "../context/UserContext"

function PostureAnalysis() {
  const { user } = useContext(UserContext)

  if (!user) {
    return <h2>No Employee Logged In</h2>
  }

  const postureScore = Number(user.current_posture_score) || 0
  const postureStatus = user.posture_status || "Good"
  const backAngle =
  postureStatus === "Good"
    ? 8
    : postureStatus === "Moderate"
    ? 18
    : 28
  const leftPressure = Number(user.left_pressure) || 50
  const rightPressure = Number(user.right_pressure) || 50
  const chairAction = user.chair_action || "No Correction Needed"

  const pressureDifference = Math.abs(leftPressure - rightPressure)
  const pressureBalance = pressureDifference <= 100 ? "Balanced" : "Imbalanced"

  return (
    <div>
      <h1 className="page-heading">Posture Analysis</h1>

      <div className="posture-grid">
        <section className="posture-card main-posture">
          <div className="posture-icon">🪑</div>
          <h2>{postureStatus} Posture</h2>
          <p>Posture Score</p>
          <div className="posture-score">{postureScore}%</div>
        </section>

        <section className="posture-card">
          <h3>Back Angle</h3>
          <p className="big-text">{backAngle}°</p>
          <span className="success-badge">
            {backAngle <= 10 ? "Stable" : "Needs Correction"}
          </span>
        </section>

        <section className="posture-card">
          <h3>Pressure Balance</h3>
          <p className="big-text">{pressureBalance}</p>

          <div className="pressure-bar">
            <span
              style={{
                width: `${Math.min(
                  (leftPressure / (leftPressure + rightPressure)) * 100,
                  100
                )}%`
              }}
            ></span>
          </div>
        </section>

        <section className="posture-card">
          <h3>Suggested Action</h3>
          <p className="big-text">{chairAction}</p>
          <span className="success-badge">
            {postureStatus === "Bad" ? "Alert" : "Safe"}
          </span>
        </section>
      </div>
    </div>
  )
}

export default PostureAnalysis
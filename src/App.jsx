import { useEffect, useState } from 'react'
import './App.css'
import Description from './components/Description/Description'
import Options from './components/Options/Options'
import Feedback from './components/Feedback/Feedback'
import Notification from './components/Notification/Notification'

function App() {
  const [reviews, setReviews] = useState(JSON.parse(localStorage.getItem("reviews")) || {
    good: 0,
    neutral: 0,
    bad: 0,
  })

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews))
  }, [reviews]);

  const updateFeedback = feedbackType => {
    (feedbackType === "reset") ? setReviews({good:0, neutral:0, bad:0}) :
    setReviews({ ...reviews, [feedbackType]: reviews[feedbackType] + 1 })
  };

  const totalFeedback = reviews.good + reviews.neutral + reviews.bad;

  const good = reviews.good + reviews.neutral;

  const positiveFeedback = Math.round((good / totalFeedback) * 100);

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback ? <Feedback
        good={reviews.good}
        neutral={reviews.neutral}
        bad={reviews.bad}
        total={totalFeedback}
        positive={positiveFeedback}
      /> : <Notification/>}
    </>
  )
}

export default App
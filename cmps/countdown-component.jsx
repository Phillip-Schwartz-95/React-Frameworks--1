export function CountDown({ startFrom, onDone }) {
  const { useState, useEffect } = React

  // State to keep track of the current count
  const [count, setCount] = useState(startFrom)

  useEffect(() => {
    // If count reaches 0, call onDone and stop
    if (count === 0) {
      onDone()
      return
    }

    // Set up an interval to decrease count every second
    const intervalId = setInterval(() => {
      setCount(prev => prev - 1)
    }, 1000)

    // Cleanup interval when component unmounts or count changes
    return () => clearInterval(intervalId)

  }, [count, onDone])

  // Style: make count red when 6 or less
  const style = {
    color: count <= 6 ? 'red' : 'black'
  }

  return (
    <div style={style}> CountDown: <br></br>
      {count}
    </div>
  )
}

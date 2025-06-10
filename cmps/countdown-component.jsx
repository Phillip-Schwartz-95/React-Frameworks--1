export function CountDown({ startFrom, onDone }) {
  const { useState, useEffect } = React

  const [count, setCount] = useState(startFrom)

  useEffect(() => {
    if (count === 0) {
      onDone()
      // Restart the count
      setCount(startFrom)
      return
    }

    const intervalId = setInterval(() => {
      setCount(prev => prev - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [count, onDone, startFrom]) // Added startFrom to deps as well

  const style = {
    color: count <= 6 ? 'red' : 'black'
  }

  return (
    <div style={style}>
      CountDown: <br />
      {count}
    </div>
  )
}


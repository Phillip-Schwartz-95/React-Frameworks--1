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
    color: count <= 6 ? 'red' : 'black',
    fontFamily: 'Edu VIC WA NT Beginner, cursive',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    fontFamily: "'Edu VIC WA NT Beginner', cursive",
    fontSize: '3rem',
    marginBottom: '1rem',
    margin: '20px',
  
  }

return (
  <div style={style}>
    CountDown: <br />
    {count}
  </div>
)
}


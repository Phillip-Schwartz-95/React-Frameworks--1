export function SeasonClock() {
    const { useState, useEffect } = React

  const [date, setDate] = useState(new Date())
  const [isDark, setIsDark] = useState(false)

  // Update the clock every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date())
    }, 1000)

    // Cleanup interval on unmount
    return () => clearInterval(intervalId)
  }, [])

  // Helper to get season from month
  function getSeason(month) {
    // month: 0 = Jan, ..., 11 = Dec
    if ([11, 0, 1].includes(month)) return 'Winter'
    if ([2, 3, 4].includes(month)) return 'Spring'
    if ([5, 6, 7].includes(month)) return 'Summer'
    if ([8, 9, 10].includes(month)) return 'Fall'
  }

  const season = getSeason(date.getMonth())

  const seasonIcons = {
    Winter: '❄️',  
    Spring: '🌸',  
    Summer: '☀️',   
    Fall: '🍂',    
  }

  const seasonIcon = seasonIcons[season] || ''

  // Get month name and day name
  const monthName = date.toLocaleString('en-US', { month: 'long' })
  const dayName = date.toLocaleString('en-US', { weekday: 'long' })
  const timeString = date.toLocaleTimeString()

  // Toggle dark mode
  function toggleDark() {
    setIsDark(prev => !prev)
  }

  return (
    <section
      onClick={toggleDark}
    >
      <h2>Season: {seasonIcon}</h2>
      <h3>{monthName}</h3>
      <h4>{dayName}</h4>
      <p style={{ fontSize: '1.5rem', margin: '10px 0' }}>{timeString}</p>
      <small>(Click to toggle background)</small>
    </section>
  )
}

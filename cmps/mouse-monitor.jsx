export function MouseMonitor() {
    const { useState, useEffect } = React

    const [isOn, setIsOn] = useState(true)
    const [pos, setPos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        if (!isOn) return

        const updatePos = (ev) => {
            setPos({ x: ev.clientX, y: ev.clientY })
        }

        document.addEventListener('mousemove', updatePos)

        return () => {
            document.removeEventListener('mousemove', updatePos)
        }
    }, [isOn])


    function toggleMonitor() {
        setIsOn((prev) => !prev)
    }

  return (
    <section className="mouse-monitor-section">
      <h2 className="mouse-monitor-header">Mouse Tracker</h2>
      <p className="mouse-monitor-pos">X: {pos.x}</p>
      <p className="mouse-monitor-pos">Y: {pos.y}</p>
      <button
        className={`mouse-monitor-button ${isOn ? 'on' : 'off'}`}
        onClick={toggleMonitor}
      >
        {isOn ? 'Pause' : 'Resume'}
      </button>
    </section>
  )
}

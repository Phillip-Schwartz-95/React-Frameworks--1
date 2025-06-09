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
        <section>
            <p>X: {pos.x}</p>
            <p>Y: {pos.y}</p>
            <button onClick={toggleMonitor}>{isOn ? 'Pause' : 'Resume'}</button>
        </section>
    )
}

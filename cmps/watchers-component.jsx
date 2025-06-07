export function WatcherApp() {
    const { useState, useEffect } = React

    const [watchers, setWatchers] = useState([])
    const [selectedWatcher, setSelectedWatcher] = useState(null)

    useEffect(() => {
        // Simulate async data load
        const initialWatchers = [
            { id: 'w101', fullname: 'Puki Ba', movies: ['Rambo', 'Rocky'] },
            { id: 'w102', fullname: 'Jane Doe', movies: ['Titanic'] }
        ]
        setWatchers(initialWatchers)
    }, [])

    function addWatcher() {
        const name = prompt('Enter watcher full name:')
        if (!name) return
        const newWatcher = { id: 'w' + Date.now(), fullname: name, movies: [] }
        setWatchers(prev => [...prev, newWatcher])
    }

    function removeWatcher(id) {
        setWatchers(prev => prev.filter(w => w.id !== id))
        if (selectedWatcher && selectedWatcher.id === id) setSelectedWatcher(null)
    }

    return (
        <div>
            <h1>Watcher App</h1>
            <button onClick={addWatcher}>Add Watcher</button>
            <ul>
                {watchers.map(watcher => (
                    <li key={watcher.id}>
                        {watcher.fullname}{' '}
                        <button onClick={() => setSelectedWatcher(watcher)}>View</button>{' '}
                        <button onClick={() => removeWatcher(watcher.id)}>Remove</button>
                    </li>
                ))}
            </ul>

            {selectedWatcher && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{selectedWatcher.fullname}</h2>
                        <h3>Movies:</h3>
                        {selectedWatcher.movies.length > 0 ? (
                            <ul>
                                {selectedWatcher.movies.map((movie, i) => (
                                    <li key={i}>{movie}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No movies listed.</p>
                        )}
                        <button onClick={() => setSelectedWatcher(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}
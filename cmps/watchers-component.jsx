import { storageService } from '../services/async-storage.service.js'

export function WatcherApp() {
    const { useState, useEffect } = React

    const [watchers, setWatchers] = useState([])
    const [selectedWatcher, setSelectedWatcher] = useState(null)

    useEffect(() => {
        storageService.query('watchers').then(data => {
            if (data.length === 0) {
                const initialWatchers = [
                    { id: 'w101', fullname: 'Puki Ba', movies: ['Rambo', 'Rocky'], avatar: 'https://robohash.org/Puki%20Ba.png?size=50x50' },
                    { id: 'w102', fullname: 'Jane Doe', movies: ['Titanic'], avatar: 'https://robohash.org/Jane%20Doe.png?size=50x50' }
                ]
                Promise.all(initialWatchers.map(w => storageService.post('watchers', w))).then(() => {
                    storageService.query('watchers').then(setWatchers)
                })
            } else {
                // Add avatar URLs to watchers missing them
                const updatedWatchers = data.map(w => ({
                    ...w,
                    avatar: w.avatar || `https://robohash.org/${encodeURIComponent(w.fullname)}.png?size=50x50`
                }))
                setWatchers(updatedWatchers)
                // Optionally save back updated watchers to storage
                updatedWatchers.forEach(w => storageService.put('watchers', w))
            }
        })
    }, [])

    function addWatcher() {
        const name = prompt('Enter watcher full name:')
        if (!name) return

        const moviesInput = prompt('Enter movies watched (comma separated):')
        const movies = moviesInput
            ? moviesInput.split(',').map(movie => movie.trim()).filter(movie => movie.length > 0)
            : []

        const avatar = `https://robohash.org/${encodeURIComponent(name)}.png?size=50x50`

        const newWatcher = { fullname: name, movies, avatar }
        storageService.post('watchers', newWatcher).then(savedWatcher => {
            setWatchers(prev => [...prev, savedWatcher])
        })

    }

    function removeWatcher(id) {
        storageService.remove('watchers', id).then(() => {
            setWatchers(prev => prev.filter(w => w.id !== id))
            if (selectedWatcher && selectedWatcher.id === id) setSelectedWatcher(null)
        })
    }

    return (
        <div style={{ backgroundColor: '#eee', margin: '20px', padding: '15px' }}>
            <h1>Watcher App</h1>
            <button onClick={addWatcher}>Add Watcher</button>
            <ul>
                {watchers.map(watcher => (
                    <li key={watcher.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <img
                            src={watcher.avatar || `https://robohash.org/${encodeURIComponent(watcher.fullname)}.png?size=50x50`}
                            alt={watcher.fullname}
                            style={{ borderRadius: '50%', marginRight: '10px', width: '40px', height: '40px' }}
                        />
                        {watcher.fullname}{' '}
                        <button onClick={() => setSelectedWatcher(watcher)}>View</button>{' '}
                        <button onClick={() => removeWatcher(watcher.id)}>Remove</button>
                    </li>
                ))}
            </ul>


            {selectedWatcher && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <img
                            src={selectedWatcher.avatar || `https://robohash.org/${encodeURIComponent(selectedWatcher.fullname)}.png?size=80x80`}
                            alt={selectedWatcher.fullname}
                            style={{ borderRadius: '50%', marginBottom: '10px', width: '80px', height: '80px' }}
                        />
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

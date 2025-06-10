import { storageService } from '../services/async-storage.service.js'

export function WatcherApp() {
  const { useState, useEffect } = React

  const [watchers, setWatchers] = useState([])
  const [selectedWatcher, setSelectedWatcher] = useState(null)

  useEffect(() => {
    storageService.query('watchers').then(data => {
      // If no data in storage, initialize with default watchers
      if (data.length === 0) {
        const initialWatchers = [
          { id: 'w101', fullname: 'Puki Ba', movies: ['Rambo', 'Rocky'] },
          { id: 'w102', fullname: 'Jane Doe', movies: ['Titanic'] }
        ]
        // Save initial watchers to storage
        Promise.all(initialWatchers.map(w => storageService.post('watchers', w))).then(() => {
          // Then reload
          storageService.query('watchers').then(setWatchers)
        })
      } else {
        setWatchers(data)
      }
    })
  }, [])

  function addWatcher() {
    const name = prompt('Enter watcher full name:')
    if (!name) return
    const newWatcher = { fullname: name, movies: [] }
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

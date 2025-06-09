import { AnimalList } from './cmps/animal-list.jsx'
import { SeasonClock } from './cmps/season-clock.jsx'
import { CountDown } from './cmps/countdown-component.jsx'
import { WatcherApp } from './cmps/watchers-component.jsx'
import { MouseMonitor } from './cmps/mouse-monitor.jsx'

export function App() {
    const animalInfos = [
        { type: 'Malayan Tiger', count: 787 },
        { type: 'Mountain Gorilla', count: 212 },
        { type: 'Fin Whale', count: 28 },
    ]

    return (
        <section className="app">
            <header className="app-header">
                <h1>My App</h1>

            </header>
            <main className="container">
                <AnimalList animalInfos={animalInfos} />
                <SeasonClock />
                <CountDown
                    startFrom={10}
                    onDone={() => {
                        console.log('Done!')
                        alert('Countdown finished!')
                    }}
                />
                <WatcherApp />
                <MouseMonitor />

            </main>
        </section>
    )
}
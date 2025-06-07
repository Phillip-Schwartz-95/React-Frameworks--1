import { AnimalList } from './cmps/animal-list.jsx'
import { SeasonClock } from './cmps/season-clock.jsx'

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
            </main>
        </section>
    )
}
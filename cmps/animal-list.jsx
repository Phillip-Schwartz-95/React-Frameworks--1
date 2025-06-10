import { storageService } from '../services/async-storage.service.js'

const ANIMAL_KEY = 'animalInfos'

const defaultAnimals = [
    { type: 'Malayan Tiger', count: 787 },
    { type: 'Mountain Gorilla', count: 212 },
    { type: 'Fin Whale', count: 28 },
]

export function AnimalList(props) {
    const { useState, useEffect } = React

    const [storedAnimals, setStoredAnimals] = useState([])

    useEffect(function () {
        storageService.query(ANIMAL_KEY)
            .then(function (data) {
                if (data.length && data[0].list) {
                    setStoredAnimals(data[0].list)
                    return Promise.resolve(null)
                }
                return Promise.resolve(null)
            })
            .then(function () {
                if (storedAnimals.length > 0) return

                if (props.animalInfos && props.animalInfos.length) {
                    return storageService.post(ANIMAL_KEY, { list: props.animalInfos })
                        .then(function () {
                            setStoredAnimals(props.animalInfos)
                        })
                }

                return storageService.post(ANIMAL_KEY, { list: defaultAnimals })
                    .then(function () {
                        setStoredAnimals(defaultAnimals)
                    })
            })
    }, [])

    if (storedAnimals.length === 0) {
        return React.createElement('p', null, 'Loading animal info...')
    }

    return React.createElement(
        'table',
        { className: 'animal-list' },
        React.createElement('caption', null, 'Animal Info'),
        React.createElement(
            'thead',
            null,
            React.createElement(
                'tr',
                null,
                React.createElement('th', null, 'Animal'),
                React.createElement('th', null, 'Count')
            )
        ),
        React.createElement(
            'tbody',
            null,
            storedAnimals.map(function (animal) {
                return React.createElement(
                    'tr',
                    { key: animal.type },
                    React.createElement(
                        'td',
                        null,
                        React.createElement(
                            'a',
                            {
                                href: 'https://www.google.com/search?q=' + encodeURIComponent(animal.type),
                                target: '_blank',
                                rel: 'noopener noreferrer'
                            },
                            animal.type
                        )
                    ),
                    React.createElement('td', null, animal.count)
                )
            })
        )
    )
}

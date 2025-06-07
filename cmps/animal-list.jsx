export function AnimalList({ animalInfos }) {
   if (!animalInfos || animalInfos.length === 0) return <p>No animals to show</p>

    return (

        <table className="animal-list"> 
            <caption>Animal Info</caption>

            <thead>
                <tr>
                    <th>Animal</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
                {animalInfos.map(animal => (
                    <tr key={animal.type}>
                        <td>
                            <a href={`https://www.google.com/search?q=${animal.type}`}
                               target="_blank"
                               rel="noopener noreferrer">
                                {animal.type}
                            </a>
                        </td>
                        <td>{animal.count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

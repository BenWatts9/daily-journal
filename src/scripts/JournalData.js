/*
 *   Journal data for Daily Journal application
 *
 *      Holds the raw data about each entry and exports
 *      functions that other modules can use to filter
 *      the entries for different purposes.
 */

// This is the original data.
let apiJournal = []

/*
    You export a function that provides a version of the
    raw data in the format that you want
*/
export const getJournalEntries = () => {
    return fetch("http://localhost:8088/journal")
    .then(response => response.json())
    .then(parsedResponse => {
        apiJournal = parsedResponse
        return parsedResponse;
    })
}

export const useJournal = () => {
    return [...apiJournal];
}

/*
 *  Purpose: To render a single journal entry as an
 *           HTML representation of the data
 */
export const JournalEntryComponent = (entry) => {
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            <h2>${entry.concept}</h2>
            <p>${entry.entry}</p>
            <button id="delete__${entry.id}">Delete</button
        </section>
    `
}

export const createEntry = entryObject => {
    return fetch("http://localhost:8088/journal",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entryObject)
    })
    .then(response => response.json())
}

export const deleteEntry = entryId => {
    return fetch(`http://localhost:8088/journal/${entryId}`, {
        method: "DELETE",
        header: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
}
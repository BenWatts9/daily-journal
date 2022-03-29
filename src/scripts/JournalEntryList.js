/*
 *  Purpose:
 *    To render as many journal entry components as
 *    there are items in the collection exposed by the
 *    data module component
 */
import { getJournalEntries } from "./JournalData.js"
import { JournalEntryComponent, useJournal } from "./JournalData.js"

// DOM reference to where all entries will be rendered
let entryLog = document.querySelector("#entryLog")

export const EntryListComponent = (allEntries) => {
    // Use the journal entry data from the data module component
    let entryHTML = ""

    for (const entry of allEntries) {
        /*
            Invoke the component that returns an
            HTML representation of a single entry
        */
        entryHTML += JournalEntryComponent(entry)

    }
    return entryHTML
}




export const filteredByMood = () => {
    const selectedMood = document.querySelector("#moodsFilter")
    const filteredData = useJournal().filter(singlePost => {
        if (selectedMood.value === singlePost.mood) {
            return singlePost
        }
    })
    
    const postElement = document.querySelector("#entryLog")
    postElement.innerHTML = EntryListComponent(filteredData)
}

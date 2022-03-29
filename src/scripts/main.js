import { EntryListComponent, filteredByMood } from "./JournalEntryList.js"
import { getJournalEntries, createEntry, deleteEntry } from "./JournalData.js"



const applicationElement = document.querySelector(".dailyjournal")


// Event Listener for recording new journal entries.
applicationElement.addEventListener("click", event => {
    if (event.target.id === "submitButton"){
        const newDate = document.querySelector("input[name='journalDate']").value
        const newConcept = document.querySelector("input[name='conceptsCovered']").value
        const newEntryText = document.querySelector("textarea[name='journalEntry']").value
        const newMood = document.querySelector("select[name='moods']").value

        const postObject = {
            date: newDate,
            concept: newConcept,
            entry: newEntryText,
            mood: newMood
        }
        createEntry(postObject)
        .then(showEntryList)
    }
})

// Event Listener for sorting entries by moods
applicationElement.addEventListener("change", event => {
    if(event.target.id === "moodsFilter"){
        filteredByMood()
    }
})


applicationElement.addEventListener("click", event => {
    if (event.target.id.startsWith("delete")) {
        const entryId = event.target.id.split("__")[1];
        deleteEntry(entryId)
        .then(showEntryList)
    }
})


getJournalEntries()
.then(data => {
    console.log("entry data", data)
})

const showEntryList = () => {
    const entryElement = document.querySelector("#entryLog")
    getJournalEntries().then((allEntries) => {
        entryElement.innerHTML = EntryListComponent(allEntries)
    })
}

showEntryList()
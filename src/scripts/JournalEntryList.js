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


export const showEntryComponent = () => {
    return `
    <form action="">
            <fieldset>
                <label for="journalDate">Date of entry</label>
                <input type="date" name="journalDate" id="journalDate" value="">
            </fieldset>
            
            <fieldset>
                <label for="conceptsCovered">Concepts covered</label>
                <input type="text" name="conceptsCovered" id="conceptsCovered" value="">
            </fieldset>
            
            <fieldset>
                <label for="journalEntry">Journal Entry</label>
                <textarea name="journalEntry" id="entryBody" value="" style="width:175px;height:40px;"></textarea>
            </fieldset>
            
            <fieldset>
                <label for="moods">Mood for the day</label>
                <select id="moods" name="moods">
                    <option value="Sad">Sad</option>
                    <option value="Happy">Happy</option>
                    <option value="Angry">Angry</option>
                    <option value="Releaved">Releaved</option>
                    <option value="Ok">Ok</option>
                </select>
            </fieldset>
            
                <input type="submit" id="submitButton" value="Record Journal Entry">   
        </form>
    `
} 


export const entryEdit = (entryObj) => {
    return `
    <form action="">
            <fieldset>
                <label for="journalDate">Date of update</label>
                <input type="date" name="journalDate" id="journalDate" >
            </fieldset>
            
            <fieldset>
                <label for="conceptsCovered">Concepts covered</label>
                <input type="text" name="conceptsCovered" id="conceptsCovered" value="${entryObj.concept}">
            </fieldset>
            
            <fieldset>
                <label for="journalEntry">Journal Entry</label>
                <textarea name="journalEntry" id="entryBody" style="width:175px;height:40px;">${entryObj.entry}</textarea>
            </fieldset>
            
            <fieldset>
                <label for="moods">Mood for the day</label>
                <select id="moods" name="moods" value="${entryObj.mood}">
                    <option value="Sad">Sad</option>
                    <option value="Happy">Happy</option>
                    <option value="Angry">Angry</option>
                    <option value="Releaved">Releaved</option>
                    <option value="Ok">Ok</option>
                </select>
            </fieldset>
            <input type="hidden" value="${entryObj.id}">

                <input type="submit" id="submitButton" value="Record Journal Entry">   
        </form>
    `
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

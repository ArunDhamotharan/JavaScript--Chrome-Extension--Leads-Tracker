let myLeads = []

const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}



function render(leads){
    ulEl.innerHTML = ""
    // ulEl.innerHTML += "<li><a href='" + myLeads[saved] + " 'target='_blank'>" + myLeads[saved] + "</a></li>";
    for(let i = 0; i < leads.length; i++){
    ulEl.innerHTML += ` 
        <li>
        <a target='_blank' href='${leads[i]}'  > 
            ${leads[i]}  
        </a>
        </li>`
    }
}

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    
    inputEl.value = ""

    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    // console.log(localStorage.getItem("myLeads"))
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        if (tabs[0] && tabs[0].url) {
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
        }
    })
})
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        inputBtn.click()
    }
})

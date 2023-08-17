
let jsonData;



const fetchData = () => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function (response) {
        if (this.status == 200) {
            const data = this.responseText;
            const todo = JSON.parse(data);
            console.log(todo, "todo Object while reading");
            //reading object from file here
            jsonData = todo;
        }
    });
    xhr.open('GET', 'data/list.json');
    xhr.send();
}

//Second Step
//We add the JSON data to the html dom
async function asyncCall() {
    let result = await fetchData();
    console.log(result, "This is special");
}


// asyncCall();

let listContainer;

//Takes Converts objects into Nodes and adds them in the DOM 
domHandler = (element) => {
    let listItem = document.createElement("li");
    listItem.setAttribute("id", element.id);
    listItem.classList.add(element.status);

    let title = document.createElement("h1");
    title.classList.add("title-" + element.id);
    title.innerHTML = element.title;
    title.addEventListener('click', () => {
        let titleGrabbed = document.getElementById(element.id);
        //status here is a string indicating the open/closed status of the todo item
        let status = titleGrabbed.getAttribute('class');
        if (status == "closed") {
            listItem.setAttribute("class", "open");
        } else {
            listItem.setAttribute("class", "closed");
        }
    });
    let description = document.createElement("p");
    description.classList.add("description-" + element.id);
    description.innerHTML = element.description;

    let duedate = document.createElement("p");
    duedate.classList.add("duedate-" + element.id);
    duedate.innerHTML = element.duedate;

    let duetime = document.createElement("p");
    duetime.classList.add("duetime-" + element.id);
    duetime.innerHTML = element.duetime;

    let status = document.createElement("h5");
    status.classList.add("status-" + element.id);
    status.innerHTML = element.status;

    let deleteButton = document.createElement("span");
    deleteButton.classList.add("material-icons-outlined");
    deleteButton.classList.add("delete-" + element.id);
    deleteButton.innerHTML = "Mark Complete";
    deleteButton.addEventListener('click', () => {
        let deletedItemId = ((((deleteButton.getAttribute("class")).split(" ")))[1].split("-"))[1];
        let listItemsForDeletion = document.querySelectorAll("li");
        (listItemsForDeletion).forEach(element => {
            if (element.getAttribute("id") == deletedItemId) {
                title.classList.add("done");
                listItem.setAttribute("class", "closed");
                deleteButton.innerHTML = "Completed";
            }
        });
    });

    listItem.appendChild(title);

    let detailsDiv = document.createElement("div");
    detailsDiv.classList.add("details-div");

    let detailsDivDescription = document.createElement("div");
    detailsDivDescription.classList.add("details-div-description");
    detailsDivDescription.appendChild(description);

    let detailsDivDue = document.createElement("div");
    detailsDivDue.classList.add("details-div-due");
    detailsDivDue.appendChild(duedate);
    detailsDivDue.appendChild(duetime);

    detailsDiv.appendChild(detailsDivDescription);
    detailsDiv.appendChild(detailsDivDue);

    listItem.appendChild(detailsDiv);
    listItem.appendChild(deleteButton);

    listContainer.appendChild(listItem);


}

let addButton;
let buttonOpener;

//Adding JSON objects to the DOM using loops
setTimeout(() => {
    console.log(jsonData);
    buttonOpener = document.querySelector('button.main-button');
    buttonOpener.addEventListener("click", inputOpener);

    listContainer = document.querySelector("ol");

    addButton = document.querySelector(".add-button");
    addButton.addEventListener("click", taskAdder);


    jsonData.forEach(element => {
        domHandler(element);
    });
}, 2000);

fetchData();

let taskAdder = () => {
    let titleInput = document.querySelector(".title");
    let descriptionInput = document.querySelector(".description");
    let dueDateInput = document.querySelector(".dueDate");
    let dueTimeInput = document.querySelector(".dueTime");
    let titleIncoming = titleInput.value;
    let descriptionIncoming = descriptionInput.value;
    let dueDateIncoming = dueDateInput.value;
    let dueTimeIncoming = dueTimeInput.value;
    let currentListInDom = document.querySelectorAll("ol>li");
    let newItemId = currentListInDom.length + 1;
    let objectForAddingToList = {
        "id": newItemId,
        "title": titleIncoming,
        "description": descriptionIncoming,
        "duedate": dueDateIncoming,
        "duetime": dueTimeIncoming,
        "status": "open"
    }
    if (errorHandler(objectForAddingToList)) {
        console.log(objectForAddingToList);
        domHandler(objectForAddingToList);
        inputClearer();
        inputOpener();
    } else {
        alert("Enter Valid Input");
        inputClearer();
        inputOpener();
    }
}

let inputClearer = () => {
    document.querySelector(".title").value = "";
    document.querySelector(".description").value = "";
    document.querySelector(".duedate").value = "";
    document.querySelector(".duetime").value = "";
}

function errorHandler(element) {
    //returns true if all inputs are Zero length else returns false
    let isValid = true;
    if (!(element.title).length > 0) {
        isValid = false;
    } else if (!(element.description).length > 0) {
        isValid = false;
    } else if (!(element.duedate).length > 0) {
        isValid = false;
    } else if (!(element.duetime).length > 0) {
        isValid = false;
    }
    return isValid;
}

let inputOpener = () => {
    let inputSection = document.querySelector("div.input-section");
    let status = inputSection.getAttribute('status');
    console.log(status, "Input Openers");
    if (status == "closed") {
        inputSection.setAttribute("status", "open");
    }else{
        inputSection.setAttribute("status", "closed");
    }
}
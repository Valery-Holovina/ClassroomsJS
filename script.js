//DATA: 
let Classroom = JSON.parse(localStorage.getItem("classroom")) ||
{
    1: {
        name: "Business Analytics Lab",
        amountOfPlaces: 20,
        facultyName: "Economics"
    },
    2: {
        name: "Software Engineering Room",
        amountOfPlaces: 12,
        facultyName: "Computer Science"
    },
    3: {
        name: "Graphic Design Studio",
        amountOfPlaces: 18,
        facultyName: "Art & Media"
    },
    4: {
        name: "Physics Research Hall",
        amountOfPlaces: 20,
        facultyName: "Natural Sciences"
    },
    5: {
        name: "Political Theory Room",
        amountOfPlaces: 15,
        facultyName: "Political Science"
    },
    6: {
        name: "Mathematical Modeling Lab",
        amountOfPlaces: 19,
        facultyName: "Applied Mathematics"
    },
    7: {
        name: "Marketing Workshop",
        amountOfPlaces: 17,
        facultyName: "Business Administration"
    },
    8: {
        name: "Cybersecurity Center",
        amountOfPlaces: 11,
        facultyName: "Computer Science"
    },
    9: {
        name: "Chemistry Experiment Room",
        amountOfPlaces: 13,
        facultyName: "Chemistry"
    },
    10: {
        name: "English Communication Hall",
        amountOfPlaces: 16,
        facultyName: "Linguistics"
    }
};



// FUNCTIONS: 

// Save to localStorage
function save(){
    localStorage.setItem("classroom", JSON.stringify(Classroom));
}

// Print all classrooms
function printAll(){
    const container = document.getElementById("tableContainer");
    container.innerHTML = "";

    let tableHTML = `<table>
        <thead>
            <tr>
                <th>№</th><th>Name</th><th>Places</th><th>Faculty</th><th colspan="2"></th>
            </tr>
        </thead>
        <tbody>`;

    for(let id in Classroom){
        tableHTML += `
            <tr>
                <td>${id}</td>
                <td>${Classroom[id].name}</td>
                <td>${Classroom[id].amountOfPlaces}</td>
                <td>${Classroom[id].facultyName}</td>
                <td><button class="custom-btn" onclick="updateClass(${id})">Edit</button></td>
                <td><button class="custom-btn2" onclick="deleteClass(${id})">Delete</button></td>
            </tr>
        `;
    }

    tableHTML += `</tbody></table>`;
    container.innerHTML = tableHTML;
}

// Add from form inputs
function addFromForm(){
    const id = document.getElementById("idInput").value;
    const name = document.getElementById("nameInput").value.trim();
    const places = +document.getElementById("placesInput").value;
    const faculty = document.getElementById("facultyInput").value.trim();

    if(!id || !name || !places || !faculty){
        alert("Fill all fields!");
        return;
    }

    add(+id, name, places, faculty);

    document.getElementById("idInput").value = "";
    document.getElementById("nameInput").value = "";
    document.getElementById("placesInput").value = "";
    document.getElementById("facultyInput").value = "";
}
function add(id, name, places, faculty){
    Classroom[id] = { name, amountOfPlaces: places, facultyName: faculty };
    printAll();
    save();
}


// Delete classroom
function deleteClass(id){
    if(Classroom[id]){
        delete Classroom[id];
        save();
        printAll();
    } else alert("No classroom with that ID!");
}

// Edit classroom
function updateClass(id){
    if(!Classroom[id]) return alert("No classroom with that ID!");
    const name = prompt("New Name:", Classroom[id].name);
    const places = +prompt("New Places:", Classroom[id].amountOfPlaces);
    const faculty = prompt("New Faculty:", Classroom[id].facultyName);
    if(name && places && faculty){
        Classroom[id] = {name, amountOfPlaces: places, facultyName: faculty};
        save();
        printAll();
    }
}



// Sort by Name 
function sortByName() {
    printSorted((a, b) => a.name.localeCompare(b.name));
}

// Sort by Places
function sortByPlaces() {
    printSorted((a, b) => a.amountOfPlaces > b.amountOfPlaces);
}


function printSorted(compareFn) {
    const container = document.getElementById("tableContainer");
    container.innerHTML = "";

    let arr = [];
    for (let id in Classroom) {
        arr.push({ id, ...Classroom[id] });  
    }

    arr.sort(compareFn);  

    let tableHTML = `<table>
        <thead>
            <tr>
                <th>№</th><th>Name</th><th>Places</th><th>Faculty</th><th colspan="2"></th>
            </tr>
        </thead>
        <tbody>`;

    for (let item of arr) {
        tableHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.amountOfPlaces}</td>
                <td>${item.facultyName}</td>
                <td><button class="custom-btn" onclick="updateClass(${item.id})">Edit</button></td>
                <td><button class="custom-btn2" onclick="deleteClass(${item.id})">Delete</button></td>
            </tr>
        `;
    }

    tableHTML += `</tbody></table>`;
    container.innerHTML = tableHTML;
}

function clearAll(){
    localStorage.clear()
}


let arrNames = []
for(const i in Classroom) {
        arrNames.push(Classroom[i].name)
        
    }

let arrPlaces = []
for(const i in Classroom) {
        arrPlaces.push(Classroom[i].amountOfPlaces)
        
    }

function showChart(){
 

  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: arrNames,
      datasets: [{
        label: '# of Places',
        data: arrPlaces,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
showChart();
printAll();

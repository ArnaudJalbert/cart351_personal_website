document.getElementById("exercise_button").addEventListener("click", openExercise);
document.getElementById("projects_button").addEventListener("click", openProject);
document.getElementById("reflections_button").addEventListener("click", openReflections);
document.getElementById("presentation_button").addEventListener("click", openPresentation);

let go_back_elem = document.getElementsByClassName("go_back");

for(let i = 0; i<go_back_elem.length; i++){
    go_back_elem[i].addEventListener("click", goBack);
    console.log(go_back_elem[i])
}

exercise_grid = document.getElementById("exercise_grid");
project_grid = document.getElementById("project_grid")
reflections_grid = document.getElementById("reflections_grid");
presentation_grid = document.getElementById("presentation_grid");
welcome_grid = document.getElementById("welcome_grid");

function goBack(){
    exercise_grid.style.display = "none";
    project_grid.style.display = "none";
    reflections_grid.style.display = "none";
    presentation_grid.style.display = "none";
    welcome_grid.style.display = "grid";
    console.log("heeeyy")
}

function openExercise(){
    welcome_grid.style.display = "none";
    exercise_grid.style.display = "grid";
}

function openProject(){
    welcome_grid.style.display = "none";
    project_grid.style.display = "grid";
}

function openReflections(){
    welcome_grid.style.display = "none";
    reflections_grid.style.display = "grid";
}

function openPresentation(){
    welcome_grid.style.display = "none";
    presentation_grid.style.display = "grid";
}

function test(){
    console.log("events tester")
}

test();
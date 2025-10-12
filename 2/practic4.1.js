let name = "Владислав";
if (name === null || name.trim() === "") {
    console.log("Имя пустое");
}
else if (name.lenght < 2){
    console.log("Имя слишком короткое");
}
else if (name.lenght > 50){
    console.log("Имя слишком длинное");
}
else {
    console.log(' $ {name} ');
}
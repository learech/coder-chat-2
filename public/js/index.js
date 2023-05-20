const socket = io();

socket.on("welcome", (data) => {
    console.log(data);
});
socket.on('messages-all', (data) =>{
    render(data);
})

function render(data) {
    const html = data.map(elem =>{
        return (
            `
        <div>
        <strong> ${elem.author} </strong> dice <p> ${elem.text} </p>
        </div>
        `
        )
    }).join(' ')

    document.getElementById('caja').innerHTML = html
}
function addmessage() {
    const mensaje = {
        author: document.getElementById("username").value,
        text: document.getElementById("texto").value,
    };
    socket.emit("new-message", mensaje);

    console.log(mensaje);
    return false;
}

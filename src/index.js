import "./sass/style.scss"
import "./js/app.js"

const link = document.createElement("link")
link.rel = "icon"
link.href = new URL("./assests/icon.svg", import.meta.url)
document.querySelector("head").appendChild(link)

document.title = "Document"


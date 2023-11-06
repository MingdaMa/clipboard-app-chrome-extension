const BASE_URL = "https://clipboard-app-backend-16c2583d149e.herokuapp.com/api"

let tagsArr = []
let tagSelected = []
let postTitle = ''
let postSummary = ''
let postLink = ''
const tagsSelectionGroup = document.getElementById("tagsSelectGroup")
const postTitleElem = document.getElementById("postTitle")
const postSummaryElem = document.getElementById("postSummary")
const postLinkElem = document.getElementById("postLink")
const formElem = document.getElementById("clip-board-form")

window.addEventListener("DOMContentLoaded", function() {
    tagsSelectionGroup.onchange = (e) => {
        tagSelected.push(e.target.value)
    }

    postTitleElem.onchange = (e) => {
        postTitle = e.target.value
    }

    postSummaryElem.onchange = (e) => {
        postSummary = e.target.value
    }

    postLinkElem.onchange = (e) => {
        postLink = e.target.value
    }

    formElem.onsubmit = (e) => {
        e.preventDefault();

        savePost()
            .then(res => {
                console.log(res)
                const postId = res.data.id
                savePostWithTag(postId)
            })
            .catch(e => {
                console.log(e)
            })
    }
})

async function fetchTagData() {
    const res = await fetch(`${BASE_URL}/tags`)
    const tags = await res.json()
    tagsArr = tags.map(tag => {
        return { id: tag.id, name: tag.name }
    })
    
    for (let i = 0; i < tagsArr.length; i++) {
        const tag = document.createElement("option")
        tag.innerHTML = tagsArr[i].name
        tag.value = tagsArr[i].id
        tagsSelectionGroup.appendChild(tag)
    }
}
fetchTagData()

async function savePost() {
    const postObj = { title: postTitle, summary: postSummary, link: postLink }
    const res = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        body: JSON.stringify(postObj)
    })
    return res.json()
}

async function savePostWithTag(postId) {
    const res = await fetch(`${BASE_URL}/posts/addTags/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(tagSelected)
    })
    return res.json()
}
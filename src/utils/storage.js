
const ROOM_URL = "ROOM_URL"




export function setRoomUrl(state) {
    localStorage.setItem(ROOM_URL, JSON.stringify(state))
}

export function getRoomUrl() {
    const data = localStorage.getItem(ROOM_URL)
    return data ? JSON.parse(data) : '{}'
}

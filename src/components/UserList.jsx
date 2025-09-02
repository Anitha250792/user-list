import React, { useEffect, useState } from 'react'


export default function UserList() {
const [users, setUsers] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)


useEffect(() => {
const controller = new AbortController()


async function fetchUsers() {
try {
setLoading(true)
setError(null)


const res = await fetch('https://jsonplaceholder.typicode.com/users', {
signal: controller.signal,
})


if (!res.ok) {
throw new Error(`Network error: ${res.status} ${res.statusText}`)
}


const data = await res.json()
setUsers(data)
} catch (err) {
if (err.name === 'AbortError') return // request was cancelled
setError(err.message || 'Unknown error')
} finally {
setLoading(false)
}
}


fetchUsers()


// cleanup on unmount
return () => controller.abort()
}, [])


if (loading) return <p className="center">Loading users…</p>
if (error) return <p className="center error">Error: {error}</p>


return (
<ul className="user-list">
{users.map((u) => (
<li key={u.id} className="user-card">
<div className="user-left">
<div className="avatar">{u.name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase()}</div>
</div>
<div className="user-right">
<h3 className="name">{u.name} <small className="username">@{u.username}</small></h3>
<p className="meta"><strong>Email:</strong> <a href={`mailto:${u.email}`}>{u.email}</a></p>
<p className="meta"><strong>Company:</strong> {u.company?.name}</p>
<p className="meta"><strong>City:</strong> {u.address?.city}</p>
</div>
</li>
))}
</ul>
)
}
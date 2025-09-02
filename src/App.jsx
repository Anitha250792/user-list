import React from 'react'
import UserList from './components/UserList'


export default function App() {
return (
<div className="app-container">
<header className="app-header">
<h1>User List</h1>
<p className="muted">Data from <code>jsonplaceholder.typicode.com/users</code></p>
</header>


<main>
<UserList />
</main>


<footer className="footer">Simple demo • React + Vite</footer>
</div>
)
}
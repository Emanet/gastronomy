// src/components/Navbar.tsx
import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
	return (
		<nav className="navbar">
			<div className="navbar-brand">
				<Link href="/">Be Fat</Link>
			</div>
			<div className="navbar-links">
				<Link href="/">Home</Link>
				<Link href="/about">About</Link>
				<Link href="/blog">Blog</Link>
				<Link href="/contact">Contact</Link>
			</div>
			<div className="navbar-auth">
				<Link href="/register">Register</Link>
				<Link href="/login">Login</Link>
			</div>
		</nav>
	);
};

export default Navbar;

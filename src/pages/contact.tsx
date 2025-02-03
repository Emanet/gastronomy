// src/pages/about.tsx
import React from "react";
import Navbar from "../components/NavBar";
import Image from "next/image";

const ContactPage = () => {
	return (
		<div className="contact-container" style={{
			display: 'grid',
			gridTemplateRows: 'auto 1fr auto',
			minHeight: '100vh'
		}}>
			<Navbar />

			<div className="contact-section" style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
				padding: '20px',
				textAlign: 'center'
			}}>
				<h2>Get in Touch</h2>
				<p>Have questions or suggestions? We'd love to hear from you!</p>
				<div className="contact-info">
					<div className="contact-item">
						<span className="contact-icon">📧</span>
						<a href="mailto:contact@befat.com">contact@befat.com</a>
					</div>
					<div className="contact-item">
						<span className="contact-icon">📱</span>
						<a href="tel:+1234567890">+123 456 7890</a>
					</div>
				</div>
			</div>


			<footer className="about-footer" >
				<p>
					&copy; 2024 Be Fat. Created by{" "}
					<a
						href="https://github.com/Emanet"
						target="_blank"
						rel="noopener noreferrer"
					>
						Emanet
					</a>
				</p>
			</footer>
		</div>

	);
};

export default ContactPage;

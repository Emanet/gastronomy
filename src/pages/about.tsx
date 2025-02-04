// src/pages/about.tsx
import React from "react";
import Navbar from "../components/NavBar";
import Image from "next/image";

const AboutPage = () => {
	return (
		<div className="about-container">
			<Navbar />

			<div className="about-hero">
				<h1 className="about-title">Welcome to Be Fat</h1>
				<p className="about-subtitle">
					Discover the Best Restaurants Around You
				</p>
			</div>

			<div className="about-content">
				<div className="about-section">
					<div className="section-image">
						<Image
							src="/image.jpg"
							alt="About Us"
							width={500}
							height={300}
							objectFit="cover"
						/>
					</div>
					<div className="section-text">
						<h2>Our Story</h2>
						<p>
							Founded in 2024, Be Fat has become the go-to platform for food
							enthusiasts looking to discover exceptional dining experiences.
							Our mission is to connect people with the best restaurants, making
							every dining experience memorable.
						</p>
					</div>
				</div>

				<div className="features-grid">
					<div className="feature-card">
						<div className="feature-icon">🔍</div>
						<h3>Easy Search</h3>
						<p>Find restaurants quickly with our intuitive search system</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">📍</div>
						<h3>Location Based</h3>
						<p>Discover great restaurants near you with precise locations</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">📸</div>
						<h3>Photo Gallery</h3>
						<p>View high-quality photos of each restaurant</p>
					</div>
					<div className="feature-card">
						<div className="feature-icon">🗺️</div>
						<h3>Interactive Maps</h3>
						<p>Get directions with our integrated mapping system</p>
					</div>
				</div>


			</div>

			<footer className="about-footer">
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

export default AboutPage;

import Link from "next/link";
import Navbar from "../components/Navbar";
import Image from "next/image";

const HomePage = () => {
	return (
		<>
			<Navbar />
			<div className="home-container">
				<div className="image-container">
					<Image
						className="background-image"
						src="/image.jpg"
						alt="Home Image"
						layout="fill"
						objectFit="cover"
					/>
					<div className="overlay">
						<h1>Welcome to Be Fat!</h1>
						<Link href="/search" className="explore-button">
							Explore Now
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default HomePage;

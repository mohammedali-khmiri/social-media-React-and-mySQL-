import "./stories.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Stories = () => {
	const { currentUser } = useContext(AuthContext);

	//Temporary data
	const stories = [
		{
			id: 1,
			name: "montassar th",
			img: "https://images.pexels.com/photos/6836992/pexels-photo-6836992.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
		},
		{
			id: 2,
			name: "emna kh",
			img: "https://images.pexels.com/photos/7323054/pexels-photo-7323054.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
		},
		{
			id: 3,
			name: "bella bn",
			img: "https://images.pexels.com/photos/4691197/pexels-photo-4691197.jpeg?auto=compress&cs=tinysrgb&w=600",
		},
		{
			id: 4,
			name: "eya bn",
			img: "https://images.pexels.com/photos/7034219/pexels-photo-7034219.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
		},
		// {
		// 	id: 5,
		// 	name: "hazem ma",
		// 	img: "https://images.pexels.com/photos/12957796/pexels-photo-12957796.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
		// },
		// {
		// 	id: 6,
		// 	name: "aziz na",
		// 	img: "https://images.pexels.com/photos/7741615/pexels-photo-7741615.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
		// },
		// {
		// 	id: 7,
		// 	name: "malek bn",
		// 	img: "https://images.pexels.com/photos/14875288/pexels-photo-14875288.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
		// },
		// {
		// 	id: 8,
		// 	name: "love love",
		// 	img: "https://images.pexels.com/photos/15327251/pexels-photo-15327251.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
		// },
	];
	return (
		<div className="stories">
			<div className="myStory">
				<img src={currentUser.profilePic} alt="" />
				<span>Create a story</span>
				<div className="grey-div" />
				<div className="plus-button">
					<p>+</p>
				</div>
			</div>
			{stories.map((story) => (
				<div className="story" key={story.id}>
					<div className="div-hover" />
					<img src={story.img} alt="" />
					<span>{story.name}</span>
				</div>
			))}
		</div>
	);
};

export default Stories;

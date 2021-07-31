import { useEffect, useState } from "react";
import "../styles/post.css";

function Post({ name, description, social1, social2, date }) {
	return (
		<div className="post-page-container">
			<div className="post-container">
				<div className="post-header-container">
					<div className="post-date">
						<h4>{date}</h4>
					</div>
					<div className="post-indentifier">
						<h4 style={{fontWeight: 700}}>{name}</h4>
					</div>
				</div>
				<div className="post-description">
					<p>{description}</p>
				</div>

				<div className="post-social-media-container">
					<div className="post-social-media post-tag-1">
						<h5>{social1.name}</h5>
						<p>{social1.id}</p>
					</div>
					<div className="post-social-media post-tag-2">
						<h5>{social2.name}</h5>
						<p>{social2.id}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Post;

import React from "react";
import styles from "./popover.module.css";

const Popover = ({ description, position = "top", style, children }) => {
	const getPopoverStyles = () => {
		switch (position) {
			case "left":
				return {
					left: "-110%",
					top: "50%",
					transform: "translateY(-50%)",
					...style,
				};
			case "right":
				return {
					left: "110%",
					top: "50%",
					transform: "translateY(-50%)",
					...style,
				};
			case "top":
				return {
					left: "50%",
					top: "-110%",
					transform: "translateX(-50%)",
					...style,
				};
			case "bottom":
				return {
					left: "50%",
					top: "110%",
					transform: "translateX(-50%)",
					...style,
				};
			default:
				return { ...style };
		}
	};

	return (
		<div className={styles.popoverContainer}>
			<div className={styles.popover} style={getPopoverStyles()}>
				<div>{description}</div>
			</div>
			{children}
		</div>
	);
};

export default Popover;

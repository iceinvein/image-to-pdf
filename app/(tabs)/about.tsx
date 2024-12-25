import { Text, View, StyleSheet } from "react-native";

export default function AboutScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				Local conversion of images to PDF. Enjoy an ad free experience without
				the need for an internet connection.
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#25292e",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 40,
	},
	text: {
		fontSize: 18,
		textAlign: "center",
		color: "#fff",
	},
});

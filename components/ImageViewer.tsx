import { StyleSheet, ScrollView, View, Dimensions } from "react-native";
import { Image, type ImageSource } from "expo-image";
import { Image as RNImage } from "react-native";

type Props = {
	selectedImages?: string[];
};

export default function ImageViewer({ selectedImages }: Props) {
	return (
		<ScrollView style={styles.scrollViewContainer}>
			{selectedImages?.map((image) => (
				<View key={image} style={styles.imageContainer}>
					<Image
						key={image}
						source={{ uri: image }}
						style={styles.image}
						contentFit="contain"
						transition={1000}
					/>
				</View>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	image: {
		flex: 1,
	},
	scrollViewContainer: {
		flex: 1,
		flexDirection: "column",
		rowGap: 8,
	},
	imageContainer: {
		flex: 1,
		width: Dimensions.get("window").width,
		minHeight: Dimensions.get("window").height / 4,
	},
});

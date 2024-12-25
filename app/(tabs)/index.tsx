import { View, StyleSheet, Dimensions, ScrollView, Image } from "react-native";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { createPdf, type Page } from "react-native-images-to-pdf";
import * as FileSystem from "expo-file-system";
import Pdf from "react-native-pdf";

export default function Index() {
	const [selectedImages, setSelectedImages] = useState<string[]>([]);
	const [pdf, setPdf] = useState<string | null>(null);

	const pickImageAsync = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			quality: 1,
			allowsMultipleSelection: true,
		});

		if (result.canceled) return;

		setSelectedImages(result.assets.map((asset) => asset.uri));
	};

	const createPdfAsync = async () => {
		try {
			const pages: Page[] = selectedImages.map((imagePath) => {
				return {
					imagePath,
					imageFit: "contain",
				};
			});

			const pdf = await createPdf({
				pages,
				outputPath: `${FileSystem.documentDirectory}test.pdf`,
			});
			setPdf(pdf);
		} catch (error) {
			console.log(error);
		}
	};

	if (pdf) {
		return (
			<View style={styles.container}>
				<ScrollView style={styles.pdfContainer}>
					<Pdf source={{ uri: pdf }} style={styles.pdf} />
				</ScrollView>
				<View
					style={{
						flex: 1 / 12,
						alignItems: "center",
					}}
				>
					<Button
						label="Close"
						onPress={() => setPdf(null)}
						theme="secondary"
					/>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<ImageViewer selectedImages={selectedImages} />
			<View style={styles.footerContainer}>
				<Button label="Choose Images" onPress={pickImageAsync} />
				<Button
					label="Create PDF"
					theme="primary"
					disabled={selectedImages.length <= 0}
					onPress={createPdfAsync}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#25292e",
		alignItems: "center",
		rowGap: 16,
	},
	footerContainer: {
		flex: 1 / 6,
		alignItems: "center",
	},
	pdf: {
		flex: 1,
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
	pdfContainer: {
		flex: 1,
		flexDirection: "column",
		width: "auto",
	},
});

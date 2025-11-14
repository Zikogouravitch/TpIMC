import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,ScrollView,StyleSheet,Image,} from "react-native";

export default function ProfilStatique() {
  const [taille, setTaille] = useState("");
  const [poids, setPoids] = useState("");
  const [imc, setIMC] = useState(null);
  const [image, setImage] = useState(null);

  const calculerIMC = () => {
    const t = parseFloat(taille) / 100; 
    const p = parseFloat(poids);
    if (isNaN(t) || isNaN(p) || t <= 0 || p <= 0) {
      alert("Veuillez entrer des valeurs valides pour le poids et la taille.");
      return;
    }
    const result = p / (t * t);
    const imcValue = result.toFixed(2);
    setIMC(imcValue);

   
    if (result < 18.5) {
      setImage(require("./assets/maigre.png")); 
    } else if (result < 25) {
      setImage(require("./assets/normal.png")); 
    } else if (result < 30) {
      setImage(require("./assets/surpoids.png")); 
    } else if (result < 40) {
      setImage(require("./assets/obese.png")); 
    } else {
      setImage(require("./assets/t_obese.png")); 
    }
  };

  const clearInput = () => {
    setPoids("");
    setTaille("");
    setIMC(null);
    setImage(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.mainTitle}>IMC For II-Master BDCC 1</Text>
       <View style={styles.imageContainer}>
              <Image 
                source={require("./assets/imc.png")} 
                style={styles.categorieImage}
                resizeMode="contain"
              />
            </View>
      <View style={styles.inputSection}>
        <Text style={styles.sectionTitle}>Poids</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={poids}
            onChangeText={setPoids}
          />
          <Text style={styles.unit}>Kg</Text>
        </View>
      </View>
      <View style={styles.inputSection}>
        <Text style={styles.sectionTitle}>Taille</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={taille}
            onChangeText={setTaille}
          />
          <Text style={styles.unit}>Cm</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.calculateButton} onPress={calculerIMC}>
          <Text style={styles.calculateButtonText}>Calculer IMC</Text>
        </TouchableOpacity>
      </View>
      {imc && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Votre IMC est: {imc}</Text>
          {image && (
            <View style={styles.imageContainer}>
              <Image 
                source={image} 
                style={styles.categorieImage}
                resizeMode="contain"
              />
            </View>
          )}
        </View>
      )}

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
    paddingTop: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  inputSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  unit: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    marginLeft: 10,
  },
  calculateButton: {
    backgroundColor: "purple",
    padding: 15,
    width: "70%",
    borderRadius: 30,
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  calculateButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultContainer: {
    alignItems: "center",
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  categorieImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
});

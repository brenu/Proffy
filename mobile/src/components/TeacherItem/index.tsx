import React, { useState } from "react";
import { Image, Linking, Text, View } from "react-native";

import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import unfavoriteIcon from "../../assets/images/icons/unfavorite.png";
import whatsappIcon from "../../assets/images/icons/whatsapp.png";

import styles from "./styles";
import { RectButton } from "react-native-gesture-handler";
import api from "../../services/api";
import AsyncStorage from "@react-native-community/async-storage";

export interface Class {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  user_id: number;
  whatsapp: string;
}

interface TeacherItemProps {
  class: Class;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = (props) => {
  const [isFavorite, setIsFavorite] = useState(props.favorited);

  async function createNewConnection() {
    Linking.openURL(
      `whatsapp://send?text=Olá! Eu vim pelas aulas de ${props.class.subject} :)&phone=+55${props.class.whatsapp}`
    );
    const response = await api.post("/connections", {
      user_id: props.class.user_id,
    });
  }

  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem("favorites");
    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorite) {
      const favoriteIndex = favoritesArray.findIndex((classesClass: Class) => {
        return classesClass.id === props.class.id;
      });

      // Função que remove x itens à partir de um dado índice
      favoritesArray.splice(favoriteIndex, 1);
    } else {
      favoritesArray.push(props.class);
    }

    await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
    setIsFavorite(!isFavorite);
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: props.class.avatar }} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{props.class.name}</Text>
          <Text style={styles.subject}>{props.class.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{props.class.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {`   `}{" "}
          <Text style={styles.priceValue}>{props.class.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            style={[
              styles.favoriteButton,
              isFavorite ? styles.favorited : null,
            ]}
            onPress={handleToggleFavorite}
          >
            {!isFavorite ? (
              <Image source={heartOutlineIcon} />
            ) : (
              <Image source={unfavoriteIcon} />
            )}
          </RectButton>

          <RectButton
            style={styles.contactButton}
            onPress={() => {
              createNewConnection();
            }}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;

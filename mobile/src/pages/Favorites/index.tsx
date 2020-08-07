import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import PageHeader from "../../components/PageHeader";

import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import TeacherItem, { Class } from "../../components/TeacherItem";
import AsyncStorage from "@react-native-community/async-storage";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(() => {
    async function handleInit() {
      const response = await AsyncStorage.getItem("favorites");

      if (response) {
        const favoriteClasses = JSON.parse(response);

        setFavorites(favoriteClasses);
      }
    }

    handleInit();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus Proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((classesClass: Class) => (
          <TeacherItem
            key={classesClass.id}
            class={classesClass}
            favorited={true}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default Favorites;

import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { ScrollView, BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

import PageHeader from "../../components/PageHeader";

import styles from "./styles";
import TeacherItem, { Class } from "../../components/TeacherItem";

import api from "../../services/api";
import { useFocusEffect } from "@react-navigation/native";

function TeacherList() {
  const [classes, setClasses] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  async function handleFavorites() {
    const response = await AsyncStorage.getItem("favorites");

    if (response) {
      const favoriteClasses = JSON.parse(response);
      const favoriteClassesIds = favoriteClasses.map((classesClass: Class) => {
        return classesClass.id;
      });

      setFavorites(favoriteClassesIds);
    }
  }

  useEffect(() => {
    async function searchClasses() {
      handleFavorites();
      try {
        const response = await api.get("classes", {
          params: {
            subject,
            week_day,
            time,
          },
        });

        if (response.status === 200) {
          setClasses(response.data.classes);
        }
      } catch (error) {
        console.log(error.response);
      }
    }

    if (subject && week_day && time) {
      searchClasses();
    }
  }, [subject, week_day, time]);

  function handleToogleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToogleFiltersVisible}>
            <Feather
              name="filter"
              size={20}
              color="#fff"
              style={{ padding: 5 }}
            />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
              value={subject}
              onChangeText={setSubject}
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da Semana</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                  value={week_day}
                  onChangeText={setWeekDay}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o horário?"
                  placeholderTextColor="#c1bccc"
                  value={time}
                  onChangeText={setTime}
                />
              </View>
            </View>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {classes.map((classesClass: Class) => {
          return (
            <TeacherItem
              key={classesClass.id}
              class={classesClass}
              favorited={favorites.includes(classesClass.id)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;

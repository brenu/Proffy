import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { ScrollView, BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-community/picker";
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

  const [subject, setSubject] = useState("Artes");
  const [week_day, setWeekDay] = useState("0");
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

    console.log(subject, week_day, time);
    if (time) {
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
            <View style={styles.input}>
              <Picker
                selectedValue={subject}
                onValueChange={(itemValue: any, itemIndex: any) =>
                  setSubject(itemValue)
                }
              >
                <Picker.Item label="Artes" value="Artes" />
                <Picker.Item label="Biologia" value="Biologia" />
                <Picker.Item label="Ciências" value="Ciências" />
                <Picker.Item label="Ed.Física" value="Ed.Física" />
                <Picker.Item label="Física" value="Física" />
                <Picker.Item label="Geografia" value="Geografia" />
                <Picker.Item label="História" value="História" />
                <Picker.Item label="Matemática" value="Matemática" />
                <Picker.Item label="Português" value="Português" />
                <Picker.Item label="Química" value="Química" />
              </Picker>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da Semana</Text>
                <View style={[styles.input, { paddingHorizontal: 2 }]}>
                  <Picker
                    style={{
                      height: 45,
                      backgroundColor: "#fff",
                      borderRadius: 8,
                      justifyContent: "center",
                    }}
                    selectedValue={week_day}
                    onValueChange={(itemValue: any, itemIndex: any) =>
                      setWeekDay(itemValue)
                    }
                  >
                    <Picker.Item label="Domingo" value="0" />
                    <Picker.Item label="Segunda" value="1" />
                    <Picker.Item label="Terça" value="2" />
                    <Picker.Item label="Quarta" value="3" />
                    <Picker.Item label="Quinta" value="4" />
                    <Picker.Item label="Sexta" value="5" />
                    <Picker.Item label="Sábado" value="6" />
                  </Picker>
                </View>
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

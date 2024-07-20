import {useCallback, useEffect, useState} from 'react';
import { FlatList, TextInput, View, StyleSheet, Button } from 'react-native';


const API_KEY = '479dc08a1d384091b59557f2d9c3dd23';
const BASE_URL = 'https://newsapi.org/v2/everything?';

export default function App() {
  const [searchText, setSearchText] = useState('tesla');
  const [result, setResult] = useState([]);

  const onPress = async () => {
    const searchUrl = `${BASE_URL}q=${searchText}&from=2024-06-20&sortBy=publishedAt&apiKey=${API_KEY}`;
    try {
      const response = await fetch(searchUrl);
      const json = await response.json();
      setResult(json.articles);
      console.log("json", json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  console.log(result);
  
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        onChangeText={setSearchText}
        value={searchText}
      />
      <Button
        title="Search"
        onPress={() => onPress()}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    height: 40,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
});

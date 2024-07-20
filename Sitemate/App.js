import { useCallback, useEffect, useState } from 'react';
import { FlatList, TextInput, View, StyleSheet, Button, Text } from 'react-native';


const API_KEY = '479dc08a1d384091b59557f2d9c3dd23';
const BASE_URL = 'https://newsapi.org/v2/everything?';

const keyExtractor = (item) => item.url;

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

  const renderItem = ({ item, index }) => {
    return (
        <View style={styles.itemContainer}>
          <Text numberOfLines={2} ellipsizeMode='tail' style={styles.title}>{index} Title: {item.title}</Text>
          <Text style={styles.title}> Author: {item.author} </Text>
          <Text numberOfLines={1} ellipsizeMode='tail'> Content : {item.content}</Text>
        </View>
        );
  };
  
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
      <Text style={styles.title}> Count: {result.length} </Text>
      <FlatList data={result} renderItem={renderItem} keyExtractor={keyExtractor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 20,
  },

  input: {
    height: 40,
    borderWidth: 1,
    marginRight: 20,
  },

  text: {
    fontSize: 16,
  },

  itemContainer: {
    width: 550,
    height: 100,
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
    alignContent: 'center'
  },

  title : {
    fontWeight: 600
  }
});

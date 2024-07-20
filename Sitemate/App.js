import {useEffect, useState} from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';


export default function App() {
  const [searchText, setSearchText] = useState('');
  const [result, setResult] = useState([]);
  var url = 'https://newsapi.org/v2/everything?q=tesla&from=2024-06-20&sortBy=publishedAt&apiKey=479dc08a1d384091b59557f2d9c3dd23';


  const getResults = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setResult(json.articles);
      console.log("json", json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getResults();
  }, []);

  console.log(result);
  
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
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
});

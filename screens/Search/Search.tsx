import { Text, FlatList, View, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import AuthWrapper from '../../components/AuthWrapper';
import SecondarySearch from './SecondarySearch';
import ContentWrapper from '../../components/ContentWrapper';
import _debounce from 'lodash/debounce';
import { search } from '../../services/search';
import { searchDebounceTimeInMs } from '../../constants/search';
import { SearchResult } from '../../types/search';
import SearchTextResult from './SearchTextResult';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../enums/routes';
import { Categories } from '../../enums/categories';
import { generateErrorMessage } from '../../helpers/error';

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const debouncedSearch = useCallback(
    _debounce(async (query: string) => {
      try {
        const fetchedResults = await search(query);
        setSearchResults(fetchedResults);
      } catch (error) {
        const message = generateErrorMessage(error);
        alert(message);
      }
    }, searchDebounceTimeInMs),
    []
  );

  useEffect(() => {
    (async () => {
      try {
        if (!searchText) {
          setSearchResults([]);

          return;
        }

        await debouncedSearch(searchText);
      } catch (error) {
        const message = generateErrorMessage(error);
        alert(message);
      }
    })();
  }, [searchText]);

  function handleRender(item: SearchResult) {
    const { docID } = item;

    return <SearchTextResult key={docID} result={item} />;
  }

  function handleGoToCategories() {
    navigation.navigate(Routes.CATEGORY, {
      category: Categories.ALL,
      initialQuery: searchText,
    });
  }

  return (
    <AuthWrapper>
      <ContentWrapper hasLightStatusBar hasHeader={false}>
        <SecondarySearch
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <View className="p-4">
          <TouchableOpacity
            className="flex-row py-2"
            disabled={!searchText}
            onPress={handleGoToCategories}
          >
            <Text className="text-gray-300">Search for </Text>
            <Text className="text-gray-400">{searchText || '....'}</Text>
          </TouchableOpacity>
          <FlatList
            data={searchResults}
            renderItem={({ item }) => handleRender(item)}
          />
        </View>
      </ContentWrapper>
    </AuthWrapper>
  );
}

import { Text, FlatList, View, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import AuthWrapper from '../../components/AuthWrapper';
import ContentWrapper from '../../components/ContentWrapper';
import _debounce from 'lodash/debounce';
import { search } from '../../services/search';
import { searchDebounceTimeInMs } from '../../constants/search';
import { SearchResult } from '../../types/search';
import SearchTextResult from './SearchTextResult';
import Search from '../../components/Search';
import { LeftArrowIcon } from '../../components/icons';
import useGoBack from '../../hooks/useGoBack';

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const debouncedSearch = useCallback(
    _debounce(async (query: string) => {
      const fetchedResults = await search(query);
      setSearchResults(fetchedResults);
    }, searchDebounceTimeInMs),
    []
  );

  useEffect(() => {
    (async () => {
      if (!searchText) {
        setSearchResults([]);

        return;
      }

      await debouncedSearch(searchText);
    })();
  }, [searchText]);

  function handleRender(item: SearchResult) {
    const { docID } = item;

    return <SearchTextResult key={docID} result={item} />;
  }

  const goBack = useGoBack();

  return (
    <AuthWrapper>
      <ContentWrapper hasLightStatusBar hasHeader={false}>
        <View className="flex-row items-center bg-primary-400 px-4 pb-5 pt-16">
          <TouchableOpacity
            className="mr-5 h-8 w-8 items-center justify-center"
            onPress={goBack}
          >
            <LeftArrowIcon />
          </TouchableOpacity>
          <Search
            autoFocus
            value={searchText}
            onChange={(query: string) => setSearchText(query)}
          />
        </View>
        <View className="p-4">
          <TouchableOpacity className="flex-row py-2">
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

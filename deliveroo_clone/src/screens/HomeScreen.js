import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import Client from '../../Client';

const HomeScreen = () => {
  const [featuredCategories, setfeaturedCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await Client.fetch(
        `
             *[_type == "featured"]{
               ...,
               restaurants[]->{
                 ...,
               dishes[]->,
                 type->{
                   name
                 }
               },
             }`,
      ).then(data => {
        data;
        setfeaturedCategories(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{uri: 'https:links.papareact.com/wru'}}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        <UserIcon size={35} color="#00CCBB" />
      </View>
      {/* Search  */}

      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row items-center space-x-2 flex-1 bg-gray-200 p-2">
          <MagnifyingGlassIcon color="gray" />
          <TextInput placeholder="Restaurant and Cuisines" />
        </View>

        <AdjustmentsHorizontalIcon size={35} color="#00CCBB" />
      </View>

      {/* Body */}

      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 200,
        }}>
        {/* Categories */}
        <Categories />
        {/* Featured Row */}

        {featuredCategories?.map(category => {
          return (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

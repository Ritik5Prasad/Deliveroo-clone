import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ArrowRightIcon} from 'react-native-heroicons/outline';
import RestaurantCard from './RestaurantCard';
import client from '../../Client';

const FeaturedRow = ({id, title, description}) => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await client
        .fetch(
          ` *[_type == "featured" && _id == $id]{
               ...,
               restaurants[]->{
                 ...,
               dishes[]->,
                 type->{
                   name
                 }
               },
             }[0]`,
          {
            id,
          },
        )
        .then(data => {
          setRestaurants(data?.restaurants);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg font-mn">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        className="pt-4">
        {/* Restaurant Card */}

        {restaurants.map(restaurant => {
          return (
            <RestaurantCard
              key={restaurant._id}
              id={restaurant._id}
              imgUrl={restaurant.image}
              title={restaurant.name}
              rating={4.5}
              genre={restaurant.type?.name}
              address={restaurant.address}
              short_description={restaurant.short_description}
              dishes={restaurant.dishes}
              long={restaurant.long}
              lat={restaurant.lat}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;

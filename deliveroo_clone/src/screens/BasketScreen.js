import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {selectRestaurant} from '../Redux/features/restaurantSlice';
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from '../Redux/features/basketSlice';
import {XCircleIcon} from 'react-native-heroicons/solid';
import {urlFor} from '../../Client';
import Currency from 'react-currency-formatter';

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();
  const [groupedItemInBasket, setGroupedItemInBasket] = useState([]);
  const total = useSelector(selectBasketTotal);
  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            className="rounded-full bg-gray-100 absolute top-3 right-5"
            onPress={() => navigation.goBack()}>
            <XCircleIcon width={50} height={50} color="#00CCBB" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: 'https://links.papareact.com/wru',
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Delivery in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemInBasket).map(([key, items]) => {
            return (
              <View
                key={key}
                className="flex-row items-center space-x-3 bg-white py-2 px-5">
                <Text>{items.length} x</Text>
                <Image
                  source={{
                    uri: urlFor(items[0]?.image).url(),
                  }}
                  className="h-12 w-12 rounded-full"
                />
                <Text className="flex-1 text-gray-500">{items[0]?.name}</Text>
                <Text className="text-gray-600 ">
                  <Currency quantity={items[0]?.price} currency="INR" />
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(removeFromBasket({id: items[0]?.id}));
                  }}>
                  <Text className="text-[#00CCBB] text-xs">Remove</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={total} currency="INR" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              <Currency quantity={49} currency="INR" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">
              <Currency quantity={total + 49} currency="INR" />
            </Text>
          </View>
          <TouchableOpacity
            className="rounded-lg bg-[#00CCBB] p-4"
            onPress={() => navigation.navigate('PreparingOrderScreen')}>
            <Text className="text-center text-white text-kg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;

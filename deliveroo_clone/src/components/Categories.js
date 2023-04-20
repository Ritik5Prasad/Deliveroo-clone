import {View, Text, ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import client, { urlFor } from '../../Client';

const Categories = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await client
        .fetch(
          `
             *[_type == "category" ]`
        )
        .then(data => {
    
          setCategory(data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        paddingHorizontal:15,
        paddingTop: 10,
      }}
      showsHorizontalScrollIndicator={false}>
        {category.map((item)=>{
          return(
            <CategoryCard key={item._id} imgUrl={urlFor(item.image).url()} title={item.name} />

          )
        })}
     
    </ScrollView>
  );
};

export default Categories;

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    {
      name:"name",
      type:"string",
      title:'Restaurant Name',
      validation: (Rule)=> Rule.required(),
      
    },
   
    {
      name:"short_description",
      type:"string",
      title:'Short description',
      validation: (Rule)=> Rule.required(),
      
    },
    {
      name:"price",
      type:"number",
      title:'Price of the dish in GBP',
      
    },
    {
      name:"image",
      type:"image",
      title:'Image of the dish',
      
    },
  ],

})

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';


const CategoriaLista = ({ categories, onPressCategory }) => {
    return (
        <ScrollView horizontal>
          {categories.map(category => (
            <TouchableOpacity key={category.id} onPress={() => onPressCategory(category.id)}>
              <View style={{ alignItems: 'center', margin: 10 }}>
                <Image
                   source={category.image}
                  style={{ marginTop: 30, width: 100, height: 100, borderRadius: 20 }} 
                />
                <Text style={{ marginTop: 5 }}>{category.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    };

export default CategoriaLista;
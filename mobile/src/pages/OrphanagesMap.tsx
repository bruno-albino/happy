import React, { useEffect, useState } from 'react'
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import mapIconImg from '../images/map-icon.png'
import orphanagesRepository, { Orphanages } from '../repositories/Orphanages'

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanages[]>([])
  const navigation = useNavigation()

  useFocusEffect(() => {
    orphanagesRepository
    .index()
    .then(setOrphanages)
    .catch(err => {
      console.error(err)
      alert('Ocorreu um erro ao buscar os orfanatos')
    })
  })


  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id })
  }
  
  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition')
  }
  

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -22.9087299,
          longitude: -47.0291171,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id}
            icon={mapIconImg}
            calloutAnchor={{
              x: 2.3,
              y: 0.8
            }}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude
            }}
          >
            <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
              <View style={styles.callOutContainer}>
                <Text style={styles.callOutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
          <Feather name='plus' size={20} color='#FFF' />
        </RectButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  callOutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',

    elevation: 10
  },

  callOutText: {
    color: '#0089A5',
    fontSize: 14,

    fontFamily: 'Nunito_700Bold'
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    
    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 10,

    fontFamily: 'Nunito_700Bold'
  },

  footerText: {
    color: '#8FA7B3'
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15C3D6',
    borderRadius: 20,

    justifyContent:'center',
    alignItems: 'center'
  }
});
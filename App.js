import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, StatusBar, Text, View } from 'react-native';

import * as SplashScreen from 'expo-splash-screen';

import { useFonts as useSourceSansPro, SourceSansPro_400Regular, SourceSansPro_600SemiBold, SourceSansPro_700Bold, SourceSansPro_900Black } from '@expo-google-fonts/source-sans-pro';
import { useFonts as useOswald, Oswald_400Regular, Oswald_500Medium, Oswald_700Bold } from '@expo-google-fonts/oswald';
import { useFonts as useBam } from 'expo-font';

import Routes from './src/router';

export default function App() {
  const [SourceSansProLoaded] = useSourceSansPro({
    SourceSansPro_400Regular,
    SourceSansPro_600SemiBold,
    SourceSansPro_700Bold,
    SourceSansPro_900Black
  });
  const [OswaldLoaded] = useOswald({
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_700Bold
  });
  const [BamLoaded] = useBam({
    'BamIcon': require('./assets/fonts/bam3.ttf'),
    'BamIcon3': require('./assets/fonts/bam3.ttf'),
  });

  if(!SourceSansProLoaded || !OswaldLoaded || !BamLoaded ){
    return ( <>
      <StatusBar backgroundColor="#cc1e0d" style="light" StatusBarStyle="dark-content" translucent={false} />
      </> 
    )
  }
  return (
    <>
      <StatusBar backgroundColor="#cc1e0d" style="light" StatusBarStyle="dark-content" translucent={false} />
      <Routes/>
    </>
  );
}
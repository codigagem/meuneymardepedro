import { useEffect, useState } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';

export default function Page() {
  const { width } = useWindowDimensions();
  const roadWidth = Math.min(260, width - 40);
  const maxCarOffset = roadWidth / 2 - 25;

  const [carX, setCarX] = useState(0);
  const [roadY, setRoadY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoadY(prev => (prev + 8) % 120);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const moveCar = (delta: number) => {
    setCarX(prev => Math.max(-maxCarOffset, Math.min(maxCarOffset, prev + delta)));
  };

  const stripePositions = Array.from({ length: 8 }, (_, index) => {
    const position = index * 120 - roadY;
    return position % 120 - 120;
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#080909' }}>
      <View style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 120, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>Jogo de Carro</Text>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{
          position: 'absolute',
          width: width,
          height: '100%',
          backgroundColor: '#062006',
        }} />

        <View style={{
          position: 'absolute',
          width: roadWidth,
          height: '100%',
          borderRadius: 24,
          backgroundColor: '#333',
          borderColor: '#161616',
          borderWidth: 8,
        }} />

        <View style={{
          position: 'absolute',
          width: 20,
          height: '100%',
          backgroundColor: '#1f1f1f',
          left: (width - roadWidth) / 2 - 20,
        }} />

        <View style={{
          position: 'absolute',
          width: 20,
          height: '100%',
          backgroundColor: '#1f1f1f',
          right: (width - roadWidth) / 2 - 20,
        }} />

        {stripePositions.map((top, index) => (
          <View key={index} style={{
            position: 'absolute',
            width: 8,
            height: 50,
            backgroundColor: 'white',
            left: width / 2 - 4,
            top,
            borderRadius: 4,
            opacity: 0.9,
          }} />
        ))}

        <View style={{
          width: 60,
          height: 100,
          backgroundColor: '#e63946',
          borderRadius: 16,
          position: 'absolute',
          bottom: 120,
          left: width / 2 - 30 + carX,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.35,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 8 },
        }}>
          <View style={{ width: 40, height: 24, backgroundColor: '#ffb3b3', borderRadius: 8 }} />
        </View>
      </View>

      <View style={{
        position: 'absolute',
        bottom: 32,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}>
        <Pressable onPress={() => moveCar(-30)} style={{ backgroundColor: '#fff', paddingVertical: 16, paddingHorizontal: 30, borderRadius: 14 }}>
          <Text style={{ color: '#111', fontWeight: '700' }}>ESC</Text>
        </Pressable>
        <Pressable onPress={() => moveCar(30)} style={{ backgroundColor: '#fff', paddingVertical: 16, paddingHorizontal: 30, borderRadius: 14 }}>
          <Text style={{ color: '#111', fontWeight: '700' }}>DIR</Text>
        </Pressable>
      </View>
    </View>
  );
}

import { StyleSheet, Switch, Text, View } from 'react-native';
import Button from '../../components/Button';
import { useState } from 'react';
import { BLACK, PALETTES, PRIMARY, WHITE } from '../../colors';

const NotificationUpdateScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>채팅 알림</Text>
            <Switch
              trackColor={{ false: '#767577', true: PRIMARY.DEFAULT }}
              thumbColor={isEnabled ? PALETTES.NEUTRALVARIANT[98] : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              value={isEnabled}
              onValueChange={toggleSwitch}
            />
          </View>
        </View>
      </View>

      {/* 버튼은 화면 하단 중앙에 배치 */}
      <Button
        title="수정"
        customStyles={{ button: styles.button }}
        onPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: WHITE,
    justifyContent: 'space-between',
  },
  content: {
    alignItemsL: 'center',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 20,
  },
  card: {
    width: '100%',
    backgroundColor: WHITE,
    padding: 16,
    borderRadius: 10,
    shadowColor: BLACK,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
  },
  button: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default NotificationUpdateScreen;

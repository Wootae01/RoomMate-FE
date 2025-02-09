import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { BLACK, PALETTES, WHITE } from '../colors';

{
  /** 설문 항목과 해당 값 카드 형식으로 반환 */
}
const SurveyCard = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{item.name}</Text>
    <View style={styles.detailContainer}>
      {item.details.map((detail, index) => (
        <Text key={index} style={styles.detailText}>
          {detail.label}
        </Text>
      ))}
    </View>
  </View>
);

SurveyCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    details: PropTypes.array.isRequired,
  }),
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: WHITE,
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    width: '48%',
    shadowColor: BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
    color: BLACK,
  },
  detailContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailText: {
    fontSize: 14,
    color: PALETTES.NEUTRALVARIANT[20],
    marginRight: 10,
    marginBottom: 5,
  },
});

export default SurveyCard;

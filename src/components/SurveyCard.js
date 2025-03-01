import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BLACK, PALETTES, WHITE } from '../colors';
import { SURVEY } from '../surveyConstants';

{
  /** 설문 항목과 해당 값 카드 형식으로 반환 */
}
const SurveyCard = ({ surveyKey, values }) => {
  const [section, setSection] = useState(null);
  useEffect(() => {
    console.log('values ', values);
    setSection(SURVEY[surveyKey]);
  }, [surveyKey, values]);

  return (
    <View style={styles.card}>
      {section ? (
        <>
          <Text style={styles.title}>{section.name}</Text>
          <View style={styles.detailContainer}>
            {section.details &&
              section.details
                .filter((item) => values && values.includes(item.id))
                .map((item) => (
                  <Text key={item.value} style={styles.detailText}>
                    {item.label}
                  </Text>
                ))}
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

SurveyCard.propTypes = {
  surveyKey: PropTypes.string,
  values: PropTypes.array,
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

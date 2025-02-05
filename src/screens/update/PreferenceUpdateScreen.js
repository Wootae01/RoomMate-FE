import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import QuestionItem, { ButtonTypes } from '../../components/QuestionItem';
import { SURVEY } from '../../surveyConstants';

const PreferenceUpdateScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <QuestionItem
          header={{ number: 1, title: SURVEY.BED_TIME.name }}
          items={SURVEY.BED_TIME.details}
          buttonType={ButtonTypes.CHECK}
        />
        <QuestionItem
          header={{ number: 2, title: SURVEY.WAKEUP_TIME.name }}
          items={SURVEY.WAKEUP_TIME.details}
          buttonType={ButtonTypes.CHECK}
        />
        <QuestionItem
          header={{ number: 3, title: SURVEY.HEATING.name }}
          items={SURVEY.HEATING.details}
          buttonType={ButtonTypes.CHECK}
        />
        <QuestionItem
          header={{ number: 4, title: SURVEY.COOLING.name }}
          items={SURVEY.COOLING.details}
          buttonType={ButtonTypes.CHECK}
        />
        <QuestionItem
          header={{ number: 5, title: SURVEY.SLEEP_HABIT.name }}
          items={SURVEY.SLEEP_HABIT.details}
          buttonType={ButtonTypes.CHECK}
        />
        <QuestionItem
          header={{ number: 6, title: SURVEY.SMOKING.name }}
          items={SURVEY.SMOKING.details}
          buttonType={ButtonTypes.CHECK}
        />
        <QuestionItem
          header={{ number: 7, title: SURVEY.NOISE.name }}
          items={SURVEY.NOISE.details}
          buttonType={ButtonTypes.CHECK}
        />
        <QuestionItem
          header={{ number: 8, title: SURVEY.INDOOR_CALL.name }}
          items={SURVEY.INDOOR_CALL.details}
          buttonType={ButtonTypes.CHECK}
        />
        <QuestionItem
          header={{ number: 9, title: SURVEY.EATING.name }}
          items={SURVEY.EATING.details}
          buttonType={ButtonTypes.CHECK}
        />
        <QuestionItem
          header={{ number: 10, title: SURVEY.DRINKING.name }}
          items={SURVEY.DRINKING.details}
          buttonType={ButtonTypes.CHECK}
        />
        <QuestionItem
          header={{ number: 11, title: SURVEY.SCENT.name }}
          items={SURVEY.SCENT.details}
          buttonType={ButtonTypes.CHECK}
        />
        <QuestionItem
          header={{ number: 12, title: SURVEY.CLEANING.name }}
          items={SURVEY.CLEANING.details}
          buttonType={ButtonTypes.CHECK}
        />
        <QuestionItem
          header={{ number: 13, title: SURVEY.RELATIONSHIP.name }}
          items={SURVEY.RELATIONSHIP.details}
          buttonType={ButtonTypes.CHECK}
        />
        <View style={styles.buttton}>
          <Button
            title="수정"
            onPress={() => {}}
            customStyles={{
              button: {
                marginTop: 15,
                flex: 1,
                margin: 5,
              },
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 20,
  },
});
export default PreferenceUpdateScreen;

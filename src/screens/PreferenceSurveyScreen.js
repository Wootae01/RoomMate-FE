import { ScrollView } from 'react-native';
import QuestionItem, { ButtonTypes } from '../components/QuestionItem';
import { SURVEY_ITEMS, SURVEY_TITLE } from '../surveyConstants';

const PreferenceSurveyScreen = () => {
  return (
    <ScrollView>
      <QuestionItem
        header={{ number: 1, title: SURVEY_TITLE.BED_TIME }}
        items={SURVEY_ITEMS.BED_TIME}
        buttonType={ButtonTypes.CHECK}
      />
      <QuestionItem
        header={{ number: 2, title: SURVEY_TITLE.WAKEUP_TIME }}
        items={SURVEY_ITEMS.WAKEUP_TIME}
        buttonType={ButtonTypes.CHECK}
      />
      <QuestionItem
        header={{ number: 3, title: SURVEY_TITLE.HEATING }}
        items={SURVEY_ITEMS.HEATING}
        buttonType={ButtonTypes.CHECK}
      />
      <QuestionItem
        header={{ number: 4, title: SURVEY_TITLE.COOLING }}
        items={SURVEY_ITEMS.COOLING}
        buttonType={ButtonTypes.CHECK}
      />
      <QuestionItem
        header={{ number: 5, title: SURVEY_TITLE.SLEEP_HABIT }}
        items={SURVEY_ITEMS.SLEEP_HABIT}
        buttonType={ButtonTypes.CHECK}
      />
      <QuestionItem
        header={{ number: 6, title: SURVEY_TITLE.SMOKING }}
        items={SURVEY_ITEMS.SMOKING}
        buttonType={ButtonTypes.CHECK}
      />
      <QuestionItem
        header={{ number: 7, title: SURVEY_TITLE.NOISE }}
        items={SURVEY_ITEMS.NOISE}
        buttonType={ButtonTypes.CHECK}
      />
      <QuestionItem
        header={{ number: 8, title: SURVEY_TITLE.INDOOR_CALL }}
        items={SURVEY_ITEMS.INDOOR_CALL}
        buttonType={ButtonTypes.CHECK}
      />
      <QuestionItem
        header={{ number: 9, title: SURVEY_TITLE.EATING }}
        items={SURVEY_ITEMS.EATING}
        buttonType={ButtonTypes.CHECK}
      />
      <QuestionItem
        header={{ number: 10, title: SURVEY_TITLE.DRINKING }}
        items={SURVEY_ITEMS.DRINKING}
        buttonType={ButtonTypes.CHECK}
      />
      <QuestionItem
        header={{ number: 11, title: SURVEY_TITLE.SCENT }}
        items={SURVEY_ITEMS.SCENT}
        buttonType={ButtonTypes.CHECK}
      />
      <QuestionItem
        header={{ number: 12, title: SURVEY_TITLE.CLEANING }}
        items={SURVEY_ITEMS.CLEANING}
        buttonType={ButtonTypes.CHECK}
      />
      <QuestionItem
        header={{ number: 13, title: SURVEY_TITLE.RELATIONSHIP }}
        items={SURVEY_ITEMS.RELATIONSHIP}
        buttonType={ButtonTypes.CHECK}
      />
    </ScrollView>
  );
};

export default PreferenceSurveyScreen;

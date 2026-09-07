import React, { FC, useMemo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import AnimationView from '@components/AnimationView';
import AppText from '@components/AppText';
import FullScreenContainer from '@components/FullScreenContainer';
import Header from '@components/Header';
import TextInput from '@components/TextInput';
import { useTheme } from '@context/ThemeContext';
import { useAddNoteMutation } from '@services/note.query';
import { ThemeType } from '@src/theme/colors';
import { goBack } from '@utils/navigationUtils';
import { NoteSchema } from '@utils/validationSchemas';

const AddNoteScreen: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const { mutate: addNote, isPending } = useAddNoteMutation();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: NoteSchema,
    onSubmit: values => {
      addNote(values);
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <FullScreenContainer style={styles.container}>
      <Header
        title={t('common.addNote', 'Add Note')}
        showBack
        onBackPress={() => goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <AnimationView animType="FadeIn" duration={500}>
          <TextInput
            label={t('common.title')}
            placeholder={t('common.titlePlaceholder')}
            value={values.title}
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            error={errors.title}
            touched={touched.title}
            autoFocus
          />

          <TextInput
            label={t('common.description')}
            placeholder={t('common.descriptionPlaceholder')}
            value={values.description}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            error={errors.description}
            touched={touched.description}
            multiline
            numberOfLines={6}
            style={styles.textArea}
          />

          <TouchableOpacity
            style={[styles.button, isPending && styles.buttonDisabled]}
            onPress={() => handleSubmit()}
            disabled={isPending}
            activeOpacity={0.8}
          >
            {isPending ? (
              <ActivityIndicator color={theme.colors.white} />
            ) : (
              <AppText variant="bold" size={16} style={styles.buttonText}>
                {t('common.save')}
              </AppText>
            )}
          </TouchableOpacity>
        </AnimationView>
      </ScrollView>
    </FullScreenContainer>
  );
};

export default AddNoteScreen;

const getStyles = ({ colors }: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    content: {
      padding: 20,
    },
    textArea: {
      height: 120,
      textAlignVertical: 'top',
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: 16,
      borderRadius: 14,
      alignItems: 'center',
      marginTop: 20,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    buttonText: {
      color: colors.white,
    },
  });

import React, { FC } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { ThemeType } from '../theme/Colors';
import FullScreenContainer from '../components/FullScreenContainer';
import TextInput from '../components/TextInput';
import AnimationView from '../components/AnimationView';
import { useAddNoteMutation } from '../services/note.query';
import { goBack } from '../utils/navigationUtils';
import { useFormik } from 'formik';
import { NoteSchema } from '../utils/validationSchemas';

const AddNoteScreen: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

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
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('common.addNote')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <AnimationView animType="FadeIn" duration={500}>
          <TextInput
            label={t('common.title')}
            placeholder={t('common.enterTitle')}
            value={values.title}
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            error={errors.title}
            touched={touched.title}
          />

          <TextInput
            label={t('common.description')}
            placeholder={t('common.enterDescription')}
            value={values.description}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            error={errors.description}
            touched={touched.description}
            multiline
            numberOfLines={10}
            style={styles.textArea}
          />

          <TouchableOpacity
            style={[styles.saveButton, isPending && styles.saveButtonDisabled]}
            onPress={() => handleSubmit()}
            disabled={isPending}
            activeOpacity={0.8}
          >
            {isPending ? (
              <ActivityIndicator color={theme.colors.white} />
            ) : (
              <Text style={styles.saveButtonText}>{t('common.save')}</Text>
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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.textColor + '10',
    },
    backButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backIcon: {
      fontSize: 24,
      color: colors.textColor,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.textColor,
    },
    content: {
      padding: 20,
    },
    textArea: {
      height: 150,
      textAlignVertical: 'top',
    },
    saveButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginTop: 24,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
    saveButtonDisabled: {
      opacity: 0.6,
    },
    saveButtonText: {
      color: colors.white,
      fontSize: 18,
      fontWeight: '700',
    },
  });

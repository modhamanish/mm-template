import React, { FC, useMemo } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import AnimationView from '@components/AnimationView';
import AppText from '@components/AppText';
import FullScreenContainer from '@components/FullScreenContainer';
import TextInput from '@components/TextInput';
import { useTheme } from '@context/ThemeContext';
import { useAddNoteMutation } from '@services/note.query';
import { ThemeType } from '@src/theme/colors';
import { goBack } from '@utils/navigationUtils';
import { hexWithOpacity } from '@utils/utilsHelper';
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
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
          <AppText size="xlarge" style={styles.backIcon}>
            ←
          </AppText>
        </TouchableOpacity>
        <AppText variant="h3" style={styles.headerTitle}>
          {t('common.addNote')}
        </AppText>
        <View style={styles.spacer} />
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
              <AppText variant="bold" size={18} style={styles.saveButtonText}>
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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: hexWithOpacity(colors.textColor, 6),
    },
    backButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backIcon: {
      color: colors.textColor,
    },
    headerTitle: {
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
    },
    spacer: {
      width: 40,
    },
  });

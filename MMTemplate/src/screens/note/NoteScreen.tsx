import React, { FC, useMemo } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import { useTranslation } from 'react-i18next';

import { Note } from '@app-types/services.types';
import AnimationView from '@components/AnimationView';
import AppText from '@components/AppText';
import FullScreenContainer from '@components/FullScreenContainer';
import Header from '@components/Header';
import { useTheme } from '@context/ThemeContext';
import Routes from '@navigation/routes';
import { useGetNotesQuery } from '@services/note.query';
import { ThemeType } from '@src/theme/colors';
import { navigate } from '@utils/navigationUtils';
import { hexWithOpacity } from '@utils/utilsHelper';

const NoteScreen: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const { data: notes, isLoading, refetch, isRefetching } = useGetNotesQuery();

  const renderNoteItem = ({ item, index }: { item: Note; index: number }) => (
    <AnimationView delay={index * 100} animType="FadeIn" duration={500}>
      <TouchableOpacity style={styles.noteCard} activeOpacity={0.7}>
        <View style={styles.noteHeader}>
          <AppText
            variant="bold"
            size={18}
            style={styles.noteTitle}
            numberOfLines={1}
          >
            {item.title}
          </AppText>
          <View style={styles.noteTag}>
            <AppText
              variant="semiBold"
              size="xsmall"
              style={styles.noteTagText}
            >
              #{index + 1}
            </AppText>
          </View>
        </View>
        <AppText style={styles.noteContent} numberOfLines={3}>
          {item.description}
        </AppText>
      </TouchableOpacity>
    </AnimationView>
  );

  const listHeader = useMemo(
    () => (
      <View style={styles.headerContainer}>
        <AppText variant="h1" style={styles.headerTitle}>
          {t('common.notes')}
        </AppText>
        <AppText style={styles.headerSubtitle}>
          {notes?.length || 0} {t('common.notes').toLowerCase()}
        </AppText>
      </View>
    ),
    [notes?.length, styles, t],
  );

  const emptyComponent = () => (
    <View style={styles.emptyContainer}>
      <AppText size={60} style={styles.emptyIcon}>
        📝
      </AppText>
      <AppText size={18} style={styles.emptyText}>
        {t('common.noNotesFound')}
      </AppText>
      <TouchableOpacity
        style={styles.addNoteButtonSmall}
        activeOpacity={0.8}
        onPress={() => navigate(Routes.AddNoteScreen)}
      >
        <AppText
          variant="bold"
          size="body"
          style={styles.addNoteButtonTextSmall}
        >
          {t('common.addNote')}
        </AppText>
      </TouchableOpacity>
    </View>
  );

  return (
    <FullScreenContainer style={styles.container}>
      {/* Universal Header */}
      <Header
        title={t('common.notes', 'Notes')}
        showDrawer
        rightIcon={<AppText size={18}>➕</AppText>}
        onRightPress={() => navigate(Routes.AddNoteScreen)}
      />

      {isLoading && !isRefetching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderNoteItem}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={emptyComponent}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor={theme.colors.primary}
              colors={[theme.colors.primary]}
            />
          }
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => navigate(Routes.AddNoteScreen)}
      >
        <AppText size="xxlarge" style={styles.fabIcon}>
          +
        </AppText>
      </TouchableOpacity>
    </FullScreenContainer>
  );
};

export default NoteScreen;

const getStyles = ({ colors }: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    listContent: {
      padding: 20,
      paddingBottom: 100,
    },
    headerContainer: {
      marginBottom: 20,
    },
    headerTitle: {
      color: colors.textColor,
      marginBottom: 4,
    },
    headerSubtitle: {
      color: hexWithOpacity(colors.textColor, 70),
    },
    noteCard: {
      backgroundColor: hexWithOpacity(colors.textColor, 6),
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: hexWithOpacity(colors.textColor, 8),
    },
    noteHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    noteTitle: {
      flex: 1,
      color: colors.textColor,
      marginRight: 8,
    },
    noteTag: {
      backgroundColor: hexWithOpacity(colors.primary, 15),
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 8,
    },
    noteTagText: {
      color: colors.primary,
    },
    noteContent: {
      color: hexWithOpacity(colors.textColor, 75),
      lineHeight: 20,
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
    },
    emptyIcon: {
      marginBottom: 16,
    },
    emptyText: {
      color: hexWithOpacity(colors.textColor, 60),
      marginBottom: 20,
    },
    addNoteButtonSmall: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
    },
    addNoteButtonTextSmall: {
      color: colors.white,
    },
    fab: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 6,
    },
    fabIcon: {
      color: colors.white,
      fontWeight: '300',
    },
  });

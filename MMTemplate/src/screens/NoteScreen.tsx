import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, { FC, useMemo } from 'react';
import FullScreenContainer from '../components/FullScreenContainer';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { ThemeType } from '../theme/Colors';
import { useGetNotesQuery } from '../services/note.query';
import { Note } from '../types/services.types';
import AnimationView from '../components/AnimationView';

const NoteScreen: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  const { data: notes, isLoading, refetch, isRefetching } = useGetNotesQuery();

  const renderNoteItem = ({ item, index }: { item: Note; index: number }) => (
    <AnimationView delay={index * 100} animType="FadeIn" duration={500}>
      <TouchableOpacity style={styles.noteCard} activeOpacity={0.7}>
        <View style={styles.noteHeader}>
          <Text style={styles.noteTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={styles.noteTag}>
            <Text style={styles.noteTagText}>#{item.id.slice(0, 4)}</Text>
          </View>
        </View>
        <Text style={styles.noteContent} numberOfLines={3}>
          {item.description}
        </Text>
      </TouchableOpacity>
    </AnimationView>
  );

  const listHeader = useMemo(
    () => (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{t('common.notes')}</Text>
        <Text style={styles.headerSubtitle}>
          {notes?.length || 0} {t('common.notes').toLowerCase()}
        </Text>
      </View>
    ),
    [notes?.length, styles, t],
  );

  const emptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📝</Text>
      <Text style={styles.emptyText}>{t('common.noNotesFound')}</Text>
      <TouchableOpacity style={styles.addNoteButtonSmall} activeOpacity={0.8}>
        <Text style={styles.addNoteButtonTextSmall}>{t('common.addNote')}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FullScreenContainer style={styles.container}>
      {isLoading && !isRefetching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={item => item.id}
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
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Text style={styles.fabIcon}>+</Text>
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
      marginBottom: 24,
      marginTop: 20,
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: '800',
      color: colors.textColor,
      letterSpacing: -0.5,
    },
    headerSubtitle: {
      fontSize: 14,
      color: colors.textColor + '80',
      marginTop: 4,
    },
    noteCard: {
      backgroundColor: colors.backgroundColor,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.textColor + '15',
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
    },
    noteHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    noteTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.textColor,
      flex: 1,
      marginRight: 8,
    },
    noteTag: {
      backgroundColor: colors.primary + '15',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    noteTagText: {
      fontSize: 10,
      color: colors.primary,
      fontWeight: '600',
      textTransform: 'uppercase',
    },
    noteContent: {
      fontSize: 14,
      color: colors.textColor + 'B3',
      lineHeight: 20,
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 100,
    },
    emptyIcon: {
      fontSize: 60,
      marginBottom: 16,
    },
    emptyText: {
      fontSize: 18,
      color: colors.textColor + '80',
      marginBottom: 24,
    },
    addNoteButtonSmall: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 12,
    },
    addNoteButtonTextSmall: {
      color: colors.white,
      fontWeight: '700',
      fontSize: 16,
    },
    fab: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
    },
    fabIcon: {
      fontSize: 32,
      color: colors.white,
      fontWeight: '300',
    },
  });

import React, { useEffect, useCallback, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { FlashList } from "@shopify/flash-list";
import { useUsers } from "../hooks/useUsers";
import { THEME } from "../utils/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/common/Header";

const FlashListAny = FlashList as any;

const UserSkeleton = () => (
  <View style={styles.row}>
    <View style={styles.rowContent}>
      <View style={[styles.avatar, { backgroundColor: "#E2E8F0" }]} />
      <View style={styles.infoContainer}>
        <View
          style={{
            width: "60%",
            height: 16,
            backgroundColor: "#E2E8F0",
            borderRadius: 4,
            marginBottom: 8,
          }}
        />
        <View
          style={{
            width: "40%",
            height: 12,
            backgroundColor: "#E2E8F0",
            borderRadius: 4,
          }}
        />
      </View>
    </View>
  </View>
);

const UserAvatar = React.memo(function UserAvatar({
  uri,
}: {
  uri?: string | null;
}) {
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    setFailed(false);
  }, [uri]);

  if (!uri || failed) {
    return (
      <View style={styles.avatarFallback} accessibilityLabel="Default avatar">
        <Ionicons name="person" size={22} color="#94A3B8" />
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={styles.avatar}
      onError={() => setFailed(true)}
      accessibilityLabel="User avatar"
    />
  );
});

const UserListScreen = () => {
  const { users, loading, refreshing, error, refreshUsers, loadMore, page, totalPages } =
    useUsers();
  const navigation = useNavigation<any>();
  const tabBarHeight = useBottomTabBarHeight();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  useLayoutEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <TouchableOpacity
        onPress={() => navigation.navigate("UserDetail", { user: item })}
        activeOpacity={0.7}
        style={[styles.row, index % 2 !== 0 && styles.rowAlternate]}
      >
        <View style={styles.rowContent}>
          <View style={styles.avatarWrapper}>
            <UserAvatar uri={item.avatar} />
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.userName} numberOfLines={1}>
              {`${item.first_name} ${item.last_name}`}
            </Text>
            <Text style={styles.userEmail} numberOfLines={1}>
              {item.email}
            </Text>
          </View>

          <View style={styles.chevronContainer}>
            <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
          </View>
        </View>
      </TouchableOpacity>
    ),
    [navigation],
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={THEME.colors.slothBg}
        translucent
      />

      <Header
        title="User List"
        rightAction={
          <TouchableOpacity
            onPress={() => navigation.navigate("EditUser")}
            activeOpacity={0.7}
          >
            <Ionicons
              name="add-circle"
              size={28}
              color={THEME.colors.slothPrimary}
            />
          </TouchableOpacity>
        }
      />

      <View style={{ flex: 1 }}>
        {(loading || refreshing) && page === 1 && users.length === 0 ? (
          <View style={styles.loadingState}>
            <ActivityIndicator size="large" color={THEME.colors.slothPrimary} />
            <Text style={styles.syncText}>Loading data...</Text>
          </View>
        ) : error && !users.length ? (
          <View style={styles.errorState}>
            <Ionicons
              name="alert-circle-outline"
              size={60}
              color={THEME.colors.slothGrey}
            />
            <Text style={styles.errorTitle}>System Connection Lost</Text>
            <Text style={styles.errorMsg}>{error}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={refreshUsers}>
              <Text style={styles.retryBtnText}>Re-initialize</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlashListAny
            data={users}
            renderItem={renderItem}
            estimatedItemSize={100}
            keyExtractor={(item: any) => item.id?.toString()}
            contentContainerStyle={[
              styles.listPadding,
              // Keep the final rows above the bottom tab bar.
              // { paddingBottom: tabBarHeight + THEME.spacing.lg },
            ]}
            onEndReached={loadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={() => (
              <>
                {loading && page >= 1 && users.length > 0 && (
                  <View style={styles.listFooter}>
                    <ActivityIndicator color={THEME.colors.slothPrimary} />
                    <Text style={styles.footerSyncText}>Loading next set...</Text>
                  </View>
                )}
                {!loading && users.length === 0 && !error && (
                  <View style={styles.noDataContainer}>
                    <Ionicons
                      name="people-outline"
                      size={48}
                      color={THEME.colors.slothGrey}
                    />
                    <Text style={styles.noDataText}>No users found</Text>
                  </View>
                )}
              </>
            )}
            onRefresh={refreshUsers}
            refreshing={refreshing && users.length > 0}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.slothBg,
  },
  listPadding: {
    paddingTop: 10,
    backgroundColor: THEME.colors.slothBg,
  },
  row: {
    backgroundColor: THEME.colors.white,
  },
  rowAlternate: {
    backgroundColor: "#F7FAFC",
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  avatarWrapper: {
    marginRight: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F1F5F9",
  },
  avatarFallback: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    flex: 1,
  },
  userName: {
    ...THEME.typography.h2,
    color: THEME.colors.black,
    fontSize: 16, // Heading 16px
    fontWeight: "700",
  },
  userEmail: {
    ...THEME.typography.body,
    color: "#64748B", // Subheading Gray
    fontSize: 14, // Subheading 14px
    marginTop: 2,
  },
  chevronContainer: {
    marginLeft: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginHorizontal: 20,
  },
  loadingState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  syncText: {
    ...THEME.typography.small,
    color: THEME.colors.slothGrey,
    marginTop: 12,
    fontWeight: "700",
  },
  errorState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  errorTitle: {
    ...THEME.typography.h3,
    color: THEME.colors.slothDark,
    marginTop: 20,
  },
  errorMsg: {
    ...THEME.typography.body,
    color: THEME.colors.slothGrey,
    textAlign: "center",
    marginTop: 8,
  },
  retryBtn: {
    marginTop: 24,
    backgroundColor: THEME.colors.slothPrimary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryBtnText: {
    ...THEME.typography.bodyBold,
    color: THEME.colors.white,
  },
  listFooter: {
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.colors.slothBg,
  },
  footerSyncText: {
    ...THEME.typography.small,
    color: THEME.colors.slothGrey,
    marginTop: 8,
    fontWeight: "600",
  },
  noDataContainer: {
    paddingVertical: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  noDataText: {
    ...THEME.typography.body,
    color: THEME.colors.slothGrey,
    marginTop: 12,
  },
});

export default UserListScreen;

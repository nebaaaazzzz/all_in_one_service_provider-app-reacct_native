import React, { useRef, createRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Text,
  Dimensions,
  Image,
  SafeAreaView,
} from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { FlatList } from "react-native-gesture-handler";

export const onOpen = (id) => {
  SheetManager.show(id);
};

export const onClose = (id) => {
  SheetManager.hide(id);
};

export const ImageSelect = ({
  id,
  data = [],
  searchable = true,
  loading = false,
  label,
  height = Math.floor(Dimensions.get("window").height * 0.5),
  closeText = "Close",
  noDataFoundText = "No Data Found.",
  setSelected,
  onSearch,
  searchInputProps,
  flatListProps,
  actionsSheetProps,
  renderListItem,
}) => {
  const [selectedKey, setSelectedKey] = useState(null);

  const actionSheetRef = createRef();

  const scrollViewRef = useRef(null);

  const onClose = () => {
    SheetManager.hide(id);
  };

  const Item = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          paddingVertical: 20,
        }}
        // onPress={() => {
        //   itemOnPress(item);
        //   setSelectedKey(index);
        // }}
      >
        <Image
          style={{ width: 100, height: 100, backgroundColor: "red" }}
          source={{ uri: item }}
        />
      </TouchableOpacity>
    );
  };

  const itemOnPress = (item) => {
    setSelected(item);
    onClose();
  };

  const keyExtractor = (_item, index) => index.toString();

  return (
    <ActionSheet
      id={id}
      ref={actionSheetRef}
      gestureEnabled={true}
      keyboardShouldPersistTaps="always"
      {...actionsSheetProps}
    >
      <SafeAreaView
        style={{
          height: height,
        }}
      >
        <FlatList
          disableScrollViewPanResponder={true}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          stickyHeaderIndices={[0]}
          ListEmptyComponent={() => {
            if (!loading) {
              return (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    paddingTop: 20,
                  }}
                >
                  <Text>{noDataFoundText}</Text>
                </View>
              );
            }
            return null;
          }}
          ref={scrollViewRef}
          nestedScrollEnabled={true}
          data={data}
          numColumns={3}
          renderItem={({ item, index }) => {
            if (renderListItem) {
              return renderListItem(item, index);
            }

            return <Item item={item} index={index} />;
          }}
          keyExtractor={keyExtractor}
          onMomentumScrollEnd={() =>
            actionSheetRef.current?.handleChildScrollEnd()
          }
          {...flatListProps}
        />
      </SafeAreaView>
    </ActionSheet>
  );
};

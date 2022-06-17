import { View, Text } from "react-native";
import React from "react";
import { Modal, Portal, TextInput } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
const FilterModal = ({ visible, setVisible }) => {
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <ScrollView>
          <View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Price Range
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                defaultValue="10"
                style={{ flex: 1, height: 20, marginHorizontal: 5 }}
              />
              <TextInput
                defaultValue="4000"
                style={{ flex: 1, marginHorizontal: 5 }}
              />
            </View>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default FilterModal;

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { PRIMARY, WHITE } from '../colors';
import PropTypes from 'prop-types';

const BirthYearDropdown = ({ value, setValue }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(
    Array.from({ length: 9 }, (_, i) => ({
      label: `${new Date().getFullYear() - 18 - i}년`,
      value: new Date().getFullYear() - 18 - i,
    }))
  );

  return (
    <View style={styles.container}>
      <DropDownPicker
        listMode="SCROLLVIEW"
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="출생연도"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        selectedItemLabelStyle={{ color: WHITE }}
        selectedItemContainerStyle={{ backgroundColor: PRIMARY.DEFAULT }}
        showTickIcon={false}
        zIndex={8000}
      />
    </View>
  );
};

BirthYearDropdown.propTypes = {
  value: PropTypes.number,
  setValue: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingHorizontal: 0,
  },
  dropdown: {
    backgroundColor: WHITE,
    borderColor: '#cccccc',
    borderRadius: 5,
    marginTop: -50,
    marginBottom: 20,
    borderWidth: 1,

    padding: 0,
  },
  dropdownContainer: {
    backgroundColor: WHITE,
    marginTop: -50,
    paddingVertical: 0,
  },
  pressedItem: {
    backgroundColor: PRIMARY.LIGHT,
  },
  pressedItemText: {
    color: WHITE,
  },
});

export default BirthYearDropdown;

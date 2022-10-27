import React from 'react';

import ReactSelect, { GroupBase, OptionsOrGroups, Props, Theme } from 'react-select';

import { Colors } from 'Shared/Constants/Color';

export interface OptionType {
  label: string;
  value: string | number;
}

interface SelectProps<Option = OptionType, Group extends GroupBase<Option> = GroupBase<Option>>
  extends Props {
  options: OptionsOrGroups<Option, Group>;
}

// const customStyles = {
//   control: (base: CSSObjectWithLabel) => ({
//     ...base,
//     borderColor: Colors.Secondary,
//     boxShadow: '0 0 0 1px ' + Colors.Secondary,
//     ':hover': {
//       ...base[':hover'],
//       borderColor: Colors.Secondary,
//     },
//   }),
//   menu: (base: CSSObjectWithLabel) => ({
//     ...base,
//     zIndex: 1000,
//   }),
//   option: (base: CSSObjectWithLabel, props: OptionProps) => ({
//     ...base,
//     backgroundColor: props.isSelected
//       ? Colors.Secondary
//       : props.isDisabled
//       ? Colors.Grey
//       : Colors.Primary,
//     ':active': {
//       ...base[':active'],
//       backgroundColor: !props.isDisabled
//         ? props.isSelected
//           ? Colors.Secondary
//           : Colors.Secondary30
//         : undefined,
//     },
//     ':hover': {
//       ...base[':hover'],
//       backgroundColor: !props.isDisabled
//         ? props.isSelected
//           ? Colors.Secondary
//           : Colors.Secondary30
//         : undefined,
//     },
//   }),
// };

const Select: React.FC<SelectProps> = <T,>(props: SelectProps<T>) => {
  return (
    <ReactSelect
      theme={(theme: Theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: Colors.Secondary30,
          primary: Colors.Secondary,
        },
      })}
      {...props}
    />
  );
};

export default Select;

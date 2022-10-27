import React from 'react';

import ReactSelect, {
  CSSObjectWithLabel,
  GroupBase,
  OptionsOrGroups,
  Props,
  Theme,
} from 'react-select';

import { Colors } from 'Shared/Constants/Color';

export interface OptionType {
  label: string;
  value: string | number;
}

interface SelectProps<Option = OptionType, Group extends GroupBase<Option> = GroupBase<Option>>
  extends Props {
  options: OptionsOrGroups<Option, Group>;
}

const customStyles = {
  menu: (base: CSSObjectWithLabel) => ({
    ...base,
    zIndex: 1000,
  }),
};

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
      styles={customStyles}
      {...props}
    />
  );
};

export default Select;

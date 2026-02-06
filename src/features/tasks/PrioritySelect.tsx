import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";

type Priority = "low" | "medium" | "high";

interface Props {
  value: Priority | "all";
  onChange: (value: Priority | "all") => void;
}

const options = [
  { value: "all", label: "All" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export function PrioritySelect({ value, onChange }: Props) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className="selectTrigger">
        <Select.Value />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="selectContent" position="popper">
          <Select.Viewport className="selectViewport">
            {options.map((opt) => (
              <Select.Item
                key={opt.value}
                value={opt.value}
                className="selectItem"
              >
                <Select.ItemText>{opt.label}</Select.ItemText>

                <Select.ItemIndicator>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

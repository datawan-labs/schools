import { config } from "@/stores";
import { MAP_STYLES } from "@/constants";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

export const SelectorMapStyles = () => {
  return (
    <div class="flex-1 space-y-2">
      <Label>Map Style</Label>
      <Select
        options={MAP_STYLES}
        optionValue="styles"
        optionTextValue="name"
        disallowEmptySelection
        value={config.styles}
        defaultValue={MAP_STYLES[0]}
        onChange={(m) => {
          config.styles = m!;
        }}
        itemComponent={(props) => (
          <SelectItem item={props.item}>{props.item.rawValue.name}</SelectItem>
        )}
      >
        <SelectTrigger>
          <SelectValue<(typeof MAP_STYLES)[number]>>
            {(state) => state.selectedOption().name}
          </SelectValue>
        </SelectTrigger>
        <SelectContent />
      </Select>
    </div>
  );
};
